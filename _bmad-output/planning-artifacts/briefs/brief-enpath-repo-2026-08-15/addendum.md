---
title: "En-Path Product Brief Addendum"
status: final
created: 2026-08-16
updated: 2026-08-16
---

# En-Path Product Brief Addendum

This addendum provides the detailed scope, guardrails, discovery findings, and validation reference for the En-Path Product Brief. The brief remains the strategic summary; downstream PRD, UX, architecture, and implementation work should use this document when operational detail is required.

## Desired Continuous Loop

`Framework and expectations -> assessment and visible gaps -> employee-owned development actions -> employee progress and evidence -> focused reassessment request -> manager confirmation -> updated competency profile`

Formal review cycles may still exist, but the product should preserve evidence and progress between cycles so that formal reviews do not have to be reconstructed from memory.

## Confirmed MVP Prototype Scope

This scope was confirmed during the coaching review and defines the boundary for the next prototype rebuild.

### HR And Learning & Development

- Maintain the employees, departments, reporting relationships, roles, and levels needed by the demonstration.
- Define competency criteria and rating rubrics, then map expected levels to each `Role + Level`.
- Configure the Career Path graph and reachable next positions.
- Define lightweight Company Capability Priorities.
- View the read-only Organization Capability Overview.

### Line Manager

- Add team-specific competencies, criteria, and curated learning resources.
- Create a baseline competency assessment and assign the self-assessment to employees as the first step.
- Record the official competency ratings while keeping the self-assessment results separate.
- Optionally review an employee Development Plan and mark it `Reviewed` with comments.
- Process competency reassessment requests, request confidential contextual input when needed, and issue the final criterion-based result.

### Employee

- View the official competency profile, separate self-assessment, current-role expectations, and transparent criteria.
- Browse the Career Path, select a reachable Target Position, and compare the official competency profile with target-position expectations without an approval flow.
- Create and manage a Development Plan with multiple actions.
- Attach notes, files, and links as evidence, and optionally request manager review of the plan.
- Request reassessment of a specific competency using linked actions and evidence.
- Receive the official result and submit a new evidence-backed request or criterion question when dissatisfied.

### Contextual Reviewer

- Receive a scoped request from the line manager and submit confidential feedback or evidence.
- Provide context only; contextual reviewers cannot view unrelated employee data or change the official rating.

### Executive And HR Overview

- Compare Company Capability Priority targets with official competency ratings.
- Show aggregate gaps and the number of employees with related active Development Plans.
- Link the aggregate view to the employee development loop without adding staffing or workforce-planning workflows.

### Explicitly Outside MVP

- Full performance review, calibration, compensation, promotion approval, or succession decisions.
- Project staffing, team formation, vacancy planning, and opportunity matching.
- Workflows requiring a Target Position proposal or manager agreement.
- AI-generated development actions or learning-resource recommendations.
- LMS or broad enterprise integrations, advanced import or export, and production-grade administration.
- Gamification, badges, and separate intermediate-recognition states.
- Blind manager scoring, employee acknowledgment gates, or contextual-reviewer scoring authority.

## Detailed Product Guardrails

### Competency Semantics And Gap Views

- Competency assessment is not an automatic promotion decision. Career progression also depends on role availability, business need, scope, and opportunity.
- Missing assessment data remains unknown rather than being treated as zero.
- Gap views distinguish the employee's self-assessment, official competency rating, current-role expectation, and target-position expectation. These values must not be blended into an unexplained score.
- Every displayed gap needs understandable criteria and an achievable next action or recognition path.

### Career Path And Target Position

- HR defines supported career transitions between `Role + Level` nodes.
- The employee can see the current node and reachable positions, but the graph does not represent open vacancies or promise promotion.
- A Target Position is one `Role + Level` node selected by the employee for personal gap comparison.
- A Target Position has no proposal or manager-agreement workflow, separate target type or date, or manually selected competency fields.
- Selecting a Target Position is not a company commitment and does not gate Development Plan creation.

### Development Plan, Evidence, And Resources

- The Development Plan and its actions are employee-owned and remain usable without manager approval.
- Manager review is optional and employee-initiated. `Reviewed` means the manager examined the plan and may have commented; it is not an approval gate or a promise of budget, project allocation, mentoring, or time.
- Supported evidence formats include text notes, files, and links. Evidence records retain relevant context such as the project, task, milestone, date, and reviewer's relationship to the employee.
- Managers manually curate learning resources at competency-configuration time. AI-generated recommendations are deferred.

### Assessment Authority And Confidentiality

- The baseline assessment begins with an assigned employee self-assessment, followed by the manager assessment. The two assessments remain separate.
- The manager may view the submitted self-assessment before completing the manager assessment.
- Only the manager assessment produces official competency ratings.
- When direct context is insufficient, the line manager may ask a project manager, team lead, or close collaborator for contextual feedback or evidence.
- Contextual reviewers cannot change ratings; final accountability remains with the line manager.
- Reviewer identity and raw feedback are not disclosed to the employee. The internal record retains the reviewer's identity, relationship to the employee, relevant project or work context, and submission date.
- Confidential input cannot produce a black-box result. The line manager remains responsible for a criterion-based employee-facing explanation.

### Reassessment Behavior

- The result becomes official without employee acknowledgment. An employee who disagrees may submit a subsequent request containing new evidence or a specific criterion question.
- Even when the rating remains unchanged, the employee-facing result includes the final rating, applicable criteria, recognized evidence, decision rationale, and the next action or evidence needed.
- Only one reassessment request can remain active for a competency at a time.
- A repeated request must add materially new evidence or a specific question about the criteria or prior decision.
- No fixed waiting period applies when new information exists. The current official rating remains effective until a new decision is issued.
- A duplicate request with no new information is not accepted.
- Intermediate recognition for evidence that does not change a rating is deferred. The MVP records the evidence and rationale without adding a separate status or reward mechanism.

### Organization Capability Reporting

- Each Company Capability Priority contains a competency, target level, number of employees required at that level, and target date.
- Official competency ratings determine current capability.
- Related active Development Plans indicate development coverage and are not counted as achieved capability.
- The overview remains read-only and does not introduce project staffing, team formation, vacancy planning, or workforce-planning decisions.

## Current-State Discovery By Actor

### HR

- Defines competency templates in spreadsheets and distributes them to line managers.
- Needs line managers to add competencies and expectations relevant to their teams.
- Needs a centralized view of employees, departments, roles, frameworks, and team-level results.

### Line Manager

- Manages many employees but only performs formal review once or twice per year.
- May not work closely enough with every direct report to accurately recall capabilities demonstrated across projects and milestones.
- Agrees on development and career actions with employees, but those actions are often stored in personal notes and lose visibility and follow-through.
- Wants employees to maintain progress and initiate evidence-backed reassessment requests, reducing the need for the manager to chase every update.

### Employee

- May join without knowing their official level, assessment criteria, competency expectations for each level, or supported career paths.
- Needs visibility into both self-assessment and manager assessment to understand competency gaps.
- Needs an employee-owned Development Plan with actions, action statuses, evidence, and visibility for the manager.
- Needs to request reassessment for a specific competency when project or task evidence demonstrates improvement, rather than wait six to twelve months.
- Wants relevant learning resources and improvement guidance connected to competency gaps.

## Market Context And Validation Backlog

### Initial Landscape Check

The original statement that no tool addresses this space is too broad. Representative products already cover much of the problem:

- [TalentGuard](https://www.talentguard.com/) combines competency standards, assessments, career pathing, development planning, performance review, feedback, and audit-oriented evidence.
- [MuchSkills](https://www.muchskills.com/employee-development) combines skill profiles, role gaps, manager or subject-matter validation, development plans, learning resources, and career mobility.
- [Lattice Grow](https://lattice.com/grow) combines competency matrices, career tracks, Development Plans, one-to-ones, and performance workflows.
- [Fuel50](https://fuel50.com/) and [Gloat](https://gloat.com/) focus more heavily on skills intelligence, internal mobility, opportunity matching, and workforce planning.

Based on a quick review of public sources, the less visible workflow is employee-triggered reassessment of one competency when new linked evidence becomes available. This is a hypothesis to validate, not a proven market gap.

### Validation Hypotheses

- Employee-initiated progress updates and reassessment requests reduce manager follow-up workload.
- Transparent criteria, visible gaps, employee agency, and timely official recognition sustain employee participation without gamification.
- Continuous capability development improves retention and reduces reliance on reactive replacement hiring or restructuring.
- Centralized competency data improves capability visibility for project qualification and team decisions without requiring a staffing workflow in the MVP.
- Evidence-linked, employee-triggered, on-demand competency reassessment is valuable and differentiated enough to lead the product story.

### Emerging Enterprise Use Cases

- Identify whether the organization has sufficient capability to pursue and deliver new projects or enter new business domains.
- Use a shared competency view when assembling teams for new work.
- Invest in developing employees expected to remain with the company rather than repeatedly terminating and replacing staff.
- Detect capability gaps early enough to adapt as the market changes.
- Improve retention by making development and career progression visible.
- Supply competency history as supporting context for performance review without turning En-Path into the performance-review system itself.

These are candidate downstream outcomes. Attempting to prove all of them in one prototype would dilute the product narrative and expand the required analytics and workforce-planning scope.

### Prototype Validation Signals

The demonstration is intended to generate evidence of buyer intent. A stakeholder who describes where En-Path fits, names a pilot population, offers access to relevant users or data, or asks for a pilot plan provides a stronger signal than someone who only likes the interface.
