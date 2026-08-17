---
title: 'Team-Scoped Career Path Prototype'
type: 'feature'
created: '2026-08-17'
status: 'done'
review_loop_iteration: 0
baseline_commit: '6ebb4669d5c8f0ba8c32d60d94c2a0d016728363'
context:
  - '_bmad-output/implementation-artifacts/spec-career-path-target-gap-prototype.md'
  - '_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/feature-spec.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current prototype models one organization-wide Career Path, so HR cannot configure independent paths for different Teams and the Role picker is not constrained by Team enablement. This conflicts with the confirmed product decision that each Team owns its own supported career graph.

**Approach:** Replace the singleton Career Path with one Team-scoped Career Path aggregate per Team. HR selects a Team before editing; Positions may use only Organization Roles enabled for that Team, while Employees automatically resolve the current Published Revision from their active Team.

## Boundaries & Constraints

**Always:** A Team owns at most one Career Path aggregate with one Working Draft, immutable Published Revisions, and at most one current Published Revision. Every Position and transition belongs to that Team; Position identity is unique by Team + Role + Level. Organization Roles remain reusable and may be enabled in multiple Teams, but the resulting Career Positions, readiness, edges, revisions, and targets remain independent. Employee path resolution starts from active Team, then Role + Level. Existing Template-version expectation sourcing, target-gap semantics, no-approval behavior, and historical snapshots remain unchanged.

**Ask First:** Changing target expectations from Framework Template versions to Team Frameworks; adding Manager Career Path editing; adding cross-Team transitions or transfer workflows; changing canonical PRD/Feature Spec text.

**Never:** Merge Team paths into an organization fallback; show a Role not enabled in the selected Team; carry a Target Position automatically across Teams; infer cross-Team reachability; mutate another Team's draft or Published Revision; reinterpret Career Path as vacancy, promotion, staffing, compensation, or succession planning.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|---------------------------|----------------|
| Select Team | HR opens Career Path Configuration | Team selector shows path status/version; editor loads only that Team's draft and history | Team with no path shows a create-first-path empty state |
| Add Position | Selected Team has enabled Roles | Role + Level picker contains only enabled Team Roles and their active Levels | Direct submission of another Team's Role is rejected with an exact blocker |
| Publish Team path | Selected Team draft is valid | Only that Team receives a new immutable Revision and current version | Invalid draft leaves that Team's live Revision and every other Team unchanged |
| Employee path | Employee has active Team and mapped Role + Level | Employee sees only the Team's current Published Revision and same-Team targets | No published path or mapping shows Team-specific HR configuration guidance |
| Team change | Employee moves to another Team with an existing target | Destination Team path becomes current; prior target becomes Unavailable and historical | No automatic target replacement, cross-Team lookup, or rating mutation |
| Legacy migration | Existing v6 singleton demo state | Exact singleton path becomes Backend Team path; revisions, draft, selection, and history survive | Empty/draft-only paths for other Teams remain valid and do not trigger reset |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- schema migration, Team role enablement, path accessors, HR configuration, Employee resolution, publication, selection history, and audit behavior.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css` -- Team path selector/status cards, empty states, and responsive configuration layout.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- multi-Team isolation, Role eligibility, migration, Employee Team resolution, and regression coverage.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md` -- prototype contract updated from organization-wide to Team-scoped Career Path ownership.

## Tasks & Acceptance

**Execution:**
- [x] `enpath-app.js` -- introduce schema v7 Team IDs, enabled Role IDs, Team Career Path aggregates, and lossless v6 singleton migration.
- [x] `enpath-app.js` -- scope all Career accessors, validation, mutations, publishing, impact previews, audit events, notifications, and target history by Team.
- [x] `enpath-app.js` -- add HR Team selection/empty states and restrict Position configuration to enabled Team Roles.
- [x] `enpath-app.js` -- resolve Employee Career Path and Target Position strictly through active Team; preserve prior Team target context after reassignment.
- [x] `enpath.css` -- style the Team path workbench and mobile reflow without weakening the Employee growth tree.
- [x] `prototype-smoke-test.js` -- prove two-Team isolation, invalid Role rejection, migration preservation, Team change behavior, and prior Career regressions.
- [x] `EXPERIENCE.md` -- record Team-scoped ownership, selection, publication, and Employee resolution semantics.

**Acceptance Criteria:**
- Given Backend and Frontend have independent Career Paths, when HR edits or publishes one Team, then the other Team's draft, current Revision, and history remain byte-for-byte unchanged.
- Given HR configures a Team path, when adding a Position, then only Organization Roles enabled in that Team are available and server-side prototype validation rejects any bypass.
- Given an Employee opens My Career Path, when their active Team changes, then En-Path resolves only the destination Team path and preserves the previous target as Unavailable history.
- Given legacy v6 state, when schema v7 loads, then the prior singleton Career Path and Minh's selection become Backend-scoped without losing revision or expectation snapshots.

## Spec Change Log

- 2026-08-17: Implemented schema v7 Team-scoped Career Paths, lossless legacy migration, Team workbench and eligibility validation, active-Team Employee resolution, responsive UI, and regression coverage.
- 2026-08-17: Review patches prevent cross-Team Position-ID collisions, silent target reactivation, publish-context drift, malformed-v7 data loss, Role/Team rename detachment, and historical target-snapshot loss.

## Design Notes

Keep the existing crafted tree as the Employee centerpiece. HR gains a compact Team path switcher above the workbench showing `Published`, `Draft only`, or `Not configured`; switching Teams changes the entire configuration context, not merely a visual filter. Use stable Team IDs internally and Team names only for display so renames do not detach revisions or selections.

## Verification

**Commands:**
- `node --check _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- expected: JavaScript parses.
- `node _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- expected: Team isolation and all existing prototype regressions pass.

**Manual checks:**
- Switch between Backend, Frontend, Mobile, and Product Design in HR; verify each workbench retains independent content and Role choices.
- Review Employee desktop/mobile after Backend edits; verify the polished tree remains intact and never displays another Team's path.

## Suggested Review Order

**Team-Scoped Domain Spine**

- Start with lossless schema migration and stable Team provenance.
  [`enpath-app.js:301`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L301)

- Review resilient storage fallback before UI behavior.
  [`enpath-app.js:374`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L374)

- Follow active-Team selection and explicit Unavailable semantics.
  [`enpath-app.js:467`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L467)

**HR Configuration And Publication**

- See the Team workbench replacing the organization-wide singleton.
  [`enpath-app.js:645`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L645)

- Verify assignment changes preserve target history without silent reactivation.
  [`enpath-app.js:1138`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1138)

- Inspect isolated publishing, review fingerprints, and immutable invalidation history.
  [`enpath-app.js:1203`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1203)

**Employee Experience**

- Review active-Team empty states, preserved targets, and comparison behavior.
  [`enpath-app.js:757`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L757)

- Confirm explicit reselection handles identical Position IDs across Teams.
  [`enpath-app.js:1210`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1210)

- Check the responsive Team workbench and connected mobile tree.
  [`enpath.css:226`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L226)

**Verification And Contract**

- Read the regression suite covering migration, isolation, and reactivation boundaries.
  [`prototype-smoke-test.js:144`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js#L144)

- Finish with the human-readable Team Career Path prototype contract.
  [`EXPERIENCE.md:18`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L18)
