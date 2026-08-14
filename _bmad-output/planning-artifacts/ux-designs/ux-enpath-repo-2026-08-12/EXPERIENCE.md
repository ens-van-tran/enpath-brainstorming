---
title: En-Path HR Admin Experience
status: final
created: 2026-08-12
updated: 2026-08-14
sources:
  - _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
  - Projects/En-Path/docs/As-is Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Map - Manager.md
  - Projects/En-Path/docs/Product Canvas.md
  - Projects/En-Path/docs/PVB.md
  - Projects/En-Path/docs/Persona.md
  - /Users/vawn/Downloads/Bản sao của To share] Competency Matrix - Draft - Rubric Config (chuột bạch BA).pdf
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
Shared Rating Scale
  -> system default: 5 scores
  -> Customize scale: Coming soon
  -> Competency Pool
    -> competency description
    -> score anchors + improvement advice
    -> role + role-level expectation
      -> expected score
      -> Below / Meet / Above Expectation behavior
  -> Category
    -> one or more Role Manager scopes
      -> Framework Template
        -> Draft, Public, or Archived
          -> Assessment Reports
            -> Manager Score (recorded)
            -> Employee Score (reference)
              -> Gap analytics
```

- HR maintains one flat Competency Pool. A competency is not permanently classified by a type.
- En-Path provides a fixed default five-score rating model in the current scope. Custom score counts and labels are future scope.
- Every competency has a description, score anchor, and improvement advice for each of the five default scores.
- Each competency may have multiple role-level expectations. An expectation binds a role, role level, Expected Score, and observable Below / Meet / Above Expectation behavior.
- Shared score anchors explain what scores mean across the system; role-level expectations explain what evidence qualifies for one Role + Level and which score is expected.
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
| Framework | Competencies | Manage the Pool and Categories through two tabs; open a competency into dedicated setup |
| Framework | Competency Setup | Edit Definition or Role expectations for one competency; nested route, not sidebar navigation |
| Framework | Rating Scale | Show the default five-score vocabulary and future Customize scale entry point |
| Framework | Framework Templates | Create, compose, publish, and archive role templates |
| Reports | Assessment Reports | View existing assessment completion, template context, and evidence read-only |
| Analytics | Company Gaps | Compare team Average Gap and coverage; inspect top strengths and weaknesses for a selected team |
| Analytics | Team Gaps | Inspect team/member radars, competency-level scores, and current versus six-month-prior team results |
| Governance | Employee Management | Import and list Employees with team, role, level, status, and source |
| Governance | Role Managers | Assign or revoke scoped Manager responsibility |
| Governance | Audit Log | Search and export governance events |

Ten primary sidebar routes plus the nested Competency Setup route are in scope. Competency Pool and Categories are tabs, not separate routes. Generate Assessment, Framework Reviews, and Version History are out of scope.

## Voice and Tone

| Do | Don't |
|---|---|
| `Make this template public?` | `Initiate publication governance workflow` |
| `Manager Score` and `Employee reference` | `Actual Score` without identifying the source |
| `Unknown` | `0` for missing Manager data |
| `Select at least one Manager.` | `Invalid assignment configuration` |
| Short labels and complete error messages | Descriptions that restate the page title |

## Product Rules

### Competency Pool, rating scale, and role expectations

- Pool and Categories share one Competencies route with persistent tabs.
- New competency opens in a right-side drawer for name and description, then continues to Competency Setup.
- A competency requires a name, description, score anchor and improvement advice for all five default scores, plus at least one role-level expectation before activation.
- The Pool table shows name, role-expectation count, owner, and status; it does not repeat long descriptions or show `Level coverage`.
- Selecting a Pool row opens the dedicated Competency Setup route.
- Competency Setup separates Definition from Role expectations; only one section is visible at a time.
- A role-level expectation requires role, role level, one Expected Score from 1–5, and Below / Meet / Above Expectation behavior. Role is selected from the system Role list derived from Employee records and Framework Templates; it is not entered as free text.
- The source PDF's short 1–5 descriptions are treated as score anchors; its three expectation columns are treated as role-level behavior. They are not merged into one field.
- Rating Scale displays the system default five scores. `Customize scale` opens `Coming soon` and does not mutate the model.

### Categories and Role Managers

- A Category is a reusable section inside Framework Templates, not a permanent competency taxonomy.
- One Category may be assigned to multiple active Role Manager scopes.
- Each Role Manager assignment is tied to an existing active Employee, team, and role.
- Multiple Employees may share the same team/role scope. An exact duplicate Employee/team/role assignment is blocked.
- Revocation removes future scoped responsibility while preserving the Audit Log.

### Employee Management

- HR imports Employee records containing Employee identity, team, role, and role level.
- Import validates one row as `Employee, Role, Level, Team`; invalid rows do not create records.
- HR can edit Employee name, team, role, level, and Active/Inactive status from the Employee register.
- Changing the team or role of an active Manager Employee updates that Employee's active Role Manager scopes. Changing the Employee to Inactive revokes those active scopes.
- Employee edits and any resulting Manager-scope update or revocation append Audit Log events.
- Imported Employee role and level determine Role Manager assignment options and Framework Template impact preview.
- Career-path authoring is not part of this HR prototype.

### Framework Templates

- Framework Templates belongs under Framework.
- HR can create a new Draft template with template name, team, and role.
- HR can add available Categories to an existing active template.
- HR or an assigned Manager selects Pool competencies inside each available Category.
- Template states in this prototype are `Draft`, `Public`, and `Archived`.
- Save returns the current template to Draft.
- Public is a direct, confirmed action; there is no review queue or request-changes flow.
- Before Public, an impact preview shows matched imported Employees and the role levels in scope.
- The template surface includes an expected-profile radar and numeric values.
- Template Categories use collapsible sections; opening or closing a Category does not change its selections.
- HR can archive a Draft or Public template. An Archived template remains visible and becomes read-only.
- Making a template Public is not tied to a performance-review period.

### Assessment reports and analytics

- Assessment Reports displays existing report records and completion counts.
- HR may open Employee evidence, Manager context, and Manager rationale in a view-only dialog.
- Evidence Review contains no edit, approve, reject, or request-change action in this prototype.
- The HR prototype has no Generate Assessment action or participant-launch flow.
- Manager Score is recorded; Employee Score is reference-only.
- Team Average Gap and Member Average Gap average only known Manager-based gaps.
- Company Gaps uses a column chart, numeric table, and selected-team lists of up to five strongest and five weakest known competencies.
- Team Gaps shows current team radar, current-versus-six-month-prior Manager comparison, clickable member ranking, selected-member radar, and competency-level numeric scores.
- Clicking anywhere on a member row opens that member. There is no Inspect button.
- Improvement advice is stored and edited in Competency Setup. This update does not add advice to analytics.
- Prototype fixture identities are anonymous and must not reuse names or identities from personas, interviews, or journey protagonists.

## Component Patterns

| Component | Use | Behavioral rules |
|---|---|---|
| App shell | All routes | Persistent desktop sidebar; active route is visible and announced |
| Page header | All routes | Title and at most one primary action group; no descriptive paragraph |
| Tabs | Competencies | Pool and Categories remain on one route; tab state is keyboard-operable |
| Pool table | Competencies / Pool | Row click opens Competency Setup; shows name, role-expectation count, owner, and status |
| Competency drawer | Competencies / Pool | Captures name and description, then routes to setup; Cancel/Escape restores focus |
| Setup tabs | Competency Setup | Switch between Definition and Role expectations without placing both workflows on one page |
| Score-anchor rows | Competency Setup / Definition | Edits one score anchor and one improvement-advice message for each of five scores |
| Role-level expectation editor | Competency Setup / Role expectations | Selects an existing system Role and edits role level, Expected Score, and stacked Below / Meet / Above behavior |
| Rating Scale list | Rating Scale | Shows five default scores; Customize scale opens Coming soon |
| Category register | Competencies / Categories | Shows all assigned Manager scopes; add/edit uses multi-select checkboxes |
| Template composer | Framework Templates | Create template, add Category, select Pool competencies, Save Draft, confirm Public, or Archive |
| Radar chart | Templates and analytics | Always paired with numeric values; series differ by fill, outline, and dash |
| Assessment table | Assessment Reports | Read-only report list; opens evidence view-only; no generation action |
| Employee register | Employee Management | Imports, lists, and edits Employee name, team, system Role, level, and status |
| Member row | Team Gaps | Entire row is clickable and updates selected-member details |
| Role Manager register | Role Managers | Shows scoped assignment and supports revoke |
| Audit register | Audit Log | Search and CSV export |

## State Patterns

| Surface | Required states |
|---|---|
| Overview | Loaded; no data; data error |
| Competencies / Pool | Empty; list; incomplete drawer; save error |
| Competency Setup | Definition; Role expectations; Draft; Active; missing expectation; incomplete five-score guidance |
| Competencies / Categories | Empty; multiple assignments; no Manager selected; save error |
| Rating Scale | Default five scores; Customize scale Coming soon |
| Assessment Reports | Empty; in progress; complete; load error |
| Company Gaps | No known Manager data; partial coverage; ranked teams; Unknown |
| Team Gaps | No members; partial coverage; selected member; Unknown score; missing six-month baseline |
| Framework Templates | Draft; Public; Archived read-only; empty Categories; no selected competencies; impact preview; no matched Employees; publish confirmation |
| Employee Management | Empty import; valid import; invalid row; loaded register; edit; Inactive; Manager-scope synchronization |
| Role Managers | Active assignment; exact duplicate; revoked; save error |
| Audit Log | Empty; filtered; exported; load error |

## Interaction Primitives

- Click or `Enter` on a table/member row selects or opens its detail.
- `Esc` closes the topmost drawer/dialog and restores focus to its trigger.
- Tabs are reachable and operable by keyboard.
- Draft-editing actions require explicit Save.
- Public requires a confirmation summary and impact preview from imported Employee role/level data.
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
4. HR Admin enters the competency name and description, then selects `Continue to setup`.
5. Competency Setup opens on Definition, where she completes five score anchors and improvement-advice messages.
6. She switches to Role expectations, adds Role, Role Level, Expected Score, and Below / Meet / Above behavior.
7. Missing required content blocks activation and identifies the incomplete setup.
8. **Climax:** She activates the competency from the dedicated setup route and returns to a clean Pool list when finished.

### Flow 2 - Assign Categories and publish a Framework Template

**Protagonists:** HR Admin and a scoped Software Engineering Manager.

1. HR Admin opens Categories within Competencies.
2. HR Admin edits `Soft Skills` and assigns multiple Manager scopes.
3. The scoped Manager opens Framework Templates under Framework.
4. In the Software Engineer template, he selects `Self-Management` inside `Soft Skills`.
5. The Manager expands only the Category being edited; the expected-profile radar updates with an adjacent numeric list.
6. He saves the template as Draft.
7. HR Admin reviews the matched Employees and role levels in the impact preview.
8. **Climax:** HR Admin confirms `Public`; the template becomes Public immediately and is not tied to a review period.

Failure: no competency is selected for a required Category. The template stays Draft until corrected.

HR may also create a new template, add its Categories, or archive an obsolete template. Archived templates remain visible and read-only.

### Flow 3 - Inspect assessment results and team gaps

**Protagonist:** HR Admin reviewing existing results.

1. HR Admin opens Assessment Reports and checks Employee/Manager completion.
2. HR Admin opens a report's evidence and reads Manager context and rationale without changing it.
3. HR Admin opens Company Gaps and compares team Average Gap and coverage.
4. HR Admin selects a team and reviews its top strengths and weaknesses.
5. Team Gaps opens with current team results, the six-month comparison, and member ranking.
6. She clicks the highest-gap member row.
7. The member radar and numeric table update in place.
8. **Climax:** HR Admin can identify the competencies driving the gap and whether the team improved over six months, while distinguishing Manager recorded score, Employee reference, Expected, and Unknown.

## Assumptions and Open Questions

- A Manager Score at or above Expected is treated as a strength; a positive Gap is treated as a weakness.
- The source and lifecycle of Assessment Report data are outside this prototype.
- Manager authoring and Employee/Manager assessment-taking surfaces are represented by fixture data, not fully designed workflows.
- HR Admin workload, report export requirements, and private-comment permissions still need direct interview validation.
- Confirmed outside this HR prototype: career-path authoring and development action follow-up belong to Manager; adoption monitoring is excluded.
- Deferred: required/optional competency rules and profile-access governance.
- HR structure beyond imported team/role/level data and production HR data synchronization remain unspecified.
- Upstream Product Canvas and journey notes may still contain older Competency Type, Formula Rules, review-queue, generation, advice, or cycle-publication concepts and should be reconciled before implementation planning.
