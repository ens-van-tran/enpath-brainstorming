---
title: En-Path HR Admin Experience
status: final
created: 2026-08-12
updated: 2026-08-13
sources:
  - _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
  - Projects/En-Path/docs/As-is Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Maps - Persona Views.md
  - Projects/En-Path/docs/Customer Journey Maps.md
  - Projects/En-Path/docs/Product Canvas.md
  - Projects/En-Path/docs/PVB.md
  - Projects/En-Path/Catchup business meeting note.md
design: DESIGN.md
---

# En-Path HR Admin Experience

`DESIGN.md` owns visual identity. This file owns information architecture, behavior, states, interactions, accessibility, and journeys. These two UX contracts win on conflict with mocks or working artifacts.

## Foundation

Desktop-first internal enterprise web represented by a standalone HTML prototype that can run locally without network dependencies. It stores demo changes in the browser's local storage; this is prototype persistence, not a production offline-editing contract. The primary actor is Mai Thy, an HR/L&D owner responsible for governing the organization's competency model, preparing assessment cycles, and analyzing employee development gaps.

The final interactive reference is [HR Admin prototype](mockups/hr-admin-prototype.html). It covers every primary navigation surface, live form validation and calculation, Manager correction and HR publication, assessment generation, member/team gap analysis, session version history, and audit events. This experience contract wins if prototype behavior conflicts with it.

The prototype tests a discovery hypothesis, not a validated HR Admin workflow. HR/Admin research is still incomplete. User and access administration belong to Super Admin and remain outside this experience.

### Domain model used by the experience

```text
Shared Level Model
  -> Competency Type
    -> Global or Team Competency
      -> Team + Role + Level Matrix + Version
        -> Employee + Manager Assessment
          -> Weighted Actual Score
            -> Member and Team Gap Analytics
```

- HR Admin defines the Shared Level Model, Competency Types, Global Competencies, and company-wide Formula Rules.
- HR Admin assigns Competency Types to Managers within an approved team/role scope.
- Managers author Team Competencies under assigned types and submit matrices by Team + Role + Level.
- HR Admin may also author competencies directly.
- HR Admin validates, requests changes, schedules, or publishes matrices. HR does not silently edit Manager-owned content.

## Information Architecture

| Group | Surface | Purpose |
|---|---|---|
| Overview | Overview | Entry surface for matrix reviews, assessment readiness, validation blocks, and team gap attention |
| Framework | Competency Types | Create taxonomy; assign type authoring scope to Managers |
| Framework | Competencies | Search and manage HR- and Manager-authored competencies by type, scope, owner, mode, and state |
| Framework | Competency Builder | Define description, owner/scope, assessment mode, shared-level behaviors or weighted criteria, and improvement advice |
| Framework | Level Model | Define one organization-wide three- or five-level vocabulary used by every competency |
| Framework | Formula Rules | Configure source weights, point calculations, gap convention, validation, and live examples |
| Framework | Matrix Reviews | Review Manager submissions, validation findings, version differences, effective dates, and publication state |
| Assessment | Assessment Cycles | Track participant coverage and Employee/Manager completion states |
| Assessment | Generate Assessment | Select team and members, preview mixed-mode assessment, confirm framework snapshot, and generate |
| Analytics | Company Gaps | Rank teams by overall Average Gap; compare detail only on Global Competencies |
| Analytics | Team Gaps | Rank assessed members by Average Gap and inspect strengths, weaknesses, coverage, and competency drivers |
| Analytics | Member Insight | Explain Self, Manager, Actual, Expected, Gap, source weighting, and configured improvement guidance |
| Governance | Version History | Inspect Draft -> Scheduled -> Active -> Superseded -> Archived framework history |
| Governance | Audit Log | Inspect accountable changes, before/after values, actor, reason, and timestamp |

Persistent desktop navigation follows this grouping. Competency Type assignment lives within Competency Types; there is no access-management module.

## Voice and Tone

Use plain, accountable language. State what happened, why, who owns the next action, and what data was used.

When introducing a specialist product or UX term to a non-specialist audience, add a short plain-language explanation in parentheses on first use. Do not repeatedly explain the same term within one surface.

| Do | Don't |
|---|---|
| `Weights total 110%. The Manager must reduce them to 100% before publication.` | `Invalid configuration.` |
| `Unknown - Manager assessment is incomplete.` | `Score: 0` |
| `Ready to publish on 1 September 2026.` | `Looks good!` |
| `Advice configured by HR/L&D for Communication.` | `AI suggestion` |
| `Actual Score uses Employee 30% and Manager 70%.` | `Combined score` |

## Governance and Calculation Rules

### Shared Level Model

HR defines either three or five shared levels. Names and count are common to all competencies. Each competency provides its own behavior description for every shared level.

### Assessment modes

- **Behavior/Level:** Employee and Manager independently select a shared level using competency-specific behavior descriptions.
- **Criteria/Point:** Employee and Manager independently rate criteria. Criterion weights total 100%; weighted criteria produce the source competency score and mapped level.
- A competency has one active assessment mode at a time. A matrix may mix modes.

The prototype assessment uses `Communication` in Behavior/Level mode and `Technical Delivery` in Criteria/Point mode.

### Source weighting and gap

```text
Actual Score = Employee Score x Employee Weight
             + Manager Score x Manager Weight

Gap = Expected Score - Actual Score
```

Employee and Manager source weights total 100%. The prototype uses Employee 30% and Manager 70% as demo data; this is configurable and is not a committed organizational default.

Unassessed data is `Unknown`, never zero. Average Gap excludes Unknown competencies and must display assessment coverage. Cross-team detail compares Global Competencies only. Team Competencies remain available within team analysis.

## Component Patterns

| Component | Use | Behavioral rules |
|---|---|---|
| App shell | All surfaces | Persistent desktop sidebar; main header states current scope and one primary action |
| Sidebar nav | All surfaces | Grouped navigation; active route and parent group announced; no Super Admin routes |
| Page header | All surfaces | Shows purpose, team/role/level where relevant, framework version, and primary action |
| Button primary | Committed next step | One primary action per surface region; publish/generate actions require a review step |
| Governance card | Overview and summaries | Opens the corresponding register filtered to the represented state |
| Status badge | Registers and headers | Always includes a text label; exposes state definition on focus/hover |
| Data table | Types, competencies, cycles, history, logs | Sort/filter without losing URL/state; numeric columns aligned; row opens detail or side panel |
| Validation panel | Builder and Matrix Reviews | Separates blocking errors from advisories; links each finding to the offending field and identifies content owner |
| Formula builder | Formula Rules and Point mode | Constrained inputs only; totals update live; worked example recomputes after every valid change |
| Level behavior grid | Level Model and Behavior mode | Shared levels are fixed columns; competency behaviors are editable rows; required blanks block submission |
| Stepper | Builder, Matrix Review, Generate Assessment | Completed steps remain revisitable; changing an earlier step invalidates dependent preview where necessary |
| Target fill bar | Analytics | Outline is Expected; fill is Actual; source values and numeric gap remain visible; Unknown renders as labeled neutral state |
| Chart panel | Company, Team, Member analytics | Shows comparison basis and table equivalent; click or keyboard action drills down one level |
| Advice panel | Member Insight | Shows stored guidance, competency, author/owner, and last updated version; no generative framing |
| Side panel | Member and competency drill-down | Retains list/chart context; closes with Esc; returns focus to originating row or bar |

## State Patterns

| Surface | Required states |
|---|---|
| Overview | Loading skeleton; no pending work; pending review; blocking validation; stale assessment coverage; data-load error |
| Competency Types | Empty taxonomy; assigned/unassigned; assignment conflict; archived type; save error |
| Competencies / Builder | Draft; incomplete shared-level behaviors; invalid weights; valid preview; Manager-owned read-only review; archived/versioned competency |
| Level Model | Not configured; three-level model; five-level model; change-impact warning; used model cannot be rewritten in place |
| Formula Rules | Invalid source total; invalid criterion total; valid live preview; no sample data; versioned rule set |
| Matrix Reviews | Submitted; in review; blocked; changes requested; ready; scheduled; active; superseded; overlapping effective date |
| Assessment Cycles | Draft; generated; Employee pending; Manager pending; partially complete; complete; cancelled; stale framework warning |
| Generate Assessment | No published matrix; no eligible members; mixed role/level selection; preview ready; generation error; generated confirmation |
| Company Gaps | No completed data; partial coverage; ranked teams; Unknown team; framework-version mismatch warning |
| Team Gaps | No assessed members; partial member coverage; ranked members; ties; selected member drill-down |
| Member Insight | Complete; Employee-only; Manager-only; Unknown; meets/exceeds expected; positive gap; no configured advice |
| Version History / Audit Log | Empty; filtered results; correction event; permission-limited detail; load error |

## Interaction Primitives

- Click or `Enter` on a register row opens its detail or side panel.
- `Esc` closes the topmost side panel, popover, or dialog and restores focus.
- Filters use explicit Apply and Clear actions on dense analytical registers; selected scope remains visible as chips.
- Builders autosave local draft state but require explicit Submit. Publish and Generate always show a review summary.
- Formula and weight changes update previews after valid input. Invalid input preserves the last valid preview and labels it stale.
- Chart bars support focus and keyboard activation. The same data appears in an adjacent or toggleable table.
- Destructive or history-affecting changes create a new version/correction event; they do not erase used records.

## Accessibility Floor

- WCAG 2.2 AA for the desktop web prototype.
- Every field has a persistent label; placeholder text is never the only label.
- Validation summary receives focus on failed submit and links to each invalid field.
- Tables expose proper headers, sort state, and captions describing scope.
- Charts provide numeric alternatives and do not rely on color. Expected outline, Actual fill, source values, Gap, and Unknown are announced in text.
- Status badges include visible words. Icons are supplementary.
- Focus order follows visual order. Side panels trap focus only while open and restore it on close.
- Formula expressions are accompanied by plain-language explanations and worked examples.
- Motion is limited to short state transitions and respects reduced-motion preferences.

## Responsive and Platform

The prototype targets desktop and laptop browsers at 1280px and above. Between 1024px and 1279px, the sidebar may collapse to an icon rail and secondary analytics columns stack. Below 1024px, the experience is read-only or unsupported for complex authoring in this prototype; no mobile-native workflow is specified.

No dark mode, production offline-editing contract, or notification channel is defined in this run. The prototype file itself remains usable without network dependencies.

## Inspiration and Anti-patterns

- **Chosen:** Policy Desk visual direction from `.working/directions-hr-admin.html`.
- **Chosen:** Register-like information density, visible rule IDs, version metadata, and audit provenance.
- **Rejected:** Spreadsheet imitation as the primary interaction. Tables are used for registers, but authoring is structured and validated.
- **Rejected:** Free-form Excel-like formulas. Formula Rules use constrained configuration.
- **Rejected:** AI-generated competencies or advice. Guidance is authored and versioned by HR or the scoped Manager.
- **Rejected:** Automatic promotion or talent decisions. Analytics explains competency gaps; humans make career decisions.
- **Rejected:** Comparing role-specific Team Competencies across unrelated teams.

## Key Flows

### Flow 1 - Govern the competency language

**Protagonist:** Mai Thy, L&D owner, preparing the August performance review cycle.

1. Mai Thy opens Framework > Level Model and confirms the organization uses five shared levels.
2. She opens Competency Types and reviews `Communication`, `Soft Skills`, and `Hard Skills`.
3. She assigns `Soft Skills` authoring scope to the Software Engineering and Business Analysis Managers.
4. She opens Competencies and creates the Global Competency `Communication`.
5. In Behavior/Level mode, she writes distinct behavior descriptions for all five shared levels and adds an improvement message.
6. **Climax:** The builder preview shows a complete assessment item using the shared level vocabulary and competency-specific behaviors, with no missing-level validation.
7. She submits the competency version for use in new matrices.

Failure path: Level 4 has no behavior description. Submit focuses the validation panel and Level 4 cell; the draft remains saved.

### Flow 2 - Review and publish a Manager matrix

**Protagonist:** Mai Thy, reviewing a Platform Team submission before the PR cycle opens.

1. Mai Thy opens Matrix Reviews and selects `Platform Team / Backend Engineer / L2 / proposed v2.1`.
2. She compares the submission with active v2.0 and sees Global and Team Competencies, modes, weights, expected scores, owners, and advice coverage.
3. Validation reports total competency weight at 110% and identifies Manager ownership.
4. She selects Request changes, writes a reason, and returns the submission without editing its values.
5. The demo advances to a corrected resubmission with total weight 100%.
6. She reviews the effective date and version impact.
7. **Climax:** She publishes v2.1 for 1 September 2026. The UI confirms `Scheduled`; v2.0 remains Active until the effective date, and historical assessments retain their snapshots.

Failure path: The effective date overlaps another scheduled version. Publish is blocked and the conflicting version is linked.

### Flow 3 - Generate a mixed-mode assessment

**Protagonist:** Mai Thy, launching the Platform Team assessment after matrix publication.

1. Mai Thy opens Generate Assessment and selects Platform Team.
2. Eligible members are selected by default; she excludes one member on leave.
3. The system resolves each member's Role + Level to a published matrix and flags anyone without one.
4. She reviews the demo source weighting: Employee 30% / Manager 70%.
5. Preview shows `Communication` in Behavior/Level mode and `Technical Delivery` in Criteria/Point mode for both Employee and Manager.
6. She reviews participant count, framework snapshot, assessment items, and formula summary.
7. **Climax:** She generates the assessment. The confirmation identifies the cycle, selected members, two rating sources, and snapshotted framework versions.

Failure path: A selected member has no published Role + Level matrix. Generation is blocked for that member; Mai Thy may exclude the member or return to framework governance.

### Flow 4 - Find development gaps after assessment

**Protagonist:** Mai Thy, reviewing demo results after Employee and Manager assessments complete.

1. Mai Thy opens Company Gaps and sees teams ranked by overall Average Gap with coverage.
2. She drills into the cross-team Global Competency comparison and identifies Mobile Engineering as the widest shared gap.
3. She opens Team Gaps for Mobile Engineering and sees members ranked by Average Gap; Unknown results are separated.
4. She selects a high-gap member.
5. Member Insight shows Employee Score, Manager Score, weighted Actual Score, Expected Score, and Gap per competency.
6. Target fill bars expose strengths and weaknesses; the numeric table provides the same values.
7. **Climax:** Mai Thy identifies `Communication` as the highest confirmed gap and sees the configured improvement guidance and its owner/version.

Failure path: Manager assessment is incomplete. The competency is `Unknown`, excluded from Average Gap, and coverage explains why the member cannot be fairly ranked on the missing item.

## Assumptions and Open Questions

- **[ASSUMPTION]** Prototype demo source weights are Employee 30% and Manager 70%; HR configures the actual organizational values.
- **[ASSUMPTION]** Strength means Actual Score meets or exceeds Expected Score; weakness means a positive confirmed Gap.
- **[ASSUMPTION]** Criteria/Point scores normalize to the Shared Level Model through an organization-defined mapping. The exact mapping rule is not yet specified.
- Assessment deadlines, reminders, reviewer substitution, cancellation rules, and SLA are outside this prototype.
- HR Admin workload, submission volume, and reporting/export needs still require direct interview validation.
- Permission detail for raw evidence and private Manager comments is not defined; least privilege remains the governing constraint.
