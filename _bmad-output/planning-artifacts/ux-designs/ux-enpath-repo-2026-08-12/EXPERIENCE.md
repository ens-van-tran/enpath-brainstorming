---
title: En-Path Clickable Prototype Experience
status: final
created: 2026-08-12
updated: 2026-08-17
source_of_truth: En-Path Brief, PRD, and feature specification dated 2026-08-15 to 2026-08-16
---

# En-Path Clickable Prototype Experience

This document maps the current runnable prototype. Normative product semantics remain in the finalized Brief, PRD, and `feature-spec.md`.

## Run locally

```bash
python3 -m http.server 8766 \
  --directory _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups
```

Open `http://localhost:8766/login.html`.

The shared browser state persists across Product Roles. Use **Reset demo data** to restore the seed.

## Organization model

```text
Organization
  -> Team
      -> enabled reusable Organization Roles
          -> ordered Role Levels
      -> Members
      -> one Primary Manager
      -> Team Framework
      -> Team Career Path
```

There is no `Department` domain. An organization unit named `PDO` is created as a Team when it is the operating scope for Members, Framework, Career Path, and Manager responsibility.

## Product Roles and navigation

### HR Admin — Tuyen Nguyen

Overview; Teams; Members; Roles & Levels; Competency Library; Competency Categories; Rating Scale; Framework Templates; Team Frameworks; Team Career Paths; Capability Overview; Governance & Audit.

### Manager — Luc Tran

Team Overview; Team Framework; Team Competencies; Team Members; Assessments; Assessment Requests; Development Plans; Learning Resources.

### Employee — Minh Nguyen

My Profile; My Career Path; My Assessments; Reassessment Requests; My Development Plans; Notifications.

### Contextual Reviewer — Bao Nguyen

Review Invitations; Scope & Privacy.

## Key walkthroughs

### Team setup

HR opens **Teams**, creates or edits a Team, enables reusable Organization Roles, selects one Primary Manager, and inspects assigned Members. The Team detail exposes operational blockers and links to its Framework and Career Path.

Creating `PDO` does not create a Department layer. Backend, Frontend, or Mobile may be enabled Roles if that matches the configured organization model, or separate Teams if the organization chooses those operating scopes.

### Competency Library to Assessment Snapshot

```text
System Competency
  -> copied into Framework Template
      -> copied into independent Team Framework
          -> immutable Published Framework Revision
              -> immutable Assessment Snapshot
```

HR manages reusable source content. The responsible Manager changes only the assigned Team Framework. Existing Published Revisions and assigned/completed Assessments remain unchanged.

### Team Career Path

HR selects a Team before editing its Career Path. Each Team has an independent Working Draft, Published Revisions, enabled-Role Position validation, explicit transitions, and history.

Employee mode resolves the active Team first and never falls back to another Team's path. The responsive tree distinguishes current, reachable, selected, locked, not-ready, future, and unavailable Positions. Target selection requires no approval and creates no promotion, vacancy, staffing, compensation, or company commitment.

### Assessment

1. Manager creates an Assessment from the current Published Framework Revision.
2. Assignment freezes Member, Competency, Criteria, expectation, and Framework context.
3. Employee submits one Self-Assessment Rating for every item.
4. Manager Assessment remains locked until Self-Assessment submission.
5. Manager independently rates every item.
6. Completion makes all included Manager Ratings Official together.

Self-Assessment, Official Rating, Expected Rating, `Not Answered`, and `Unknown` remain separate.

### Development Plan review and Learning Resources

The Employee owns Development Plans, Actions, and Evidence. They may request advisory Manager review of a captured Plan snapshot while continuing to edit the live Plan. `Reviewed` is not `Approved`; later changes may be labeled `Changes Since Review`.

Managers curate Framework-local Learning Resources. Resources have no enrollment, completion credit, AI recommendation, or automatic rating behavior.

### Multi-Competency Reassessment

The Employee selects one or more eligible rated Competencies, provides an item-specific rationale or Criterion question, and maps reusable Evidence or completed Development Actions.

The Manager receives one grouped workspace but issues an independent result for every Competency Item. Each result requires final Rating, Criteria applied, recognized Evidence, rationale, and next action. The parent Request never receives a blended Rating.

### Contextual Review

The Manager may invite Bao for one scoped Competency Item. Bao sees only the shared Criteria, Manager question, and explicitly shared Evidence. Bao submits qualitative context and cannot select, recommend as authoritative, or change an Official Rating. Raw confidential input and reviewer identity are not exposed to the Employee.

### Capability Overview

HR defines Company Capability Priorities using a System Competency, Target Rating, required Employee count, and Target Date. The read-only Overview separates:

- achieved comparable current capability;
- `Unknown`;
- `Not Comparable`;
- active development coverage.

Development coverage never counts as achieved capability and the screen has no staffing or people-decision actions.

## Important edge states

- Team has no Primary Manager, enabled Role, or Member.
- Team has no Framework or no Published Career Path.
- Employee has no Role + Level or no Official Rating baseline.
- Framework changes after Assessment assignment.
- Self-Assessment is incomplete and Manager Assessment stays locked.
- One Reassessment item is decided while a sibling remains pending.
- Development Action changes after its Evidence snapshot was submitted.
- Manager or Employee Team responsibility changes during pending work.
- Target Position becomes unavailable after a new Team Career Path Revision.
- Capability data is `Unknown` or `Not Comparable` rather than treated as Level 1.

## Verification

```bash
node _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js
python -m mkdocs build --strict
```

The smoke suite covers Team setup, Career Path isolation, Assessment sequencing, Employee-owned Plan review, multi-item Reassessment, scoped Contextual Review, capability surfaces, history preservation, and cross-persona shared-state behavior.
