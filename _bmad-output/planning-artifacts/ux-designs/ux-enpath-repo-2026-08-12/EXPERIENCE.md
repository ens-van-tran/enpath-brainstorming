---
title: En-Path Role-Gateway Experience
status: final
created: 2026-08-12
updated: 2026-08-14
source_of_truth: User prototype update dated 2026-08-14
design: DESIGN.md
---

# En-Path Role-Gateway Experience

This is the behavioral contract for the runnable prototype. The current update preserves each role prototype while adding one explicit Login As and Logout loop.

## Foundation and demo state

The prototype runs locally without network dependencies. `login.html` is the default entry and routes HR Admin to `hr-admin-prototype.html`, Manager to `line-manager.html`, and Employee to `employee-prototype.html`. Logout returns to `login.html` without resetting the selected prototype's demo data.

The Manager prototype retains the integrated `enpath-app.js` shared store and direct-file fallback. HR Admin and Employee retain their specialized standalone state and business logic. Login As is therefore a rapid role-navigation layer, not a production authentication contract or a guarantee that mutations synchronize between all three standalone destinations.

Seed data represents EnPath Labs, its four teams, HR Admin Tuyen Nguyen, Backend Manager Luc Tran, Employee Minh Nguyen and another Backend employee with no completed assessment. It includes a Published Backend framework v1.0, incomplete Draft v1.1, the Mid-year 2026 assessment, Minh's two confirmed gaps, active AWS/distributed-systems IDP and a re-assessment request in `More Evidence Needed`.

System Admin remains the source of identity records. HR Admin manages organizational assignment only.

## Responsibility model

| Object | HR Admin | Manager | Employee |
|---|---|---|---|
| User identity | View seed record | View direct reports | View self |
| Role, Level, assignment | Create/configure/update | View | View current |
| System Category | Create/edit/archive | Use approved category | View through competencies |
| Team competency detail | Govern allowed category | Create/edit expectations and guidance | View applicable guidance |
| Rating scale | Version and activate | Use snapshot | View rubric/scores |
| Team framework | Create/assign/archive | Own, version, validate and publish | View current Published version |
| Assessment | Monitor | Start, rate and complete | Optional self input; view completed history |
| Re-assessment request | Audit | Accept/decline/more evidence/complete | Draft, submit and add evidence |
| IDP | Monitor adoption | Create/comment/suggest/check-in | Create/update/evidence/complete action |
| Career path | Configure transitions | Coach against path | Select target and compare readiness |

There is no `Submit for review`, `Waiting for HR approval` or HR framework approval gate.

## Cross-persona flows

### Role and Level assignment

HR opens a user drawer and `Update role & level`. The modal shows current and new assignment, effective date, reason and an impact preview for applicable framework, responsible Manager, active assessment and IDP review. Saving updates the user, related framework display and audit log. A level with assigned employees cannot be deleted until reassignment.

### Framework setup and publish

HR creates a template through Basics → Categories → Default competencies → Review; choices persist between steps. HR then creates a Team Framework by selecting template, team, roles/levels, the active rating-scale version and Manager owner. The result is Draft and the Manager receives a notification.

Luc edits Draft v1.1, creates or updates detailed competencies inside approved categories, sets L2/L3 expectation and guidance, and sees the completeness validator. Publish is blocked while Event-driven Architecture lacks L3 guidance. The demo control can jump to a ready state. Successful publish immediately makes the Draft current, marks v1.0 Superseded, updates employee coverage, notifies Minh and writes an audit event. Minh's completed v1.0 assessment remains unchanged.

### Assessment

Luc starts an assessment with employee, Published framework version, framework-scoped competency scope, optional self invitation and deadline. The workspace shows optional self score, Manager rating control, expected score, evidence context and rating rubric. Completion is blocked until every scoped Manager score is present. Completion records a snapshot, exposes employee gap/history and creates a notification. An active assessment can be cancelled; archive recovery is therefore actionable rather than advisory text.

The Employee no-assessment demo state never shows fake scores. It explains the visibility rule and opens an initial assessment request modal with reason, note and timing.

### Career and IDP

HR configures vertical and horizontal transitions with condition, rationale, readiness and Open/Optional/Locked state. Employee mode highlights Backend Engineer L2 and lets Minh select configured targets. Target selection updates a radar, numeric competency table, top gaps, guidance and transition condition.

`Create IDP from gaps` pre-fills the selected target. The IDP board supports add/edit actions, Course/Practice/Project/Mentoring/Reading type, status update, text/link/file evidence and drag between status columns. Evidence appears as available input to a re-assessment request. Manager comments and check-ins append to the shared activity timeline and notify Minh.

### Re-assessment request

Minh selects competencies, reason, IDP, action, existing evidence and timing. A Draft remains private and editable; submission requires competency, reason and evidence. Luc's inbox detail exposes submitted/history states, evidence and status history, then supports Accept, Decline, More Evidence Needed and focused assessment completion. The More Evidence Needed state gives Minh the Manager message and an evidence modal that resubmits the request.

## Navigation and direct entries

### Login As

HR Admin; Manager; Employee. Each role card has one entry action. No credentials, organization selector or production session behavior is simulated.

### HR Admin — Tuyen Nguyen

Overview; Users; Roles & Levels; Competency Categories; Rating Scale; Framework Templates; Team Frameworks; Career Path Configuration; Governance & Audit.

### Manager — Luc Tran

Team Overview; Team Framework; Team Competencies; Team Members; Assessments; Assessment Requests; Development Plans.

### Employee — Minh Nguyen

My Profile; My Career Path; My Assessments; Re-assessment Requests; My IDP; Notifications.

## Edge states

- Missing assessment: empty profile and assessment state with request CTA.
- Incomplete competency: publish blocked with exact missing guidance.
- Used rating scale: no direct edit; new version and impact analysis.
- Published framework edit: create Draft clone; never mutate Published snapshot.
- Active assessment archive: archive blocked with complete/cancel recovery.
- Assigned level deletion: blocked until employee reassignment.
- Locked career move: visible but not targetable, with condition context.
- More Evidence Needed: Manager message plus add-evidence/resubmit action.
- Missing heatmap data: `Unknown`, not zero.
- Destructive changes: confirmation modal.

## Demo session flow

1. The demonstrator opens `login.html`.
2. They select HR Admin, Manager or Employee.
3. En-Path opens the corresponding role prototype directly.
4. Existing role-specific reset and demo controls continue to work.
5. **Climax:** selecting `Log out` returns to Login As so the demonstrator can enter another role without editing a URL.

## Coverage matrix

| Persona | Activity | Screen / flow |
|---|---|---|
| HR Admin | Monitor adoption and gaps | Overview KPI, bar, donut and drill-downs |
| HR Admin | Search seed users and inspect coverage | Users filters, table and employee drawer |
| HR Admin | Update Role + Level | Assignment modal with impact preview and audit |
| HR Admin | Create Role and manage Levels | Roles & Levels create/edit/reorder/delete validation |
| HR Admin | Govern taxonomy | Competency Categories create/edit/archive/detail |
| HR Admin | Version common scale | Rating Scale create-version modal, impact and history |
| HR Admin | Create reusable setup | Framework Templates four-step modal and history |
| HR Admin | Assign Manager-owned framework | Team Frameworks create modal, register and detail |
| HR Admin | Configure progression | Career Path tree, transitions and Employee preview |
| HR Admin | Trace change | Governance & Audit timeline and before/after drawer |
| Manager | Monitor team capability | Team Overview heatmap, radar, gaps, funnel and actions |
| Manager | Author and publish framework | Team Framework validator, version compare and publish modal |
| Manager | Define detailed competency | Team Competencies add/edit expectations and guidance |
| Manager | Coach direct reports | Team Members table, radar drawer and contextual CTAs |
| Manager | Start and complete assessment | Assessment modal, full workspace, rubric and notification |
| Manager | Decide re-assessment | Request inbox/detail, Accept/Decline/More Evidence/Complete |
| Manager | Track development | Development Plans list, evidence detail, comments and check-in |
| Employee | Understand current state | My Profile completed and no-assessment demo states |
| Employee | Request first assessment | Initial request modal, submission and Manager notification |
| Employee | Review history and gaps | My Assessments radar, table, evidence and snapshot history |
| Employee | Explore next positions | Career tree, target radar/table, top gaps and path condition |
| Employee | Build a development plan | Create IDP, Kanban/list actions, status and progress |
| Employee | Attach development evidence | Action text/link/file evidence and Done state |
| Employee | Ask for focused reassessment | Request create flow, linked IDP/action/evidence and timeline |
| Employee | Resolve evidence request | More Evidence Needed message, add evidence and resubmit |
| Employee | Follow related updates | Notification center with object navigation |

## Verification intent

Open `mockups/login.html` directly or through a local static server. Enter each role, verify its primary navigation and use Logout to return to the role gateway. The Manager demo controls still reset and jump to high-value edge states; direct persona switching has been removed.

Run `node mockups/prototype-smoke-test.js` from this artifact directory to verify Login As destinations, role Logout, all 22 integrated routes, direct-file fallback and the connected Role/assignment → framework publish → assessment → IDP evidence → re-assessment mutation chain.
