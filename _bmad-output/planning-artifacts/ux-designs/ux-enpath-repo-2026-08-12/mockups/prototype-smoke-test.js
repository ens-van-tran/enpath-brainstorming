"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync(path.join(__dirname, "enpath-app.js"), "utf8");
const storage = {};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function tableRow(html, competency) {
  const escaped = competency.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.match(new RegExp(`<tr>[\\s\\S]*?<b>${escaped}</b>[\\s\\S]*?</tr>`))?.[0] || "";
}

function boot(persona, route, options = {}) {
  const listeners = {};
  const toasts = [];
  const app = { innerHTML: "", addEventListener(type, handler) { listeners[type] = handler; } };
  const body = {
    dataset: { persona },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
  };
  const summary = { value: "Use the production evidence in the next career conversation." };
  const document = {
    body,
    getElementById(id) { return id === "app" ? app : id === "assessment-summary" ? summary : null; },
    querySelector(selector) { return selector === ".toast-stack" ? { appendChild(node) { toasts.push(node.innerHTML); } } : null; },
    querySelectorAll() { return []; },
    createElement() { return { innerHTML: "", appendChild() {}, remove() {}, click() {}, style: {} }; },
    addEventListener() {}
  };
  const localStorage = options.throwStorage ? {
    getItem() { throw new Error("storage disabled"); },
    setItem() { throw new Error("storage disabled"); },
    removeItem() { throw new Error("storage disabled"); }
  } : {
    getItem(key) { return storage[key] ?? null; },
    setItem(key, value) { storage[key] = value; },
    removeItem(key) { delete storage[key]; }
  };
  const location = { hash: `#${route}`, protocol: options.protocol || "http:", href: "" };
  const window = { name: options.windowName || "", addEventListener() {}, scrollTo() {} };

  class DemoFormData {
    constructor(form) { this.values = form.values || {}; this.multi = form.multi || {}; }
    get(key) { return this.values[key] == null ? "" : this.values[key]; }
    getAll(key) { return this.multi[key] || []; }
    entries() { return Object.entries(this.values)[Symbol.iterator](); }
  }

  const runtimeConsole = options.throwStorage || options.quietConsole ? { log() {}, warn() {}, error: console.error } : console;
  vm.runInNewContext(source, {
    console: runtimeConsole, document, localStorage, location, window,
    setTimeout() {}, Blob: function Blob() {},
    URL: { createObjectURL() { return "blob:test"; }, revokeObjectURL() {} },
    FormData: DemoFormData, Math, Date, JSON
  });

  function click(action, dataset = {}) {
    const target = {
      dataset: { action, ...dataset },
      classList: { contains() { return false; } },
      closest(selector) { return selector === "[data-action]" ? this : null; },
      matches() { return false; }
    };
    listeners.click({ target, preventDefault() {} });
  }

  function submit(type, values, multi = {}, fileName) {
    const form = {
      dataset: { form: type }, values, multi,
      querySelector() { return { files: fileName ? [{ name: fileName }] : [] }; },
      closest(selector) { return selector === "[data-form]" ? this : null; }
    };
    listeners.submit({ target: form, preventDefault() {} });
  }

  return { app, click, submit, window, location, toasts };
}

const routes = {
  hr: ["overview", "teams", "users", "roles", "library", "categories", "rating-scale", "templates", "frameworks", "career", "capability", "audit"],
  manager: ["team-overview", "team-framework", "team-competencies", "team-members", "assessments", "assessment-requests", "development-plans", "learning-resources"],
  employee: ["profile", "career-path", "my-assessments", "my-requests", "my-idp", "notifications"],
  reviewer: ["review-invitations", "review-guidance"]
};

for (const [persona, personaRoutes] of Object.entries(routes)) {
  for (const route of personaRoutes) {
    const runtime = boot(persona, route);
    assert(runtime.app.innerHTML.includes("app-shell"), `${persona}/${route} did not render`);
  }
}

const mockupFiles = {
  login: fs.readFileSync(path.join(__dirname, "login.html"), "utf8"),
  session: fs.readFileSync(path.join(__dirname, "demo-session.js"), "utf8"),
  hr: fs.readFileSync(path.join(__dirname, "hr-admin.html"), "utf8"),
  employee: fs.readFileSync(path.join(__dirname, "employee.html"), "utf8"),
  reviewer: fs.readFileSync(path.join(__dirname, "contextual-reviewer.html"), "utf8")
};

assert(mockupFiles.login.includes('data-login-role="hr"'), "Login As is missing HR Admin");
assert(mockupFiles.login.includes('data-login-role="manager"'), "Login As is missing Manager");
assert(mockupFiles.login.includes('data-login-role="employee"'), "Login As is missing Employee");
assert(mockupFiles.login.includes('data-login-role="reviewer"'), "Login As is missing Contextual Reviewer");
assert(mockupFiles.session.includes('hr: "hr-admin.html"'), "HR Admin login destination is incorrect");
assert(mockupFiles.session.includes('manager: "line-manager.html"'), "Manager login destination is incorrect");
assert(mockupFiles.session.includes('employee: "employee.html"'), "Employee login destination is incorrect");
assert(mockupFiles.session.includes('reviewer: "contextual-reviewer.html"'), "Reviewer login destination is incorrect");
for (const [role, html] of Object.entries({ hr: mockupFiles.hr, employee: mockupFiles.employee, reviewer: mockupFiles.reviewer })) {
  assert(html.includes('src="enpath-app.js"'), `${role} does not load the connected shared application`);
  assert(html.includes(`data-persona="${role}"`), `${role} is missing its persona boundary`);
}

const managerShell = boot("manager", "team-overview");
assert(managerShell.app.innerHTML.includes("logout-demo"), "Manager is missing Logout");
assert(!managerShell.app.innerHTML.includes("data-switch-persona"), "Manager still exposes direct persona switching");
managerShell.click("logout-demo");
assert(managerShell.location.href === "login.html", "Manager Logout does not return to Login As");

const fallback = boot("employee", "profile", { protocol: "file:", throwStorage: true });
assert(fallback.app.innerHTML.includes("Good morning, Minh"), "Direct-file fallback did not render");
assert(fallback.window.name.startsWith("__ENPATH_DEMO_STATE__"), "Direct-file fallback did not persist in window.name");

const directSession = { name: fallback.window.name };
vm.runInNewContext(mockupFiles.session, {
  document: { addEventListener() {} }, window: directSession, location: { href: "" },
  localStorage: { setItem() { throw new Error("storage disabled"); }, removeItem() { throw new Error("storage disabled"); } }
});
directSession.EnPathDemo.loginAs("hr");
assert(directSession.name.startsWith("__ENPATH_DEMO_STATE__"), "Direct-file Login As overwrote the shared fallback state");

let career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("career-tree-root"), "Employee Career Path did not render the visual tree");
assert(career.app.innerHTML.includes("Selected Target"), "Selected Target state is missing from the tree");
assert(tableRow(career.app.innerHTML, "Database Design").includes("Not Configured"), "Database Design did not keep Not Configured semantics");
assert(tableRow(career.app.innerHTML, "Technical Communication").includes("Not Comparable"), "Technical Communication did not keep Not Comparable semantics");
assert(tableRow(career.app.innerHTML, "Cloud Architecture").includes("Unknown"), "Cloud Architecture did not keep Unknown semantics");
assert(tableRow(career.app.innerHTML, "Distributed Systems").includes("Gap 2"), "Distributed Systems gap was not calculated independently");

const stableSeed = storage["enpath-demo-v7"];
let stableState = JSON.parse(stableSeed);
assert(stableState.schemaVersion === 7, "Seed state did not advance to schema v7");
assert(stableState.careerPaths.backend && stableState.careerPaths.frontend, "Independent Backend and Frontend Career Paths were not seeded");
assert(stableState.teams.find(item => item.id === "frontend").enabledRoleIds.join(",") === "frontend-engineer", "Frontend Team Role eligibility is incorrect");
const originalHistoryCount = stableState.careerSelections.minh.history.length;
career.click("select-career-target", { position: "be-l3" });
stableState = JSON.parse(storage["enpath-demo-v7"]);
assert(stableState.careerSelections.minh.history.length === originalHistoryCount, "Re-selecting the same target created a false history event");

stableState.templates.find(item => item.id === "tpl-eng").status = "Archived";
storage["enpath-demo-v7"] = JSON.stringify(stableState);
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Selected Target"), "Archiving a source Template rewrote Published Career Path readiness");
storage["enpath-demo-v7"] = stableSeed;

let roleRename = boot("hr", "roles");
roleRename.submit("role", { id: "backend-engineer", name: "Server Engineer", family: "Engineering", description: "Builds dependable services." });
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("career-tree-root") && career.app.innerHTML.includes("Current Position"), "Role rename detached the employee from the current Published Position");
let renamedState = JSON.parse(storage["enpath-demo-v7"]);
assert(renamedState.templates.find(item => item.id === "tpl-eng").targetProfiles["Server Engineer::L3"].length > 0, "Role rename did not preserve Template target-profile defaults");
let renamedCareer = boot("hr", "career");
renamedCareer.submit("career-position", { id: "be-l3", teamId: "backend", roleLevel: "backend-engineer::L3", source: "tpl-eng::2.0", guidance: "Lead cross-service design." });
renamedState = JSON.parse(storage["enpath-demo-v7"]);
assert(renamedState.careerPaths.backend.workingDraft.positions.find(item => item.id === "be-l3").expectationSnapshot.length > 0, "Resaving a renamed Role erased its target expectations");
storage["enpath-demo-v7"] = stableSeed;

stableState = JSON.parse(stableSeed);
stableState.teams.find(item => item.id === "backend").name = "Core Services";
storage["enpath-demo-v7"] = JSON.stringify(stableState);
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Core Services") && tableRow(career.app.innerHTML, "Distributed Systems").includes("Gap 2"), "Team rename detached the stable Team path or Official Rating profile");
assert(boot("manager", "team-members").app.innerHTML.includes("Minh Nguyen") && boot("manager", "team-framework").app.innerHTML.includes("v1.1"), "Team rename detached Manager users or Framework versions from the stable Team ID");
const renamedManager = boot("manager", "team-framework");
renamedManager.click("fix-demo-framework");
renamedManager.click("confirm-publish");
assert(JSON.parse(storage["enpath-demo-v7"]).users.find(item => item.id === "minh").framework === "Core Services v1.1", "Publishing after a Team rename left employees on the superseded framework assignment");
storage["enpath-demo-v7"] = stableSeed;

stableState = JSON.parse(stableSeed);
delete stableState.careerSelections.minh.status;
stableState.careerSelections.minh.history.push({ teamId: "backend", positionId: "be-l3", revisionId: "career-rev-1", action: "Unavailable", date: "2026-08-16", label: "Backend Engineer L3", snapshot: stableState.careerSelections.minh.snapshot });
storage["enpath-demo-v7"] = JSON.stringify(stableState);
career = boot("employee", "career-path");
assert(JSON.parse(storage["enpath-demo-v7"]).careerSelections.minh.status === "Unavailable" && career.app.innerHTML.includes("Target Position unavailable"), "Pre-patch v7 history silently reactivated an unavailable target");
storage["enpath-demo-v7"] = stableSeed;

stableState = JSON.parse(stableSeed);
stableState.assessments.find(item => item.id === "asmt-minh-1").scale = "2.0";
storage["enpath-demo-v7"] = JSON.stringify(stableState);
career = boot("employee", "career-path");
assert(tableRow(career.app.innerHTML, "Distributed Systems").includes("Not Comparable"), "Rating-scale provenance mismatch still produced a numeric gap");
storage["enpath-demo-v7"] = stableSeed;

const legacyV6 = JSON.parse(stableSeed);
legacyV6.schemaVersion = 6;
legacyV6.careerPath = legacyV6.careerPaths.backend;
delete legacyV6.careerPath.teamId;
delete legacyV6.careerPath.workingDraft.teamId;
delete legacyV6.careerPaths;
legacyV6.teams.forEach(item => delete item.enabledRoleIds);
legacyV6.users.forEach(item => delete item.teamId);
delete legacyV6.careerSelections.minh.teamId;
legacyV6.careerSelections.minh.history.forEach(item => { delete item.teamId; delete item.snapshot; delete item.selectedAt; });
legacyV6.users.find(item => item.id === "minh").lastAssignmentReason = "Preserve legacy v6 mutation";
const legacyBackendRevision = JSON.stringify(legacyV6.careerPath.publishedRevisions);
const legacyBackendDraft = JSON.stringify(legacyV6.careerPath.workingDraft);
storage["enpath-demo-v6"] = JSON.stringify(legacyV6);
delete storage["enpath-demo-v7"];
boot("employee", "profile", { quietConsole: true });
let migrated = JSON.parse(storage["enpath-demo-v7"]);
assert(migrated.users.find(item => item.id === "minh").lastAssignmentReason === "Preserve legacy v6 mutation", "Legacy v6 mutation was not preserved");
assert(JSON.stringify(migrated.careerPaths.backend.publishedRevisions) === legacyBackendRevision, "Legacy v6 Published Revisions were not migrated losslessly");
const migratedDraft = JSON.parse(JSON.stringify(migrated.careerPaths.backend.workingDraft));
delete migratedDraft.teamId;
assert(JSON.stringify(migratedDraft) === legacyBackendDraft, "Legacy v6 Working Draft was not migrated losslessly");
assert(migrated.careerSelections.minh.teamId === "backend" && migrated.careerSelections.minh.history.every(item => item.teamId === "backend"), "Legacy selection was not scoped to Backend");
assert(migrated.careerSelections.minh.history.every(item => item.snapshot?.expectationSnapshot?.length), "Legacy v6 target history was not backfilled from its immutable Career Path Revision");
assert(!migrated.careerPaths.frontend, "Legacy v6 migration invented another Team's path");
delete storage["enpath-demo-v6"];
storage["enpath-demo-v7"] = stableSeed;

storage["enpath-demo-v7"] = "{malformed-v7";
storage["enpath-demo-v6"] = JSON.stringify(legacyV6);
boot("employee", "profile", { quietConsole: true });
assert(JSON.parse(storage["enpath-demo-v7"]).users.find(item => item.id === "minh").lastAssignmentReason === "Preserve legacy v6 mutation", "Malformed v7 state prevented fallback to valid legacy v6 data");
delete storage["enpath-demo-v6"];
storage["enpath-demo-v7"] = stableSeed;

const legacyV5 = JSON.parse(stableSeed);
legacyV5.schemaVersion = 5;
legacyV5.users.find(item => item.id === "minh").lastAssignmentReason = "Preserve legacy v5 mutation";
storage["enpath-demo-v5"] = JSON.stringify(legacyV5);
delete storage["enpath-demo-v7"];
boot("employee", "profile");
assert(JSON.parse(storage["enpath-demo-v7"]).users.find(item => item.id === "minh").lastAssignmentReason === "Preserve legacy v5 mutation", "Legacy v5 mutation was not preserved");
delete storage["enpath-demo-v5"];
storage["enpath-demo-v7"] = stableSeed;

storage["enpath-demo-v7"] = JSON.stringify({ schemaVersion: 7, users: [], roles: [], templates: [], competencies: [], assessments: [] });
const recovered = boot("employee", "profile");
assert(recovered.app.innerHTML.includes("Good morning, Minh"), "Malformed v7 state did not recover to a safe seed");
storage["enpath-demo-v7"] = stableSeed;

let careerState = JSON.parse(storage["enpath-demo-v7"]);
const originalRevision = JSON.stringify(careerState.careerPaths.backend.publishedRevisions.find(item => item.id === "career-rev-1"));
const frontendBeforeBackendPublish = JSON.stringify(careerState.careerPaths.frontend);
let careerHr = boot("hr", "career");
assert(careerHr.app.innerHTML.includes("data-action=\"edit-transition\""), "HR Career tree is missing an edit connector control");
assert(careerHr.app.innerHTML.includes("Backend Engineering Revision history"), "HR cannot inspect the selected Team's Published Career Path history");
assert(careerHr.app.innerHTML.includes("Frontend Engineering") && careerHr.app.innerHTML.includes("Product Design"), "HR Team Career Path switcher is incomplete");
const backendBeforeContextSwitch = JSON.stringify(careerState.careerPaths.backend);
const frontendBeforeContextSwitch = JSON.stringify(careerState.careerPaths.frontend);
careerHr.click("publish-career-path");
careerHr.click("select-career-team", { team: "frontend" });
careerHr.click("confirm-publish-career");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerHr.toasts.some(item => item.includes("Team context changed")), "Publish confirmation did not reject a changed Team review context");
assert(JSON.stringify(careerState.careerPaths.backend) === backendBeforeContextSwitch && JSON.stringify(careerState.careerPaths.frontend) === frontendBeforeContextSwitch, "Changed publish context mutated a Team path");
careerHr.click("select-career-team", { team: "backend" });
careerHr.click("publish-career-path");
careerHr.submit("transition", { id: "path-1", teamId: "backend", from: "be-l1", to: "be-l2", label: "Own scoped features independently", state: "Open" });
careerHr.click("confirm-publish-career");
assert(careerHr.toasts.some(item => item.includes("Working Draft changed")), "Publish confirmation accepted Draft content that changed after review");
careerHr.click("publish-career-path");
careerHr.click("confirm-publish-career");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerPaths.backend.publishedRevisions.length === 2, "Publishing did not create a new Backend Career Path Revision");
assert(careerState.careerPaths.backend.publishedRevisions[0].version === "1.1", "Backend Career Path version did not advance");
assert(JSON.stringify(careerState.careerPaths.backend.publishedRevisions.find(item => item.id === "career-rev-1")) === originalRevision, "Publishing rewrote the historical Backend Career Path Revision");
assert(JSON.stringify(careerState.careerPaths.frontend) === frontendBeforeBackendPublish, "Publishing Backend mutated Frontend draft, current Revision, or history");

careerHr.click("select-career-team", { team: "frontend" });
assert(careerHr.app.innerHTML.includes("Frontend Engineering Revision history"), "Switching Teams did not replace the entire HR workbench context");
careerHr.click("add-career-position");
assert(careerHr.app.innerHTML.includes("Frontend Engineer · L3") && !careerHr.app.innerHTML.includes("Backend Engineer · L3"), "Position picker exposed a Role not enabled for the selected Team");
careerHr = boot("hr", "career");
const frontendBeforeRoleBypass = JSON.stringify(JSON.parse(storage["enpath-demo-v7"]).careerPaths.frontend.workingDraft);
careerHr.submit("career-position", { id: "", teamId: "frontend", roleLevel: "backend-engineer::L1", source: "tpl-eng::2.0", guidance: "Invalid cross-Team role." });
assert(careerHr.toasts.some(item => item.includes("Role is not enabled for this Team")), "Bypassed Position submission did not show the exact Team Role blocker");
assert(JSON.stringify(JSON.parse(storage["enpath-demo-v7"]).careerPaths.frontend.workingDraft) === frontendBeforeRoleBypass, "Invalid cross-Team Role mutated the Frontend Working Draft");
careerHr.submit("transition", { id: "fe-path-2", teamId: "frontend", from: "fe-l3", to: "fe-l4", label: "   ", state: "Open" });
assert(careerHr.toasts.some(item => item.includes("Connector label required")), "Direct transition submission accepted an empty connector label");
const backendBeforeFrontendPublish = JSON.stringify(JSON.parse(storage["enpath-demo-v7"]).careerPaths.backend);
careerHr.submit("transition", { id: "fe-path-2", teamId: "frontend", from: "fe-l3", to: "fe-l4", label: "Set frontend direction", state: "Open" });
careerHr.click("confirm-publish-career");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerPaths.frontend.publishedRevisions[0].version === "1.1", "Frontend Career Path did not publish independently");
assert(JSON.stringify(careerState.careerPaths.backend) === backendBeforeFrontendPublish, "Publishing Frontend mutated Backend draft, current Revision, or history");
careerHr.click("select-career-team", { team: "design" });
assert(careerHr.app.innerHTML.includes("Create Product Design's first Career Path"), "Not-configured Team did not show create-first-path empty state");
careerHr.click("create-team-career-path", { team: "design" });
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerPaths.design && careerState.careerPaths.design.publishedRevisions.length === 0, "Create-first-path did not create an independent Draft-only aggregate");
assert(careerHr.app.innerHTML.includes("No Published Revision"), "New Team Working Draft did not remain Draft only");
careerHr.click("select-career-team", { team: "backend" });

career = boot("employee", "career-path");
career.click("select-career-target", { position: "platform-l2" });
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.positionId === "platform-l2", "Employee Target Position selection did not persist");
assert(careerState.careerSelections.minh.teamId === "backend" && careerState.careerSelections.minh.selectedRevisionId === careerState.careerPaths.backend.currentRevisionId, "Target selection did not capture the owning Team and Published Revision");

careerHr = boot("hr", "career");
careerHr.submit("transition", { id: "path-3", teamId: "backend", from: "be-l2", to: "platform-l2", label: "Deepen platform craft", state: "Locked" });
careerHr.click("confirm-publish-career");
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Target Position unavailable"), "A superseded target was not marked Unavailable");
assert(career.app.innerHTML.includes("career-node-card unavailable"), "Unavailable target is not distinguished inside the visual tree");
assert(career.app.innerHTML.includes("Target selection history"), "Employee cannot inspect Target Position history");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.positionId === "platform-l2", "Unavailable target history was silently cleared");
assert(careerState.careerSelections.minh.status === "Unavailable" && careerState.careerSelections.minh.history.some(item => item.action === "Unavailable" && item.snapshot.expectationSnapshot.length > 0), "Publishing an invalidating Revision did not persist unavailable target history");

careerHr = boot("hr", "career");
careerHr.submit("transition", { id: "path-3", teamId: "backend", from: "be-l2", to: "platform-l2", label: "Deepen platform craft", state: "Optional" });
careerHr.click("publish-career-path");
careerHr.click("confirm-publish-career");
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Target Position unavailable"), "A restored transition silently reactivated an unavailable target");
career.click("select-career-target", { position: "platform-l2" });
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.status === "Selected" && careerState.careerSelections.minh.history.some(item => item.action === "Replaced unavailable"), "Explicit reselection did not reactivate the restored target with history");

careerHr = boot("hr", "career");
const currentRevisionBeforeBlockedPublish = JSON.parse(storage["enpath-demo-v7"]).careerPaths.backend.currentRevisionId;
careerHr.submit("career-position", { id: "", teamId: "backend", roleLevel: "technical-lead::L2", source: "tpl-eng::2.0", guidance: "Explore broader technical leadership." });
careerHr.click("confirm-publish-career");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerPaths.backend.currentRevisionId === currentRevisionBeforeBlockedPublish, "Invalid Team Career Path Draft replaced the current Published Revision");
assert(careerState.careerPaths.backend.workingDraft.positions.some(item => item.role === "Technical Lead" && item.level === "L2"), "Invalid Position was not preserved in the Team Working Draft for correction");

careerState.careerPaths.backend.workingDraft.positions = careerState.careerPaths.backend.workingDraft.positions.filter(item => !(item.role === "Technical Lead" && item.level === "L2"));
careerState.careerPaths.backend.workingDraft.transitions.push({ id: "path-cycle", from: "be-l3", to: "be-l2", label: "Malformed imported cycle", state: "Open" });
careerState.careerPaths.backend.workingDraft.transitions.push({ id: "path-invalid-state", from: "be-l1", to: "platform-l2", label: "Malformed state", state: "Surprise" });
storage["enpath-demo-v7"] = JSON.stringify(careerState);
careerHr = boot("hr", "career");
assert(careerHr.app.innerHTML.includes("Career Path cannot contain a cycle"), "Imported Career Path cycle was not reported as a publish blocker");
assert(careerHr.app.innerHTML.includes("Transition state is invalid"), "Imported transition state was not reported as a publish blocker");
careerHr.click("confirm-publish-career");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerPaths.backend.currentRevisionId === currentRevisionBeforeBlockedPublish, "Cyclic Team Career Path Draft replaced the current Published Revision");

storage["enpath-demo-v7"] = stableSeed;
let reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "backend", role: "Backend Engineer", level: "L1", effective: "2026-08-17", reason: "Change scope within Backend Engineering" });
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.status === "Unavailable" && careerState.careerSelections.minh.history.some(item => item.action === "Unavailable" && item.note.includes("Assignment changed")), "Same-Team Role + Level change did not preserve an unreachable target as Unavailable history");
reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "backend", role: "Backend Engineer", level: "L2", effective: "2026-08-17", reason: "Restore Backend Engineering scope" });
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Target Position unavailable for Backend Engineering"), "Restoring a same-Team assignment silently reactivated its historical target");

reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "backend", role: "Platform Engineer", level: "L2", effective: "2026-08-17", reason: "Move to Platform Engineering" });
assert(boot("employee", "profile").app.innerHTML.includes("No Published Framework covers this Role + Level"), "Profile claimed assessment readiness for an uncovered Team Role + Level");

storage["enpath-demo-v7"] = stableSeed;
reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "frontend", role: "Frontend Engineer", level: "L3", effective: "2026-08-17", reason: "Move to Frontend Engineering" });
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Frontend Engineering") && career.app.innerHTML.includes("fe-l4"), "Employee did not resolve the destination Team's Published Career Path");
assert(career.app.innerHTML.includes("Target Position unavailable for Frontend Engineering"), "Prior Team target was not marked Unavailable after reassignment");
assert(!career.app.innerHTML.includes("Gap 2"), "Prior Team Official Ratings leaked into the destination Team comparison");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.teamId === "backend", "Team reassignment automatically carried the target to the destination Team");
assert(careerState.careerSelections.minh.history.some(item => item.action === "Unavailable" && item.teamId === "backend"), "Team reassignment did not preserve an Unavailable historical target event");
assert(careerState.careerSelections.minh.status === "Unavailable" && careerState.careerSelections.minh.history.find(item => item.action === "Unavailable").snapshot.expectationSnapshot.length > 0, "Team reassignment did not preserve the full unavailable target snapshot");

reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "backend", role: "Backend Engineer", level: "L2", effective: "2026-08-17", reason: "Return to Backend Engineering" });
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Target Position unavailable for Backend Engineering"), "Returning to a prior Team silently reactivated its historical target");

storage["enpath-demo-v7"] = stableSeed;
careerState = JSON.parse(storage["enpath-demo-v7"]);
const frontendRevision = careerState.careerPaths.frontend.publishedRevisions.find(item => item.id === careerState.careerPaths.frontend.currentRevisionId);
frontendRevision.positions.find(item => item.id === "fe-l4").id = "be-l3";
frontendRevision.transitions.find(item => item.to === "fe-l4").to = "be-l3";
careerState.careerPaths.frontend.workingDraft.positions.find(item => item.id === "fe-l4").id = "be-l3";
careerState.careerPaths.frontend.workingDraft.transitions.find(item => item.to === "fe-l4").to = "be-l3";
storage["enpath-demo-v7"] = JSON.stringify(careerState);
reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "frontend", role: "Frontend Engineer", level: "L3", effective: "2026-08-17", reason: "Move to Frontend Engineering" });
career = boot("employee", "career-path");
career.click("select-career-target", { position: "be-l3" });
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.teamId === "frontend" && careerState.careerSelections.minh.positionId === "be-l3" && careerState.careerSelections.minh.status === "Selected", "A reused Position ID blocked a valid destination-Team target selection");
assert(careerState.careerSelections.minh.history.some(item => item.action === "Replaced unavailable" && item.snapshot.expectationSnapshot.length > 0), "Replacing an unavailable target lost its historical snapshot");
career.click("clear-career-target");
careerState = JSON.parse(storage["enpath-demo-v7"]);
assert(careerState.careerSelections.minh.history.findLast(item => item.action === "Cleared").snapshot.expectationSnapshot.length > 0, "Clearing a target discarded its historical expectation snapshot");

storage["enpath-demo-v7"] = stableSeed;
reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "mobile", role: "Mobile Engineer", level: "L2", effective: "2026-08-17", reason: "Move to Mobile Engineering" });
career = boot("employee", "career-path");
assert(career.app.innerHTML.includes("Mobile Engineering has no Published Career Path"), "Draft-only destination Team did not show Team-specific publish guidance");
assert(!career.app.innerHTML.includes("career-tree-root"), "Employee fell back to another Team's Published graph");
reassignment = boot("hr", "users");
reassignment.submit("assignment", { userId: "minh", teamId: "design", role: "Product Designer", level: "L2", effective: "2026-08-17", reason: "Move to Product Design" });
const reassignedProfile = boot("employee", "profile");
assert(reassignedProfile.app.innerHTML.includes("No Published Framework covers this Role + Level"), "Profile described a pending Team Framework as Published and assessment-ready");

storage["enpath-demo-v7"] = stableSeed;

let ui = boot("hr", "roles");
ui.submit("role", { id: "", name: "Platform Engineer", family: "Engineering", description: "Builds internal platforms." });
ui.submit("assignment", { userId: "minh", teamId: "backend", role: "Backend Engineer", level: "L3", effective: "2026-08-15", reason: "Expanded system ownership" });
ui.submit("member", { name: "Lan Nguyen", email: "lan@enpathlabs.com", teamId: "backend", type: "Employee", roleId: "backend-engineer", level: "L1" });
ui.submit("scale", {
  version: "1.1", pointCount: "5", effective: "2026-09-01", note: "Clarified rubric",
  "label-1": "Needs Foundation", "description-1": "Requires foundational support.", "color-1": "#d76555",
  "label-2": "Developing", "description-2": "Shows the behavior inconsistently.", "color-2": "#d18b2e",
  "label-3": "Meets Expectations", "description-3": "Consistently meets role scope.", "color-3": "#2d7d73",
  "label-4": "Strong", "description-4": "Operates beyond normal role scope.", "color-4": "#4b759f",
  "label-5": "Role Model", "description-5": "Sets the standard for others.", "color-5": "#766d9c"
});

ui = boot("manager", "team-framework");
ui.click("adopt-active-scale");
ui.click("fix-demo-framework");
ui.click("confirm-publish");
let state = JSON.parse(storage["enpath-demo-v7"]);
const framework = state.frameworks.find(item => item.team === "Backend Engineering" && item.status === "Published");
const assessmentCountBefore = state.assessments.length;
ui.submit("start-assessment", { initialRequestId: "", frameworkId: framework.id, scope: "focused", deadline: "2026-08-28", cycle: "Empty cohort smoke" });
state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.assessments.length === assessmentCountBefore, "Assessment campaign accepted an empty Member selection");
ui.submit("start-assessment", {
  initialRequestId: "", frameworkId: framework.id, scope: "focused",
  deadline: "2026-08-28", cycle: "Focused assessment smoke"
}, { memberIds: ["minh", "an"] });
state = JSON.parse(storage["enpath-demo-v7"]);
const focusedAssessment = state.assessments.find(item => item.cycle === "Focused assessment smoke");
const cohortCases = state.assessments.filter(item => item.cycle === "Focused assessment smoke");
assert(cohortCases.length === 2 && new Set(cohortCases.map(item => item.campaignId)).size === 1, "Cohort Assessment did not create independent Member cases under one campaign");
let employeeAssessment = boot("employee", "my-assessments");
employeeAssessment.submit("self-assessment", {
  assessmentId: focusedAssessment.id,
  "score-0": "3", "evidence-0": "Event workflow design",
  "score-1": "4", "evidence-1": "Architecture decision brief"
});
ui = boot("manager", "assessments");
ui.click("open-assessment", { assessment: focusedAssessment.id });
ui.click("set-manager-score", { index: "0", score: "3" });
ui.click("set-manager-score", { index: "1", score: "4" });
ui.click("complete-assessment");

ui = boot("employee", "my-idp");
ui.submit("idp-action", {
  id: "", title: "Run failure injection review", type: "Practice", competency: "Distributed Systems",
  deadline: "2026-08-30", status: "Done", textEvidence: "Retries recovered inside the target window.",
  linkEvidence: "https://example.test/failure-results"
}, {}, "failure-results.pdf");
ui.submit("reassessment", {
  requestId: "", "reason-api-design": "I can now demonstrate stable API evolution decisions.",
  "reason-database-design": "I can now demonstrate schema and query trade-offs.",
  "item-evidence-api-design": "API-specific evidence: versioned contract migration.",
  "item-evidence-database-design": "Database-specific evidence: zero-downtime schema rollout.",
  idpId: "idp-minh-1", actionId: "act-aws-1", timing: "Next 1:1"
}, { competencies: ["API Design", "Database Design"], evidence: ["Architecture note: orders-event-lab"] });
state = JSON.parse(storage["enpath-demo-v7"]);
const multiRequest = state.reassessmentRequests.find(request => request.id !== "req-minh-1" && request.items?.length === 2);
assert(multiRequest?.items.find(item => item.competency === "API Design")?.itemEvidenceNote.includes("API-specific"), "Competency-specific API Evidence note was not preserved");
assert(multiRequest?.items.find(item => item.competency === "Database Design")?.itemEvidenceNote.includes("Database-specific"), "Competency-specific Database Evidence note was not preserved separately");
let evidenceManager = boot("manager", "assessment-requests");
evidenceManager.submit("more-evidence", { requestId: multiRequest.id, message: "Add the production observation and attached review." });
let evidenceEmployee = boot("employee", "my-requests");
evidenceEmployee.submit("add-request-evidence", { requestId: multiRequest.id, message: "Production observation confirms the behavior." }, {}, "review-note.pdf");
state = JSON.parse(storage["enpath-demo-v7"]);
const enrichedRequest = state.reassessmentRequests.find(request => request.id === multiRequest.id);
assert(enrichedRequest.items.every(item => item.evidence.includes("Production observation confirms the behavior.") && item.evidence.includes("review-note.pdf")), "Resubmitted Evidence did not update every unresolved Competency item");
evidenceEmployee = boot("employee", "my-requests");
evidenceEmployee.click("cancel-request", { request: multiRequest.id });
evidenceEmployee.click(`confirm-cancel-request:${multiRequest.id}`);
state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.reassessmentRequests.find(request => request.id === multiRequest.id).status === "Cancelled" && state.reassessmentRequests.find(request => request.id === multiRequest.id).items.every(item => item.status === "Cancelled"), "Employee could not close a resubmitted multi-Competency request consistently");

let teamAdmin = boot("hr", "teams");
assert(teamAdmin.app.innerHTML.includes("There is no separate Department layer"), "Team workspace did not lock the no-Department wording");
teamAdmin.submit("team", {
  id: "", name: "PDO", description: "Product delivery organization represented as one Team.", managerId: "luc", status: "Active"
}, { enabledRoleIds: ["backend-engineer", "frontend-engineer", "mobile-engineer"] });
teamAdmin = boot("hr", "users");
teamAdmin.submit("member", { name: "Vy Tran", email: "vy@enpathlabs.com", teamId: "pdo", type: "Employee", roleId: "frontend-engineer", level: "L1" });
teamAdmin = boot("hr", "frameworks");
teamAdmin.submit("framework", { teamId: "pdo", template: "Engineering Core", scale: "1.1" });

let employeePlan = boot("employee", "my-idp");
employeePlan.submit("plan-review-request", { idpId: "idp-minh-1", question: "Is this Evidence plan focused enough?" });
let managerPlan = boot("manager", "development-plans");
managerPlan.submit("manager-idp", { employeeId: "an", title: "Strengthen API foundations", competency: "API Design", targetDate: "2026-11-30" });
managerPlan.submit("plan-review-decision", { idpId: "idp-minh-1", comment: "Focused and useful; add the failure-injection result." });
state = JSON.parse(storage["enpath-demo-v7"]);
const reviewedAction = state.idps.find(idp => idp.id === "idp-minh-1").actions.find(action => action.title === "Run failure injection review");
employeePlan = boot("employee", "my-idp");
employeePlan.submit("idp-action", {
  id: reviewedAction.id, title: reviewedAction.title, type: reviewedAction.type, competency: reviewedAction.competency,
  deadline: reviewedAction.deadline, status: "Done", textEvidence: "Added the post-review production observation.",
  linkEvidence: "https://example.test/failure-results"
});

let reviewer = boot("reviewer", "review-invitations");
reviewer.submit("contextual-response", { reviewId: "review-1", response: "I observed Minh explain retry and idempotency trade-offs during Project Atlas.", acknowledged: "on" });

let managerDecision = boot("manager", "assessment-requests");
managerDecision.submit("accept-request", { requestId: "req-minh-1", deadline: "2026-08-29" });
state = JSON.parse(storage["enpath-demo-v7"]);
const reassessmentAssessment = state.assessments.find(item => item.id === state.reassessmentRequests.find(request => request.id === "req-minh-1").assessmentId);
assert(reassessmentAssessment?.status === "Active" && reassessmentAssessment.selfStatus === "Assigned", "Accepted Reassessment did not create the required focused Self-Assessment");
employeeAssessment = boot("employee", "my-assessments");
employeeAssessment.submit("self-assessment", {
  assessmentId: reassessmentAssessment.id,
  "score-0": "3", "evidence-0": "Failure-mode design and load-test observations"
});
managerDecision = boot("manager", "assessments");
managerDecision.click("open-assessment", { assessment: reassessmentAssessment.id });
managerDecision.click("set-manager-score", { index: "0", score: "3" });
managerDecision.click("complete-assessment");
state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.reassessmentRequests.find(request => request.id === "req-minh-1").status === "Ready for Decision", "Completed focused Assessment did not make the Reassessment decision-ready");
managerDecision = boot("manager", "assessment-requests");
managerDecision.submit("reassessment-decision", {
  requestId: "req-minh-1", itemId: "req-minh-1-distributed-systems", finalRating: "3",
  criteria: "Demonstrates production-like failure-mode reasoning.",
  recognizedEvidence: "Event processing design note; load-test results.",
  rationale: "Evidence supports independent Level 3 proficiency.",
  nextAction: "Apply the same reasoning in the next production design review."
});

state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.roles.some(role => role.name === "Platform Engineer"), "Role mutation did not persist");
assert(state.ratingScales.find(scale => scale.status === "Active").points.length === 5, "Rating Scale content version changed the fixed five-level shape");
assert(state.users.some(user => user.email === "lan@enpathlabs.com" && user.teamId === "backend" && user.role === "Backend Engineer" && user.level === "L1"), "Member creation did not persist a valid Team Role + Level assignment");
assert(state.users.some(user => user.email === "vy@enpathlabs.com" && user.teamId === "pdo" && user.role === "Frontend Engineer"), "Member creation did not support a non-first Team's enabled Role + Level");
assert(state.frameworks.some(item => item.teamId === "pdo" && item.status === "Draft" && item.owner === "Luc Tran" && item.competencyIds.length > 0), "Team Framework creation did not derive Manager, Role scope, and copied Template Competencies");
assert(state.users.find(user => user.id === "minh").level === "L3", "Assignment mutation did not persist");
assert(framework.version === "1.1", "Framework publish did not promote Draft v1.1");
assert(framework.scale === "1.1", "Framework did not adopt the active rating-scale version");
assert(state.assessments.find(item => item.id === "asmt-minh-1").scale === "1.0", "Historical assessment scale snapshot changed");
assert(state.assessments.some(item => item.cycle === "Focused assessment smoke" && item.status === "Completed"), "Assessment did not complete");
assert(state.idps.find(idp => idp.id === "idp-minh-1").actions.some(action => action.title === "Run failure injection review" && action.evidence.length === 3), "IDP evidence mutation failed");
assert(state.reassessmentRequests.some(request => request.items?.length === 2 && request.items.every(item => item.rationale.startsWith("I can now")) && request.status === "Cancelled"), "Multi-Competency Reassessment did not preserve independent item rationale and closure");
assert(state.teams.some(team => team.name === "PDO" && team.enabledRoleIds.length === 3 && team.managerId === "luc"), "Team creation did not persist Manager and enabled Roles");
assert(state.idps.find(idp => idp.id === "idp-minh-1").review?.status === "Reviewed", "Advisory Development Plan review did not preserve Reviewed state");
assert(state.idps.find(idp => idp.id === "idp-minh-1").review?.changesSince === true, "Post-review Development Action edits were not flagged against the reviewed snapshot");
assert(state.idps.some(idp => idp.employeeId === "an" && idp.owner === "An Pham"), "Manager-created Development Plan suggestion did not remain Employee-owned");
assert(state.contextualReviews.find(review => review.id === "review-1").status === "Submitted", "Contextual Reviewer response did not submit");
assert(state.reassessmentRequests.find(request => request.id === "req-minh-1").items[0].result.finalRating === 3, "Independent Reassessment Competency Result was not issued");
assert(state.assessments.find(item => item.id === "asmt-minh-1").scores.find(score => score.competency === "Distributed Systems").manager === 2, "Reassessment Result rewrote the historical completed Assessment snapshot");

teamAdmin = boot("hr", "teams");
teamAdmin.submit("team", { id: "backend", name: "Backend Engineering", description: "Owns backend delivery.", managerId: "luc", status: "Active" }, { enabledRoleIds: ["platform-engineer"] });
state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.teams.find(team => team.id === "backend").enabledRoleIds.includes("backend-engineer"), "Team allowed disabling a Role still assigned to Members");
teamAdmin.submit("team", { id: "backend", name: "Backend Engineering", description: "Owns backend delivery.", managerId: "sofia", status: "Active" }, { enabledRoleIds: ["backend-engineer", "platform-engineer", "technical-lead"] });
state = JSON.parse(storage["enpath-demo-v7"]);
assert(state.assessments.some(item => item.employeeId === "an" && item.status === "Active" && item.scopeReview?.status === "Required"), "Primary Manager change did not freeze pending Assessment responsibility");
teamAdmin.click("resolve-scope-reviews", { team: "backend" });
state = JSON.parse(storage["enpath-demo-v7"]);
const reassignedAssessment = state.assessments.find(item => item.employeeId === "an" && item.status === "Active");
assert(reassignedAssessment.scopeReview?.status === "Resolved" && reassignedAssessment.responsibleManagerId === "sofia" && reassignedAssessment.manager === "Sofia Le", "HR responsibility resolution did not assign the pending Assessment to the new Primary Manager");
teamAdmin = boot("hr", "users");
teamAdmin.submit("assignment", { userId: "minh", teamId: "pdo", role: "Backend Engineer", level: "L3", effective: "2026-08-18", reason: "Cross-Team transfer smoke" });
const movedEmployee = boot("employee", "profile");
assert(movedEmployee.app.innerHTML.includes("Your competency profile starts with completed Official Ratings") && !movedEmployee.app.innerHTML.includes("Latest competency profile"), "Prior-Team Reassessment Result leaked into the Employee's new-Team competency profile");

console.log("En-Path prototype smoke test passed: Team setup, Career Path isolation, Assessment sequencing, Employee-owned Plan review, multi-item Reassessment, scoped Contextual Review, capability surfaces, immutable history, and cross-persona mutations.");
