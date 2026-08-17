# En-Path PRD Addendum

## A. Document Role

This addendum preserves rationale, market context, validation work, and downstream implementation concerns that should not make the normative PRD or feature specification harder to read.

Normative product behavior lives in:

- `prd.md` for vision, journeys, Functional Requirements, scope, and success framing.
- `feature-spec.md` for domain semantics, permissions, state machines, invariants, detailed UI flows, and edge cases.

## B. Product-Shape Rationale

### B.1 Fixed Rating Semantics

A fixed five-level Rating Scale makes expectations and ratings readable across organizations while leaving Competency Criteria and Role + Level Expectation content configurable. Allowing each Team or Competency to define a different scale would weaken comparison, training, audit, and UI consistency.

### B.2 Library, Template, and Framework Copies

The selected model uses explicit copies rather than live inheritance:

```text
System Competency Library
  -> copy into Framework Template
      -> copy into Team Framework
          -> publish immutable Published Framework Revision
              -> snapshot selected scope into assigned Assessment
```

This prevents a global edit from silently changing a Team Framework or an in-progress Assessment. Source provenance remains visible so users can understand origin without treating it as a synchronization link.

### B.3 Team-Scoped Manager Customization

HR and Manager use the same editor because Category, Competency, Criteria, and expectation configuration are the same interaction problem. Authority differs by scope: HR governs global and assignment layers; Manager governs only the assigned Team Framework. This reduces duplicated UX while preventing accidental global mutation.

### B.4 Multi-Competency Reassessment

One parent Reassessment Request provides a coherent Employee submission and Manager workspace. Independent Competency Items preserve separate Evidence relevance, Contextual Review, status, Rating, rationale, and completion timing. A parent-level blended result was rejected because it would obscure which Competency changed and why.

### B.5 Assessment Snapshot Timing

Snapshotting when an Assessment is assigned is earlier than completion and is necessary because Employees may already be answering while a Manager edits the Framework. Assignment-time locking prevents a changing question, Criterion, or expectation from invalidating work in progress.

### B.6 Active and Candidate Frameworks

`[ASSUMPTION A-4]` One Active Framework plus at most one Candidate replacement lets a Team keep creating Assessments while HR and the Primary Manager prepare a replacement. Publishing a Candidate's Published Framework Revision is separate from activating it; activation atomically archives the previous Active Framework for new work. This assumption needs Vawn's confirmation before the downstream domain model is treated as final.

`[ASSUMPTION A-5]` HR and Manager share one Framework Working Draft with one active editor. This is a product-level concurrency proposal, not a database or locking implementation decision.

### B.7 Career Position Expectation Source

Career Path is confirmed MVP scope, but a Career Position needs a stable source for the Competencies and expectations used in target comparison. `[ASSUMPTION A-11]` uses one active Framework Template version per Career Position because Templates already provide reusable, versioned Organization Role + Role Level expectation content without binding a company-wide Career Position to one Team's mutable Framework. Target comparison matches current and target Competencies through System Competency provenance. A separate organization-level Career Position expectation profile remains a valid later alternative if Template semantics prove too restrictive.

### B.8 Capability Comparability

Company Capability Priorities and the Organization Capability Overview are confirmed MVP scope. The aggregate must not imply that similarly named but materially different Competencies are equivalent. `[ASSUMPTION A-12]` therefore counts an Official Rating as achieved comparable capability only when the Framework Competency retains matching System Competency provenance and the five Rating Criteria remain unchanged from the referenced source version. Customized copies remain useful for Team assessment but appear as `Not Comparable` in organization aggregation. A later certification workflow could permit governed equivalence, but it is not part of this MVP.

### B.9 Development Plan Review Snapshot

The brief confirms that Development Plans remain Employee-owned and Manager review is optional and advisory. `[ASSUMPTION A-13]` snapshots the Plan and Actions the Manager actually reviewed so `Reviewed` cannot silently extend to later edits. The live Plan remains editable and usable, while the UI can show `Changes Since Review` and allow the Employee to request another review. This preserves coaching value without introducing plan approval.

### B.10 Framework-Scoped Learning Resources

The brief confirms manually curated Learning Resources and defers AI recommendations and LMS behavior. `[ASSUMPTION A-14]` treats resources as Framework-scoped, publishable content linked to a Competency or optional Criterion. This lets the responsible Manager tailor resources to Team context without modifying the System Competency or promising enrollment, completion credit, or automated development outcomes.

## C. Competitive Context and Differentiation Hypothesis

Public market research completed on 2026-08-16 found meaningful overlap with En-Path's broad category:

- TalentGuard markets governed skill frameworks, career paths, self-assessment, Manager validation, Evidence, versioned standards, and audit trails.
- MuchSkills markets continuous visible development, role gaps, employee goals, evidence-grounded coaching, and validation without waiting for performance review.
- Lattice Grow and Leapsome combine competency frameworks and development with broader talent or performance suites.
- Fuel50 and Gloat focus more heavily on talent intelligence, mobility, opportunities, and workforce planning.
- Culture Amp is a performance-adjacent boundary competitor.

En-Path should not claim that continuous, employee-owned, evidence-based development is an empty category. The narrower hypothesis remains:

> Organizations value a configurable but semantically stable competency platform where Employees can submit one or more Competencies for formal reassessment using reusable contextual Evidence, while each Competency receives an independent Manager-owned criterion-based result outside performance, promotion, and staffing workflows.

Research references:

- https://www.talentguard.com/career-pathing
- https://www.talentguard.com/competency-assessment-software
- https://www.talentguard.com/trust-governance
- https://www.muchskills.com/employee-development
- https://www.muchskills.com/how-to/how-to-validate-skills-and-give-badges-and-skills-to-employees
- https://lattice.com/grow
- https://www.leapsome.com/product/competency-framework
- https://fuel50.com/
- https://gloat.com/
- https://www.cultureamp.com/platform/performance-management

## D. Validation Backlog

1. Validate whether a 30+ employee company can maintain the minimum Organization, Role + Level, Criteria, and expectation content without excessive setup burden.
2. Test whether HR and Manager understand copy boundaries between System Competency, Template, Framework, and Assessment snapshot.
3. Test whether a shared configuration workbench remains clear when Product Role and scope change.
4. Validate the default five-level labels and descriptions with Employees, Managers, and HR.
5. Test whether grouped multi-Competency submission improves usability without increasing Manager decision ambiguity.
6. Measure realistic cohort Assessment and Reassessment queue volume, age, response time, and Manager effort.
7. Validate Employee trust in confidential Contextual Review and the five-part employee-facing result.
8. Validate completed Development Action linking and whether immutable submission snapshots are understandable.
9. Interview an HR/L&D owner; current discovery evidence remains weaker for HR configuration and governance than for Employee and review-operator needs.
10. Test Team, Manager, Role + Level, and Framework change scenarios with real organization administrators.
11. Test whether using one Framework Template version as each Career Position's target-expectation source is understandable and sufficiently flexible.
12. Test whether the provenance-plus-unchanged-Criteria comparability rule makes Organization Capability counts trustworthy without hiding too much Team capability as `Not Comparable`.
13. Test whether Employees and Managers understand `Reviewed` as advisory and snapshot-specific rather than approval of the live Development Plan.
14. Test whether Framework-scoped curated Learning Resources are useful without LMS completion semantics.

## E. Deferred Architecture and Operational Questions

These are intentionally not solved in this product specification:

- Database storage and entity decomposition.
- API resource boundaries and endpoint design.
- Transaction and concurrency mechanism.
- Event, queue, or notification architecture.
- HRIS/SSO integration strategy.
- File storage, malware scanning, retention, export, deletion, and legal hold.
- Authorization policy implementation and privileged investigation access.
- Snapshot storage format and diff representation.
- Operational SLA, RTO/RPO, observability, and production support model.

Architecture must preserve the product invariants in `feature-spec.md` rather than weakening them for storage convenience.
