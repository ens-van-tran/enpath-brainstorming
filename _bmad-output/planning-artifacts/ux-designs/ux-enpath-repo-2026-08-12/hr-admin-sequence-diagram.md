---
title: En-Path HR Admin Sequence Diagram
artifact_type: ux-sequence-diagram
status: final
created: 2026-08-13
updated: 2026-08-13
sources:
  - EXPERIENCE.md
  - DESIGN.md
  - mockups/hr-admin-prototype.html
---

# En-Path HR Admin Sequence Diagram

This diagram covers competency governance, scoped Manager delegation, public Framework Templates, and assessment reporting for HR Admin.

```mermaid
sequenceDiagram
    autonumber
    actor HR as HR Admin
    actor Manager as Manager
    participant EnPath as En-Path
    participant HRData as Employee Import
    participant Results as Assessment Results

    rect rgb(236, 242, 246)
        HR->>EnPath: Open Competencies / Pool
        HR->>EnPath: Open New competency drawer
        HR->>EnPath: Enter name, description, score anchors, and advice
        HR->>EnPath: Define role + level + criterion rubric
        HR->>EnPath: Define Below / Meet / Above behavior
        EnPath->>EnPath: Validate score content and role-level rubric
        alt Required score, advice, or rubric is missing
            EnPath-->>HR: Keep drawer open and show validation
        else Competency is complete
            HR->>EnPath: Create competency
            EnPath-->>HR: Select new Pool row and record audit event
        end
    end

    rect rgb(233, 240, 238)
        HR->>HRData: Import Employee, team, role, and level
        HRData->>EnPath: Provide validated Employee records
        EnPath-->>HR: Show Employee Import register
        HR->>EnPath: Assign an Employee as Role Manager for team + role
        EnPath->>EnPath: Validate active Employee and exact duplicate
        alt Assignment is invalid
            EnPath-->>HR: Block and explain the conflict
        else Assignment is valid
            EnPath-->>Manager: Grant scoped template responsibility
            EnPath->>EnPath: Record assignment in Audit Log
        end
        HR->>EnPath: Open Competencies / Categories
        HR->>EnPath: Assign Category to one or more Role Managers
        EnPath-->>Manager: Make Category available in each assigned scope
    end

    rect rgb(222, 237, 237)
        Manager->>EnPath: Open Framework Templates
        Manager->>EnPath: Expand a Category and pick Pool competencies
        EnPath-->>Manager: Update expected-profile radar and numeric values
        Manager->>EnPath: Save template as Draft
        HR->>EnPath: Open the Draft template
        EnPath->>EnPath: Match imported Employees by role and team
        EnPath-->>HR: Preview affected Employees and role levels
        HR->>EnPath: Confirm Public
        EnPath->>EnPath: Set template status to Public
        EnPath->>EnPath: Record Public action in Audit Log
        EnPath-->>HR: Show Public status
    end

    rect rgb(238, 234, 222)
        Results-->>EnPath: Provide existing Employee and Manager assessment results
        EnPath->>EnPath: Store Employee Score as reference
        EnPath->>EnPath: Store Manager Score as recorded result
        alt Manager Score exists
            EnPath->>EnPath: Calculate Gap = Expected Score - Manager Score
            EnPath->>EnPath: Aggregate known member and team gaps
        else Manager Score is missing
            EnPath->>EnPath: Mark result Unknown and exclude from averages
        end
        HR->>EnPath: Open Assessment Reports
        EnPath-->>HR: Show report completion and template context
        HR->>EnPath: Open evidence
        EnPath-->>HR: Show Employee reference, Manager context, and rationale (view only)
        HR->>EnPath: Open Company Gaps and select a team
        EnPath-->>HR: Show team ranking, strengths, weaknesses, and coverage
        HR->>EnPath: Open Team Gaps
        EnPath-->>HR: Compare current Manager results with six months ago
        HR->>EnPath: Click a member row
        EnPath-->>HR: Update member radar and competency score table
    end

    opt HR revokes scoped Manager responsibility
        HR->>EnPath: Revoke Role Manager assignment
        EnPath->>EnPath: Stop future scoped responsibility
        EnPath->>EnPath: Preserve prior Audit Log events
        EnPath-->>HR: Show Revoked status
    end
```

## Invariants

- Competencies live in one flat Pool; Categories organize Pool selections inside Framework Templates.
- Every competency stores a description, score anchor, and improvement advice for each active shared score.
- Role-level rubrics bind role, role level, evaluation criterion, and Below / Meet / Above Expectation behavior.
- Shared score anchors and role-level rubrics remain separate concepts.
- Template Categories are collapsible presentation sections; collapse state does not change composition.
- A Category may be assigned to multiple active Role Manager scopes.
- HR and appropriately scoped Managers may compose Framework Templates.
- HR imports Employee team, role, and level data before role assignment and impact preview.
- Templates move directly between Draft and Public in this prototype; there is no Framework Review route.
- Public confirmation includes affected imported Employees and role levels.
- Making a template Public is not tied to a performance-review period.
- Assessment Reports consume existing assessment results; HR does not generate assessments in this prototype.
- Evidence Review is view-only for HR Admin.
- Manager Score is recorded. Employee Score is reference-only.
- `Gap = Expected Score - Manager Score`; missing Manager Score produces `Unknown`.
- Prototype fixtures use anonymous labels and never reuse persona or interview identities.
- The Audit Log is the governance record; there is no separate Version History page.
