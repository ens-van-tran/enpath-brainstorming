---
title: 'Career Path and Target Gap Prototype Slice'
type: 'feature'
created: '2026-08-16'
status: 'done'
review_loop_iteration: 0
baseline_commit: '6ebb4669d5c8f0ba8c32d60d94c2a0d016728363'
context:
  - '_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/feature-spec.md'
  - '_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/prd.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current clickable prototype uses an older transition model and its default Login As gateway opens disconnected HR and Employee pages. It does not demonstrate the confirmed MVP flow in which HR publishes a versioned Career Path and an Employee selects a reachable Target Position to compare semantically safe competency gaps.

**Approach:** Rebaseline the existing dependency-free shared prototype around one connected Career Path slice: HR edits and publishes Career Positions and reachable transitions, then Employee uses the same persisted state to select or clear one Target Position and inspect current-versus-target expectations.

## Boundaries & Constraints

**Always:** Use the integrated `hr-admin.html` and `employee.html` entries with shared persisted demo state. Represent a Career Position as Role + Level plus target-expectation source. Preserve Published Career Path Revisions, expose only published Target Ready positions to Employees, and distinguish numeric gaps from `Unknown`, `Not Configured`, and `Not Comparable`. Target selection is Employee-controlled and creates no approval, vacancy, promotion, staffing, compensation, or company commitment. The Employee path must render as a polished visual tree with clear hierarchy, clean connectors, and distinct current, reachable, selected, locked, not-ready, and unavailable states; mobile becomes an equally legible vertical tree rather than a plain card list.

**Ask First:** Adding network dependencies; replacing the current visual language; expanding this slice into Assessment, Development Plan, Reassessment, or Capability rewrites; changing the canonical planning artifacts.

**Never:** Infer reachability from level order, mutate a Published Career Path Revision in place, treat missing ratings as zero or Level 1, blend scores, add a Manager approval step, or remove existing non-Career prototype routes.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|---------------|---------------------------|----------------|
| Configure path | HR opens a Working Draft and edits Positions, expectation sources, and transitions | Draft changes persist without changing the live Employee path | Duplicate Position, self-loop, duplicate edge, inactive source, and incomplete expectation show exact blockers |
| Publish path | Working Draft has at least one valid Position and no broken transitions | Create an immutable Published Career Path Revision and make it current | Invalid draft remains editable; current Published Revision stays live |
| Select target | Employee has a mapped current Position and reachable Target Ready destinations | Employee selects, changes, or clears exactly one Target Position without approval | Unreachable or not-ready Position cannot be selected and explains why |
| Compare gaps | Target Competencies include comparable, unrated, missing-expectation, and customized examples | Show numeric gap, `Unknown`, `Not Configured`, or `Not Comparable` per competency with no blended score | Never invent a rating or silently omit non-comparable rows |
| Superseded target | A new Published Revision removes reachability or readiness | Existing selection becomes `Unavailable`; history remains understandable | No automatic replacement target or rating mutation |
| Demo entry | User selects HR or Employee from Login As | Opens the connected shared-state persona page | Direct-file and local-server use remain functional |

</frozen-after-approval>

## Code Map

- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- shared seed domain, persistence, Career configuration, publication, Employee comparison, and interactions.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css` -- graph, readiness, comparison-table, status, responsive, and accessibility styling.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/demo-session.js` -- Login As destinations for the connected persona entries.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- route, persistence, publication, selection, gap semantics, and historical-integrity regression checks.
- `_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md` -- updated behavioral contract for this rebaselined slice.

## Tasks & Acceptance

**Execution:**
- [x] `enpath-app.js` -- replace transition-only Career state with versioned Working Draft and Published Revision behavior while migrating/resetting old demo state safely.
- [x] `enpath-app.js` -- implement HR readiness, publish impact, Position/transition editing, Employee target selection, target unavailability, and four-state gap rendering.
- [x] `enpath.css` -- add intentional desktop/mobile presentation for the configuration workbench and comparison view without regressing the existing shell.
- [x] `demo-session.js` -- route HR and Employee Login As cards to the integrated shared-state entries.
- [x] `prototype-smoke-test.js` -- cover the edge-case matrix and preserve existing cross-persona regression checks.
- [x] `EXPERIENCE.md` -- record the new Career Path semantics and gateway ownership.

**Acceptance Criteria:**
- Given HR publishes a valid Career Path revision, when Employee opens My Career Path, then the same persisted revision and only its reachable Target Ready Positions are visible.
- Given a target contains mixed competency comparability states, when Employee opens target comparison, then every row displays the correct numeric or named semantic state without a blended score.
- Given the current target becomes invalid in a later revision, when Employee revisits the path, then the target is labeled `Unavailable` and prior revision context remains preserved.
- Given desktop and mobile widths, when the workbench and comparison render, then controls remain operable, labels have non-color equivalents, and no content overlaps.
- Given the Employee opens My Career Path, when the published graph renders, then the visual tree communicates direction and state at a glance without relying on color alone.

## Design Notes

Keep the existing deep-ink and warm-paper language, but make the Career Path feel like a crafted growth tree rather than an org chart. Use generous branch spacing, labeled connectors, editorial node cards, a subtle atmospheric canvas, and restrained reveal motion. Pink/coral marks blocked configuration, blue identifies published information and target expectations, teal marks the current Position, and amber marks draft or readiness attention.

## Verification

**Commands:**
- `node --check _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js` -- expected: JavaScript parses.
- `node _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js` -- expected: all Career Path and existing regression assertions pass.

**Acceptance verification:**
- Published revision persistence and reachable Target Ready filtering pass in the smoke test.
- Numeric, `Unknown`, `Not Configured`, and `Not Comparable` target-gap states render independently with no blended score.
- Superseded Target Position remains snapshotted and renders as `Unavailable` after a later publication.
- Desktop and mobile screenshots show operable controls, non-color state labels, connected hierarchy, and no overlap.
- Malformed cyclic drafts are surfaced as publish blockers; the current Published Revision remains live.

## Suggested Review Order

**Employee growth experience**

- Start with the connected tree, explicit state hierarchy, and target actions.
  [`enpath-app.js:698`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L698)

- Review semantic gap states, unavailable context, and selection history together.
  [`enpath-app.js:680`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L680)

**Historical trust and validation**

- Inspect migration normalization and immutable snapshot enrichment first.
  [`enpath-app.js:280`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L280)

- Confirm publish blockers cover malformed edges, states, expectations, and cycles.
  [`enpath-app.js:375`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L375)

- Verify comparison checks competency criteria and rating-scale provenance independently.
  [`enpath-app.js:405`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L405)

- Follow immutable revision publication and preserved Target Position consequences.
  [`enpath-app.js:1105`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1105)

**HR configuration flow**

- Review readiness, Employee impact preview, and Published Revision history.
  [`enpath-app.js:572`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L572)

- Inspect locked Position identity and snapshotted expectation-source editing.
  [`enpath-app.js:802`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L802)

- Verify persisted Position metadata cannot mutate global Template behavior.
  [`enpath-app.js:1080`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js#L1080)

**Presentation and integration**

- Inspect the crafted desktop tree, state styling, and connector controls.
  [`enpath.css:240`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L240)

- Confirm mobile preserves one connected vertical growth tree.
  [`enpath.css:360`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath.css#L360)

- Check Login As routes retain shared direct-file fallback state.
  [`demo-session.js:5`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/demo-session.js#L5)

**Verification and contract**

- Run the regression chain covering migration, history, semantics, and cross-persona mutations.
  [`prototype-smoke-test.js:133`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js#L133)

- Finish with the updated cross-persona behavioral contract.
  [`EXPERIENCE.md:59`](../planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L59)
