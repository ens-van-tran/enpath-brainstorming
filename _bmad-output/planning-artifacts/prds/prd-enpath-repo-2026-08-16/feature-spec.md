---
title: En-Path Product Feature Specification - Review Draft
status: draft
created: 2026-08-16
updated: 2026-08-16
parent: prd.md
---

# En-Path Product Feature Specification - Review Draft

## Document Role and Precedence

This document is the product-level review draft for En-Path domain semantics, feature behavior, permissions, state transitions, and UI flows. Once approved, it becomes the normative product specification. It refines the vision, non-goals, user journeys, and success framing in `prd.md` without defining database tables, APIs, services, or implementation architecture.

When an older statement in `prd.md` or `addendum.md` conflicts with this specification, the rule in this specification takes precedence. The companion PRD is updated in the same workflow so the artifact set describes one product model. Items marked `[ASSUMPTION A-n]` are Fast-path proposals that remain provisional until Vawn reviews them.

The governing design principle is:

> Configurable business content, stable product semantics.

## 1. Updated Product Model

### 1.1 Product Model Summary

En-Path is a configurable competency development and assessment framework platform. HR configures the organization, reusable Competency Library, Framework Templates, Team Frameworks, Career Path, Company Capability Priorities, and assignment boundaries. Managers customize the Framework assigned to their Team, curate learning resources, create Assessments, record Official Ratings, optionally review Employee-owned Development Plans, and decide Reassessment Requests. Employees complete Self-Assessments, compare current and target-position gaps, own Development Plans and Evidence, request an Initial Assessment when no baseline exists, and request reassessment after an Official Rating exists. Contextual Reviewers provide scoped qualitative context without rating authority. Executives and HR use a read-only Organization Capability Overview that keeps achieved capability separate from development coverage.

The conceptual relationship is:

```text
Organization
  -> Team
      -> enabled Organization Role
          -> Role Level
      -> Member assignment
      -> Primary Manager
      -> one Active Framework
      -> optional Candidate replacement Framework

Career Path
  -> Career Positions based on Organization Role + Role Level
  -> supported transitions
  -> Published Career Path Revision
  -> Employee-selected Target Position

Competency Library
  -> System Competency Category
      -> System Competency
          -> five Rating Level Criteria
          -> reusable Role + Level Expectation defaults

Framework Template
  -> copied Categories and Competencies

Framework
  -> assigned Team and responsible Manager
  -> Framework Categories
      -> Framework Competencies
          -> five Rating Level Criteria
          -> Team Role + Level Expectations
  -> one Working Draft
  -> immutable Published Framework Revisions

Assessment
  -> one Published Framework Revision
  -> selected Members
  -> selected Framework Competencies
  -> immutable Assessment Snapshot
  -> Self-Assessment per Member
  -> Manager Assessment per Member
  -> Official Ratings

Development
  -> Development Plan
      -> Development Actions
          -> Evidence
      -> optional Plan Review Request
  -> Framework-curated Learning Resources

Reassessment Request
  -> one or more Competency Items
      -> linked Evidence and completed Development Actions
      -> optional scoped Contextual Reviews
      -> independent Competency Result

Organization Capability
  -> Company Capability Priorities
      -> System Competency
      -> Target Rating Level
      -> Required Employee Count
      -> Target Date
  -> read-only Organization Capability Overview
      -> current capability from Official Ratings
      -> separate development coverage from active Development Plans
```

### 1.2 Fixed, Configurable, Copied, and Historical Behavior

| Area | Fixed system behavior | Configurable content | Copied or inherited behavior | Historical preservation |
| --- | --- | --- | --- | --- |
| Rating | Exactly five Rating Levels; `Unknown` is separate; no blended score | System-level labels and descriptions only | Same scale is used everywhere | Rating Level and displayed definitions used by a decision are snapshotted |
| Organization | Team, Organization Role, Role Level, Member, Primary Manager relationships | Names, descriptions, memberships, assignments | None | Assignment changes record effective history and never rewrite completed decisions |
| Competency Library | System Category and System Competency semantics | Category structure, competency content, Criteria, default expectations | Library content can seed Templates and Frameworks | Existing Templates, Frameworks, and Assessments never change silently |
| Framework Template | Reusable creation source, not a live parent | Template composition and ordering | Framework copies one Template version | Later Template changes do not modify existing Frameworks |
| Framework | One Team-scoped configuration; at most one Active Framework and one Candidate replacement per Team | Categories, Competencies, Criteria, Role + Level Expectations | May start from a Template or System Competencies | Publishing creates an immutable Published Framework Revision |
| Career Path | HR-governed reachable-position graph; Target Position creates no approval or commitment | Career Positions, transitions, target expectation source | Role + Level identities and Template content provide source context | Published Career Path Revisions and target-selection history remain understandable |
| Assessment | Self-Assessment and Manager Assessment stay separate; Manager owns Official Ratings | Assessment name, Member selection, Competency selection | Uses one Published Framework Revision | Assignment creates an immutable scoped Assessment Snapshot |
| Development | Employee owns plans, actions, and evidence; Manager review is advisory; resources are curated, not AI-generated | Plan/action content, review comments, Framework learning resources | Existing Evidence can be referenced instead of duplicated | Submitted Evidence, review snapshots, action snapshots, and resource provenance remain understandable |
| Reassessment | One parent request may contain multiple independent Competency Items; no blended result | Selected Competencies, rationale, Evidence, reviewers | Uses current Official Ratings and a captured Framework context | Each Competency Result preserves Criteria, Evidence, rationale, and provenance |
| Organization Capability | Read-only aggregate insight; Official Ratings and development coverage remain separate | Capability Priorities: Competency, target rating, employee count, target date | Uses System Competency provenance across comparable Framework Competencies | Calculations preserve as-of time, included scope, exclusions, and source decisions |

### 1.3 MVP Cardinalities

`[ASSUMPTION A-1]` The following organization and management cardinalities are the simplest proposed MVP model and require Vawn's confirmation.

- One Organization contains zero or more Teams and Members.
- A Team has zero or one active Primary Manager while being configured, but exactly one is required before a Framework can be assigned as Candidate or Active or the Team can start an Assessment.
- A Manager may manage multiple Teams.
- A Manager is an Organization Member but does not have to belong to the Team they manage.
- An Employee belongs to exactly one active primary Team in MVP.
- An Employee has exactly one active Organization Role + Role Level assignment in that Team.
- An Organization Role belongs to the Organization and may be enabled in multiple Teams.
- A Role Level belongs to exactly one Organization Role and has a unique ordered position within that Role.
- `[ASSUMPTION A-4]` applies to the following Team Framework cardinality.
- A Team has at most one Active Framework. It may also have one assigned Candidate Framework being configured as a replacement.
- A Framework belongs to exactly one Team and uses that Team's active Primary Manager as its responsible Manager.
- `[ASSUMPTION A-2]` applies to the following Category membership cardinalities.
- A System Competency belongs to exactly one leaf System Competency Category.
- A Framework Competency belongs to exactly one leaf Framework Category.
- A Reassessment Request contains one or more Competency Items.
- Each Competency Item targets exactly one Framework Competency and produces exactly one Competency Result.
- At most one unresolved Reassessment Competency Item may exist for an Employee and Framework Competency at a time.
- One Organization has one current Published Career Path Revision and may retain historical Revisions.
- An Employee has zero or one current Target Position and may change or clear it without approval.
- One Company Capability Priority references exactly one active System Competency.

## 2. Core Domain Concepts

### 2.1 Domain Vocabulary

| Concept | Product meaning |
| --- | --- |
| Product Role | Permission-bearing actor role: HR, Manager, Employee, or Contextual Reviewer. It is distinct from an Organization Role. |
| Organization Role | An organization-defined reusable job role, such as Backend Engineer or Technical Lead, that may be enabled in one or more Teams. |
| Role Level | An ordered level within an Organization Role, such as L1, L2, or L3. It is not a Rating Level. |
| Role + Level | The exact Organization Role and Role Level combination assigned to a Member and used by expectations. |
| Rating Level | One of the fixed system-wide proficiency values 1 through 5. |
| Unknown | No valid rating has been recorded for the relevant assessment series. It is not Rating Level 1 and has no numeric value. |
| Criterion | A proficiency statement describing observable behavior or evidence at one Rating Level for one Competency. |
| Role + Level Expectation | The Expected Rating plus a contextual expectation statement for one Competency and one Role + Level. |
| Career Position | One Organization Role + Role Level node in the Career Path, with a configured target-expectation source. |
| Career Path | The HR-governed graph of supported transitions between Career Positions. It is not a vacancy map. |
| Target Position | One Employee-selected reachable Career Position used for personal gap comparison only. |
| System Competency | Reusable HR-governed Competency content in the global Competency Library. |
| Framework Competency | An independent Team Framework copy or locally created Competency used by Assessments. |
| Published Framework Revision | An immutable whole-Framework configuration created when an authorized editor publishes a valid Working Draft. |
| Assessment Snapshot | The immutable selected Competency and Member-specific context captured from one Published Framework Revision when an Assessment is assigned. |
| Assessment | A Manager-created assessment cycle using one Published Framework Revision, one or more Members, and one or more Framework Competencies. |
| Assessment Case | One Member's Self-Assessment and Manager Assessment within an Assessment. |
| Official Rating | The current authoritative Manager rating for one Employee and one Framework Competency lineage. |
| Initial Assessment Request | An Employee request asking the responsible Manager to create the first or missing baseline Assessment. It is not an Assessment and creates no rating. |
| Reassessment Request | One Employee submission containing one or more Competency Items for Competencies with existing Official Ratings. |
| Competency Item | The independently reviewed unit inside a Reassessment Request. |
| Competency Result | The independent Manager decision for one Competency Item. |
| Learning Resource | A Manager- or HR-curated Framework item such as a title, link, or guidance note associated with a Competency or Criterion. |
| Plan Review Request | An Employee-initiated request for advisory Manager review of a Development Plan snapshot. |
| Company Capability Priority | A leadership or HR target containing one System Competency, target Rating Level, required Employee count, and target date. |
| Organization Capability Overview | A read-only aggregate view comparing Capability Priorities with current Official Ratings and separate development coverage. |
| Not Comparable | A target or aggregate comparison cannot safely match the relevant Competency through approved System Competency provenance. It is not a rating. |

### 2.2 Fixed Five-Level Rating Scale

Every Competency uses the same five Rating Levels. Organizations, HR, Teams, Frameworks, Competencies, and Managers cannot add, remove, reorder, or replace levels.

| Rating Level | Stable product meaning |
| --- | --- |
| Level 1 | Foundational: recognizes core concepts and performs limited work with close guidance. |
| Level 2 | Developing: applies basic practices in familiar situations with regular guidance. |
| Level 3 | Proficient: independently performs expected work in common situations and produces reliable outcomes. |
| Level 4 | Advanced: handles complex situations, improves practice, and guides others. |
| Level 5 | Expert: shapes standards or direction and solves novel problems with broad organizational impact. |

The labels and explanatory copy are system-level product content. They may be refined centrally without creating organization-specific scales, but historical Assessment and Reassessment views preserve the content shown at the time of the decision.

### 2.3 Rating Behavior

- Self-Assessment presents Rating Levels 1 through 5 with the shared definitions and the Framework Competency Criteria for each level.
- An unselected Self-Assessment item displays as `Not Answered`; `Unknown` is reserved for the absence of an effective rating and is not a selectable Rating Level.
- Manager Assessment presents the same five Rating Levels, Framework Competency Criteria, the Employee's submitted Self-Assessment, and relevant Evidence.
- The Manager must select one Rating Level for every included Competency before completing an Assessment Case.
- Self-Assessment never calculates, weights, averages, or constrains the Official Rating.
- A Contextual Reviewer cannot select a Rating Level.

### 2.4 Expectations and Gap Calculation

For each Framework Competency and applicable Role + Level, the Framework stores:

```text
Role + Level
  -> Expected Rating: Level 1 through Level 5
  -> Expectation Description: contextual statement for that role
```

The current-role gap is calculated only when both values exist:

```text
Current-Role Gap = Expected Rating for the Employee's current Role + Level
                   - current Official Rating
```

- A positive result means the Employee is below the expectation by that number of Rating Levels.
- Zero means the Employee meets the expectation.
- A negative result means the Employee exceeds the expectation.
- If Official Rating is `Unknown`, the gap is `Unknown`; the system does not calculate a number.
- If no Role + Level Expectation is configured, the gap is `Not Configured`, not `Unknown` and not zero.
- Self-Assessment gaps may be displayed as a separate comparison but never replace the Official Rating gap.
- Every displayed gap links to the applicable Criteria and at least one next-action path: Development Action, curated Learning Resource, Evidence collection, Initial Assessment, or Reassessment.

The target-position gap is calculated for each comparable target Competency:

```text
Target-Position Gap = Target Position Expected Rating
                      - current Official Rating for the comparable System Competency lineage
```

- Target expectations come from the current Published Career Path Revision.
- `[ASSUMPTION A-11]` A Career Position uses one Framework Template version as its target-expectation source; comparison matches current and target Competencies by System Competency provenance.
- A target Competency with no effective comparable Official Rating displays `Unknown`.
- A current or target Competency without approved System Competency provenance displays `Not Comparable`; no numeric gap is calculated.
- Target Position comparison never changes, migrates, or creates an Official Rating.

### 2.5 Conceptual Product Domains

The following are product boundaries, not required database tables:

- **Organization Domain:** Organization, Team, Organization Role, Role Level, Member, Primary Manager.
- **Career Domain:** Career Path, Career Position, transition, Published Career Path Revision, Target Position.
- **Competency Library Domain:** System Competency Category, System Competency, shared Rating Scale content, default Criteria, default expectations.
- **Framework Domain:** Framework Template, Framework, Framework Category, Framework Competency, Working Draft, Published Framework Revision, assignment, activation, and readiness.
- **Assessment Domain:** Assessment, Assessment Case, Self-Assessment, Manager Assessment, Official Rating.
- **Development Domain:** Development Plan, Development Action, Evidence, Plan Review Request, Learning Resource.
- **Reassessment Domain:** Initial Assessment Request, Reassessment Request, Competency Item, Competency Result, Contextual Review.
- **History Domain:** configuration changes, snapshots, assignment history, assessment provenance, evidence snapshots, and access audit.
- **Capability Insight Domain:** Company Capability Priority, comparable current capability, development coverage, Organization Capability Overview.

## 3. Organization Structure

### 3.1 Hierarchy and Responsibilities

```text
Organization
  -> Team
      -> enabled Organization Role
          -> Role Level
      -> Member
          -> one active Role + Level
      -> one active Primary Manager
```

HR owns all Organization structure configuration. Managers and Employees may read their permitted scope but cannot create or change Teams, Organization Roles, Role Levels, Team membership, Role + Level assignments, or Primary Manager assignments.

### 3.2 Team Rules

- HR can create, edit, archive, and inspect Teams.
- A Team may be saved without a Primary Manager while setup is incomplete.
- A Team without a Primary Manager cannot have a Framework activated, create an Assessment, receive an Initial Assessment Request, or process Reassessment work.
- Exactly one active Primary Manager is required for an operational Team in MVP.
- Replacing a Primary Manager records the effective date and triggers responsibility transfer rules for open work.
- A Primary Manager may manage multiple Teams.

### 3.3 Organization Role and Role Level Rules

- HR creates reusable Organization Roles at the Organization level and enables them in one or more Teams.
- HR creates one or more ordered Role Levels inside each Organization Role; enabled Teams use those same Role Level identities.
- Role Level labels such as `L1`, `L2`, and `L3` are organization content and do not need to match Rating Level numbers.
- An Organization Role cannot be disabled for a Team while active Team Members are assigned to it.
- An Organization Role cannot be archived organization-wide while any Team enables it or any active Member is assigned to it.
- A Role Level cannot be archived while active Members are assigned to it or while it is referenced by an active Framework expectation.
- HR must reassign affected Members and resolve active Framework references before archival.

### 3.4 Member Assignment Rules

- HR creates or activates a Member and assigns one primary Team.
- HR assigns exactly one Organization Role + Role Level enabled for that Team.
- A Member may additionally hold the HR or Manager Product Role without changing their job Role + Level.
- A Member without a Team or Role + Level may exist as incomplete setup but cannot be selected for an Assessment.
- Team, Role, and Role Level changes record effective history.
- Moving to another Team does not rewrite completed Assessments or prior Official Ratings.
- Ratings from the prior Team Framework remain historical. The new Team Framework begins with `Unknown` for its Framework Competencies until a new baseline is completed.

### 3.5 Career Path and Target Position

HR configures a company-supported Career Path as a directed graph of Career Positions.

- Each Career Position references one reusable Organization Role + Role Level.
- HR defines which Career Positions are reachable from each Position; reachability is explicit and does not imply a vacancy.
- `[ASSUMPTION A-11]` Each Career Position also selects one active Framework Template version as the target-expectation source for that Role + Level.
- A Position is `Target Ready` only when the selected Template contains at least one System Competency and complete Expected Rating plus Expectation Description content for the Position's Role + Level.
- HR may save an incomplete Working Draft, but Employees see only the current Published Career Path Revision and Target Ready Positions.
- The Employee's current Position is derived from their active Organization Role + Role Level and mapped to the published Career Path.
- The Employee may select one reachable Position as the current Target Position, change it, or clear it without Manager approval.
- Target Position has no proposal, agreement, target date, manually selected Competency list, vacancy, promotion promise, staffing action, compensation effect, or company commitment.
- Development Plan creation never requires a Target Position.
- Target gap comparison uses the published target expectation profile and the matching rules in Section 2.4.

### 3.6 Company Capability Priorities and Organization Capability Overview

HR or an authorized Executive/Leadership user may define a small set of Company Capability Priorities. Each Priority contains:

- one active System Competency;
- Target Rating Level 1 through 5;
- Required Employee Count;
- Target Date;
- optional business-context note;
- Draft, Active, or Archived state.

The read-only Organization Capability Overview shows, per Active Priority:

- required Employee count at or above the Target Rating;
- current comparable Employee count from effective Official Ratings;
- remaining count gap, never below zero;
- `Unknown` count;
- `Not Comparable` count;
- separate development coverage count from related active Development Plans;
- Target Date and an as-of timestamp.

Aggregation rules:

- `[ASSUMPTION A-12]` A current Framework Competency contributes to achieved capability only when it retains System Competency provenance matching the Priority and its five Criteria remain identical to the referenced System Competency source version.
- Framework-local Competencies and materially customized copies are `Not Comparable` for achieved-capability aggregation.
- Only active Employees and their current effective Official Ratings in Active Team Frameworks are counted.
- `Unknown` is reported separately and never treated as zero or Level 1.
- One Employee counts at most once per Priority even if duplicate comparable records exist; a data-quality alert identifies the duplicate.
- Development coverage counts active Employees with an active Development Plan or Action linked to a Framework Competency with matching System Competency provenance. It never counts as achieved capability.
- HR and Executive users see aggregate counts only; ordinary aggregate access does not expose individual Self-Assessments, Development Plan content, Evidence, or Contextual Review content.
- The Overview is not a staffing, team-formation, vacancy, promotion, compensation, succession, or workforce-planning workflow.

## 4. Competency Library

### 4.1 System Competency Category

A System Competency Category is an HR-governed organizational folder for System Competencies.

`[ASSUMPTION A-2]` The depth, single-category membership, and mixed-child rules below are the proposed simplest flexible Category model.

MVP rules:

- Only HR can create, edit, archive, restore, or delete a System Competency Category.
- A Category may contain multiple System Competencies.
- A System Competency must belong to exactly one leaf Category; uncategorized and multi-category Competencies are not allowed.
- MVP supports a flat Category or one optional parent Category, for a maximum depth of two.
- A Category may contain child Categories or Competencies, but not both at the same time.
- A Category may be hard-deleted only when it is empty and has never been referenced by a Template, Framework, or historical snapshot.
- A referenced Category is archived instead of deleted.
- A Category containing active child Categories or System Competencies cannot be archived until the children are moved or archived.
- Archiving removes the Category from new selection but does not alter existing Templates, Frameworks, Assessments, or history.

### 4.2 System Competency

A System Competency is reusable HR-governed source content. It contains:

- Name.
- Description.
- One System Competency Category.
- Criteria for Rating Levels 1 through 5.
- Optional organization-wide metadata needed for filtering and framework composition.
- One or more reusable default Role + Level Expectations for Organization Role + Level combinations.
- Active or archived lifecycle status.

Only HR can create, edit, archive, restore, or delete a System Competency.

### 4.3 System Competency Expectations

- HR defines default Expected Rating and Expectation Description entries for reusable Organization Role + Level identities.
- Defaults are reusable source content, not live rules applied to all Frameworks.
- When a System Competency is added to a Framework, defaults for Organization Roles and Role Levels enabled in the Framework Team are copied.
- Missing defaults remain `Not Configured` in the Framework until HR or the responsible Manager completes them.
- Later changes to System Competency defaults do not silently modify existing Frameworks.

### 4.4 System Competency Lifecycle

`[ASSUMPTION A-3]` Activation requires complete five-level Criteria and at least one reusable default expectation; Vawn should confirm whether library Competencies may instead become active before any default expectation exists.

- A never-referenced draft System Competency may be hard-deleted.
- A System Competency cannot be activated until all five Criteria and at least one complete default Role + Level Expectation exist.
- A System Competency referenced by any Template, Framework, Assessment, or historical record cannot be hard-deleted.
- Referenced Competencies may be archived, which prevents new imports while preserving every existing copy and historical reference.
- Archiving a System Competency does not archive its Framework Competency copies.
- Editing a System Competency does not change Template or Framework copies. HR must explicitly refresh or re-import source content where the relevant UI permits it.

## 5. Framework Template

### 5.1 Purpose and Ownership

A Framework Template is an HR-owned reusable starting point for Team Framework creation. It prevents repeated manual selection of Categories and Competencies but is never the live source of an existing Framework.

Only HR can create, edit, activate, archive, restore, or delete a Framework Template.

### 5.2 Template Contents

A Framework Template contains:

- Name and description.
- Ordered Template Categories.
- Ordered Template Competencies.
- Copied Competency names, descriptions, and Rating Level Criteria.
- Source provenance to the System Competency where applicable.
- Optional expectation presets that can be matched to the target Team's exact Role + Level identities.
- Template lifecycle status and version history.

A Template does not contain Team membership, a Primary Manager assignment, Assessment data, Official Ratings, Development data, or Reassessment data.

### 5.3 Template Creation and Update Rules

- HR composes a Template from active System Competency Categories and System Competencies in the Competency Library.
- Adding library content copies the current source content into the Template version.
- HR may edit copied ordering and expectation presets inside the Template without modifying the System Library; new Competency content is created in the System Library first.
- Later System Competency changes do not silently rewrite an active Template version.
- HR may explicitly refresh selected Template content from the System Competency source; the UI must show a change summary before saving a new Template version.
- A Template may be saved as Draft while empty or incomplete.
- A Template must contain at least one Competency before it can be activated.
- A referenced Template is archived rather than hard-deleted.

### 5.4 Framework Creation from a Template

- HR selects one active Template version.
- En-Path copies its Categories, Competencies, ordering, Criteria, provenance, and applicable expectation presets into a new Framework working configuration.
- The new Framework is independent immediately after creation.
- Later Template edits, archival, or deletion do not change the Framework.
- The Framework retains source Template name and version for provenance only.

## 6. Framework

### 6.1 Framework Purpose and Composition

A Framework is the Team-scoped competency configuration used for Assessment. It contains:

```text
Framework
  -> Team assignment
  -> responsible Primary Manager
  -> one shared Working Draft
      -> Framework Categories
          -> Framework Competencies
              -> Criteria for Rating Levels 1 through 5
              -> Role + Level Expectations
              -> curated Learning Resources
  -> immutable Published Framework Revisions
  -> configuration history
```

### 6.2 Framework Creation

HR can create a Framework from:

- an active Framework Template; or
- an empty Framework.

HR can then:

- add, edit, reorder, archive, restore, or remove Framework Categories;
- add System Competencies as independent Framework Competency copies;
- create Framework-local Competencies;
- edit Framework Competency names, descriptions, and Rating Level Criteria;
- configure Expected Ratings and Expectation Descriptions for the target Team's Role + Level combinations;
- add, edit, order, archive, or remove curated Learning Resources associated with a Framework Competency or Criterion;
- select a Team;
- confirm the Team's Primary Manager as responsible Manager;
- assign the Framework as a Candidate;
- publish a valid Published Framework Revision;
- activate a Published Framework Revision for new Team Assessments.

### 6.3 Framework Assignment and Readiness

`[ASSUMPTION A-4]` MVP uses one Active Framework plus at most one Candidate replacement per Team so configuration can continue without interrupting current Assessments.

- A Framework belongs to exactly one Team.
- The responsible Manager is the Team's active Primary Manager; HR cannot assign a different Manager without first changing the Team's Primary Manager.
- A Framework may be assigned as a Candidate while configuration is incomplete so the Manager can continue setup without replacing the Team's current Active Framework.
- Lifecycle and configuration readiness are separate:
  - `Draft`: not assigned to a Team.
  - `Candidate`: belongs to a Team and is visible to its Primary Manager but is not used for new Assessments.
  - `Active`: has a Published Framework Revision selected for new Team Assessments.
  - `Archived`: unavailable for new work but preserved historically.
  - `Incomplete`: fails one or more readiness rules.
  - `Ready`: satisfies all readiness rules for publication.
- A Team may have one Active Framework and at most one Candidate replacement Framework.
- A Candidate cannot replace the Active Framework until an authorized actor selects a valid Published Framework Revision for activation.
- Activating the Candidate atomically makes it Active and archives the previous Framework for new work while preserving all history.

### 6.4 Readiness Rules

A Framework Working Draft cannot be published unless:

- it is assigned to a Team with an active Primary Manager;
- it contains at least one Framework Competency;
- every active Framework Competency has complete Rating Level Criteria for Levels 1 through 5;
- every Role + Level currently assigned to an active Team Member has an Expected Rating and Expectation Description for every active Framework Competency.

Team-enabled Role + Level combinations with no active Member do not block publication. If a Member is later assigned to one of those combinations, new Assessment assignment for that Member is blocked until the current Framework Revision contains complete expectations.

The Working Draft may still be saved while incomplete. The UI shows a blocking validation list rather than silently filling missing expectations. Assessment assignment separately revalidates every selected Member and Competency combination against the Active Framework's current Published Framework Revision.

### 6.5 Manager Customization

After assignment, the responsible Manager may change only the assigned Framework Working Draft:

- add, edit, reorder, archive, restore, or remove Framework Categories;
- import System Competencies as independent copies;
- create Framework-local Competencies;
- add, edit, archive, restore, or remove Framework Competencies;
- edit Framework Competency descriptions and Rating Level Criteria;
- configure Expected Ratings and Expectation Descriptions for Role + Level combinations in the assigned Team.
- curate Framework-local Learning Resources for Competencies and Criteria.

Manager changes never modify:

- a System Competency Category;
- a System Competency;
- a Framework Template;
- another Team's Framework;
- an existing Published Framework Revision;
- an assigned or completed Assessment Snapshot.

`[ASSUMPTION A-5]` HR and the responsible Manager edit one shared Working Draft. The product permits only one active edit session at a time; a second editor receives a read-only notice until the first session is saved or released. No silent last-write-wins behavior is allowed. Either HR or the responsible Manager may publish a Ready Working Draft, and the actor is recorded.

### 6.6 Framework Change Behavior

- Publishing a Ready Working Draft creates an immutable Published Framework Revision.
- Publishing a new Revision for an Active Framework makes it current for future Assessment assignments; previous Revisions remain immutable history.
- Publishing a Candidate Revision does not replace the Active Framework until an authorized activation action selects that Revision.
- Unpublished Working Draft changes are preview-only and never change the Employee profile, Assessment eligibility, or any assigned workflow.
- The Active Framework's current Published Framework Revision controls current profile expectations and future Assessment assignment.
- The Active Framework's current Published Framework Revision also controls which curated Learning Resources Employees see.
- A Candidate's Published Framework Revision has no operational effect until Candidate activation.
- An Assessment is created from the Active Framework's current Published Framework Revision.
- Assigning an Assessment creates an immutable Assessment Snapshot containing the selected Competencies and Member-specific context from that Published Framework Revision.
- Removing a Category or Competency from the working configuration affects future Assessments only.
- Historical Assessments and Official Ratings retain the removed content in their Published Framework Revision and Assessment Snapshot.
- A removed Competency with historical ratings appears in a Historical Competencies view and cannot receive a new Reassessment unless it is active in the current Framework.
- Changing an Expected Rating or Expectation Description affects current gap displays and future Assessment assignments only after the corresponding Published Framework Revision becomes effective, and never rewrites the expectation captured by an earlier decision.

### 6.7 Shared HR and Manager Configuration UX

HR and Manager use the same configuration interaction model with a visible scope banner and permission-aware actions.

Reusable components:

1. **Configuration Scope Banner** - shows `System Library`, `Framework Template`, or `Team Framework`, source provenance, Team, and responsible Manager.
2. **Category Tree** - supports ordering, one optional parent level, empty-state guidance, and archive indicators.
3. **Category Editor** - name, description, parent selection, save validation, archive or remove action.
4. **Competency Editor** - basics, Category, five Rating Level Criteria, source provenance, and archive state.
5. **Role + Level Expectation Matrix** - rows are Team Role + Level combinations; columns capture Expected Rating and Expectation Description.
6. **Learning Resource Editor** - manages curated title, resource type, link or guidance note, optional Criterion link, ordering, and archive state without AI recommendations or LMS behavior.
7. **Source Picker** - HR sees System Library and Template sources; Manager sees System Library and the assigned Framework only.
8. **Readiness Panel** - lists blocking configuration gaps by Category, Competency, Role + Level, and Member eligibility.
9. **Change History Panel** - shows actor, timestamp, changed area, and prior/current summary.
10. **Assessment Impact Notice** - states that existing Assessments are unchanged and edits apply to future assignments.
11. **Edit Session Banner** - identifies the current Working Draft editor and prevents conflicting parallel changes.
12. **Publish and Activate Review** - validates readiness, summarizes changes, publishes a Published Framework Revision, and, for a Candidate, confirms replacement activation.

The component behavior is shared. Product Role determines scope, source access, governance authority, and available destructive actions.

## 7. Assessment

### 7.1 Assessment Model

An Assessment is a Manager-created campaign for one Team using one Published Framework Revision, one or more selected Members, and one or more selected Framework Competencies.

Assigning the Assessment:

1. validates every selected Member and Competency combination;
2. creates an immutable Assessment Snapshot scoped from the current Published Framework Revision;
3. creates one Assessment Case per selected Member;
4. assigns a Self-Assessment to each selected Member;
5. records the responsible Manager and assignment time.

Each Assessment Case contains one Self-Assessment, one Manager Assessment, and one Official Rating outcome per selected Framework Competency.

### 7.2 Assessment Creation Rules

The responsible Manager can:

- enter an Assessment name;
- select one managed Team and that Team's Active Framework when the Manager manages multiple Teams;
- confirm the Active Framework's current Published Framework Revision;
- select one Member, multiple Members, or all eligible Team Members;
- include all Framework Competencies applicable to those Members or select an applicable subset;
- review Member-specific expectations and blocking validation;
- confirm assignment.

An eligible Member must:

- be active in the Manager's Team;
- have an active Role + Level;
- have an applicable Framework Competency configuration for every selected Competency;
- have a complete Expected Rating and Expectation Description for every selected Competency;
- not have an overlapping active Assessment Case for the same Framework Competency.

### 7.3 Self-Assessment Behavior

- A Self-Assessment is created from the assignment snapshot and cannot add or remove Competencies.
- The Employee sees the snapshotted Competency description, Rating Level Criteria, Role + Level Expected Rating, and Expectation Description.
- The Employee selects Rating Level 1 through 5 for each item and may add comments or supporting Evidence.
- Unanswered items are `Not Answered`; they do not become Rating Level 1 and do not create an Official Rating.
- The Employee may save a draft.
- Submission requires every included Competency to have a selected Self-Assessment Rating.
- Submitted Self-Assessment values remain separate from Manager Assessment and Official Ratings.

### 7.4 Manager Assessment Behavior

`[ASSUMPTION A-6]` For MVP, the responsible Manager cannot rate themselves, and completing one Assessment Case makes all included Competency ratings official atomically rather than one at a time.

- Manager Assessment becomes available only after the Employee submits the Self-Assessment.
- The Manager sees the same snapshot, the Employee's Self-Assessment, applicable Evidence, and any prior Official Rating shown as historical context.
- The Manager independently selects Rating Level 1 through 5 for every included Competency.
- The Manager may save a draft before completing the Assessment Case.
- Draft Manager ratings are never Official Ratings.
- Completion requires every included Competency to have a Manager rating.
- On completion, all ratings in that Assessment Case become effective Official Ratings together.
- Employee acknowledgment is not required.
- The responsible Manager is ineligible as an assessed Member in an Assessment they own. If they are an Employee in another primary Team, that Team's Primary Manager may assess them; otherwise delegated self-rating authority is outside MVP.

### 7.5 Locked Scope After Assignment

After an Assessment is assigned:

- Published Framework Revision, Members, Competencies, Criteria, expectations, and Role + Level snapshots cannot be changed.
- Members cannot be added or removed from the campaign.
- Competencies cannot be added or removed from an Assessment Case.
- Framework edits apply only to future Assessment assignments.
- A new Member or additional Competency requires a new Assessment.
- A not-started Assessment Case may be cancelled with a reason; it is never hard-deleted.
- A started Assessment Case may be cancelled only when it cannot validly continue, and all submitted content remains in history.

### 7.6 Reopen and Correction Rules

- The responsible Manager may reopen a submitted Self-Assessment before the Assessment Case is completed.
- Reopening records a reason and returns the case to `Self-Assessment Reopened`.
- Any Manager Assessment draft remains saved but is marked `Reconfirmation Required` after the Employee resubmits.
- A completed Assessment Case cannot be reopened or edited.
- A later capability change uses Reassessment or a new Assessment.
- An administrative mistake in a completed record requires a new superseding decision with audit provenance; direct historical mutation is outside MVP.

## 8. Development Plan and Evidence

### 8.1 Ownership and Plan Behavior

- The Employee owns the Development Plan.
- A Development Plan is usable immediately without Manager approval.
- The Employee may create multiple Development Actions and associate each Action with one or more Framework Competencies.
- Manager review is optional and advisory.
- `Reviewed` means the Manager viewed or commented on the plan; it does not approve the plan or commit budget, time, projects, mentors, promotion, or staffing.

### 8.2 Optional Development Plan Review

- The Employee may request review of an active Development Plan from the current Primary Manager.
- The Plan remains active and editable while review is pending; review is never an approval gate.
- The Manager may add advisory comments and mark the request `Reviewed`.
- `[ASSUMPTION A-13]` A review captures a snapshot of the Plan and Actions viewed by the Manager. Later material edits show `Changes Since Review` but do not invalidate the Plan or imply that the Manager approved earlier or later content.
- The Employee may request another review after material changes or Manager comments.
- If Manager responsibility changes, a pending request follows the responsibility recovery rules; a completed review retains its original reviewer.

### 8.3 Development Action States

```text
Planned -> In Progress -> Completed
Planned -> Cancelled
In Progress -> Cancelled
Completed -> Cancelled
Completed -> Superseded
```

- The Employee may edit a Planned or In Progress Action.
- Completed Actions remain editable for non-destructive clarification, with change history.
- A Completed Action may later be Cancelled or Superseded with a reason; this changes the live source status but does not revoke prior Evidence use.
- Cancelling or superseding an Action never deletes previously submitted Evidence snapshots.
- Completion does not automatically change an Official Rating or prove that a Rating Level has been reached.

### 8.4 Evidence Types

The Employee can create or link:

- notes;
- links;
- files;
- project, task, or milestone references;
- completed Development Actions;
- existing Evidence already associated with the Employee.

Evidence may be associated with one or more Framework Competencies and one or more Development Actions.

Evidence context preserves, where supplied:

- project, task, or milestone;
- work date or evidence date;
- source or contributor;
- contributor relationship to the Employee;
- related Competencies and Development Actions.

### 8.5 Development Actions as Evidence

- A completed Development Action may be linked directly to a Reassessment Competency Item.
- The system references the existing Action and its Evidence rather than duplicating its content.
- The Employee may link one completed Action to multiple Competency Items when relevant.
- Relevance is evaluated independently for each Competency Item.
- Reassessment submission captures the Action title, description, status, Competency links, Evidence links, and relevant context as an immutable submission snapshot.
- If the live Action is later edited, cancelled, or superseded, the historical snapshot remains unchanged and the current UI marks that the source changed after submission.

### 8.6 Evidence Lifecycle

`[ASSUMPTION A-8]` Employees may add notes, links, files, and project references directly during Reassessment instead of first creating a Development Action.

- The Employee may edit or archive live Evidence they own when it is not locked by an active workflow.
- Evidence already referenced by a submitted Assessment or Reassessment cannot be hard-deleted by an ordinary user.
- Historical views render the submitted Evidence snapshot even if the live source is later archived.
- Direct notes, links, files, and project references may be added during Reassessment without first creating a Development Action.
- Production file scanning, retention, deletion, export, and legal-hold behavior remains outside this product-level iteration.

### 8.7 Curated Learning Resources

- `[ASSUMPTION A-14]` A Learning Resource is Framework-scoped content with a title, resource type, link or guidance note, optional Criterion link, display order, and active/archive state.
- HR and the responsible Manager may curate Learning Resources only inside an editable Framework Working Draft.
- Publishing the Framework makes the resources visible to Employees whose Role + Level uses the Competency.
- An Employee may open or reference a resource from a gap view or Development Action but does not need to enroll, complete, or receive LMS credit.
- Resource use never changes an Official Rating or Development Action status automatically.
- AI-generated recommendations, learning catalogs, course completion tracking, and LMS integration remain outside MVP.

## 9. Initial Assessment vs Reassessment

### 9.1 Baseline Is Competency-Specific

`[ASSUMPTION A-7]` Baseline status is competency-specific, so one Employee may have rated and unrated current Framework Competencies at the same time.

Baseline status is evaluated for each Employee and current Framework Competency, not as one undifferentiated employee flag.

| State | Meaning | Employee UI |
| --- | --- | --- |
| No Baseline | No completed Official Rating exists for the current Framework Competency | `Unknown`; offer Initial Assessment request behavior |
| Initial Assessment Requested | Employee has requested assessment but no covering Assessment is assigned | Show request status; do not offer duplicate request |
| Assessment Incomplete | A covering Assessment Case exists but is not completed | Show assessment status; do not offer Reassessment |
| Manager Draft Only | Manager saved a draft but the case is not completed | Still no Official Rating; show assessment status |
| Baseline Exists | A completed Assessment or later official decision created an effective Official Rating | Show Official Rating and permit Reassessment if other eligibility rules pass |
| Mixed Profile | Some current Framework Competencies have Official Ratings and others are `Unknown` | Offer Reassessment only for rated Competencies and Initial Assessment for unrated Competencies |

An Assessment record by itself does not establish baseline. A baseline exists only when an Official Rating is effective.

### 9.2 Initial Assessment Request

An Initial Assessment Request asks the responsible Manager to create an Assessment. It never creates a Self-Assessment, Manager Assessment, or Official Rating by itself.

Prerequisites:

- Employee has an active Team and Role + Level.
- Team has an active Primary Manager.
- Team has an Active Framework with a current Published Framework Revision.
- At least one current Framework Competency is `Unknown` for the Employee.
- No active Assessment Case already covers the requested Competency scope.

Employee behavior:

- If every current Competency is `Unknown`, the profile shows `Request your first assessment`.
- If only some current Competencies are `Unknown`, the Employee may request assessment for those missing Competencies.
- The Employee may include a short reason or context.

Manager behavior:

- Acknowledge the request.
- Create an Assessment containing the Employee and requested Competencies.
- Decline with a reason when the request is not appropriate or configuration is incomplete.

System behavior:

- Assigning a covering Assessment automatically marks the Initial Assessment Request `Fulfilled`.
- Only one active Initial Assessment Request may cover the same Employee and missing Competency scope.
- If no Manager exists, the system does not create an unroutable request; it displays an HR-actionable blocker.

### 9.3 Reassessment Eligibility

A Framework Competency is eligible for Reassessment only when:

- it is active in the Employee's current Team Framework;
- an effective Official Rating exists in the current Framework lineage;
- no unresolved Reassessment Competency Item already targets it;
- no active Assessment Case is currently establishing or replacing its Official Rating;
- the Employee provides materially new Evidence or a specific Criterion question.

An Employee with an incomplete baseline sees the in-progress state or Initial Assessment path, never a misleading Reassessment action for an unrated Competency.

## 10. Reassessment Flow

### 10.1 Parent Request and Competency Items

A Reassessment Request is one Employee submission that contains one or more Competency Items.

```text
Reassessment Request #123
  -> API Design Competency Item
      -> current Official Rating
      -> Evidence links
      -> optional Contextual Reviews
      -> independent Competency Result
  -> Database Competency Item
      -> current Official Rating
      -> Evidence links
      -> optional Contextual Reviews
      -> independent Competency Result
```

The parent Reassessment Request groups the Employee experience and Manager review workspace. It never has a blended Rating Level or one combined official decision.

### 10.2 Employee Submission Flow

The Employee:

1. opens `Request Reassessment` from the profile or Reassessment area;
2. sees only eligible rated Framework Competencies;
3. selects one or more Competencies;
4. provides a required rationale or Criterion question for each selected Competency;
5. links existing Evidence and completed Development Actions to one or more Competency Items;
6. optionally adds direct notes, links, files, or project references;
7. reviews the per-Competency Evidence mapping;
8. submits one Reassessment Request.

Validation:

- at least one eligible Competency must remain selected;
- every selected Competency needs a rationale or Criterion question;
- every selected Competency needs materially new Evidence unless the request is explicitly a Criterion clarification;
- an active duplicate blocks only the affected Competency Item;
- the UI reports ineligible selections and allows valid selections to proceed.

### 10.3 Manager Review Model

- The Manager may review all Competency Items in one grouped workspace.
- Each Competency Item retains independent Criteria, expectation snapshot, current Official Rating, Employee rationale, Evidence mapping, Contextual Review, status, and decision.
- The Manager may decide one item while another remains under review.
- The Manager may close an unresolved item without a rating decision only when post-submission validation proves it invalid or duplicative; a reason is required.
- One Competency may increase, decrease, or remain unchanged independently of every sibling item.
- Each existing Official Rating remains effective until its own Competency Item is decided.

### 10.4 Contextual Review

- The Manager may invite one or more Contextual Reviewers.
- Each invitation is explicitly scoped to one or more Competency Items.
- A bundled invitation may cover multiple items, but the reviewer responds separately for each Competency.
- The reviewer sees only the scoped Competency, snapshotted Criteria and expectation, Manager question, and explicitly shared Evidence.
- The reviewer provides qualitative context only and cannot select, recommend as authoritative, or change an Official Rating.
- Reviewer identity and raw response are hidden from the Employee.
- The Manager may proceed without a response but must record whether contextual input was unavailable or not considered.

### 10.5 Competency Result Contract

Every decided Competency Item produces one Competency Result with:

1. final Rating Level 1 through 5;
2. Criteria applied;
3. recognized Evidence;
4. Manager rationale;
5. next action or Evidence needed.

Rules:

- All five fields are required whether the Rating changes, decreases, or remains unchanged.
- The decided Rating becomes the new Official Rating only for that Framework Competency.
- Sibling Competency Items remain unaffected.
- No Employee acknowledgment is required.
- The parent Reassessment Request becomes `Partially Decided` when at least one item is decided and another is unresolved.
- The parent becomes `Completed` only when every Competency Item is decided or validly closed.
- No blended score, provisional score, badge, promotion signal, staffing recommendation, or compensation outcome is created.

## 11. Role and Permission Matrix

### 11.1 Permission Legend

- **Create:** create a new record in the permitted scope.
- **Read:** view current permitted content.
- **Update:** change current editable content.
- **Delete:** hard-delete only where explicitly allowed; otherwise archive or cancel.
- **Assign:** establish Team, Manager, Framework, Member, or workflow responsibility.
- **Assess:** submit a Self-Assessment or Manager Assessment.
- **Rate:** create or change an Official Rating.
- **Review:** comment, provide Contextual Review, or decide a request within scope.
- **Audit:** view immutable history and provenance within authorized scope.

### 11.2 Matrix

`[ASSUMPTION A-9]` Ordinary HR access is limited to governance metadata, Official Ratings, and provenance; it excludes individual Self-Assessment, Development Plan, Evidence content, and raw Contextual Review content unless a later exceptional-access policy is approved.

| Capability | HR | Responsible Manager | Employee | Contextual Reviewer | Executive/Leadership |
| --- | --- | --- | --- | --- | --- |
| Organization, Team, Organization Role, Role Level | Create, Read, Update, Archive, Audit | Read assigned scope | Read own assignment | No access | Read aggregate organization structure |
| Member and Team assignment | Create, Read, Update, Assign, Archive, Audit | Read assigned Members | Read self | No access | No individual access |
| Primary Manager assignment | Create, Read, Update, Assign, Audit | Read own responsibility | Read own Manager | No access | No access |
| Career Path and Career Positions | Create, Read, Update Working Draft, Publish, Archive, Audit | Read published path | Read published path | No access | Read published path |
| Employee Target Position | Audit metadata only | Read direct-report target for advisory coaching | Create, Read, Update, Clear own | No access | No individual access |
| System Competency Categories | Create, Read, Update, Archive; Delete only unused draft; Audit | Read active library | Read only through applicable Framework | No access | Read active library labels for Priorities |
| System Competencies and defaults | Create, Read, Update, Archive; Delete only unused draft; Audit | Read and copy active items | Read only through applicable Framework | No access | Read active items for Priorities |
| Framework Templates | Create, Read, Update, Activate, Archive; Delete only unused draft; Audit | Read active Templates for provenance; cannot modify | Read only through Target Position comparison | No access | No access |
| Framework create and assignment | Create, Read, Update, Assign, Archive, Audit | Read assigned Framework; cannot assign Team | Read current applicable content | No access | No access |
| Assigned Framework configuration | Create/Update in any organization Framework; Audit | Create, Read, Update, Archive local Categories, Competencies, expectations, and Learning Resources; Audit own scope | Read current applicable content and resources | No access | No access |
| Assessment | Read and Audit organization records; cannot assess or rate unless separately responsible Manager | Create, Read, Update Draft, Assign, Cancel within Team; Audit Team scope | Read own case | No access | No direct access |
| Self-Assessment | No ordinary content access; audit metadata only | Read submitted direct-report content; reopen before completion | Create, Read, Update own draft, Submit | No access | No access |
| Manager Assessment and Official Rating | Read Official Ratings and provenance; cannot edit | Create, Read, Update draft, Assess, Rate direct Team Members; cannot self-rate | Read own completed result | No access | Aggregate capability only; no individual rating access |
| Initial Assessment Request | Read and route configuration support | Read, acknowledge, fulfil, or decline Team requests | Create and Read own; cancel before acknowledged | No access | No access |
| Development Plan and Actions | No ordinary content access; audit metadata only | Read and comment for direct Team Members | Create, Read, Update, Archive own | No access | Aggregate development coverage only |
| Development Plan Review | Audit metadata only | Read, comment, and mark Reviewed for direct Team Members | Create and Read own request; continue editing Plan | No access | No access |
| Learning Resources | Read and configure within organization Frameworks | Create, Read, Update, Archive within assigned Framework | Read applicable published resources | No access | No access |
| Evidence | Audit metadata only | Read relevant direct-report Evidence | Create, Read, Update, Archive live own Evidence | Read only explicitly shared request scope | No access |
| Reassessment Request | Read status and Official Result for governance; Audit provenance | Read, Review, request context, and decide Team scope | Create, Read own and update Draft | Read invited scope only | No direct access |
| Contextual Review | Audit invitation metadata, not raw response content | Create invitation, Read raw response, use in decision | No raw content or reviewer identity | Read invitation; Create/Update own draft; Submit response | No access |
| Company Capability Priorities | Create, Read, Update, Activate, Archive, Audit | Read published Priority context | Read no aggregate by default | No access | Create, Read, Update, Activate, Archive, Audit |
| Organization Capability Overview | Read aggregate counts and calculation provenance | Read own Team contribution only if exposed | No access | No access | Read aggregate counts and calculation provenance |
| Historical configuration and decisions | Organization-wide Audit excluding restricted raw content | Audit current and historically responsible Team scope | Read own employee-facing history | Read own submitted response while retention policy permits | Audit Capability Priority and aggregate-calculation history only |

### 11.3 Permission Invariants

- Product Roles may be cumulative, but Official Rating authority always requires active responsible Manager scope.
- HR status alone never grants authority to rate an Employee.
- A Manager cannot rate themselves.
- Executive/Leadership status grants no individual Employee content, Assessment, Evidence, Development, or rating access.
- Target Position selection belongs to the Employee and requires no Manager or HR approval.
- Capability Overview access never permits drill-down to restricted individual content in MVP.
- When Manager responsibility ends, update and decision permissions end immediately; completed authorship remains historical.
- Hard delete is prohibited for referenced configuration, submitted workflow content, Official Ratings, Evidence snapshots, and audit history.

## 12. State Machines

### 12.1 Framework

```text
Framework lifecycle:
Draft -> Candidate -> Active -> Archived

Working configuration:
Incomplete <-> Ready -> Publish -> Published Framework Revision
```

- Candidate assignment requires Team and Primary Manager but does not replace an existing Active Framework.
- Only an Active Framework with a current Published Framework Revision can be used for new Assessment assignment.
- Publishing on an Active Framework advances the current Revision for future assignments only.
- Publishing on a Candidate does not activate it.
- Activating a Candidate with a selected valid Published Framework Revision archives the previous Active Framework atomically.
- Archival blocks new work and preserves history.

### 12.2 Assessment Campaign

```text
Draft -> Assigned -> In Progress -> Completed
Draft -> Cancelled
Assigned -> Cancelled
In Progress -> Cancelled
```

- Draft scope is editable.
- Assigned scope is immutable.
- In Progress begins when any Assessment Case is started.
- Completed requires at least one Completed Assessment Case and every remaining Case to be Completed or validly Cancelled.
- If every Assessment Case is Cancelled, the campaign becomes Cancelled rather than Completed.

### 12.3 Assessment Case

```text
Self-Assessment Assigned
  -> Self-Assessment In Progress
  -> Self-Assessment Submitted
  -> Manager Assessment In Progress
  -> Completed

Self-Assessment Submitted -> Self-Assessment Reopened -> Self-Assessment Submitted
Any non-completed state -> Needs Responsibility Assignment
Any non-completed state -> Needs Scope Review
Any non-completed state -> Cancelled
```

### 12.4 Initial Assessment Request

```text
Requested -> Acknowledged -> Fulfilled
    |             |
    +-> Declined  +-> Declined
    +-> Cancelled
    +-> Awaiting Manager Assignment -> Requested
```

### 12.5 Development Action

```text
Planned -> In Progress -> Completed
Planned -> Cancelled
In Progress -> Cancelled
Completed -> Cancelled
Completed -> Superseded
```

### 12.6 Reassessment Request

```text
Draft -> Submitted -> In Review
In Review -> Awaiting Context
In Review -> Partially Decided
In Review -> Completed
In Review -> Closed
```

Parent state is derived from Competency Item states and has no Rating Level.

- `Submitted`: no item has entered Manager review.
- `Awaiting Context`: no item is decided and every unresolved item is waiting for Contextual Review.
- `Partially Decided`: at least one item is Decided and at least one item remains unresolved.
- `Completed`: at least one item is Decided and every other item is Decided or Closed.
- `Closed`: every item is Closed and no Competency Result was issued.

### 12.7 Reassessment Competency Item

```text
Submitted -> Under Review -> Decided
                  |
                  +-> Awaiting Contextual Input -> Under Review

Any unresolved state -> Closed
Any unresolved state -> Needs Responsibility Assignment
Any unresolved state -> Needs Scope Review
```

`Closed` requires a reason such as scope invalidation or a duplicate discovered after submission. Closing an item never changes its existing Official Rating.

### 12.8 Responsibility and Scope Recovery

`[ASSUMPTION A-10]` The explicit recovery states and transfer behavior below are proposed so responsibility changes never grant implicit decision authority.

- **Needs Responsibility Assignment:** HR assigns a new active Primary Manager. The record returns to its immediately prior operational state, but any prior Manager draft is marked `Reconfirmation Required`. HR may cancel the unresolved record with a reason when no valid reassignment is possible.
- **Needs Scope Review:** The new responsible Manager reviews the captured snapshot against the Employee's current Team, Role + Level, and Framework. If the original Framework Competency remains applicable within the same Framework lineage, the Manager may continue under the original snapshot and records that choice. Otherwise the unresolved Assessment Case or Competency Item is cancelled with a reason and a new workflow must be created under current scope.
- **Awaiting Manager Assignment:** When HR assigns a Primary Manager, an Initial Assessment Request returns to `Requested` and is routed to that Manager. HR or the Employee may cancel it before acknowledgment.
- No recovery transition mutates submitted snapshots, prior actors, or completed results.

### 12.9 Contextual Review

```text
Invited -> In Progress -> Submitted
   |             |
   +-> Cancelled +-> Expired
```

### 12.10 Career Path

```text
Working Draft: Incomplete <-> Ready -> Publish -> Published Career Path Revision
Published Career Path Revision -> Superseded by later Published Revision
```

- Publication requires at least one Career Position and no invalid transition references.
- A Career Position may remain visible but not Target Ready when its target expectation source is incomplete.
- Publishing a new Revision changes future navigation and live target comparisons; prior target-selection and Development snapshots retain their captured Revision.

### 12.11 Target Position

```text
None -> Selected -> Changed
Selected -> Cleared
Changed -> Cleared
```

- Selection and change are Employee-controlled and require no approval.
- If a selected Position is removed or becomes not Target Ready in a later Revision, the selection becomes `Unavailable` until the Employee selects another Position or HR republishes a valid mapping.

### 12.12 Development Plan Review

```text
Requested -> In Review -> Reviewed
Requested -> Cancelled
In Review -> Needs Responsibility Assignment
```

- Plan use and editing continue in every state.
- A Reviewed record is immutable and identifies the reviewed Plan snapshot; later material edits display `Changes Since Review`.

### 12.13 Company Capability Priority

```text
Draft -> Active -> Archived
Draft -> Deleted, only when never activated or referenced
```

- Only Active Priorities appear in the default Organization Capability Overview.
- Changing an Active Priority records history and refreshes the read-only calculation without changing any Official Rating or Development record.

## 13. Business Rules and Invariants

### Rating and Meaning

- **BR-1:** The system has exactly five Rating Levels.
- **BR-2:** `Unknown` is not a Rating Level and has no numeric value.
- **BR-3:** Every Competency uses the shared five-level scale.
- **BR-4:** Self-Assessment and Official Rating are never blended.
- **BR-5:** Only an active responsible Manager may create an Official Rating.
- **BR-6:** A gap is numeric only when both Official Rating and Expected Rating exist.
- **BR-7:** Missing expectation is `Not Configured`, not `Unknown`.

### Organization and Scope

- **BR-8:** An operational Team has exactly one active Primary Manager.
- **BR-9:** An Employee has one active primary Team and one active Role + Level in MVP.
- **BR-10:** A Manager may manage multiple Teams and need not belong to them.
- **BR-11:** A Manager cannot rate themselves.
- **BR-12:** Team, Role + Level, and Manager changes never rewrite completed history.
- **BR-12A:** Organization Roles and Role Levels are reusable organization identities enabled within Teams.

### Career Path and Target Position

- **BR-12B:** HR alone configures and publishes the Career Path; Employees see only Published Career Path Revisions.
- **BR-12C:** A Target Position is one Employee-selected reachable Career Position and requires no approval.
- **BR-12D:** Target Position selection creates no vacancy, promotion, staffing, compensation, or company commitment.
- **BR-12E:** Target gap comparison never changes or migrates an Official Rating.
- **BR-12F:** A target comparison is numeric only when a target expectation and a comparable effective Official Rating both exist.

### Library, Template, and Framework

- **BR-13:** A System Competency belongs to exactly one leaf System Competency Category.
- **BR-13A:** An active System Competency has five complete Criteria and at least one complete default Role + Level Expectation.
- **BR-14:** Referenced Categories and Competencies are archived, not hard-deleted.
- **BR-15:** System Library changes never silently modify Templates or Frameworks.
- **BR-16:** Template changes never silently modify existing Frameworks.
- **BR-17:** Manager edits are scoped to one assigned Framework.
- **BR-18:** A Team has at most one Active Framework and one Candidate replacement Framework in MVP.
- **BR-18A:** One shared Framework Working Draft may have only one active editor; conflicting parallel saves are prohibited.
- **BR-19:** Publishing creates an immutable Published Framework Revision.
- **BR-20:** Assessment assignment creates an immutable scoped Assessment Snapshot from one Published Framework Revision.
- **BR-20A:** Framework changes never modify Published Framework Revisions or assigned/completed Assessment Snapshots.

### Assessment

- **BR-21:** Assessment scope is editable only in Draft.
- **BR-22:** Manager Assessment opens only after Self-Assessment submission.
- **BR-23:** Manager drafts are not Official Ratings.
- **BR-24:** Completing an Assessment Case makes all included Manager ratings effective together.
- **BR-25:** Completed Assessment Cases are immutable.
- **BR-26:** Overlapping active Assessment Cases for the same Employee and Framework Competency are prohibited.
- **BR-27:** An Assessment record without a completed Official Rating does not establish baseline.

### Development and Evidence

- **BR-28:** Employee owns Development Plans, Actions, and live Evidence.
- **BR-29:** Manager review of a Development Plan is advisory, not approval.
- **BR-30:** Completing a Development Action never changes an Official Rating automatically.
- **BR-31:** Evidence may support multiple Competencies without duplication.
- **BR-32:** Submitted Evidence and Action snapshots cannot be rewritten by later live-source edits.
- **BR-32A:** Development Plan review is Employee-initiated and advisory; the Plan remains usable in every review state.
- **BR-32B:** `Reviewed` applies to a captured Plan snapshot and creates no resource, opportunity, or approval commitment.
- **BR-32C:** Learning Resources are manually curated Framework content and never create completion credit or an Official Rating.

### Initial Assessment and Reassessment

- **BR-33:** An Employee may request an Initial Assessment but cannot create the Assessment or Official Rating.
- **BR-34:** Reassessment eligibility is competency-specific.
- **BR-35:** A Reassessment Request contains one or more independent Competency Items.
- **BR-36:** Each Competency Item has one independent Competency Result.
- **BR-37:** At most one unresolved Reassessment Competency Item exists per Employee and Framework Competency.
- **BR-38:** Sibling Competency Items may resolve at different times and with different ratings.
- **BR-38A:** Closing an invalid or duplicate Competency Item requires a reason and never changes its Official Rating.
- **BR-39:** The existing Official Rating remains effective until its Competency Item is decided.
- **BR-40:** Every decided item requires final rating, Criteria, recognized Evidence, rationale, and next action or Evidence needed.
- **BR-41:** Contextual Review is qualitative and cannot create or change an Official Rating.
- **BR-42:** Reassessment produces no blended rating or implied promotion, staffing, compensation, or vacancy outcome.

### Organization Capability Insight

- **BR-42A:** A Company Capability Priority contains one System Competency, Target Rating Level, Required Employee Count, and Target Date.
- **BR-42B:** Current capability uses only effective Official Ratings that satisfy the approved comparability rule.
- **BR-42C:** `Unknown` and `Not Comparable` are reported separately and never count as achieved capability.
- **BR-42D:** Development coverage is displayed separately and never counts as achieved capability.
- **BR-42E:** One Employee counts at most once per Capability Priority.
- **BR-42F:** Organization Capability Overview is read-only aggregate insight and cannot initiate staffing, promotion, compensation, succession, or vacancy actions.

### History and Permissions

- **BR-43:** Referenced configuration and submitted workflow records cannot be hard-deleted.
- **BR-44:** Responsibility changes revoke active update and decision rights immediately.
- **BR-45:** Historical records always retain original actor, scope, Framework meaning, Evidence context, and timestamps.
- **BR-45A:** Historical Career Path Revisions, Target Position snapshots, Plan Reviews, Capability Priorities, and aggregate calculation provenance remain auditable.

## 14. Detailed UI Flows

All flows use the same error principles:

- validation is shown at the field and summary level;
- blocking configuration gaps identify the exact Team, Member, Role + Level, Framework Competency, or expectation involved;
- user-entered drafts are preserved after recoverable errors;
- unauthorized actions are not shown, and direct access returns a clear scope error;
- archived or historical content is read-only and visibly labeled.

### 14.1 HR Flows

| ID and flow | Entry point and prerequisites | User actions | Validation and system behavior | Resulting state, permission, empty/error handling |
| --- | --- | --- | --- | --- |
| HR-1 Organization setup | `Administration > Organization`; HR Product Role | Create or review the Organization profile; move through setup checklist | Validates required Organization name and surfaces incomplete Teams, Members, and assignments | Saves Organization configuration. Empty state explains Team-first setup. Only HR can update; non-HR receives read-only or no access. |
| HR-2 Team creation | `Organization > Teams > New Team`; Organization exists | Enter Team name and description; save Draft | Prevents duplicate active Team names; permits no Manager during Draft | Creates a non-operational Team. Empty state prompts Role, Member, and Manager setup. Archive replaces delete after references exist. |
| HR-3 Organization Role creation | `Organization > Roles` or `Team > Enable Role`; Organization and optional Team exist | Create reusable Role name/description or enable an existing Role for a Team | Role name must be unique in the Organization; enabled Team is recorded; Role cannot support assignment without a Role Level | Creates Organization Role or Team enablement. Duplicate error suggests using the existing Role rather than creating a Team-local copy. |
| HR-4 Role Level creation | `Organization > Role > Add Level`; Role exists | Enter Role Level label, display name, order, and description; save or reorder | Label/order must be unique within Role; Rating Level terminology is not used | Creates reusable ordered Role Level available to Teams that enable the Role. Archival is blocked while Members or active Framework expectations reference it. |
| HR-4A Start Career Path configuration | `Organization > Career Path`; HR role and at least one Role + Level exist | Open current published graph; create or resume Working Draft; review change summary | Only one Working Draft is editable; existing Published Revision remains live | Creates or opens Career Path Working Draft. Empty state explains that nodes are Role + Level positions, not vacancies. Recoverable errors preserve the Draft. |
| HR-4B Add/edit Career Positions | Career Path Working Draft > Positions | Select Organization Role + Role Level; enter display guidance; choose active Framework Template version as target-expectation source; save, reorder, or archive | Prevents duplicate active node identity; Role + Level and Template must be active; incomplete target expectations mark node `Not Target Ready` | Creates or updates a Career Position without affecting the published graph. Missing Template/expectation shows exact blocker and setup link. |
| HR-4C Configure reachable transitions | Career Path Working Draft > Graph | Connect source Position to one or more destination Positions; remove or reorder transitions; preview Employee view | Blocks self-loop and duplicate edge; warns on unreachable orphan nodes and cycles without a valid exit while allowing intentional non-linear paths | Saves supported transitions in Draft. Empty node has no reachable next Position; this is shown explicitly, not treated as a vacancy shortage. |
| HR-4D Validate target expectations | Career Path Working Draft > Readiness | Review each Position's Template Competencies and Role + Level expectations; resolve `Not Configured` or provenance gaps | Target Ready requires at least one System Competency and complete target expectation; `Not Comparable` preview identifies Framework mapping limitations | Updates readiness only. Invalid Position may remain in Draft but cannot be Employee-selectable after publication. |
| HR-4E Publish Career Path | Career Path Working Draft > Review and Publish | Review added/removed nodes, transitions, target expectation sources, and impact on current Target Positions; publish | Requires at least one valid Position and no broken edge; warns which existing Employee targets become Unavailable | Creates immutable Published Career Path Revision and makes it current. Prior Revision and target-selection snapshots remain historical; failure leaves current Revision unchanged. |
| HR-5 Member assignment | `Team > Members > Add/Assign`; Member exists or is created | Select Member, Team, Organization Role, and Role Level; set effective date; confirm | Team, Role, and Level must be compatible; one active Team and Role + Level only; impact preview appears for reassignment | Creates active membership and assignment history. Missing Roles/Levels link to setup. Active workflow impact may require scope review. |
| HR-6 Primary Manager assignment | `Team > Manager`; Team and Manager Member exist | Select one Manager; review impacted open work; set effective date; confirm | Prevents more than one active Primary Manager; Manager cannot be inactive; shows managed-Team count | Team becomes operational when other prerequisites pass. Replacement transfers responsibility and audits old/new Manager. No Manager empty state blocks workflow actions. |
| HR-7 System Competency Category creation | `Competency Library > New Category`; HR role | Enter name, description, optional parent; save | Enforces maximum depth two, unique active sibling name, and `children or Competencies, not both` rule | Creates Category Draft/Active content. Delete only for empty never-referenced Category; otherwise archive. |
| HR-8 System Competency creation | `Competency Library > Category > New Competency`; leaf Category exists | Enter name/description; define Level 1-5 Criteria; configure Role + Level default expectations; review and activate | Requires Category, all five Criteria, and at least one complete default expectation for activation; expected ratings limited to 1-5 | Creates active reusable System Competency. Incomplete expectation matrix remains Draft. Archive used content; duplicate names in same Category produce error. |
| HR-9 Framework Template creation | `Framework Templates > New`; active System Competency content exists | Enter basics; select and copy Categories and Competencies; reorder; edit copied expectation presets; validate; activate | Template needs at least one Competency and complete five-level Criteria; source copy summary is shown | Creates active versioned Template. Empty/incomplete content remains Draft. New Competency content is created in the System Library first; used Template is archived, not deleted. |
| HR-10 Framework creation | `Team Frameworks > New`; Team may be selected now or later | Choose Template version or Empty; copy content; edit composition; select Team; review matching expectation defaults | Copy is independent; validates active Template, Team compatibility, duplicate Categories/Competencies, and expectation gaps | Creates Framework Draft. Candidate assignment occurs in HR-11 after a Primary Manager is confirmed. Template update never changes it; errors preserve the Working Draft. |
| HR-11 Framework assignment and activation | `Framework > Assignment`; Framework and Team exist | Select Team; confirm Primary Manager; assign Candidate; complete/publish Working Draft; select the Published Framework Revision; review replacement impact; activate | Team may keep its current Active Framework while Candidate is incomplete; activation requires a valid Published Framework Revision and is atomic | Candidate becomes Active and previous Active Framework becomes Archived for new work. Failure leaves the previous Active Framework unchanged. |
| HR-12 Company Capability Priority creation | `Organization Capability > Priorities > New`; HR role and active System Competency exist | Select Competency; choose Target Rating 1-5; enter required Employee count, Target Date, and optional context; save Draft or activate | Count must be positive; date required; duplicate active Priority warning explains overlap | Creates Draft or Active Priority. Empty state explains current capability versus development coverage. Referenced Priority is archived, not deleted. |
| HR-13 View Organization Capability Overview | `Organization Capability`; HR role and at least one Active Priority | Review achieved count, count gap, Unknown, Not Comparable, development coverage, as-of time, and calculation explanation | Uses only comparable effective Official Ratings; no individual Self-Assessment, Plan, Evidence, or reviewer content is exposed | Read-only aggregate Overview. No-data state distinguishes no ratings, no comparable Frameworks, and no active Plans. Calculation error preserves last successful as-of view with warning. |

### 14.2 Manager Flows

| ID and flow | Entry point and prerequisites | User actions | Validation and system behavior | Resulting state, permission, empty/error handling |
| --- | --- | --- | --- | --- |
| M-1 View assigned Framework | `My Team > Framework`; active Primary Manager | Open Active Framework and any Candidate; review Published Framework Revision, Working Draft, readiness, history, and provenance | Confirms current responsibility; shows read-only historical Framework if responsibility ended | Manager sees one shared Working Draft per assigned Framework. No Framework empty state asks HR to assign one. |
| M-2 Configure Framework | `Framework > Configure`; assigned Framework and edit session available | Acquire edit session; edit Working Draft; use readiness panel; save/release; publish when Ready | Every save records history; second editor is read-only; existing Assessments show `unchanged` notice | Updates only the Team Framework Working Draft. No silent last-write-wins; permission loss releases editing and preserves saved history. |
| M-3 Add/edit/remove Framework Categories | Category Tree in assigned Framework | Add local Category or copy Category structure; rename, reorder, move, archive, restore, or remove | Enforces depth and mixed-child rules; blocks removal that would orphan active Competencies unless they are moved/removed together | Future Working Draft changes. Published Framework Revisions remain unchanged. Empty state offers `Add from Library` or `Create locally`. |
| M-4 Add/edit/remove Framework Competencies | Framework Category > Competency actions | Add from System Library or create local; edit name, description, five Criteria, Category; archive/restore/remove | Copy is local; all five Criteria required for Assessment readiness; removal impact shows current/history distinction | Updates future Framework configuration only. Removed historical Competency appears read-only in History and is unavailable for new Reassessment. |
| M-5 Configure Role + Level Expectations | Competency Editor > Expectations; Team has Roles/Levels | Review Role + Level rows currently used by Team Members; select Expected Rating 1-5; enter required Expectation Description; optionally prepare unused Team Role + Level rows | Missing rating/description blocks readiness for Role + Level combinations used by active Members; unused combinations do not block publication | Saves Framework-local expectations. Missing rows remain `Not Configured`; matrix empty state points to HR Organization setup. |
| M-5A Curate Learning Resources | Framework Competency > Resources; assigned Framework Working Draft editable | Add title, type, link or guidance note, optional Criterion link; reorder, archive, or restore | Title and usable content required; duplicate-link warning; no AI generation, enrollment, or completion field | Saves Framework-local resources in Working Draft. Employees see them only after the Revision becomes current. Invalid link preserves Draft with field error. |
| M-6 Create Assessment | `Assessments > Create` or `My Team > Assessments > Create`; selected managed Team has an Active Framework with a current Published Framework Revision | Choose the managed Team when not preselected; enter name; confirm the Active Framework and current Published Framework Revision; proceed to Members and Competencies | Only Teams for which the user is active Primary Manager appear; Draft can be saved incomplete; the current Revision and scope are rechecked before assignment | Creates a Team-scoped Assessment Draft. No current Published Framework Revision shows a blocking configuration list and link to the Framework editor. |
| M-7 Select Members and Competencies | Assessment Draft > Scope | Select one, multiple, or all eligible Members; choose all applicable or subset Competencies; review matrix | Ineligible combinations identify missing Role + Level, expectation, active overlap, or selection of the responsible Manager as assessed Member | Updates Draft scope. Empty eligible list explains exact setup blockers. No partial hidden exclusion. |
| M-8 Assign Self-Assessments | Assessment Draft > Review and Assign | Review name, Members, Competencies, expectations, Manager, and snapshot summary; confirm assignment | Revalidates current scope; creates an immutable Assessment Snapshot from the current Published Framework Revision and creates Assessment Cases; prevents concurrent duplicate assignment | Assessment becomes Assigned; Employee tasks are created. Failure is atomic and Draft remains editable. |
| M-9 Complete Manager Assessment | `Assessment Queue > Member Case`; Self-Assessment submitted | Review Self-Assessment and Evidence; select Rating 1-5 for each Competency; save draft; complete | All ratings required; current responsibility required; stale/reopened Self-Assessment requires reconfirmation | Case becomes Completed and all ratings become Official together. No self-rating. Recoverable concurrency error retains draft. |
| M-10 Review completed results | `Assessments > Completed` or Member profile | Open completed case; inspect Self vs Official, snapshot, expectation, rationale, and audit | Historical render uses snapshot, not current Framework | Read-only completed record. Archived Team/Role/Competency labels remain visible with historical badge. |
| M-10A Review Development Plan | `Plan Review Queue`; Employee submitted a request and Manager has current responsibility | Open captured Plan snapshot and current live-change indicator; add advisory comments; mark Reviewed | Cannot approve/reject or modify Employee content; current responsibility required; changes after request are labeled | Review becomes Reviewed and Employee receives comments. Plan stays active. Responsibility loss moves pending request to Needs Responsibility Assignment; empty queue is informational. |
| M-11 Review Reassessment Requests | `Reassessment Queue`; unresolved Team items exist | Open grouped request; filter items; inspect current rating, snapshot, rationale, Evidence, and action snapshots; request context or close an invalid/duplicate item with reason | Permission and active duplicate state rechecked; changed live Evidence is labeled but snapshot remains authoritative | Item moves to Under Review, Awaiting Context, or Closed. Empty queue explains that only eligible Employee submissions appear. |
| M-12 Issue Reassessment Results | Competency Item decision panel | Select final Rating; identify Criteria and recognized Evidence; write rationale and next action/evidence; submit decision | Requires all five result fields and current responsibility; item decisions are independent | Item becomes Decided; only its Official Rating may change. Parent becomes Partially Decided or Completed. |

### 14.3 Employee Flows

| ID and flow | Entry point and prerequisites | User actions | Validation and system behavior | Resulting state, permission, empty/error handling |
| --- | --- | --- | --- | --- |
| E-1 View competency profile | `My Development > Competency Profile`; active Member | Review current Framework Competencies, Official Ratings, Self history, expectations, gaps, and status actions | Separates Rating series; shows `Unknown` and `Not Configured` distinctly; removed content is historical | Read-only current profile plus permitted actions. Missing Team/Role/Framework displays configuration blocker, never a Level 1. |
| E-2 Complete Self-Assessment | Dashboard task or profile status; assigned case | Open each Competency; review Criteria/expectation; select Rating 1-5; add comment/Evidence; save; submit | Every included item required; unanswered remains `Not Answered`; assignment snapshot controls content | Self-Assessment Submitted and Manager Assessment opens. Reopened state explains changed version and requires resubmission. |
| E-3 View expectations | Competency profile or Self-Assessment item | Open Expected Rating and Expectation Description for current Role + Level; inspect five-level Criteria | Uses the Active Framework's current Published Framework Revision in the live profile and the Assessment Snapshot in historical workflow | Read-only explanation. Missing applicable expectation shows `Not Configured` and routes configuration owner. |
| E-4 View current gaps | Competency profile | Compare Official Rating with Expected Rating; filter below/meets/exceeds/Unknown | Calculates only when both values exist; no averaging | Shows signed level gap and explanation. `Unknown` offers Initial Assessment path; `Not Configured` offers no rating inference. |
| E-4A Browse Career Path | `My Development > Career Path`; current Published Career Path Revision and mapped current Position exist | View current Position, reachable next Positions, Role + Level labels, and non-commitment explanation; open Position detail | Shows only published nodes; removed/historical nodes are read-only; no vacancy or promotion inference | Read-only graph. Missing current-node mapping routes HR configuration; no reachable nodes shows a supported-path empty state without blocking Development Plan use. |
| E-4B Select Target Position | Career Position detail; Position is reachable and Target Ready | Review target Role + Level, expectation source, non-commitment notice; select or replace current Target Position | One current target only; no Manager approval, target date, or proposal fields; unavailable Position is blocked with reason | Target Position becomes Selected or Changed and selection history is recorded. Employee may clear it later. |
| E-4C Compare Target Position gaps | Target Position detail or Competency Profile > Target Comparison | Review target Competencies, target expectations, current comparable Official Ratings, Criteria, gaps, Unknown, Not Configured, and Not Comparable items | Matches by System Competency provenance; calculates no blended score; changing target never changes ratings | Read-only target-gap view with next actions and resources. Empty state explains missing rating, missing target expectation, or non-comparable competency separately. |
| E-4D View curated Learning Resources | Current or target gap detail; current Framework Revision contains resources | Open resource title, link/guidance, and related Criterion; optionally reference it in a Development Action | Resource is advisory; no enrollment/completion or automatic progress | Opens resource or copies its reference into an Employee-owned Action. Archived/invalid resource shows unavailable state without changing Plan history. |
| E-5 Create Development Plan | `My Development > Plans > New`; active Employee | Enter plan title, intent, optional Competency links; save | No Manager approval required; at least title required | Active Employee-owned plan. Empty state explains plans do not imply company commitment. |
| E-6 Create Development Actions | Plan > Add Action | Enter action, context, Competency links, optional target date/resources; save or edit | At least one action statement required; one or more Competency links allowed | Planned Action created. Missing relevant Competency may still permit a general action if explicitly marked general. |
| E-7 Mark Development Actions completed | Action detail; Planned/In Progress | Add completion note and Evidence; mark Completed | Completion confirmation states it does not change Official Rating automatically | Action becomes Completed and eligible for Reassessment linking. Error preserves Evidence draft. |
| E-8 Add Evidence | Plan, Action, profile, or Reassessment Draft | Add note, link, file, project/task/milestone reference; select Competency and Action links | Validates ownership, required context, file placeholder constraints, and duplicate link/reference | Creates reusable live Evidence. Existing Evidence can be linked instead of copied. Archived Evidence remains in historical snapshots. |
| E-8A Request Development Plan review | Active Plan > Request Review; active Primary Manager exists | Review current Plan snapshot; add optional question; submit or cancel before Manager starts | No approval language; prevents duplicate pending request for same Plan; missing Manager shows HR-actionable blocker | Creates Requested Plan Review while Plan remains editable. Later edits show `Changes Since Review Request`; errors preserve the request Draft. |
| E-9 Request Initial Assessment | Profile `Unknown` state; no active covering Assessment | Select missing Competency scope or request first assessment; add context; submit | Requires Team, Role + Level, Manager, Framework, and no active covering case | Creates Requested Initial Assessment Request. Missing Manager/configuration shows HR-actionable blocker; no unroutable request is created. |
| E-10 Start Reassessment | Profile or `Reassessment > New`; at least one eligible rated Competency | Open request builder; review eligibility | Only Competencies in the Active Framework's current Published Framework Revision with Official Ratings appear | Creates Reassessment Draft. If none eligible, empty state distinguishes no baseline, active duplicate, active Assessment, and removed Competency. |
| E-11 Select one or multiple Competencies | Reassessment Draft > Competencies | Select eligible Competencies; deselect; continue | At least one required; duplicates/ineligible items display reason and do not block valid siblings | Creates one Competency Item per selected Competency inside the same Draft parent. |
| E-12 Link completed Development Actions | Reassessment Draft > Evidence Mapping | Select completed Actions and existing Evidence; map each to one or more Competency Items; add direct evidence as needed | Incomplete Actions cannot be selected as completed Action Evidence; every item needs new Evidence or Criterion question | Stores references and prepares immutable submission snapshots. Shared Action appears once with multiple item mappings. |
| E-13 Submit Reassessment Request | Reassessment Draft > Review | Review per-item current rating, rationale, Evidence, and disclosure; submit | Rechecks eligibility and duplicates; partial invalid selection can be removed while valid items proceed | Parent becomes Submitted; current Official Ratings remain effective. Atomic system failure leaves Draft unchanged. |
| E-14 View decision and rationale | Profile, notification center, or Reassessment history | Open grouped request; inspect decided, closed, and pending items; read each five-part Competency Result or closure reason | Employee sees employee-facing rationale, not reviewer identity/raw response | Parent shows Partially Decided, Completed, or Closed. Each Official Rating updates only when its item is decided. |

### 14.4 Contextual Reviewer Flow

| ID and flow | Entry point and prerequisites | User actions | Validation and system behavior | Resulting state, permission, empty/error handling |
| --- | --- | --- | --- | --- |
| CR-1 Provide scoped context | Invitation task; active scoped invitation | Review shared Competency Items, Criteria, Manager question, and explicit Evidence; write qualitative response per Competency; save; submit | Cannot select Rating; cannot navigate outside invitation scope; every selected item requires its own response | Contextual Review becomes Submitted. Expired/cancelled invitation is read-only. Reviewer cannot modify results or view later Employee-facing decision unless separately authorized. |

### 14.5 Executive and Leadership Flows

| ID and flow | Entry point and prerequisites | User actions | Validation and system behavior | Resulting state, permission, empty/error handling |
| --- | --- | --- | --- | --- |
| X-1 Manage Company Capability Priorities | `Organization Capability > Priorities`; Executive/Leadership role and active System Competency exist | Create or edit Priority with Competency, Target Rating, required count, Target Date, and context; activate or archive | Same validation as HR-12; no access to individual ratings or development content | Creates or updates Priority and audit history. No library content mutation. Invalid input preserves Draft. |
| X-2 View Organization Capability Overview | `Organization Capability`; Executive/Leadership role | Review each Priority's achieved count, remaining gap, Unknown, Not Comparable, development coverage, and as-of time | Aggregate-only authorization; no drill-down to individual Employee content | Read-only buyer-facing Overview. Empty/error behavior matches HR-13 and never exposes restricted records. |

## 15. Edge Cases

| Edge case | Specified behavior |
| --- | --- |
| Employee has no Manager | Profile remains readable. Initial Assessment submission, new Assessment assignment, and Reassessment decisions are blocked. HR sees setup alert. |
| Employee has no Role + Level | Employee is ineligible for Assessment and gap calculation. UI shows configuration blocker, not `Unknown` capability. |
| Team has no Manager | Team and Framework may remain Draft, but the Framework cannot become Candidate or Active. No operational assessment workflow starts. |
| Framework has no Competencies | Framework remains Incomplete and cannot assign an Assessment. |
| Framework has Competencies but no expectations | Missing applicable rows are `Not Configured`; affected Member/Competency combinations are blocked from assignment. |
| Manager removes a Competency after Assessment started | Working Framework changes for future assignments only. Active Assessment retains the Competency snapshot. |
| Manager changes an expectation after Assessment started | Active Assessment retains the original Expected Rating and Expectation Description. The live profile changes only after the new Published Framework Revision becomes current; historical views remain labeled with their captured expectation. |
| Template updated after Framework creation | Existing Framework is unchanged. New Frameworks may use the new Template version. |
| System Competency archived while in use | Existing Template, Framework, Assessment, rating, and history remain valid. Item is unavailable for new copy/import. |
| Employee submits Self-Assessment but Manager never assesses | Case remains pending in Manager queue; no Official Rating exists. Employee sees submitted/pending status. No automatic score is created. |
| Employee has no baseline and tries Reassessment | Reassessment action is replaced with Initial Assessment guidance for unrated Competencies. |
| Employee has incomplete baseline and tries Reassessment | Rated Competencies may be eligible; Competencies in an incomplete Assessment are not. UI partitions the states. |
| Employee selects multiple Competencies for Reassessment | One parent Request contains multiple independent Competency Items and Evidence mappings. |
| One Competency changes and another is unchanged | Each item receives its own five-part Competency Result. Parent may complete with mixed outcomes. |
| One Competency decided while another remains pending | Parent becomes Partially Decided. Decided Official Rating updates; pending Official Rating remains current. |
| Development Action linked to multiple Competencies | One Action reference and snapshot can map to multiple items; relevance is assessed independently. |
| Development Action later edited/cancelled | Submitted snapshot remains unchanged; current source is labeled changed/cancelled after submission. |
| Manager changes their own primary Team | Managed-Team responsibility is unchanged because a Primary Manager need not belong to the Team they manage. Only an HR change to the Primary Manager assignment or Manager deactivation changes authority. |
| Manager loses responsibility | Active decision permissions end immediately. Pending work becomes Needs Responsibility Assignment and transfers only through audited HR assignment. |
| Employee changes Role + Level within same Team | In-progress records retain old snapshot and enter Needs Scope Review. Future gaps and Assessments use new expectations. Existing ratings remain only where current Framework lineage remains applicable. |
| Employee moves to another Team | Old records remain historical. Pending work enters Needs Scope Review. New Team Framework Competencies begin `Unknown`; no automatic rating migration. |
| Employee has no Career Path node for current Role + Level | Career Path shows an HR-configuration blocker; competency profile, Development Plan, and Assessment remain usable. |
| Current Career Position has no reachable next Position | Career Path shows `No supported next position configured`; this is not interpreted as no promotion opportunity or no vacancy. |
| Target Position is removed or becomes not Target Ready | Existing selection becomes Unavailable and preserves its prior snapshot. Employee may clear or replace it; no rating or Plan content changes automatically. |
| Template used by a Career Position is updated | Published Career Path remains unchanged until HR explicitly updates the Working Draft and publishes a new Career Path Revision. |
| Target expectation changes after Employee selected Position | Live target comparison uses the new Published Career Path Revision and labels the change; prior Plan Review or saved comparison snapshots preserve earlier expectations. |
| Employee changes Role + Level or Team while Target Position exists | Current Career Position and reachability are recalculated. An unreachable target becomes Unavailable; no automatic replacement is selected. |
| Employee edits Plan after Manager marked Reviewed | Plan stays active and shows `Changes Since Review`; the Reviewed snapshot and comments remain immutable. |
| Manager loses responsibility during Plan Review | Pending review enters Needs Responsibility Assignment. Completed review remains attributed to the prior Manager. |
| Learning Resource is archived after being referenced in an Action | The Action retains the resource title and reference snapshot; live opening shows that the source is unavailable. |
| System Competency used by Active Capability Priority is archived | Priority remains readable but becomes configuration-blocked for future edits; current Overview keeps historical provenance and prompts HR to replace or archive the Priority. |
| Framework Competency criteria diverge from System source | Its Official Ratings are excluded from achieved capability as `Not Comparable`; they remain valid for the Employee and Team. |
| Capability Priority has no comparable Official Ratings | Achieved count is zero only as a count; `Unknown` and `Not Comparable` populations are shown separately so zero is not interpreted as Level 1 capability. |
| Capability Priority Target Date passes | Priority remains Active and is labeled overdue; no staffing, escalation, or employment action is created automatically. |
| Manager loses responsibility while Assessment/Reassessment pending | Drafts and submitted content remain. New Manager receives responsibility after HR assignment; old Manager cannot finalize. |
| Primary Manager is selected in an Assessment they own | Selection is blocked. If that Manager is an Employee in another primary Team, that Team's Manager may assess them; delegated rating inside the same Team is outside MVP. |
| Framework is replaced for a Team | Old Framework is archived for new work. New Framework starts a new rating lineage; prior ratings remain historical. |
| Category/Competency referenced by history is deleted | Hard delete is blocked; archive is offered. |
| Reassessment Evidence is archived after submission | Historical snapshot remains readable and decision provenance stays intact. |
| Contextual Reviewer never responds | Manager may proceed after recording that input was unavailable/not considered. Invitation may expire or be cancelled. |
| Concurrent Manager submission | First valid completion wins; stale submission receives conflict error and retains draft for comparison, never overwriting Official Ratings. |

## 16. Historical and Versioning Rules

### 16.1 Minimum Assessment Snapshot at Assignment

The snapshot preserves:

- Framework identity and source Template provenance.
- Team and responsible Manager.
- selected Members and each Member's Team, Organization Role, and Role Level.
- selected Category names, descriptions, hierarchy, and order.
- selected Framework Competency names, descriptions, source provenance, and Category membership.
- Rating Level 1 through 5 system content version.
- Framework Competency Criteria for all five Rating Levels.
- applicable Expected Rating and Expectation Description for each Member and Competency.
- assignment actor and timestamp.

### 16.2 Assessment History

- Self-Assessment submission preserves selected Ratings, comments, Evidence content snapshots and source references, actor, and timestamp.
- Manager Assessment completion preserves Official Ratings, decision actor, and completion timestamp.
- Completed records render from the snapshot, not current configuration.
- Current Team, Role, Level, Manager, Framework, Category, or Competency archival does not make history unreadable.

### 16.3 Reassessment Submission Snapshot

Each Competency Item preserves:

- Framework and Framework Competency context.
- current Official Rating and its provenance at submission.
- Criteria, Expected Rating, and Expectation Description applicable at submission.
- Employee rationale or Criterion question.
- Evidence and completed Development Action snapshots and mappings.
- submitted actor and timestamp.

Each Competency Result additionally preserves:

- final Rating Level.
- Criteria applied.
- recognized Evidence.
- Manager rationale.
- next action or Evidence needed.
- Contextual Review invitation/response provenance within confidentiality rules.
- deciding Manager and timestamp.

### 16.4 Configuration History

- System Library, Template, Framework, Learning Resource, Career Path, Team, Role, Level, Member, Manager, and Capability Priority changes record actor, timestamp, and meaningful before/after summary.
- Copy operations retain source identity and source version as provenance, never as a live synchronization link.
- Archive and restore events are historical events, not deletion.
- Current configuration may be renamed or reorganized, but older snapshots keep their original labels and structure.

### 16.5 Responsibility History

- Open-work transfer records old Manager, new Manager, transfer actor, reason, and effective time.
- Old Manager authorship remains on their saved or completed actions.
- New Manager decisions identify the new actor without rewriting earlier participation.

### 16.6 Career Path and Target Position History

- Every publication preserves Career Positions, Role + Level identities, transitions, target-expectation Template source/version, readiness, actor, and timestamp.
- Target Position selection preserves Employee, selected Position, Career Path Revision, target expectation snapshot, selection/change/clear actor, and timestamp.
- Live comparison may use a later Published Career Path Revision, but a historical Plan Review, saved comparison, or decision renders from its captured context.

### 16.7 Development Review and Resource History

- A Reviewed Development Plan preserves the Plan and Action snapshot, Employee question, Manager comments, reviewer, responsibility scope, and timestamps.
- Later Plan edits do not rewrite a Reviewed snapshot.
- Framework Revision history preserves Learning Resource title, type, link or guidance note, Criterion association, order, and provenance.

### 16.8 Capability Insight History

- Each Priority preserves System Competency identity, target Rating, required count, Target Date, context, status, actor, and change history.
- Each rendered Overview records or can explain its as-of time, included active population, qualifying Framework Revisions, comparability exclusions, Official Rating provenance, and development-coverage counting rule.
- Aggregate history never creates a new Employee rating or copies restricted individual content into the Priority.

## 17. Updated MVP Scope

### 17.1 In Scope

The delivery surface remains the desktop-first responsive prototype confirmed in the Product Brief, not a production-ready launch implementation.

- Configurable Organization, Teams, reusable Organization Roles enabled per Team, ordered Role Levels, Members, and one Primary Manager per operational Team.
- Fixed system-wide five-level Rating Scale and distinct `Unknown` and `Not Configured` states.
- HR-managed System Competency Categories with optional one-level nesting.
- HR-managed reusable System Competencies with five-level Criteria and default Role + Level Expectations.
- Framework Templates with independent versioned copied content.
- Framework creation from Template or empty configuration.
- One Active Team Framework plus at most one Candidate replacement, HR assignment, and responsible Manager-scoped customization.
- Shared HR/Manager Category, Competency, Criteria, and expectation configuration workbench.
- Framework readiness validation, Published Framework Revisions, and immutable Assessment Snapshots at assignment.
- HR-configured Career Path with Role + Level Positions, reachable transitions, target-expectation sources, and Published Career Path Revisions.
- Employee-selected Target Position and current-versus-target gap comparison without approval or company commitment.
- Manager-created cohort Assessment for one, multiple, or all eligible Team Members and selected Competencies.
- Separate Self-Assessment and Manager Assessment; Manager-only Official Ratings.
- Initial Assessment Request for unrated Competencies.
- Employee-owned Development Plans, Development Actions, Evidence, completed-Action Evidence linking, and optional advisory Manager Plan Review.
- Manager- and HR-curated Framework Learning Resources without AI or LMS behavior.
- One multi-Competency Reassessment Request with independent Competency Items and Competency Results.
- Scoped qualitative Contextual Review without rating authority.
- Company Capability Priorities and read-only Organization Capability Overview for HR and Executive/Leadership users.
- Role-based permissions, audit history, responsibility transfer, and historical rendering.
- Existing non-goals covering performance management, promotion, compensation, staffing, AI, gamification, and LMS behavior.

### 17.2 Explicitly Out of Scope for This MVP

- Custom organization-specific Rating Scales or a different number of Rating Levels.
- Multiple active primary Teams per Employee.
- Multiple active Primary Managers per Team or per-Member Manager assignment.
- Automatic rating migration between Team Frameworks.
- Live synchronization from System Competencies to Templates or Frameworks.
- Live synchronization from Templates to existing Frameworks.
- Arbitrary-depth Category trees beyond one optional parent level.
- Manager changes to global System Competencies or Framework Templates.
- Editing or reopening completed Assessment or Reassessment decisions.
- Automatic Official Ratings from Self-Assessment, Evidence, Action completion, or Contextual Review.
- Production SSO/HRIS integration, API design, data schema, file-security architecture, retention implementation, or notification delivery.
- Promotion, staffing, compensation, succession, vacancy matching, AI recommendations, gamification, or LMS workflows.

### 17.3 Confirmed Brief Capabilities Restored

Career Path, Target Position, optional Development Plan Review, Manager-curated Learning Resources, Company Capability Priorities, and Organization Capability Overview are confirmed prototype MVP capabilities in the finalized Product Brief. They must be included in the next UX prototype. `[ASSUMPTION A-11]` through `[ASSUMPTION A-14]` define provisional cross-Framework and review mechanics for Vawn to approve; they do not defer the features themselves.

## 18. Changes from the Previous PRD

| Previous model | Updated model and conflict resolution |
| --- | --- |
| Rating levels could be defined with Competency framework content | Exactly five system-wide Rating Levels; only labels/descriptions are system content; `Unknown` remains separate |
| Generic organization records, departments, reporting lines, and Current Position | Explicit Organization -> reusable Organization Role and Role Level -> Team enablement -> Member assignment model with one operational Primary Manager |
| Generic Competency and team-specific customization | System Competency Category -> System Competency -> independent Framework Competency -> Assessment Snapshot |
| No reusable Framework Template | HR-owned versioned Template added; Framework copies one Template version and becomes independent |
| HR governance and Manager customization boundary was ambiguous | HR owns organization, library, Templates, Framework creation/assignment; Manager owns configuration within assigned Team Framework scope |
| Role expectation was primarily a numeric Expected Level | Every applicable Role + Level Expectation requires Expected Rating 1-5 plus Expectation Description |
| Baseline Assessment described one Employee | Assessment is a Manager-created cohort campaign for one, multiple, or all eligible Team Members |
| Snapshot emphasis occurred at completion | Publishing locks the whole Published Framework Revision; Assessment assignment locks the selected Member and Competency context in an Assessment Snapshot |
| Employee could not initiate first baseline workflow | Employee may create an Initial Assessment Request; Manager still creates the Assessment and Official Ratings |
| Baseline was treated broadly | Baseline eligibility is per Employee and current Framework Competency; mixed rated/Unknown profiles are valid |
| Reassessment changed from one Competency to a submission creating separate requests | Final model is one parent Reassessment Request containing multiple independent Competency Items and Competency Results |
| Development Action relationship was optional metadata | Completed Development Actions are first-class Evidence references with immutable submission snapshots |
| Permission table contained unresolved assumptions | CRUD/Assign/Assess/Rate/Review/Audit scopes are specified; exceptional HR content access remains `[ASSUMPTION A-9]` |
| Framework edits and archives lacked full impact rules | Existing Assessment snapshots and historical ratings remain unchanged; edits affect future assignments only |
| Responsibility changes were not defined | Pending work moves to Needs Responsibility Assignment/Scope Review and transfers with audit history |
| Career Path and capability insight were incorrectly deferred during PRD refinement | Restored as confirmed prototype MVP capabilities; assumptions now cover only expectation-source, comparability, review-snapshot, and resource mechanics |

## 19. Remaining Open Questions

### 19.1 Fast-Path Assumptions Requiring Vawn Review

- `[ASSUMPTION A-1]` Organization Roles and Role Levels are reusable organization identities; an Employee has one primary Team and one Role + Level; an operational Team has one Primary Manager; a Manager may manage multiple Teams and need not belong to them.
- `[ASSUMPTION A-2]` Categories support a flat structure or one parent level, contain either child Categories or Competencies, and each Competency belongs to one leaf Category.
- `[ASSUMPTION A-3]` A System Competency becomes active only after all five Criteria and at least one default Role + Level Expectation are complete.
- `[ASSUMPTION A-4]` A Team may have one Active Framework and at most one Candidate replacement; activation replaces the Active Framework atomically.
- `[ASSUMPTION A-5]` HR and Manager share one Working Draft with one active editor; no concurrent last-write-wins editing is permitted.
- `[ASSUMPTION A-6]` A responsible Manager cannot assess themselves, and one Assessment Case publishes all included Official Ratings atomically.
- `[ASSUMPTION A-7]` Baseline is evaluated per Employee and current Framework Competency, allowing mixed rated and `Unknown` profiles.
- `[ASSUMPTION A-8]` Direct Reassessment Evidence may include notes, links, files, and project references without requiring a Development Action.
- `[ASSUMPTION A-9]` Ordinary HR access excludes individual Self-Assessment, Development Plan, Evidence content, and raw Contextual Review content.
- `[ASSUMPTION A-10]` Responsibility changes use explicit `Needs Responsibility Assignment` and `Needs Scope Review` recovery states.
- `[ASSUMPTION A-11]` Each Career Position uses one active Framework Template version as its target-expectation source; target comparison matches Competencies by System Competency provenance.
- `[ASSUMPTION A-12]` Organization Capability counts an Official Rating as comparable only when the Framework Competency retains matching System Competency provenance and unchanged five-level Criteria.
- `[ASSUMPTION A-13]` Development Plan Review applies to an immutable Plan snapshot; later material changes display `Changes Since Review` without invalidating the Employee-owned Plan.
- `[ASSUMPTION A-14]` Curated Learning Resources are Framework-scoped title/type/link-or-guidance items published with the Framework Revision, without enrollment or completion semantics.

### 19.2 Product Questions

The following questions do not change the core semantics defined directly by the user, but each must be resolved before its affected downstream feature is implemented:

1. What exact user-facing labels and final editorial descriptions should accompany Rating Levels 1 through 5? The number, order, and stable meanings are already fixed.
2. Should HR have an exceptional investigation permission to read raw Contextual Review content, or remain limited to invitation metadata and Official Result provenance?
3. What file types, size limits, malware scanning, retention, deletion, export, and legal-hold rules are required before a real-data pilot?
4. What notification channels and response expectations are required for Initial Assessment, Self-Assessment, Manager Assessment, Contextual Review, and Reassessment queues?
5. Should Career Position target expectations continue to come from one Framework Template version, or should En-Path introduce a separate organization-level Career Position expectation profile?
6. Should Capability Overview exclude customized Competency Criteria as `Not Comparable`, or should HR be able to certify cross-Framework equivalence in a later version?
7. Does a future version need multiple Team Managers, per-Member Manager assignment, or matrix-team membership?
8. Should Templates eventually support mapping between different Organization Roles rather than copying only exact reusable Role + Level identities?
9. What exceptional correction workflow is permitted when a completed Official Rating contains an administrative error?
10. Which curated Learning Resource types are required beyond title, link, and guidance note for the prototype demonstration?
