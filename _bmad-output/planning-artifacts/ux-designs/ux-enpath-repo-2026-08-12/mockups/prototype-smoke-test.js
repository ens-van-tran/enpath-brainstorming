"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync(path.join(__dirname, "enpath-app.js"), "utf8");
const storage = {};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function boot(persona, route, options = {}) {
  const listeners = {};
  const app = { innerHTML: "", addEventListener(type, handler) { listeners[type] = handler; } };
  const body = {
    dataset: { persona },
    classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } }
  };
  const summary = { value: "Use the production evidence in the next career conversation." };
  const document = {
    body,
    getElementById(id) { return id === "app" ? app : id === "assessment-summary" ? summary : null; },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    createElement() { return { appendChild() {}, remove() {}, click() {}, style: {} }; },
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

  const runtimeConsole = options.throwStorage ? { log() {}, warn() {}, error: console.error } : console;
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

  return { app, click, submit, window, location };
}

const routes = {
  hr: ["overview", "users", "roles", "categories", "rating-scale", "templates", "frameworks", "career", "audit"],
  manager: ["team-overview", "team-framework", "team-competencies", "team-members", "assessments", "assessment-requests", "development-plans"],
  employee: ["profile", "career-path", "my-assessments", "my-requests", "my-idp", "notifications"]
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
  hr: fs.readFileSync(path.join(__dirname, "hr-admin-prototype.html"), "utf8"),
  employee: fs.readFileSync(path.join(__dirname, "employee-prototype.html"), "utf8")
};

assert(mockupFiles.login.includes('data-login-role="hr"'), "Login As is missing HR Admin");
assert(mockupFiles.login.includes('data-login-role="manager"'), "Login As is missing Manager");
assert(mockupFiles.login.includes('data-login-role="employee"'), "Login As is missing Employee");
assert(mockupFiles.session.includes('hr: "hr-admin-prototype.html"'), "HR Admin login destination is incorrect");
assert(mockupFiles.session.includes('manager: "line-manager.html"'), "Manager login destination is incorrect");
assert(mockupFiles.session.includes('employee: "employee-prototype.html"'), "Employee login destination is incorrect");
for (const [role, html] of Object.entries({ hr: mockupFiles.hr, employee: mockupFiles.employee })) {
  assert(html.includes('href="prototype-theme.css"'), `${role} does not load the Manager design adapter`);
  assert(html.includes("data-demo-logout"), `${role} is missing Logout`);
}
assert(mockupFiles.hr.includes("function openCompetencyModal()"), "HR competency creation does not open the detail modal");
assert(mockupFiles.hr.includes('id="new-score-anchor-4"'), "HR competency modal is missing five-score guidance");
assert(mockupFiles.hr.includes('id="new-rubric-above"'), "HR competency modal is missing role-level expectations");
assert(!mockupFiles.hr.includes("Continue to setup"), "HR competency creation still uses the preliminary setup step");

const managerShell = boot("manager", "team-overview");
assert(managerShell.app.innerHTML.includes("logout-demo"), "Manager is missing Logout");
assert(!managerShell.app.innerHTML.includes("data-switch-persona"), "Manager still exposes direct persona switching");
managerShell.click("logout-demo");
assert(managerShell.location.href === "login.html", "Manager Logout does not return to Login As");

const fallback = boot("employee", "profile", { protocol: "file:", throwStorage: true });
assert(fallback.app.innerHTML.includes("Good morning, Minh"), "Direct-file fallback did not render");
assert(fallback.window.name.startsWith("__ENPATH_DEMO_STATE__"), "Direct-file fallback did not persist in window.name");

let ui = boot("hr", "roles");
ui.submit("role", { id: "", name: "Platform Engineer", family: "Engineering", description: "Builds internal platforms." });
ui.submit("assignment", { userId: "minh", role: "Backend Engineer", level: "L3", effective: "2026-08-15", reason: "Expanded system ownership" });
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
let state = JSON.parse(storage["enpath-demo-v5"]);
const framework = state.frameworks.find(item => item.team === "Backend Engineering" && item.status === "Published");
ui.submit("start-assessment", {
  initialRequestId: "", employeeId: "minh", frameworkId: framework.id, scope: "focused",
  selfOptional: "on", deadline: "2026-08-28", cycle: "Focused assessment smoke"
});
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
  requestId: "", reason: "I can now demonstrate the failure modes and trade-offs.",
  idpId: "idp-minh-1", actionId: "act-aws-1", timing: "Next 1:1"
}, { competencies: ["Distributed Systems"], evidence: ["Architecture note: orders-event-lab"] });

state = JSON.parse(storage["enpath-demo-v5"]);
assert(state.roles.some(role => role.name === "Platform Engineer"), "Role mutation did not persist");
assert(state.users.find(user => user.id === "minh").level === "L3", "Assignment mutation did not persist");
assert(framework.version === "1.1", "Framework publish did not promote Draft v1.1");
assert(framework.scale === "1.1", "Framework did not adopt the active rating-scale version");
assert(state.assessments.find(item => item.id === "asmt-minh-1").scale === "1.0", "Historical assessment scale snapshot changed");
assert(state.assessments.some(item => item.cycle === "Focused assessment smoke" && item.status === "Completed"), "Assessment did not complete");
assert(state.idps.find(idp => idp.id === "idp-minh-1").actions.some(action => action.title === "Run failure injection review" && action.evidence.length === 3), "IDP evidence mutation failed");
assert(state.reassessmentRequests.some(request => request.reason.startsWith("I can now") && request.status === "Submitted"), "Re-assessment request did not submit");

console.log("En-Path prototype smoke test passed: Login As routes, role Logout, 22 integrated routes, direct-file fallback, rating-scale adoption, immutable history, and 6 cross-persona mutations.");
