---
title: En-Path HR Admin Experience
status: final
created: 2026-08-12
updated: 2026-08-13
sources:
  - _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
  - Projects/En-Path/docs/As-is Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Map - Manager.md
  - Projects/En-Path/docs/Product Canvas.md
  - Projects/En-Path/docs/PVB.md
  - Projects/En-Path/docs/Persona.md
design: DESIGN.md
---

# En-Path HR Admin Experience

`DESIGN.md` owns visual identity. This file owns information architecture, behavior, states, interactions, accessibility, and journeys. These UX contracts win on conflict with mocks.

## Foundation

En-Path is a desktop-first internal web prototype for HR Admin competency governance and skill-gap reporting. The primary actor is the role-based HR Admin, who maintains reusable competencies, delegates scoped Manager responsibility, organizes competencies into role templates, and analyzes existing assessment results.

Managers may compose a template only within their assigned team, role, and Category scopes. HR may also compose templates and is responsible for making the approved result Public. Employee self-assessment remains reference evidence; Manager Score is the result recorded by the system.

The final interactive reference is [HR Admin prototype](mockups/hr-admin-prototype.html). The actor/system exchange is documented in [HR Admin sequence diagram](hr-admin-sequence-diagram.md).

### Domain model

```text
Shared Level Model
  -> Competency Pool
  -> Category
    -> one or more Role Manager scopes
      -> Framework Template
        -> Draft or Public
          -> Assessment Reports
            -> Manager Score (recorded)
            -> Employee Score (reference)
              -> Gap analytics
```

- HR maintains one flat Competency Pool. A competency is not permanently classified by a type.
- HR defines a shared three- or five-level model.
- Every competency has a behavior and improvement advice for each active shared level.
- HR creates Categories and assigns each Category to one or more active Role Manager scopes.
- HR or an assigned Manager selects relevant Pool competencies within each Category to compose a Framework Template.
- A valid template moves directly from Draft to Public; there is no separate Framework Review surface.
- The HR prototype reports assessment activity but does not generate assessments.
- Audit Log records consequential actions. There is no separate Version History route.

### Recorded score and gap

```text
Recorded Score = Manager Score
Gap = Expected Score - Manager Score
```

Employee Score is reference-only. It may appear beside Manager Score to expose perception differences, but it never changes the recorded score, gap, ranking, or aggregation.

If Manager Score is missing, the result is `Unknown` even when Employee Score exists. Average Gap and rankings exclude `Unknown` and expose Manager-score coverage.

## Information Architecture

| Group | Surface | Purpose |
|---|---|---|
| Overview | Overview | Show competency, Category, Public-template, and highest-team-gap summaries |
| Framework | Competencies | Manage the Pool and Categories through two tabs; create and edit competency behaviors |
| Framework | Level Model | Define the shared three- or five-level vocabulary |
| Reports | Assessment Reports | View existing assessment completion and template context |
| Analytics | Company Gaps | Compare team Average Gap and coverage; inspect top strengths and weaknesses for a selected team |
| Analytics | Team Gaps | Inspect team/member radars, competency-level scores, and current versus six-month-prior team results |
| Governance | Framework Templates | Compose templates, view expected-profile radar, save Draft, or make Public |
| Governance | Role Managers | Assign or revoke scoped Manager responsibility |
| Governance | Audit Log | Search and export governance events |

Nine routes are in scope. Competency Pool and Categories are tabs, not separate routes. Generate Assessment, Framework Reviews, and Version History are out of scope.

## Voice and Tone

| Do | Don't |
|---|---|
| `Make this template public?` | `Initiate publication governance workflow` |
| `Manager Score` and `Employee reference` | `Actual Score` without identifying the source |
| `Unknown` | `0` for missing Manager data |
| `Select at least one Manager.` | `Invalid assignment configuration` |
| Short labels and complete error messages | Descriptions that restate the page title |

## Product Rules

### Competency Pool and levels

- Pool and Categories share one Competencies route with persistent tabs.
- New competency opens in a right-side drawer.
- A competency requires a name and a behavior for every active shared level.
- The Pool table shows each active level explicitly; it does not show description or `Level coverage`.
- Selecting a Pool row opens the competency behavior grid without navigation.
- Competency creation and editing include one behavior and one improvement-advice message per active level.
- Changing the shared level count changes the required behavior fields for all competencies.

### Categories and Role Managers

- A Category is a reusable section inside Framework Templates, not a permanent competency taxonomy.
- One Category may be assigned to multiple active Role Manager scopes.
- Each Role Manager assignment is tied to an existing active Employee, team, and role.
- Multiple Employees may share the same team/role scope. An exact duplicate Employee/team/role assignment is blocked.
- Revocation removes future scoped responsibility while preserving the Audit Log.

### Framework Templates

- Framework Templates belongs under Governance.
- HR or an assigned Manager selects Pool competencies inside each available Category.
- Template states in this prototype are `Draft` and `Public`.
- Save returns the current template to Draft.
- Public is a direct, confirmed action; there is no review queue or request-changes flow.
- The template surface includes an expected-profile radar and numeric values.
- Template Categories use collapsible sections; opening or closing a Category does not change its selections.
- Making a template Public is not tied to a performance-review period.

### Assessment reports and analytics

- Assessment Reports displays existing report records and completion counts.
- The HR prototype has no Generate Assessment action or participant-launch flow.
- Manager Score is recorded; Employee Score is reference-only.
- Team Average Gap and Member Average Gap average only known Manager-based gaps.
- Company Gaps uses a column chart, numeric table, and selected-team lists of up to five strongest and five weakest known competencies.
- Team Gaps shows current team radar, current-versus-six-month-prior Manager comparison, clickable member ranking, selected-member radar, and competency-level numeric scores.
- Clicking anywhere on a member row opens that member. There is no Inspect button.
- Improvement advice is stored and edited on the Competencies surface. This update does not add advice to analytics.
- Prototype fixture identities are anonymous and must not reuse names or identities from personas, interviews, or journey protagonists.

## Component Patterns

| Component | Use | Behavioral rules |
|---|---|---|
| App shell | All routes | Persistent desktop sidebar; active route is visible and announced |
| Page header | All routes | Title and at most one primary action group; no descriptive paragraph |
| Tabs | Competencies | Pool and Categories remain on one route; tab state is keyboard-operable |
| Pool table | Competencies / Pool | Row click selects competency; shows name, explicit levels, and status |
| Competency drawer | Competencies / Pool | Name plus behavior and advice per active level; Cancel/Escape restores focus |
| Behavior and advice grid | Competencies / Pool | Edits one behavior and one advice message per level; Save retains Draft; Activate marks Active |
| Category register | Competencies / Categories | Shows all assigned Manager scopes; add/edit uses multi-select checkboxes |
| Template composer | Framework Templates | Select Pool competencies inside collapsible Categories; Save Draft or confirm Public |
| Radar chart | Templates and analytics | Always paired with numeric values; series differ by fill, outline, and dash |
| Assessment table | Assessment Reports | Read-only report list; no generation action |
| Member row | Team Gaps | Entire row is clickable and updates selected-member details |
| Role Manager register | Role Managers | Shows scoped assignment and supports revoke |
| Audit register | Audit Log | Search and CSV export |

## State Patterns

| Surface | Required states |
|---|---|
| Overview | Loaded; no data; data error |
| Competencies / Pool | Empty; selected; Draft; Active; incomplete drawer; save error |
| Competencies / Categories | Empty; multiple assignments; no Manager selected; save error |
| Level Model | Three levels; five levels; unsaved changes; save confirmation |
| Assessment Reports | Empty; in progress; complete; load error |
| Company Gaps | No known Manager data; partial coverage; ranked teams; Unknown |
| Team Gaps | No members; partial coverage; selected member; Unknown score; missing six-month baseline |
| Framework Templates | Draft; Public; no selected competencies; publish confirmation |
| Role Managers | Empty; active; exact duplicate; revoked; save error |
| Audit Log | Empty; filtered; exported; load error |

## Interaction Primitives

- Click or `Enter` on a table/member row selects or opens its detail.
- `Esc` closes the topmost drawer/dialog and restores focus to its trigger.
- Tabs are reachable and operable by keyboard.
- Draft-editing actions require explicit Save.
- Public requires a confirmation summary.
- Radar charts have adjacent numeric equivalents and do not depend on hover.
- Employee Score always carries reference meaning; Manager Score always carries recorded meaning.
- Missing Manager data remains `Unknown` across charts, tables, rankings, and averages.
- Current-versus-six-month comparison uses Manager results from both points in time; missing historical results remain `Unknown`.
- Consequential assignments, revocations, activations, and Public actions append an Audit Log event.

## Accessibility Floor

- Target WCAG 2.2 AA.
- Every input has a persistent label; placeholders are examples only.
- Focus order follows reading order. Drawer/dialog focus returns to the trigger on close.
- Status uses visible text in addition to color.
- Tables expose column headers.
- Radar charts provide readable labels and numeric equivalents.
- Series use fill, outline, and dash differences in addition to color.
- `Unknown` is announced as missing Manager assessment, not zero.
- Motion remains brief and respects reduced-motion preferences in production.

## Responsive and Platform

The primary prototype target is desktop/laptop web at 1280px and above. Between 1024px and 1279px, multi-column work areas stack. Below 1024px, the prototype reflows for demonstration, but complex authoring is not specified as a mobile workflow.

The standalone HTML uses browser local storage for demo persistence. This is not a production offline or security contract.

## Inspiration and Anti-patterns

- **Chosen:** Operations Console: compact panels, strong sidebar, readable typography, restrained color, direct task actions.
- **Rejected:** Description-heavy pages that explain obvious controls.
- **Rejected:** Separate Pool and Category navigation.
- **Rejected:** Competency Types as permanent taxonomy.
- **Rejected:** Formula builder or blended Employee/Manager score.
- **Rejected:** Separate Framework Review queue.
- **Rejected:** HR assessment generation in this prototype.
- **Rejected:** Version History as a dedicated screen.
- **Rejected:** AI-generated advice. Improvement advice remains authored per competency level.
- **Rejected:** Persona/interview names in prototype fixtures.
- **Rejected:** Separate Inspect buttons where a row itself can open detail.

## Key Flows

### Flow 1 - Create a reusable competency

**Protagonist:** An HR Admin maintaining the competency Pool.

1. HR Admin opens Competencies; Pool is selected.
2. She selects `New competency`.
3. A right-side drawer opens while the Pool remains visible.
4. HR Admin enters the competency name, one behavior, and one improvement-advice message for every shared level.
5. Missing required content keeps the drawer open and identifies the problem.
6. **Climax:** She creates the competency and immediately sees it selected in the Pool with all levels visible.
7. She may refine behaviors and activate it from the inline editor.

### Flow 2 - Assign Categories and publish a Framework Template

**Protagonists:** HR Admin and a scoped Software Engineering Manager.

1. HR Admin opens Categories within Competencies.
2. HR Admin edits `Soft Skills` and assigns multiple Manager scopes.
3. The scoped Manager opens Framework Templates under Governance.
4. In the Software Engineer template, he selects `Self-Management` inside `Soft Skills`.
5. The Manager expands only the Category being edited; the expected-profile radar updates with an adjacent numeric list.
6. He saves the template as Draft.
7. **Climax:** HR Admin confirms `Public`; the template becomes Public immediately and is not tied to a review period.

Failure: no competency is selected for a required Category. The template stays Draft until corrected.

### Flow 3 - Inspect assessment results and team gaps

**Protagonist:** HR Admin reviewing existing results.

1. HR Admin opens Assessment Reports and checks Employee/Manager completion.
2. HR Admin opens Company Gaps and compares team Average Gap and coverage.
3. HR Admin selects a team and reviews its top strengths and weaknesses.
4. Team Gaps opens with current team results, the six-month comparison, and member ranking.
5. She clicks the highest-gap member row.
6. The member radar and numeric table update in place.
7. **Climax:** HR Admin can identify the competencies driving the gap and whether the team improved over six months, while distinguishing Manager recorded score, Employee reference, Expected, and Unknown.

## Assumptions and Open Questions

- A Manager Score at or above Expected is treated as a strength; a positive Gap is treated as a weakness.
- The source and lifecycle of Assessment Report data are outside this prototype.
- Manager authoring and Employee/Manager assessment-taking surfaces are represented by fixture data, not fully designed workflows.
- HR Admin workload, report export requirements, evidence visibility, and private-comment permissions still need direct interview validation.
- Vault scope not yet represented by dedicated prototype surfaces: HR structure and Employee-to-role/level mapping; career paths; required/optional competency rules; framework completeness/impact governance; development programs and retained action follow-up; evidence/calibration review; adoption/progress monitoring; profile access rules; and HR data synchronization.
- Upstream Product Canvas and journey notes may still contain older Competency Type, Formula Rules, review-queue, generation, advice, or cycle-publication concepts and should be reconciled before implementation planning.
