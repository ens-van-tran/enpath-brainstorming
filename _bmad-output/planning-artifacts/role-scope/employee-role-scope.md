---
title: En-Path Employee Role Scope
role: Employee
status: draft
created: 2026-08-13
updated: 2026-08-13
sources:
  - docs/interviews/quy-employee-performance-review-interview.md
  - .codex-tmp-figjam/native-content.json
  - _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md
  - _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/DESIGN.md
  - _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
feature_flags:
  peer_review:
    state: off
    default: off
    owner: unassigned
    scope: Step 3.1 in full; the peer-feedback evidence type in Step 2.2
    rationale: >-
      Peer workflow is recorded as Outside Current MVP in the story map
      (usm-outside), and source weighting has no slot for a third rating source.
      OFF keeps this document consistent with the recorded scope boundary.
    turn_on_when: Extension decisions 1, 2, and 3 are all resolved.
vault_sync: pending
---

# En-Path Employee Role Scope

This document records the Employee role as a Role → Activity → Step → Detail breakdown. It is a scope artifact, not a UX or experience contract. Where it conflicts with an existing contract, the existing contract still wins until the conflict is explicitly resolved; this document only records the conflict.

The authored scope is preserved verbatim. Annotations are additive: each step carries where it lands in the existing discovery model, what discovery evidence supports it, and an inline `[EXTENDS MODEL]` flag wherever the step goes beyond what the current model already commits to.

## How to read the annotations

| Annotation | Meaning |
|---|---|
| **Maps to** | Existing swimlane stage, story-map backbone column, and release slice this step falls under |
| **Evidence** | Discovery source that independently supports the step |
| `[EXTENDS MODEL]` | The step requires a decision or capability the current model does not yet contain |
| `[FLAG: name — STATE]` | The step is gated behind a feature flag declared in the frontmatter and is only in scope when that flag is ON |

Reference IDs used throughout: swimlane Employee stages `sw-e1`–`sw-e6`, Manager stages `sw-m1`–`sw-m4`, system stages `sw-s1`–`sw-s5`, and story-map backbone columns `usm-b1`–`usm-b8`, all defined in [native-content.json](../../../.codex-tmp-figjam/native-content.json).

## Role definition

The Employee is the individual contributor who owns their own career progression: understanding where they currently stand against a published competency standard, choosing a target role or level, closing the gap through agreed development actions, and producing the evidence that supports a competency verification decision.

The Employee is a rating source but not the accountable decision maker. Employee Score is recorded as a labeled reference series and never substitutes for the recorded Manager Score ([DESIGN.md:227](../ux-designs/ux-enpath-repo-2026-08-12/DESIGN.md#L227), [DESIGN.md:186](../ux-designs/ux-enpath-repo-2026-08-12/DESIGN.md#L186), [EXPERIENCE.md:124](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L124)). Every activity below inherits that constraint.

Validated persona: **Quy**, mid-level engineer targeting SA as his next level, evidence-oriented, currently maintaining a self-authored career roadmap because no formal path exists.

## Feature flags

Some authored scope is real product intent but cannot be committed until a blocking decision is made. Rather than deleting it — which loses the analysis and the discovery evidence behind it — this document gates it behind a named flag. Flag state is declared once in the frontmatter and referenced inline at each gated step.

| Flag | State | Gates | Turn ON when |
|---|---|---|---|
| `peer_review` | **OFF** | Step 3.1 in full; the peer-feedback evidence type in Step 2.2 | Extension decisions 1, 2, and 3 are resolved |

**Reading this document with `peer_review` OFF** — the current state — means: the Employee role has four activities and eight steps, of which seven are committed and one — Step 3.1 — is gated. Activity 3 is partially committed: Step 3.2 stands on its own and does not depend on the flag. Peer review is not in the Employee scope, is not counted in the summary below, and its three extension decisions are deferred rather than blocking. The analysis under Step 3.1 remains in place, marked, so the decision can be reopened without redoing the work.

**To flip the flag,** change `state: off` to `state: on` in the frontmatter and update: the summary table below, the extension register (decisions 1–3 move from deferred to blocking), and the Model changes section. The gated content itself needs no rewriting.

Flag state is a scope decision, not an implementation toggle. It says whether the work is committed, not whether a runtime switch exists.

## Scope summary

Committed scope with `peer_review` OFF:

| Activity | Steps | Primary swimlane coverage | Slice | Extension flags |
|---|---|---|---|---|
| 1 — Explore career path & framework | 2 | `sw-e1`, `sw-e2` | Slice 1 | 2 |
| 2 — Self-assessment & Evidence submission | 2 | `sw-e5` | Slice 2 | 1 committed + 1 gated |
| 3 — Participate in evaluation process | 1 committed, 1 gated | `sw-e6` (partial) | Slice 2 | 3 committed + 3 gated |
| 4 — Track development & Growth actions | 2 | `sw-e3`, `sw-e4` | Slice 1–2 | 3 |

Of the twenty authored details, eighteen are in committed scope and two are gated. Within committed scope, ten sit inside existing model coverage and eight require a decision that has not been made. Activity 3 remains the densest concentration of unresolved extensions even with peer review gated out, because Step 3.2's sign-off mechanics are independent of the flag.

---

## Activity 1 — Explore career path & framework

### Step 1.1 — View personal career path

- **Detail:** View current role, level, and position on the career map
- **Detail:** Explore potential target roles and promotion paths (horizontal/vertical)
- **Detail:** Compare required competencies between current role and target role

**Maps to:** `sw-e1` "View Profile and Select Target" → `sw-s2` "Compare and Generate Gaps"; backbone `usm-b2` and `usm-b3`; Slice 1 — Career Clarity.

**Evidence:** Quy needs "a transparent career roadmap with a checklist and explicit criteria for each level" and currently "has to design his own career roadmap because the company does not provide a sufficiently clear formal path" ([interview §Needs, §Pain Points](../../../docs/interviews/quy-employee-performance-review-interview.md)). He wants to "understand his current level, the conditions he must meet, and when he qualifies for assessment at a higher level."

`[EXTENDS MODEL]` — **Horizontal paths and multiple simultaneous targets.** `sw-e1` assumes the Employee chooses *a* target role or level, singular, and `sw-s2` compares against *the* target metrics. "Multiple career targets" is listed under Outside Current MVP in the story map (`usm-outside`). Exploring horizontal moves alongside vertical promotion means either comparing against several targets at once or a defined explore-then-commit distinction. Neither exists.

`[EXTENDS MODEL]` — **The career map as a navigable surface.** The current model has a published standard (`sw-s1`) and a gap comparison (`sw-s2`), but no representation of the org's role topology — which roles are adjacent to which, and which transitions are supported. A career map with positions and paths is a structural addition, not a view over existing data.

### Step 1.2 — Understand competency requirements

- **Detail:** Access competency dictionary and detailed rating rubrics
- **Detail:** View expected scores, mandatory skills, and weights required for current/target levels

**Maps to:** `sw-s1` "Store Published Metrics" read from the Employee lane; backbone `usm-b1` consumed by `usm-b3`; Slice 0 provides the data, Slice 1 exposes it.

**Evidence:** Quy needs "clear definitions of passing and not passing, supported by data or evidence that members can understand and verify," and cites non-transparent level criteria as a pain point. Transparency of criteria is listed among the factors that would determine whether he trusts or avoids En-Path at all.

The competency dictionary and rubrics already exist on the authoring side: the Shared Level Model gives fixed level columns, each competency supplies its own behavior description per level, and Criteria/Point competencies carry weighted criteria totalling 100% ([EXPERIENCE.md:84–94](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L84-L94)). Expected Score and weights are likewise defined. Exposing them read-only to the Employee is consistent with the model.

`[EXTENDS MODEL]` — **"Mandatory skills."** No blocking or must-have competency concept exists. The current model treats every competency in a matrix as contributing to a weighted Average Gap, with no notion that a specific competency gates level eligibility regardless of the aggregate. Introducing mandatory skills changes readiness from an aggregate judgment to an aggregate plus a checklist of hard gates.

`[EXTENDS MODEL]` — **Employee visibility into weights.** Formula Rules are HR-configured governance content ([EXPERIENCE.md:56](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L56)). Whether source weighting and competency weights are visible to the Employee is a permission decision that has not been made; least privilege is the stated governing constraint but has not been applied to this surface.

---

## Activity 2 — Self-assessment & Evidence submission

### Step 2.1 — Perform self-evaluation

- **Detail:** Rate own competencies against framework criteria during review cycles
- **Detail:** Provide qualitative comments and reflection on personal strengths/weaknesses

**Maps to:** Employee participation in Assessment Cycles; backbone `usm-b5`; Slice 2 — Closed Review Loop.

**Evidence:** Directly supported by the existing model. Both assessment modes are explicitly two-source: in Behavior/Level mode "Employee and Manager independently select a shared level," and in Criteria/Point mode "Employee and Manager independently rate criteria" ([EXPERIENCE.md:90–92](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L90-L92)). Assessment Cycles already track Employee and Manager completion states separately.

**Constraint to carry forward, not a flag:** the resulting Employee Score is a labeled reference series. It contributes to Actual Score only through its configured source weight, it is never presented as the recorded system result, and it must never be substituted when Manager Score is missing. A missing Manager Score renders as `Unknown`, never as the Employee's own rating and never as zero.

`[EXTENDS MODEL]` — **Qualitative comments as a first-class field.** The model carries structured ratings and HR/Manager-authored improvement advice, but no Employee free-text reflection field. Where that text is stored, whether it is visible to the Manager before or only after they submit their own rating, and whether it is retained in version history are all undefined. Ordering matters here: exposing self-comments to the Manager pre-submission risks anchoring the score that the model treats as authoritative.

### Step 2.2 — Manage & submit evidence

- **Detail:** Log work achievements, project deliverables, certifications, or peer feedback as evidence — the first three types are committed; the peer feedback type is `[FLAG: peer_review — OFF]`
- **Detail:** Link evidence items to specific competencies

**Maps to:** `sw-e5` "Request Competency Review" → `sw-s4` "Store Evidence and Request"; backbone `usm-b5`; Slice 2.

**Evidence:** Strongly supported. Quy has "an evidence-oriented and transparency-focused mindset: performance assessments should be supported by measurable results, data, or demonstrated achievements," and names the absence of "a shared tool for managing goals, gaps, evidence, progress, and post-review actions" as a cause of development tracking breaking between checkpoints. He also needs "a shared location that records and tracks the target role, competency gaps, goals, actions, evidence, progress, and checkpoints across review cycles."

Linking evidence to specific competencies is consistent with `sw-s4` centralizing "evidence, rationale, and the event-based review request," and with `sw-m3` assessing that package against a competency.

`[FLAG: peer_review — OFF]` `[EXTENDS MODEL]` — **Peer feedback as an evidence type.** Peer workflow is explicitly Outside Current MVP (`usm-outside`). Accepting peer feedback as an evidence item is a narrower entry point than a full peer-review process, but it still requires deciding who may submit it, whether the subject can see it, and whether it can be attached without the peer's consent. See the consolidated peer-review decision under Step 3.1.

**With the flag OFF,** evidence types are achievements, project deliverables, and certifications. This does not prevent an Employee from describing peer recognition inside a free-text achievement — it only means peer feedback is not a structured, attributed evidence type with its own submission path and permissions. That distinction matters: free text carries no claim of provenance, so it does not inherit the consent and visibility questions above.

`[EXTENDS MODEL]` — **Evidence permissions.** "Permission detail for raw evidence and private Manager comments is not defined" ([EXPERIENCE.md:249](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L249)). Employee-authored evidence sharpens this: the Employee is the author, so their own read access is not in question, but onward visibility to Managers outside their line, to HR, and to a future staffing-reuse surface (`sw-m4`) is.

---

## Activity 3 — Participate in evaluation process

This activity carries the highest concentration of unresolved model extensions. Both steps introduce mechanics the current model does not contain.

With `peer_review` OFF, this activity contributes one committed step (3.2) to the Employee scope. Step 3.1 is retained below as gated analysis.

### Step 3.1 — Provide peer feedback (Peer Review)

> `[FLAG: peer_review — OFF]`
>
> **This entire step is gated and is not in committed Employee scope.** Nothing below is a commitment; it is the recorded analysis of what accepting this step would require, kept so the decision can be reopened without redoing the work.
>
> **Scope when OFF:** the Employee is a rating source for their own assessment only. They receive no review requests, evaluate no peers, and the evaluation process remains two-source — Employee and Manager. Activity 3 reduces to Step 3.2.
>
> **Scope when ON:** everything described below enters scope, and extension decisions 1, 2, and 3 become blocking prerequisites rather than deferred ones. Turning the flag on also requires the story-map and swimlane updates listed under Model changes.
>
> **Cost of leaving it OFF:** a documented gap against persona expectation. Quy explicitly expects multi-source evaluation. Gating this step keeps the model coherent but does not make his need go away, and it should be surfaced as a known limitation rather than treated as resolved.

**Maps to:** No existing swimlane stage. The Employee lane runs `sw-e4` "Execute and Follow Up" → `sw-e5` "Request Competency Review" with no intermediate stage, and no Manager stage assigns reviewers. This step would require a new Employee lane stage and a new Manager lane action.

**Evidence:** Well-grounded in discovery, and simultaneously excluded from the current MVP. Quy expects "a performance assessment that combines input from the direct manager, project manager, peer reviewers, and demonstrated work outcomes," and that "peer reviewers who have meaningful working interactions with the member" — suggesting "a minimum reviewer pool, for example approximately five people, to reduce the effect of a very small sample."

`[EXTENDS MODEL]` — **Peer workflow is listed under Outside Current MVP** (`usm-outside`, alongside advanced org analytics, HRIS/LMS integrations, multiple career targets, competency-metric versioning, and AI-generated recommendations). Adding it reverses a recorded scope boundary. That is a legitimate product decision, but it is a reversal rather than an elaboration, and the story map should be updated rather than left contradicting this document.

`[EXTENDS MODEL]` — **Source weighting has no slot for a peer score.** Employee and Manager source weights total 100% ([EXPERIENCE.md:99–105](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L99-L105)), demoed at 30/70. A third rating source cannot be added without reopening the formula: either peer input is weighted and the totals are redefined, or peer input is qualitative-only and never enters Actual Score. These produce very different products. The second reading is far closer to the existing model and is the safer default until decided.

`[EXTENDS MODEL]` — **Anonymity and accountability are unresolved by the persona himself.** Quy articulates the trade-off without settling it: anonymity "enables candor but can weaken responsibility," while disclosed identities "create accountability but may affect working relationships." He asks that "negative feedback should require evidence and a validation mechanism to prevent arbitrary or personal criticism." He also notes that differing team sizes make peer results hard to compare — "a four-person project does not provide the same evaluation sample as a forty-person project." A minimum reviewer count interacts badly with small teams: the floor of five may be unreachable, and the fallback is undefined.

**Note on "requests assigned by Manager":** this presumes reviewer assignment is a Manager responsibility. Reviewer assignment is already listed as an open question in the story map (`usm-open`), so this detail resolves an open decision by assertion. Recording it here as the intended answer is fine; it should be promoted into the open-decision register rather than left implicit.

### Step 3.2 — Review evaluation results

- **Detail:** View final assessment scores, manager feedback, and gap analysis
- **Detail:** Acknowledge/sign-off on final assessment results

**Maps to:** `sw-s5` "Store Verification and Update State" → `sw-e6` "Use Updated Profile"; backbone `usm-b6`; Slice 2.

**Evidence:** Quy needs "a persistent record of feedback, review outcomes, and improvement areas instead of verbal-only discussions, allowing both sides to refer back to prior review commitments," and cites feedback that is "communicated verbally without a durable record" as creating risk that expectations shift between cycles. Viewing results and gap analysis is well supported.

The underlying analytics exist. Member Insight already explains "Self, Manager, Actual, Expected, Gap, source weighting, and configured improvement guidance" ([EXPERIENCE.md:62](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L62)) — but as an HR/Manager analytics surface, not an Employee-facing one.

`[EXTENDS MODEL]` — **Employee-facing results surface and its redaction rules.** Reusing Member Insight for the Employee requires deciding what is withheld. Private Manager comments are explicitly undefined in permission terms. Coverage, comparison basis, and framework version must still be stated wherever a score appears, and `Unknown` must remain visually and semantically distinct from a zero or a shortfall.

`[EXTENDS MODEL]` — **No acknowledgement or sign-off state exists.** Assessment Cycle states are Draft, generated, Employee pending, Manager pending, partially complete, complete, cancelled, and stale framework warning ([EXPERIENCE.md:139](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L139)). None represents Employee acknowledgement. Adding one raises questions the model cannot currently answer: is sign-off blocking or informational; what happens on refusal; does an unacknowledged result still flow to `sw-m4` for staffing reuse; and is the acknowledgement itself an audit event.

`[EXTENDS MODEL]` — **Sign-off is adjacent to dispute handling.** "Rejected evidence and disputes" is already an open decision (`usm-open`). A sign-off affordance without a defined disagreement path invites the Employee to withhold acknowledgement as the only available form of objection, which is a poor substitute for an actual dispute mechanism.

---

## Activity 4 — Track development & Growth actions

### Step 4.1 — Create & execute Individual Development Plan (IDP)

- **Detail:** Set personal development goals based on identified skill gaps
- **Detail:** Create specific action items (e.g., courses, side projects, mentorship) with target deadlines

**Maps to:** `sw-e3` "Agree on Roadmap" → `sw-s3` "Persist Roadmap and Status History"; backbone `usm-b4`; Slice 1 — Career Clarity.

**Evidence:** Well supported and central to the product promise. Quy expects "practical, work-related recommendations that prioritize learning resources and project opportunities; each gap should lead to an assignment, practice behavior, learning resource, application opportunity, and evidence of improvement." That sentence is close to a specification of an action item's fields.

The roadmap and next-action concepts already exist. The "IDP" name is new terminology for a structure the model largely has.

**Naming note:** if IDP is adopted, it should replace "roadmap" consistently rather than sit alongside it. Two names for one artifact across scope, UX, and PRD documents is a predictable source of divergence.

`[EXTENDS MODEL]` — **The Employee as sole author of the plan.** `sw-e3` is explicitly joint: the roadmap is agreed with the Manager after a 1:1, and `sw-m2` has the Manager co-owning it. "Create personal development goals" reads as Employee-authored. Whether the IDP is Employee-owned with Manager visibility, or jointly owned and requiring agreement, changes the permission model and the confirmation flow. The existing model says joint.

`[EXTENDS MODEL]` — **Target deadlines.** The FigJam content rules state plainly: "Do not imply reminders, deadlines, notification channels, an SLA, or a scoring formula" ([native-content.json](../../../.codex-tmp-figjam/native-content.json), `meta.content_rules`). Deadlines on action items contradict that rule directly. A target date that nothing acts on is defensible; a target date that drives a reminder is not, under the current constraint.

`[EXTENDS MODEL]` — **Courses as structured objects.** Learning mapping is manual in Slice 1, and LMS integration is Outside Current MVP. Course action items are therefore free text, not catalogue-linked, unless that boundary moves.

### Step 4.2 — Track progress & Check-ins

- **Detail:** Update status of development action items periodically
- **Detail:** Request check-in sessions or feedback from Manager on growth progress

**Maps to:** `sw-e4` "Execute and Follow Up" → `sw-m2` "Co-Own Roadmap and Follow-Up" → `sw-s3`; backbone `usm-b4`; Slice 1–2.

**Evidence:** Directly supported. `sw-e4` already covers acting, creating evidence, revisiting previous actions, jointly confirming statuses, and agreeing what comes next. Quy needs manager "visibility into targets, gaps, evidence, and progress so assessment uses accumulated context rather than an impression formed at review time" — the core argument for continuous status updates over point-in-time review.

Status updates are the best-supported detail in Activity 4. The joint-confirmation loop between `sw-e4`, `sw-m2`, and `sw-s3` is already fully specified in the swimlane, including the return path that stores confirmed statuses and agreed next actions.

`[EXTENDS MODEL]` — **Requesting a check-in implies a notification channel.** Same constraint as deadlines above: reminders, notification channels, and SLA are all excluded by the content rules, and "SLA and notifications" is an open decision in the story map (`usm-open`). A request that reaches the Manager is a notification. A request that only appears passively in a Manager surface the next time they visit is not, and is compatible with the current constraint — but it is a materially weaker feature and should be described as such rather than left ambiguous.

`[EXTENDS MODEL]` — **"Periodically" is undefined.** The model has no cadence concept outside Assessment Cycles. Whether status updates are expected on a rhythm, and whether a stale action item is surfaced as such, is unspecified.

---

## Consolidated extension register

Ten decisions were surfaced. With `peer_review` OFF, **seven are blocking** and three are deferred with the flag. Ranked by blast radius:

### Blocking — must be resolved before this scope goes to PRD

| # | Decision | Activity | Blocks | Why it matters |
|---|---|---|---|---|
| 4 | Is Employee sign-off blocking or informational, and what happens on refusal? | 3.2 | Assessment Cycle states, audit log | No state exists; refusal path undefined; entangled with the open dispute decision |
| 5 | What is redacted on the Employee-facing results surface? | 3.2 | Member Insight reuse, permissions | Private Manager comments explicitly undefined; least privilege not yet applied here |
| 6 | Do deadlines and check-in requests imply notifications? | 4.1, 4.2 | Action items, Manager surfaces | Content rules forbid implying reminders, deadlines, notification channels, or SLA |
| 7 | Is the IDP Employee-owned or jointly owned? | 4.1 | Permissions, confirmation flow | Existing model says joint; the authored wording reads as personal |
| 8 | Single target role, or horizontal and vertical exploration? | 1.1 | Gap comparison, career map | Multiple career targets currently Outside MVP; comparison assumes one target |
| 9 | Do mandatory skills gate level eligibility? | 1.2 | Readiness logic, gap aggregation | Turns readiness from weighted aggregate into aggregate plus hard gates |
| 10 | Is competency weighting visible to the Employee? | 1.2 | Permissions | Formula Rules are HR governance content; Employee visibility undecided |

Decisions 4–5 are one cluster and should be settled together. Decision 6 recurs in two steps and is the cheapest to settle.

### Deferred — gated behind `peer_review`

These three are not blocking while the flag is OFF. They become blocking prerequisites the moment it is turned ON, and they must be resolved as a set: answering any one of them alone leaves the other two incoherent.

| # | Decision | Activity | Blocks | Why it matters |
|---|---|---|---|---|
| 1 | Does peer input enter Actual Score, or is it qualitative-only? | 3.1 | Formula Rules, Member Insight, all analytics | Reopens the Employee/Manager 100% source weighting; changes what every score means |
| 2 | Is peer review in or out of MVP? | 3.1, 2.2 | Story map scope boundary | Reverses a recorded Outside-MVP decision |
| 3 | Peer anonymity vs. accountability, and minimum reviewer count | 3.1 | Peer surfaces, small-team fallback | Persona raises it and explicitly does not resolve it; unreachable floor on small teams |

Decision 2 is the flag itself. Decisions 1 and 3 only have meaning once it resolves to "in."

## Model changes implied if the committed scope is accepted

With `peer_review` OFF, these existing artifacts become inaccurate and need updating:

- **Cross-Role Swimlane** — the Employee lane needs an acknowledgement stage after `sw-e6`. No peer-review stage and no Manager reviewer-assignment action are required.
- **User Story Map** — "Multiple career targets" moves out of `usm-outside` if decision 8 allows horizontal exploration. "SLA and notifications" moves out of `usm-open` once decision 6 resolves. **"Peer workflow" stays in `usm-outside`, and this document no longer contradicts it.**
- **EXPERIENCE.md** — Assessment Cycle states gain an acknowledgement state; Information Architecture gains Employee-facing surfaces. Source weighting is unchanged and stays at Employee + Manager = 100%.
- **native-content.json `meta.content_rules`** — the prohibition on implying deadlines and notification channels is contradicted by Steps 4.1 and 4.2 and must be relaxed or the steps rescoped.

Additionally required **only if `peer_review` is turned ON:**

- **Cross-Role Swimlane** — a new Employee peer-review stage between `sw-e4` and `sw-e5`, plus a Manager reviewer-assignment action, with the connector count rising accordingly.
- **User Story Map** — "Peer workflow" moves out of `usm-outside`; "reviewer assignment" moves out of `usm-open`.
- **EXPERIENCE.md** — source weighting gains a third source, or an explicit statement that peer input is unweighted and never enters Actual Score.

Keeping the flag OFF removes one swimlane stage, one Manager action, and the entire source-weighting change from the near-term model work. That is the practical reason to leave it off until decisions 1–3 are actually made, rather than the scope-hygiene reason.

## Explicitly out of scope for the Employee role

Carried forward from the existing model, unchanged by this document:

- Authoring or editing competency definitions, level models, matrices, or formula rules. These are HR and scoped-Manager owned.
- Making or overriding a competency verification decision. `sw-m3` is Manager-owned and auditable.
- Viewing other employees' scores, gaps, or evidence. With `peer_review` OFF this is absolute; turning the flag ON would create the first exception.
- Evaluating peers, and receiving peer review requests — gated by `peer_review`, currently OFF.
- User and access administration, which belongs to Super Admin.
- Automatic promotion, compensation, or talent decisions. Analytics explains gaps; humans decide ([EXPERIENCE.md:181](../ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md#L181)).

## Open questions beyond the extension register

- Initial profile source is still unresolved (`usm-open`). Activity 1 assumes the Employee already has a populated competency profile to view; nothing yet says where the first one comes from.
- Quy identified SA as his target role but "did not yet describe the specific competency milestones and evidence required to reach it." A worked end-to-end example for one target role would validate Activities 1, 2, and 4 together and is currently missing.
- With `peer_review` OFF, evaluation remains two-source while the only interviewed Employee expects four (direct manager, project manager, peers, work outcomes). This is a known, deliberate gap rather than an oversight, but it is untested: no one has asked Quy whether a two-source evaluation he can inspect and contest would satisfy the fairness concern that led him to ask for peer input in the first place. That question is cheaper to answer than building peer review.
- Only one Employee interview exists. Quy is mid-career, tech-savvy, and unusually evidence-oriented. The PVB targets "early-career, mid-career, and experienced employees, both tech-savvy and non-tech-savvy." This scope is likely biased toward his profile, particularly Activity 2's evidence-heavy workflow.

## Manual notes
