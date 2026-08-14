---
title: 'Three-Persona Clickable EnPath Prototype'
type: 'feature'
created: '2026-08-13'
updated: '2026-08-14'
status: 'done'
review_loop_iteration: 0
baseline_commit: 'b868f871506d1242a278acb56b1b2078bae28366'
context:
  - '_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The existing artifact is an HR-only prototype based on an outdated governance model. EnPath needs a runnable, high-fidelity demonstration of the connected HR Admin, Line Manager, and Employee experience defined by the user's 2026-08-13 prompt.

**Approach:** Replace the existing UX contract and prototype with three directly openable persona entries backed by shared browser state. Implement the required management, framework, assessment, career, IDP, request, notification, versioning, validation, impact, audit, and demo-control flows as real interactions rather than static screens.

## Boundaries & Constraints

**Always:** Treat the current user prompt as the single source of truth. Provide exactly `hr-admin.html`, `line-manager.html`, and `employee.html` persona entries, plus shared CSS/JavaScript as needed. Persist shared mock updates with `localStorage`; keep all pages usable when opened directly. Seed EnPath Labs, named users, teams, roles, categories, 1–5 scale, published and draft Backend frameworks, Mid-year 2026 data, Minh's completed assessment/gaps/active IDP/re-assessment request, and an unassessed employee. Every important CTA must navigate or cause a visible modal, drawer, toast, timeline, data mutation, validation, version change, or demo state. Preserve historical snapshots when framework or scale versions change. Support desktop and mobile behavior and accessible labels/status text.

**Ask First:** Adding network dependencies, changing canonical artifact locations, or writing directly to an Obsidian vault without the required CLI.

**Never:** Add HR framework approval gates; let HR define all team-detailed competencies; mutate a published historical version in place; represent missing assessments as zero; ship fake buttons, lorem ipsum, decorative-only charts, or persona pages that cannot open independently.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|----------------------------|----------------|
| Shared mutation | Persona creates/updates a domain object | Related lists, detail views, notifications, audit/history, and other persona pages reflect persisted state | Validate required fields and show an actionable message |
| Framework publish | Manager publishes a complete/incomplete draft | Complete draft becomes Published and old version Superseded; incomplete draft stays Draft | Modal lists missing expected scores/guidance and blocks publish |
| Assignment change | HR changes employee role/level | Impact preview identifies framework, manager, assessments, and IDP review impact before save | Prevent save without role, level, effective date, and reason |
| Historical assessment | Framework/scale receives a new version | Completed assessment continues to show its original snapshots | Never rewrite historical score, expectation, or rubric data |
| Empty assessment | Employee has no completed assessment | Profile and assessment views explain the state and offer Request an assessment | Do not render fake gap scores or radar data |
| Re-assessment | Employee submits evidence-linked request and manager acts | Status/timeline/notifications update through More Evidence Needed, Accepted, or Completed flows | Require competency, reason, and evidence when responding to an evidence request |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/hr-admin.html` -- HR Admin direct entry.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/line-manager.html` -- Line Manager direct entry.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/employee.html` -- Employee direct entry.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css` -- shared responsive visual system.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- shared seed data, persistence, rendering, interactions, charts, modals, drawers, toasts, and demo controls.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/DESIGN.md` -- visual and component contract.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md` -- cross-persona IA, workflows, state rules, and coverage matrix.

## Tasks & Acceptance

**Execution:**
- [x] Replace the old HR-only prototype with the three entry pages and shared responsive application shell.
- [x] Implement a versioned localStorage mock domain and cross-persona mutation helpers.
- [x] Implement every required persona navigation surface, drill-down, modal/drawer flow, validation state, chart, timeline, and demo control.
- [x] Rewrite `DESIGN.md` and `EXPERIENCE.md` from the source-of-truth prompt and include a persona/activity/screen coverage matrix.

**Acceptance Criteria:**
- Given any entry file is opened directly, when the user navigates and acts, then the persona shell and all required screens operate without a server or network dependency.
- Given a domain object is created or changed, when a related persona or view opens, then the updated object and corresponding history/notification state are visible.
- Given desktop and mobile widths, when tables, navigation, modals, and career paths render, then they adapt to usable cards, collapsed navigation, full-screen dialogs, and vertical path flow.
- Given the acceptance checklist in the user prompt, when each item is exercised, then a real implemented screen or flow demonstrates it.

## Design Notes

Use an optimistic career-growth visual language: deep ink navigation, warm mist canvas, muted teal progress, amber attention, coral gaps, expressive local serif/sans typography, subtle grid/organic backgrounds, strict data hierarchy, and restrained reveal/state animations. SVG charts must include textual legends and numeric equivalents.

## Verification

**Commands:**
- `node --check .../mockups/enpath-app.js` -- shared application script parses.
- `node .../mockups/prototype-smoke-test.js` -- 22 routes, direct-file fallback, rating-scale adoption, immutable history and cross-persona mutations pass.
- CTA structural assertion -- all 77 literal `data-action` values resolve to handlers.
- Local HTTP server -- all three entries and shared CSS/JavaScript return HTTP 200.
- Browser visual automation was unavailable because no in-app browser backend was connected; responsive behavior is covered by CSS inspection and runtime route rendering.

## Suggested Review Order

**Shared domain and entry architecture**

- Start with persona boundaries, navigation and shared runtime ownership.
  [`enpath-app.js:7`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L7)

- Review the connected EnPath Labs seed and lifecycle-rich demo state.
  [`enpath-app.js:45`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L45)

- Check localStorage validation and direct-file same-tab persistence fallback.
  [`enpath-app.js:201`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L201)

**Governed workflows**

- See dynamic HR adoption evidence and drill-down metrics.
  [`enpath-app.js:328`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L328)

- Inspect Manager-owned framework completeness, scale adoption and version impact.
  [`enpath-app.js:426`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L426)

- Verify publish blocking and destructive version confirmation details.
  [`enpath-app.js:612`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L612)

- Review the full Manager assessment workspace and snapshot context.
  [`enpath-app.js:457`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L457)

- Follow framework-scoped assessment creation and request acceptance timing.
  [`enpath-app.js:871`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L871)

- Inspect configured career readiness without empty-state score leakage.
  [`enpath-app.js:490`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L490)

- Review IDP status, Kanban actions and evidence linkage.
  [`enpath-app.js:531`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L531)

- Confirm audit filters produce a real downloadable CSV.
  [`enpath-app.js:684`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L684)

**Visual system and responsive behavior**

- Review the growth-oriented token palette and typography foundation.
  [`enpath.css:1`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L1)

- Check mobile navigation, card tables, full-screen modals and vertical career flow.
  [`enpath.css:278`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L278)

**Documentation and verification**

- Use the prompt-derived persona-to-flow coverage matrix as the acceptance map.
  [`EXPERIENCE.md:94`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L94)

- Run the dependency-free route and cross-persona regression harness.
  [`prototype-smoke-test.js:79`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js#L79)
