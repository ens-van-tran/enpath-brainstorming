---
title: 'En-Path Full Prototype and Documentation Refresh'
type: 'feature'
created: '2026-08-17'
status: 'done'
review_loop_iteration: 0
baseline_commit: '6ebb4669d5c8f0ba8c32d60d94c2a0d016728363'
context:
  - '_bmad-output/planning-artifacts/briefs/brief-enpath-repo-2026-08-15/brief.md'
  - '_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/prd.md'
  - '_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/feature-spec.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The clickable prototype covers Career Path and parts of the three core personas, but it is behind the approved Brief/PRD. In particular, HR cannot create and manage Teams, several assessment/development/reassessment/capability flows are incomplete, and repository documentation has no maintained static site.

**Approach:** Refresh the shared-state prototype into a coherent MVP walkthrough for HR, Manager, Employee, and Contextual Reviewer; add the missing Team-first organization setup and remaining Brief/PRD workflows; then provide a curated MkDocs site and GitHub Pages build workflow.

## Boundaries & Constraints

**Always:** Use `Organization -> Team -> enabled Organization Roles -> Role Levels -> Members`; there is no Department domain. A Team has one Primary Manager in MVP, may enable multiple reusable Roles, and owns its Team Framework and Team Career Path. Preserve the fixed five-level scale, `Unknown`, separate Self/Official ratings, Employee-owned development, Manager-owned Official Ratings, independent multi-Competency reassessment results, snapshot/history semantics, and current responsive Employee career tree. Reuse one visual/configuration language across HR and Manager scopes. Keep all interactions local and demonstrable with shared browser state.

**Ask First:** Any change that replaces Team scope, adds a new product domain, removes an approved Brief/PRD flow, changes rating/ownership semantics, introduces external services, or commits/pushes repository changes.

**Never:** Add Department, AI recommendations, gamification, promotion approval, staffing, vacancies, compensation, succession, LMS completion, custom rating scales, blended scores, or Obsidian synchronization.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Team setup | HR creates Team, enables Roles, selects Primary Manager, assigns Members | Team becomes available to Framework and Career Path configuration | Incomplete Team saves as draft-like configuration but blocked dependencies are explicit |
| Assigned work changes | Manager/Member changes while Assessment or Reassessment is pending | Historical scope remains; pending work shows responsibility/scope review | Old Manager loses decision rights; no silent reassignment |
| Assessment in progress | Framework expectation/Competency changes after assignment | Assigned snapshot remains unchanged | UI explains changes affect future assignments only |
| Initial vs reassessment | Employee has unrated, incomplete, or rated Competencies | Initial Assessment and Reassessment actions appear per Competency eligibility | Duplicate or invalid items are blocked without converting `Unknown` |
| Multi-item decision | One request contains several Competencies | Manager decides each item independently; parent can be partially decided | Unchanged, pending, and closed siblings remain distinct |
| Documentation build | Local or CI MkDocs build reads curated project docs | Static site builds with working navigation and canonical source links | Strict build fails on broken configuration/navigation |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- shared prototype state, routes, views, validation, and interactions.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css` -- responsive visual system and Employee tree presentation.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- state and workflow regression coverage.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md` -- prototype map and local review instructions.
- `docs/` and `mkdocs.yml` -- curated static documentation site.
- `.github/workflows/docs.yml` -- build and publish workflow.

## Tasks & Acceptance

**Execution:**
- [x] `enpath-app.js` -- add HR Team management, complete organization/library/framework/capability flows, and align wording/state with the PRD.
- [x] `enpath-app.js` -- complete Manager assessment, plan review, resources, contextual review, and independent reassessment decision flows.
- [x] `enpath-app.js` -- complete Employee self-assessment, initial/reassessment eligibility, evidence/action linking, advisory plan review, and result views.
- [x] prototype HTML/CSS -- add Contextual Reviewer entry/workspace and preserve responsive polished UI.
- [x] smoke tests -- cover Team CRUD dependencies, snapshots, permissions, and multi-item decisions.
- [x] docs/config/workflow -- publish a clear product/prototype documentation site through MkDocs and GitHub Pages.
- [x] BMAD/README docs -- mark the refreshed prototype as the current review surface and retire misleading wording.

**Acceptance Criteria:**
- Given HR opens organization setup, when they create a Team, then they can enable existing Roles, choose one Primary Manager, assign Members with valid Role + Level, and continue into Team Framework and Team Career Path configuration.
- Given any persona navigates the prototype, when they follow the approved MVP journeys, then every Brief/PRD capability has a discoverable reviewable screen or explicit governed empty/error state.
- Given an Employee submits multiple Competencies, when the Manager reviews them, then each has separate evidence, reviewer scope, rating, rationale, and status.
- Given the repository is checked locally or in CI, when the smoke suite and strict MkDocs build run, then both complete successfully.

## Verification

**Commands:**
- `node _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- all prototype assertions pass.
- `python -m mkdocs build --strict` -- documentation site builds without warnings.
- `python3 -m http.server 8766 --directory _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups` -- local persona walkthrough is available.

## Suggested Review Order

**Product model and Team scope**

- Start with the shared domain state and current-profile history boundary.
  [`enpath-app.js:522`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L522)

- Review Team setup, Primary Manager, Roles, Members, Framework, and Career Path ownership.
  [`enpath-app.js:636`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L636)

- Confirm the concise, implementation-neutral product model used by the docs site.
  [`product-model.md:3`](../../docs/product-model.md#L3)

**Career Path experience**

- Inspect the Employee Team Career Path tree, target snapshots, and gap semantics.
  [`enpath-app.js:836`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L836)

- Review the responsive visual hierarchy, tree states, connectors, and mobile behavior.
  [`enpath.css:242`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L242)

**Assessment and reassessment integrity**

- Review immutable Team/Criteria filtering before ratings reach the current profile.
  [`enpath-app.js:522`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L522)

- Inspect independent Result authority and focused Assessment sequencing.
  [`enpath-app.js:1326`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1326)

- Confirm completed focused Assessments explicitly unlock item-level decisions.
  [`enpath-app.js:1474`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1474)

- Review multi-item Evidence mapping, resubmission, cancellation, and cross-Team regression coverage.
  [`prototype-smoke-test.js:470`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js#L470)

**Responsibility and permissions**

- Inspect HR's explicit responsibility resolution after Team or Primary Manager changes.
  [`enpath-app.js:1291`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1291)

- Verify the new Primary Manager receives pending Assessment responsibility.
  [`prototype-smoke-test.js:569`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js#L569)

**Review and delivery**

- Follow the persona-by-persona local walkthrough before reviewing individual controls.
  [`prototype.md:3`](../../docs/prototype.md#L3)

- Confirm CI runs prototype regression checks before strict static-site publication.
  [`docs.yml:28`](../../.github/workflows/docs.yml#L28)
