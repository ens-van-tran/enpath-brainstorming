---
title: En-Path Product Requirements Document
status: draft
created: 2026-08-16
updated: 2026-08-16
---

# PRD: En-Path Competency Development and Assessment Platform

## 0. Document Purpose

This PRD defines the En-Path product vision, users, journeys, requirements, non-goals, scope, and success framing. The product semantics, permissions, state machines, business invariants, UI flows, and edge-case behavior are specified in the review draft `feature-spec.md`. Competitive and deferred implementation context lives in `addendum.md`.

The updated 2026-08-15 product brief remains the strategic source. This PRD replaces earlier draft assumptions where they conflict with the feature specification. Fast-path decisions that still need Vawn's confirmation are marked `[ASSUMPTION A-n]`. Functional Requirements keep their prior IDs where the capability remains recognizable; new requirements continue from FR-27.

## 1. Vision

En-Path is a flexible competency development and assessment framework platform for growing organizations. It gives HR a configurable Organization model, reusable Competency Library, Framework Templates, Team Framework governance, Career Path configuration, and Company Capability Priorities. It gives Managers a Team-scoped Framework they can customize, curated Learning Resources, a structured Assessment workflow, optional Development Plan review, and sole authority over Official Ratings. It gives Employees transparent current and target expectations, separate Self-Assessment and Official Rating views, Employee-owned Development Plans and Evidence, and timely Initial Assessment and Reassessment paths. It gives HR and Executives a read-only Organization Capability Overview without turning En-Path into staffing or workforce planning.

En-Path keeps fundamental product semantics stable while allowing business content to vary by organization, Team, Organization Role, Role Level, Competency, and Framework:

1. HR configures reusable Organization Roles and Role Levels, enables them in Teams, and assigns Members and Primary Managers.
2. HR configures a reusable System Competency Library and Framework Templates.
3. HR creates and assigns a Framework to a Team; the responsible Manager may customize only that Framework.
4. HR publishes a Career Path of supported Role + Level Positions and Company Capability Priorities.
5. The Manager creates an Assessment for one, multiple, or all eligible Team Members.
6. Employees submit Self-Assessments using one shared five-level Rating Scale.
7. The Manager independently records Official Ratings against snapshotted Criteria and Role + Level Expectations.
8. Employees browse reachable Career Positions, select one Target Position, and compare current Official Ratings with target expectations.
9. Employees own Development Plans, Development Actions, and Evidence; Managers may optionally review Plans and curate Framework Learning Resources.
10. Employees without an Official Rating may request an Initial Assessment.
11. Employees with Official Ratings may submit one Reassessment Request containing one or more independent Competency Items.
12. Managers issue independent explainable Competency Results and update only the affected Official Ratings.
13. HR and Executives compare Company Capability Priorities with comparable Official Ratings and separate development coverage.

En-Path does not replace performance review, calibration, compensation, promotion, succession, staffing, vacancy, or workforce-planning systems. Development and capability data do not imply a company commitment or employment decision.

### 1.1 Product Principles

- **Configurable content, stable semantics:** organizations configure business content, not the meaning of core product behavior.
- **One shared Rating Scale:** every Competency uses exactly five Rating Levels; `Unknown` is separate.
- **Criterion and expectation based:** Rating Level Criteria explain proficiency; Role + Level Expectations explain what a position requires.
- **Employee drives development:** the Employee owns Development Plans, Development Actions, Evidence, and request initiation.
- **Manager owns official judgment:** only the responsible Manager creates Official Ratings.
- **HR governs organizational scope and reusable sources:** HR owns Teams, Members, Primary Managers, System Competencies, Templates, Framework creation, and assignment.
- **Manager customization is local:** Manager changes never mutate global content or another Framework.
- **Career direction without commitment:** Target Position supports personal gap comparison but creates no vacancy, approval, promotion, staffing, or compensation promise.
- **Capability and development remain separate:** aggregate Official Ratings represent current comparable capability; active Development Plans represent coverage, not achieved capability.
- **History remains understandable:** later configuration changes never rewrite assigned or completed Assessment meaning.
- **No blended scoring:** Self-Assessment, Official Rating, Expected Rating, and `Unknown` remain separate.
- **Development is not a promise:** no plan, target, rating, or Evidence creates a promotion, staffing, compensation, or vacancy commitment.

## 2. Target Users and Stakeholders

### 2.1 Target Organization

The initial target remains a growing organization of approximately 30 or more employees with role-based competency expectations and an HR/L&D or operational owner capable of maintaining a useful framework.

### 2.2 Product Roles

- **HR:** Organization, Competency Library, Framework Template, Framework assignment, Career Path, Company Capability Priority, configuration governance, and audit owner.
- **Manager:** responsible for one or more Teams, assigned Framework customization, Learning Resources, Assessments, optional Plan Review, Official Ratings, and Reassessment decisions.
- **Employee:** Organization Member who completes Self-Assessments, selects a Target Position, and owns Development and Evidence.
- **Contextual Reviewer:** scoped qualitative contributor without rating authority.
- **Executive/Leadership:** aggregate-only Product Role that may manage Company Capability Priorities and view the Organization Capability Overview without individual Employee content access.

Product Roles are distinct from job-based Organization Roles such as Backend Engineer or Technical Lead.

### 2.3 Jobs To Be Done

**HR**

- Configure realistic Team, Organization Role, Role Level, Member, and Manager relationships.
- Build reusable System Competencies instead of recreating content for every Team.
- Create Framework Templates and independent Team Frameworks.
- Configure and publish supported Career Paths and Target Position expectation sources.
- Define Company Capability Priorities and inspect achieved capability separately from development coverage.
- Preserve governance, provenance, and historical meaning while allowing Manager-local customization.

**Manager**

- Understand and complete the assigned Team Framework without affecting global configuration.
- Create one Assessment for one, multiple, or all eligible Members.
- Compare Self-Assessment and Evidence with Criteria while independently selecting Official Ratings.
- Curate relevant Learning Resources and provide optional non-approving Development Plan review.
- Review multi-Competency Reassessment Requests efficiently without collapsing separate decisions.

**Employee**

- Understand the shared Rating Scale, applicable Criteria, expectations, Official Ratings, and gaps.
- Browse supported Career Positions, select a Target Position, and understand current-versus-target gaps without treating the target as a promise.
- Request a first Assessment when no baseline exists.
- Own adaptable Development Actions and preserve reusable Evidence.
- Request reassessment for one or more rated Competencies and receive separate explainable results.

**Contextual Reviewer**

- Provide only the relevant qualitative context requested by the Manager.
- Understand that the Manager, not the reviewer, owns the Official Rating.

**Executive/Leadership**

- Define or review a small set of Company Capability Priorities.
- Understand current comparable capability, `Unknown`, `Not Comparable`, and development coverage without accessing restricted Employee content or initiating staffing decisions.

### 2.4 Key User Journeys

#### UJ-1. Lan configures the organization and reusable competency sources

Lan, the HR/L&D owner, creates reusable Organization Roles and ordered Role Levels, enables them in a Team, assigns Members and one Primary Manager, then builds System Competency Categories and System Competencies using the fixed five-level Rating Scale. She creates a Framework Template so future Team Frameworks do not require repeated manual setup. Value lands when the configuration is reusable, validated, and clearly separated from Team-local copies.

#### UJ-2. Lan assigns a Team Framework and Minh completes it locally

Lan creates a Framework from a Template, selects the Team, confirms Minh as its Primary Manager, and assigns it as a Candidate. Minh uses the same configuration workbench to complete the shared Working Draft and publish a valid Published Framework Revision. Activating that Revision makes the Framework current without changing the System Library, Template, another Team's Framework, or the existing Active Framework before the replacement is ready.

#### UJ-3. Minh creates a cohort Assessment

Minh creates an Assessment from the Active Framework's current Published Framework Revision, chooses one, multiple, or all eligible Team Members, reviews applicable Competencies and Role + Level Expectations, and assigns it. En-Path creates an immutable Assessment Snapshot and sends one Self-Assessment to each Member. Value lands when the cohort can progress independently without later Framework edits changing the Assessment.

#### UJ-4. Linh and Minh establish Official Ratings

Linh completes every Self-Assessment item using the shared five-level Rating Scale. Minh then reviews her Self-Assessment and Evidence and independently records one Manager rating per Competency. When he completes her Assessment Case, all included ratings become Official Ratings together. Value lands when Linh can distinguish Self-Assessment, Official Rating, Expected Rating, `Unknown`, and gap without any blended score.

#### UJ-5. Linh requests her first Assessment

Linh has no Official Rating for one or more current Framework Competencies. Her profile shows `Request your first assessment` or `Request assessment`, not `Request Reassessment`. She sends an Initial Assessment Request to Minh. Value lands when the request is routed to the responsible Manager without pretending that a rating or baseline already exists.

#### UJ-6. Linh develops and reuses Evidence

Linh creates an Employee-owned Development Plan with multiple Development Actions, marks relevant Actions completed, and attaches notes, links, files, and project references. She can reuse completed Actions as Evidence without duplicating their content. Value lands when later edits cannot erase the Evidence snapshot used in an official decision.

#### UJ-7. Linh submits one multi-Competency Reassessment Request

Linh selects one or more eligible rated Competencies, provides a rationale or Criterion question for each, and maps completed Actions and Evidence to one or more Competency Items. One parent Request is submitted, while each Competency remains an independent review and decision unit. Value lands when related growth can be submitted together without creating a blended outcome.

#### UJ-8. Minh issues independent explainable Competency Results

Minh reviews the grouped Request, may invite scoped Contextual Reviewers, and decides each Competency Item independently. One rating may increase while another remains unchanged or pending. Every decided item includes the final rating, Criteria, recognized Evidence, rationale, and next action or Evidence needed. Value lands when only the affected Official Rating changes and the Employee receives an understandable decision.

#### UJ-9. Lan configures the Career Path and Linh selects a Target Position

Lan builds a graph of supported Role + Level Positions, connects reachable next Positions, assigns each Position a target-expectation source, validates readiness, and publishes the Career Path. Linh sees her current Position, browses reachable company-supported paths, selects one Target Position without Manager approval, and compares her Official Ratings with target expectations. Value lands when each target gap has Criteria and a concrete next action while the UI makes clear that no vacancy, promotion, or company commitment exists.

#### UJ-10. Linh requests advisory Plan review and uses curated resources

Linh creates Development Actions from current or target gaps, opens resources curated by Minh, and asks Minh to review her Plan. Minh comments and marks the captured Plan snapshot `Reviewed` without approving it. Linh continues editing and sees `Changes Since Review` when applicable. Value lands when coaching is visible without turning the Manager into a workflow gate.

#### UJ-11. Lan and the Executive Sponsor inspect organization capability

Lan creates a Company Capability Priority with a System Competency, Target Rating, required Employee count, and Target Date. The read-only Overview compares the target with comparable current Official Ratings, reports `Unknown` and `Not Comparable` separately, and shows active Development Plan coverage without counting it as achieved capability. Value lands when leadership can connect individual development to organizational priorities without accessing private Plan content or initiating staffing decisions.

## 3. Glossary

- **Assessment** - A Manager-created campaign using one Team Framework, selected Members, and selected Framework Competencies.
- **Assessment Case** - One Member's Self-Assessment and Manager Assessment within an Assessment.
- **Competency Item** - One independently reviewed Framework Competency inside a Reassessment Request.
- **Competency Result** - The independent five-part Manager decision for one Competency Item.
- **Contextual Review** - Scoped qualitative input that cannot create or change an Official Rating.
- **Career Path** - The HR-governed graph of supported transitions between Career Positions.
- **Career Position** - One Organization Role + Role Level node with a target-expectation source.
- **Company Capability Priority** - One System Competency, Target Rating, required Employee count, and Target Date used by aggregate capability insight.
- **Criterion** - A Competency-specific observable proficiency statement for one Rating Level.
- **Development Action** - An Employee-owned action that may relate to one or more Framework Competencies and become Evidence when completed.
- **Development Plan** - An Employee-owned collection of Development Actions; Manager review is optional and non-approving.
- **Development Plan Review** - An Employee-initiated advisory Manager review of a captured Plan snapshot.
- **Evidence** - A reusable note, link, file, project reference, or completed Development Action with preserved context.
- **Expected Rating** - Rating Level 1 through 5 expected for one Framework Competency and one Role + Level.
- **Expectation Description** - The contextual statement explaining what the Expected Rating means for that Role + Level.
- **Framework** - The independent Team-scoped competency configuration used for future Assessment assignments.
- **Framework Category** - A Category inside one Framework; it does not modify its source Category.
- **Framework Competency** - A Framework-local copy or locally created Competency used by Assessment and Reassessment.
- **Framework Template** - An HR-owned reusable source copied once when a Framework is created.
- **Published Framework Revision** - An immutable whole-Framework configuration created when an authorized editor publishes a valid Working Draft.
- **Assessment Snapshot** - The immutable selected Competency and Member-specific context captured from one Published Framework Revision when an Assessment is assigned.
- **Initial Assessment Request** - An Employee request asking the responsible Manager to create an Assessment for unrated Competencies.
- **Manager Assessment** - The responsible Manager's independent rating activity that creates Official Ratings only when completed.
- **Learning Resource** - A manually curated Framework link or guidance item associated with a Competency or Criterion; it has no LMS completion semantics.
- **Member** - A person in the Organization model. An Employee, Manager, HR user, or reviewer is an authorized Product Role held by a Member.
- **Official Rating** - The current authoritative Manager rating for one Employee and Framework Competency lineage.
- **Organization Role** - A reusable organization-defined job role such as Backend Engineer that may be enabled in one or more Teams; it is not a Product Role.
- **Primary Manager** - The one active Manager responsible for an operational Team in MVP.
- **Organization Capability Overview** - A read-only aggregate comparison of Capability Priorities, comparable Official Ratings, and separate development coverage.
- **Product Role** - A permission-bearing role: HR, Manager, Employee, Contextual Reviewer, or Executive/Leadership.
- **Rating Level** - One of exactly five shared proficiency values used by every Competency.
- **Reassessment Request** - One Employee submission containing one or more independent Competency Items.
- **Role Level** - An ordered level within an Organization Role, such as L1 or L2; it is not a Rating Level.
- **Role + Level** - The exact Organization Role and Role Level assigned to a Member and used by expectations.
- **Self-Assessment** - The Employee's rating input, displayed separately and never blended into Official Ratings.
- **System Competency** - A reusable HR-governed Competency in the global Competency Library.
- **System Competency Category** - An HR-governed folder structure organizing System Competencies.
- **Target Position** - One Employee-selected reachable Career Position used for personal gap comparison only.
- **Not Comparable** - A target or aggregate comparison cannot safely match Competencies through approved provenance; it is not a rating.
- **Team** - The primary organizational scope for Members, enabled Organization Roles, a Primary Manager, one Active Framework, and at most one Candidate replacement Framework.
- **Unknown** - No effective rating exists for the relevant series. It is not Rating Level 1 and has no numeric value.

## 4. Features and Functional Requirements

### 4.1 Organization, Competency Library, and Framework Configuration

#### FR-1: Configure the Organization hierarchy

HR can create and maintain reusable Organization Roles and ordered Role Levels, enable Roles in Teams, assign Members one active primary Team and one enabled Role + Level, and assign one Primary Manager per operational Team.

**Consequences:**

- A Manager may manage multiple Teams and need not belong to the managed Team.
- An incomplete Team or Member can be saved but cannot enter blocked workflows.
- Team, Role + Level, and Manager changes retain effective history.

#### FR-2: Use one fixed five-level Rating Scale

Every Competency, Self-Assessment, Manager Assessment, Expected Rating, and Reassessment decision uses the same system-wide Rating Levels 1 through 5.

**Consequences:**

- HR, Manager, Template, Framework, and Competency cannot change the number or order of levels.
- `Unknown` is not a Rating Level.
- System-level labels and descriptions are versioned product content.
- Competency Criteria provide level-specific meaning without creating custom scales.

#### FR-3: Preserve configuration and decision history

The system preserves source provenance, configuration history, assignment history, Published Framework Revisions, Assessment Snapshots, Evidence snapshots, and official decision provenance.

**Consequences:**

- Publishing freezes the whole Published Framework Revision, and Assessment assignment freezes the selected Member and Competency context.
- Later Library, Template, Framework, Team, Role, Level, Member, or Manager changes never rewrite completed meaning.
- Referenced content is archived rather than hard-deleted.

#### FR-27: Manage System Competency Categories

HR can create, edit, order, archive, restore, and conditionally delete System Competency Categories.

**Consequences:**

- MVP supports a flat Category or one optional parent Category.
- A Category contains children or Competencies, not both.
- A System Competency belongs to exactly one leaf Category.
- Hard delete is limited to empty, unused, never-referenced Categories.

#### FR-28: Manage reusable System Competencies

HR can create, edit, activate, archive, and restore System Competencies with name, description, Category, Criteria for Rating Levels 1-5, and one or more default Role + Level Expectations.

**Consequences:**

- Only active System Competencies can be newly copied into Templates or Frameworks.
- Default expectations contain Expected Rating and Expectation Description.
- Activation requires all five Criteria and at least one complete default expectation.
- Later System Competency changes do not silently modify existing copies.

#### FR-29: Create reusable Framework Templates

HR can create, version, activate, archive, and reuse Framework Templates containing copied Categories, Competencies, ordering, Criteria, provenance, and optional expectation presets.

**Consequences:**

- A Template must contain at least one valid Competency before activation.
- Creating a Framework copies one Template version.
- Later Template changes never change an existing Framework.

#### FR-30: Create a Framework from a Template or empty state

HR can create a Framework by copying an active Template version or starting empty, then edit local Categories, Competencies, Criteria, and Role + Level Expectations.

**Consequences:**

- Framework content becomes independent immediately after creation.
- Source provenance remains visible but is not a live synchronization link.
- Framework-local content does not create or edit System Library content.

#### FR-31: Assign one Framework to a Team

`[ASSUMPTION A-4]` HR can assign a Framework to exactly one Team as a Candidate, confirm the Team's Primary Manager, and activate it only after a valid Published Framework Revision is published.

**Consequences:**

- A Team must have a Primary Manager before Candidate assignment.
- A Team has at most one Active Framework and one Candidate replacement Framework in MVP.
- An incomplete Candidate never replaces the current Active Framework.
- Activating a Candidate with a selected valid Published Framework Revision is atomic and preserves the prior Framework historically.

#### FR-32: Allow Manager-local Framework customization

`[ASSUMPTION A-5]` The responsible Manager can acquire the shared Framework Working Draft, add, edit, order, archive, restore, or remove local Categories and Competencies, configure Team Role + Level Expectations, and publish when Ready.

**Consequences:**

- Manager changes apply only to the assigned Framework Working Draft.
- The Manager cannot modify the System Library, Template, or another Framework.
- One active edit session prevents conflicting HR/Manager changes and silent last-write-wins behavior.
- Existing Published Framework Revisions and Assessment Snapshots are unchanged.

#### FR-33: Share the configuration workbench

HR and Manager use the same Category, Competency, Criteria, expectation, readiness, provenance, and change-history UI components with permission-aware scope.

**Consequences:**

- Scope banners clearly distinguish System Library, Template, and Team Framework.
- HR sees organization-wide sources; Manager sees only the assigned Team and Framework scope.
- The UI warns that Framework edits apply only to future Assessment assignments.

### 4.2 Assessment, Official Ratings, and Initial Assessment

#### FR-6: Create a cohort Assessment

The responsible Manager can create an Assessment with a name, the Active Framework's current Published Framework Revision, one or more selected Competencies, and one, multiple, or all eligible Team Members.

**Consequences:**

- One Assessment Case is created per selected Member.
- Assignment creates an immutable Assessment Snapshot with Member-specific Role + Level expectations.
- Ineligible Member/Competency combinations show explicit blockers.

#### FR-7: Complete a separate Self-Assessment

Each selected Employee can rate every assigned Competency using Rating Levels 1-5, snapshotted Criteria, and the applicable Role + Level Expectation.

**Consequences:**

- Every item must be answered before submission.
- Unanswered is `Not Answered`; missing official baseline remains `Unknown`.
- Self-Assessment never calculates or constrains the Official Rating.

#### FR-8: Complete Manager Assessment and create Official Ratings

After Self-Assessment submission, the responsible Manager can independently select one Rating Level for every included Competency and complete the Assessment Case.

**Consequences:**

- Manager drafts are not Official Ratings.
- Completion makes all included Manager ratings effective together.
- `[ASSUMPTION A-6]` The responsible Manager cannot be selected as an assessed Member in an Assessment they own; delegated self-rating authority is outside MVP.
- Employee acknowledgment is not required.

#### FR-9: Display a semantically transparent competency profile

The Employee and authorized Manager can view Self-Assessment, Official Rating, Expected Rating, Expectation Description, Criteria, `Unknown`, `Not Configured`, and numeric gaps as separate information.

**Consequences:**

- Gap equals Expected Rating minus Official Rating only when both exist.
- `Unknown` never becomes zero or Level 1.
- Current and historical Framework context are distinguishable.

#### FR-34: Enforce the Assessment lifecycle and immutable assigned scope

Assessment Draft scope is editable; assigned scope is immutable; completed cases cannot be reopened or edited.

**Consequences:**

- Members and Competencies cannot be added or removed after assignment.
- Working Draft changes and later Published Framework Revisions affect future Assessments only.
- A submitted Self-Assessment may be reopened before completion with reason and audit history.
- Additional scope requires a new Assessment.

#### FR-35: Request an Initial Assessment

`[ASSUMPTION A-7]` An Employee can request a first or missing Assessment for current Framework Competencies without Official Ratings; baseline status is evaluated per Competency rather than only for the whole Employee profile.

**Consequences:**

- The request routes to the Team's Primary Manager and creates no rating.
- An active covering Assessment suppresses duplicate Initial Assessment Requests.
- Missing Manager, Team, Role + Level, Framework, or expectation displays a configuration blocker.
- Reassessment is unavailable for unrated Competencies.

### 4.3 Career Path and Target Position

#### FR-4: Define and publish the Career Path

HR can create a Career Path Working Draft composed of Career Positions, where each Position references one reusable Organization Role + Role Level and explicit reachable next Positions.

**Consequences:**

- HR may save an incomplete draft, but only a valid Published Career Path Revision is Employee-visible.
- Publication requires at least one Position and no invalid transition references.
- `[ASSUMPTION A-11]` Each Career Position selects one active Framework Template version as its target-expectation source for that Role + Level.
- A Position is `Target Ready` only when its expectation source provides at least one System Competency and a complete Expected Rating plus Expectation Description for the Position's Role + Level.
- Each Published Career Path Revision is immutable and later revisions do not rewrite prior Target Position or Development snapshots.
- The graph represents company-supported development direction, not vacancies or guaranteed progression.

#### FR-10: Explore reachable Career Positions

An Employee can browse the current Published Career Path Revision from the Career Position derived from their active Role + Level and inspect explicitly reachable, Target Ready Positions.

**Consequences:**

- Employees see only published Positions and transitions; draft Career content remains HR-only.
- Reachability is configured by HR and is not inferred from level labels or graph proximity.
- Missing current Position mapping, no reachable Positions, or incomplete target expectations produce explicit empty or blocked states rather than invented paths.
- Career exploration does not expose vacancy, promotion, staffing, compensation, or succession status.

#### FR-11: Select, change, or clear one Target Position

An Employee can select one reachable Target Ready Career Position, change it to another eligible Position, or clear it without Manager approval.

**Consequences:**

- Target Position is for personal gap comparison only and does not create a proposal, agreement, target date, company commitment, or Development Plan prerequisite.
- If a later Career Path Revision removes the Position, removes reachability, or makes it not Target Ready, the selection becomes `Unavailable` until the Employee chooses another eligible Position or HR republishes a valid mapping.
- The system preserves the Career Path Revision and target expectation context used by historically captured Development and review records.

#### FR-12: Compare Official Ratings with Target Position expectations

The Employee can compare current Official Ratings with the selected Target Position's Expected Ratings and Expectation Descriptions for comparable Competencies.

**Consequences:**

- Target gap equals Target Expected Rating minus current Official Rating only when both values exist and Competency provenance is comparable.
- `[ASSUMPTION A-11]` Current and target Competencies match by System Competency provenance from the selected Framework Template version.
- Missing Official Rating displays `Unknown`; missing target expectation displays `Not Configured`; unsafe provenance matching displays `Not Comparable`.
- Target comparison never creates, migrates, averages, or changes an Official Rating.
- Every displayed gap links to Criteria and a valid next-action path such as a Development Action, curated Learning Resource, Initial Assessment, or Reassessment.

### 4.4 Employee-Owned Development and Evidence

#### FR-13: Create and maintain a Development Plan

An Employee can create and use a Development Plan immediately without Manager approval.

#### FR-14: Manage Development Actions

An Employee can create multiple Actions linked to one or more Competencies and move them through Planned, In Progress, Completed, Cancelled, or Superseded states.

#### FR-15: Create reusable Evidence

An Employee can create notes, links, files, and project references and associate them with one or more Competencies and Development Actions.

#### FR-16: Request optional plan review

An Employee can ask the Manager to review a Development Plan; `Reviewed` remains advisory and creates no resource or opportunity commitment.

**Consequences:**

- The Plan remains usable and editable while review is pending and after review.
- The Manager may comment and mark the request `Reviewed`, but cannot approve, reject, or take ownership of the Plan.
- `[ASSUMPTION A-13]` Review applies to an immutable Plan and Action snapshot; later material edits display `Changes Since Review` without invalidating the live Plan.
- A later review may be requested after material changes or Manager comments.

#### FR-17: Access Manager-curated resources

The responsible Manager can link curated resources to Framework Competencies or Criteria without creating LMS or AI recommendation behavior.

**Consequences:**

- `[ASSUMPTION A-14]` A Learning Resource is Framework-scoped content with title, resource type, link or guidance note, optional Criterion link, display order, and active/archive state.
- HR and the responsible Manager curate resources inside the Framework Working Draft; publishing the Framework Revision controls Employee visibility.
- Employees may open or reference resources from gap and Development Action views without enrollment, completion credit, or automatic status changes.
- Later resource edits or archival do not rewrite resources captured in historical Development or review snapshots.

#### FR-36: Link completed Development Actions as Evidence

An Employee can reference a completed Development Action in one or more Reassessment Competency Items without duplicating its content.

**Consequences:**

- Submission captures an immutable Action and Evidence snapshot.
- Later edits, cancellation, or supersession do not rewrite decision history.
- Completion alone never changes an Official Rating.

### 4.5 Multi-Competency Reassessment and Official Decision

#### FR-18: Submit one multi-Competency Reassessment Request

An Employee can create one Reassessment Request containing one or more eligible rated Competency Items, with a rationale or Criterion question and Evidence mapping for each item.

**Consequences:**

- The parent Request groups the workflow but has no Rating Level.
- Each item keeps independent current rating, Criteria, expectation, Evidence, status, and result.
- Invalid or duplicate items do not block eligible siblings.

#### FR-19: Enforce competency-specific eligibility and duplicates

The system permits at most one unresolved Reassessment Competency Item per Employee and current Framework Competency.

**Consequences:**

- An effective Official Rating must exist.
- A current active Assessment Case blocks competing reassessment for the same Competency.
- Materially new Evidence or a specific Criterion question is required.

#### FR-20: Expose grouped and item-level status

The Employee sees parent and per-item status; the Manager sees a Team queue and grouped review workspace.

**Consequences:**

- The parent can become Partially Decided.
- Sibling items may resolve at different times.
- A post-submission invalid or duplicate item may be Closed with a reason and no rating change; a parent with no decided items becomes Closed.
- Each existing Official Rating remains effective until its own item is decided.

#### FR-21: Request scoped Contextual Review

The Manager can invite one or more Contextual Reviewers with explicit Competency Item and Evidence scope.

**Consequences:**

- Reviewers respond qualitatively per Competency and cannot rate.
- Employee cannot see reviewer identity or raw confidential response.
- Manager may proceed without a response after recording that fact.

#### FR-22: Issue independent Competency Results

The Manager can decide each Competency Item with final Rating Level, Criteria, recognized Evidence, rationale, and next action or Evidence needed.

**Consequences:**

- All five fields are required even when the rating is unchanged.
- One item may change while another is unchanged or pending.
- Only the decided item's Official Rating may change.
- No blended result or Employee acknowledgment exists.

#### FR-23: Preserve Reassessment provenance

The system preserves request context, current rating provenance, Framework context, Evidence and Action snapshots, Contextual Review metadata, Competency Results, actors, and timestamps.

#### FR-37: Transfer pending responsibility safely

When Manager, Member Team, or Role + Level responsibility changes, unresolved Assessment and Reassessment work enters `Needs Responsibility Assignment` or `Needs Scope Review` until explicitly resolved.

**Consequences:**

- Old Manager decision rights end immediately.
- New Manager receives work only through audited HR assignment.
- Completed authorship and historical scope never change.

### 4.6 Company Capability Priorities and Organization Capability Overview

#### FR-5: Define Company Capability Priorities

HR or an authorized Executive/Leadership user can define a small set of Company Capability Priorities, each containing one active System Competency, Target Rating Level 1-5, Required Employee Count, Target Date, and optional business-context note.

**Consequences:**

- Priorities move through Draft, Active, and Archived states; only Active Priorities appear by default in the Overview.
- A never-activated, unreferenced Draft may be deleted; referenced Priorities are archived and remain auditable.
- A Priority expresses an organization capability target and creates no individual assignment, staffing, promotion, or compensation decision.

#### FR-24: Aggregate comparable current capability

The Organization Capability Overview compares each Active Priority with current effective Official Ratings that satisfy the approved Competency comparability rule.

**Consequences:**

- `[ASSUMPTION A-12]` An Official Rating is comparable only when its Framework Competency retains matching System Competency provenance and unchanged five-level Criteria from the referenced source version.
- The Overview shows required count, current comparable count at or above the target, remaining count gap, `Unknown`, `Not Comparable`, Target Date, and calculation timestamp.
- One active Employee counts at most once per Priority; duplicate comparable records produce a data-quality alert.
- `Unknown` and `Not Comparable` are reported separately and never count as Level 1 or achieved capability.

#### FR-25: Show development coverage separately

The Overview shows the number of active Employees with related active Development Plans or Actions as development coverage separate from achieved capability.

**Consequences:**

- Development coverage uses matching System Competency provenance but does not require or imply that the target Rating has been achieved.
- Coverage never changes an Official Rating or current comparable count.
- Aggregate users see counts, not individual Development Plan, Development Action, or Evidence content.

#### FR-26: Keep capability insight read-only and non-operational

HR and authorized Executive/Leadership users can inspect aggregate capability and development coverage, but the Overview cannot initiate or approve operational people decisions.

**Consequences:**

- The Overview has no project staffing, team formation, vacancy, promotion, compensation, succession, or workforce-planning actions.
- It cannot assign a Development Plan, change a Framework, create an Assessment, or modify an Official Rating.
- Historical Priority changes and aggregate calculation provenance remain auditable.

### 4.7 Permission Enforcement

#### FR-38: Enforce Product Role, scope, and action permissions

The system enforces Create, Read, Update, Delete/Archive, Assign, Assess, Rate, Review, and Audit permissions defined in `feature-spec.md`.

**Consequences:**

- HR status alone grants no rating authority.
- Manager rating authority depends on active Team responsibility.
- Employee actions are limited to own records and permitted requests.
- Contextual Reviewer access is invitation-scoped.
- Referenced and historical content cannot be hard-deleted.

## 5. Cross-Cutting Non-Functional Requirements

### NFR-1: Semantic consistency

- Rating Level, Role Level, Expected Rating, Official Rating, Self-Assessment, current gap, target gap, `Unknown`, `Not Configured`, and `Not Comparable` must be labeled consistently.
- No view may introduce a blended score or silently map missing data to a rating.
- Capability views must distinguish achieved comparable capability from development coverage.

### NFR-2: Configuration scope safety

- Every editor shows whether the user is changing System Library, Template, or Team Framework content.
- Copy and local-edit behavior must be explicit.
- Existing Assessment impact must be visible before Framework changes are saved.

### NFR-3: Historical integrity

- Assigned workflow content renders from immutable snapshots.
- Current configuration changes never rewrite assigned or completed records.
- Archived Organization and configuration content remains historically readable.
- Historical views preserve the relevant Published Framework Revision, Assessment Snapshot, Published Career Path Revision, target expectation context, Plan Review snapshot, Evidence snapshot, Priority definition, and aggregate calculation provenance.

### NFR-4: Role-based privacy and confidentiality

- Access follows least privilege.
- Employee cannot see raw Contextual Review content or reviewer identity.
- `[ASSUMPTION A-9]` HR ordinary access excludes individual Self-Assessment, Development Plan, Evidence content, and raw Contextual Review content unless a later privileged policy is explicitly added.

### NFR-5: Accessibility

- The target is WCAG 2.2 AA.
- Configuration trees, expectation matrices, rating controls, status, and comparisons are keyboard-operable and have non-color equivalents.

### NFR-6: Lightweight usability

- Readiness panels identify exact blockers rather than forcing users to discover missing configuration during Assessment.
- Shared configuration components reduce relearning between HR and Manager scopes.
- Drafts survive recoverable validation, authorization, and concurrency errors.

### NFR-7: Auditability

- Configuration, assignment, snapshot, workflow transition, responsibility transfer, official decision, and restricted-access events record actor and timestamp.

### NFR-8: Prototype form factor and performance

- The MVP remains the desktop-first responsive web experience confirmed in the Product Brief.
- Core seeded-data screens should become interactive within two seconds on a typical broadband connection; production-scale budgets remain open.

## 6. Constraints and Guardrails

- Configurable business content cannot change fixed product semantics.
- A Framework may be flexible, but an assigned Assessment is immutable.
- Manager customization cannot escape Team Framework scope.
- Contextual input cannot become rating authority or secret unexplained evidence.
- Employee development actions cannot imply achieved capability.
- Team or Framework changes cannot silently migrate ratings.
- Career Path, Target Position, Company Capability Priorities, and capability insight cannot become promotion, staffing, vacancy, compensation, succession, or workforce-planning workflows.
- Production security, retention, integration, and operational controls must be defined before real-data pilot use.

## 7. Non-Goals

- Custom Rating Scales or a number of Rating Levels other than five.
- Multiple primary Teams per Employee in MVP.
- Multiple active Primary Managers per Team or matrix-manager routing.
- Automatic rating migration across Team Frameworks.
- Live synchronization from Library to Template or Framework.
- Live synchronization from Template to existing Framework.
- Editing completed Official Ratings or decision history.
- Full performance review, calibration, compensation, promotion, succession, staffing, vacancy, team formation, or workforce planning.
- Manager approval of Employee Development Plans.
- Peer or Contextual Reviewer rating authority.
- AI-generated ratings, framework recommendations, coaching, or inferred capability.
- Gamification, badges, points, or provisional recognition.
- LMS replacement or learning marketplace behavior.
- Production HRIS/SSO, public APIs, advanced import/export, file-security architecture, or notification delivery in this prototype scope.

## 8. MVP Scope

### 8.1 In Scope

- Organization, Team, reusable Organization Role enabled per Team, ordered Role Level, Member, and Primary Manager setup.
- Fixed five-level Rating Scale, Criteria, `Unknown`, `Not Configured`, and gap semantics.
- System Competency Categories and reusable System Competencies.
- Default and Framework-local Role + Level Expectations with numeric rating and description.
- Framework Templates and independent Team Framework creation.
- HR Framework assignment and Manager-local customization in one shared workbench.
- Framework readiness validation and Assessment assignment snapshots.
- Cohort Assessment for one, multiple, or all eligible Team Members.
- Separate Self-Assessment, Manager Assessment, and Manager-only Official Ratings.
- Initial Assessment Request for unrated Competencies.
- HR-configured Career Path with reachable Role + Level Positions, immutable Published Career Path Revisions, and explicit target-expectation sources.
- Employee-selected Target Position and current-versus-target gap comparison without approval or company commitment.
- Employee-owned Development Plans, Actions, and Evidence.
- Employee-initiated optional advisory Development Plan Review with review snapshots.
- HR- and Manager-curated Framework Learning Resources without LMS or AI behavior.
- Completed Development Action Evidence reuse with immutable submission snapshots.
- One parent multi-Competency Reassessment Request with independent Competency Results.
- Scoped Contextual Review.
- Company Capability Priorities and a read-only Organization Capability Overview with comparable current capability and separate development coverage.
- Responsibility transfer, scope review, permissions, audit, and historical rendering.

### 8.2 Out of Scope for MVP

- Items listed in Section 7.
- Arbitrary-depth Category hierarchy beyond one optional parent level.
- Multiple active Frameworks for one Team.
- Per-Member Manager assignment.
- Automatic equivalence or carry-forward between Framework Competencies.
- Completed-record correction workflow beyond a later superseding decision.
- Production privacy, file, retention, integration, notification, and SLA implementation.

## 9. Success Metrics

### Primary

- **SM-1: Qualified pilot intent.** A target account names a real use case or pilot population, introduces an implementation owner, offers user/data access, or asks concrete pilot requirements.
- **SM-2: Configuration feasibility.** HR and Manager can identify how their Organization, reusable library, Team Framework, and rating authority map to En-Path without requiring custom product semantics.
- **SM-3: Assessment model comprehension.** Participants correctly distinguish Role Level from Rating Level, Self-Assessment from Official Rating, and `Unknown` from Level 1.
- **SM-4: Reassessment wedge resonance.** Employees and Managers value grouped submission with independent Competency Results over ordinary informal feedback.

### Secondary

- **SM-5: Framework setup feasibility.** Pilot stakeholders can prepare the minimum Team, Role + Level, Competency, Criteria, and expectation content required for an Assessment.
- **SM-6: Manager sustainability.** Cohort Assessment and Reassessment queues appear manageable at expected pilot volume.
- **SM-7: Historical trust.** Users understand that current configuration changes do not rewrite prior decisions.
- **SM-8: Career and capability comprehension.** Participants can distinguish Target Position from a promotion promise and development coverage from achieved capability.

### Counter-Metrics

- UI liking alone is not buyer validation.
- More Development Plans do not mean more achieved capability.
- More Reassessment Requests do not necessarily mean value.
- Reducing `Unknown` by inference or defaulting to Level 1 is prohibited.
- More configurability is not success if core semantics become organization-specific.

## 10. Risks and Mitigations

| Risk | Impact | MVP mitigation |
| --- | --- | --- |
| Configuration flexibility becomes product inconsistency | Users cannot compare or trust ratings | Fix five levels, authority, state, gap, and history semantics |
| Framework setup burden is too high for small organizations | Pilot cannot start | Reusable System Competencies, Templates, readiness validation, shared editor |
| Manager-local edits fragment competency meaning | Cross-Team interpretation weakens | Preserve provenance, Framework scope, snapshots, and open aggregation limits |
| Manager becomes workflow bottleneck | Assessments and requests stall | Cohort creation, queues, independent items, responsibility transfer, pilot workload measurement |
| Historical meaning changes after edits | Official decisions become indefensible | Published Framework Revisions, Assessment Snapshots, and Evidence snapshots |
| Multi-Competency request creates blended judgment | Trust and correctness failure | Independent Competency Items and Results; no parent rating |
| Confidential Review becomes black-box evidence | Employee distrust | Scoped access, no rating authority, required Manager explanation |
| Team or Manager changes strand work | Pending records cannot finish | Needs Responsibility Assignment and Needs Scope Review states |
| Target Position is mistaken for a promotion or vacancy promise | Employee distrust and expectation misalignment | Explicit non-commitment copy in selection, comparison, and Development views |
| Cross-Framework capability is aggregated despite incompatible Competency meaning | Misleading executive insight | System Competency provenance, unchanged-Criteria comparability rule, and explicit `Not Comparable` counts |
| Development coverage is mistaken for achieved capability | Leadership overestimates readiness | Separate visual series, labels, and counts with no combined score |

## 11. Remaining Open Questions

1. What final user-facing labels and editorial descriptions accompany Rating Levels 1 through 5?
2. Should HR have an exceptional investigation permission for raw Contextual Review content?
3. What file, retention, deletion, export, and legal-hold rules are required before a real-data pilot?
4. Which notification channels and response expectations are required for workflow queues?
5. Should Career Position target expectations continue to come from one Framework Template version, or should En-Path introduce a separate organization-level Career Position expectation profile?
6. Should Capability Overview exclude customized Competency Criteria as `Not Comparable`, or should HR later be able to certify cross-Framework equivalence?
7. Does a future version need multiple Team Managers, matrix Teams, or per-Member Manager assignment?
8. Should Templates later support mapping between different Organization Roles rather than copying only exact reusable Role + Level identities?
9. What exceptional correction workflow is allowed for an administrative error in a completed Official Rating?

## 12. Assumptions Index

- `[ASSUMPTION A-1]` Organization Roles and Role Levels are reusable organization identities; an Employee has one primary Team and one Role + Level; an operational Team has one Primary Manager; a Manager may manage multiple Teams and need not belong to them.
- `[ASSUMPTION A-2]` Categories support a flat structure or one parent level, contain either child Categories or Competencies, and each Competency belongs to one leaf Category.
- `[ASSUMPTION A-3]` A System Competency becomes active only after all five Criteria and at least one default Role + Level Expectation are complete.
- `[ASSUMPTION A-4]` A Team may have one Active Framework and at most one Candidate replacement; activation replaces the Active Framework atomically.
- `[ASSUMPTION A-5]` HR and Manager share one Working Draft with one active editor; concurrent last-write-wins editing is prohibited.
- `[ASSUMPTION A-6]` A responsible Manager cannot assess themselves, and one Assessment Case publishes all included Official Ratings atomically.
- `[ASSUMPTION A-7]` Baseline is evaluated per Employee and current Framework Competency, allowing mixed rated and `Unknown` profiles.
- `[ASSUMPTION A-8]` Direct Reassessment Evidence may include notes, links, files, and project references without requiring a Development Action.
- `[ASSUMPTION A-9]` Ordinary HR access excludes individual Self-Assessment, Development Plan, Evidence content, and raw Contextual Review content.
- `[ASSUMPTION A-10]` Responsibility changes use explicit `Needs Responsibility Assignment` and `Needs Scope Review` recovery states.
- `[ASSUMPTION A-11]` Each Career Position uses one active Framework Template version as its target-expectation source; target comparison matches current and target Competencies by System Competency provenance.
- `[ASSUMPTION A-12]` Organization Capability counts an Official Rating as comparable only when the Framework Competency retains matching System Competency provenance and unchanged five-level Criteria.
- `[ASSUMPTION A-13]` Development Plan Review applies to an immutable Plan snapshot; later material changes display `Changes Since Review` without invalidating the Employee-owned Plan.
- `[ASSUMPTION A-14]` Curated Learning Resources are Framework-scoped title/type/link-or-guidance items published with the Framework Revision, without enrollment or completion semantics.
- The initial target remains a growing organization of approximately 30 or more employees, as confirmed in the Product Brief.
- Production-scale performance, security, privacy, integration, file, retention, notification, and SLA requirements remain outside this product-level iteration.
