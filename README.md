# En-Path

En-Path is a configurable competency development and assessment framework platform. It helps organizations define Team-specific competency expectations, run criterion-based assessments, support Employee-owned development, and preserve understandable historical decisions.

This repository currently contains the product Brief and PRD, UX specifications, a connected browser prototype, implementation specifications, and a curated MkDocs documentation site.

## Current Product Model

```text
Organization
  -> Team
      -> enabled Organization Roles
          -> ordered Role Levels
      -> Members with one Role + Level
      -> one Primary Manager
      -> Team Framework
      -> Team Career Path
```

`Department` is not a separate En-Path domain. Team is the operating scope for Members, Frameworks, Career Paths, Assessments, and Manager responsibility.

Core product semantics remain fixed:

- Exactly five Rating Levels are available system-wide.
- `Unknown` means no Official Rating exists; it is not Level 1.
- Employee Self-Assessment and Manager Official Rating are separate.
- The responsible Manager owns Official Ratings.
- Employees own Development Plans, Development Actions, and Evidence.
- One Reassessment Request may contain multiple independently decided Competencies.
- Published Frameworks, Criteria, expectations, and Assessment meaning are historically preserved.
- Career development creates no promotion, vacancy, staffing, or compensation commitment.

See [Product Model](docs/product-model.md) for the concise domain overview.

## Prototype

The connected prototype supports four Product Roles:

- **HR:** Teams, Members, Roles and Levels, Competency Library, Framework Templates, Team Frameworks, Team Career Paths, Capability Overview, and governance.
- **Manager:** Team Framework configuration, Assessments, Official Ratings, Development Plan review, Learning Resources, and Reassessment decisions.
- **Employee:** competency profile, visual Career Path tree, Self-Assessment, Development Plans, Evidence, Initial Assessment, and multi-Competency Reassessment.
- **Contextual Reviewer:** invitation-scoped qualitative review without rating authority.

Run the prototype from the repository root:

```bash
python3 -m http.server 8766 \
  --directory _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups
```

Open <http://localhost:8766/login.html> and select a Product Role.

Direct review links:

- HR Teams: <http://localhost:8766/hr-admin.html#teams>
- Manager Framework: <http://localhost:8766/line-manager.html#team-framework>
- Employee Career Path: <http://localhost:8766/employee.html#career-path>
- Contextual Reviewer: <http://localhost:8766/contextual-reviewer.html#review-invitations>

The prototype stores shared demo state in browser `localStorage`. Use **Reset demo data** in any workspace to restore the seed state.

See [Prototype Review](docs/prototype.md) for the recommended persona walkthrough.

## Documentation Site

Install the documentation dependency:

```bash
python -m pip install --requirement requirements-docs.txt
```

Serve the documentation locally:

```bash
python -m mkdocs serve
```

Open <http://127.0.0.1:8000/enpath-brainstorming/>.

Build the static site with strict validation:

```bash
python -m mkdocs build --strict
```

The GitHub Pages workflow runs the prototype smoke test before building and publishing the documentation site.

## Validation

Run the main repository checks before review or commit:

```bash
node --check _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/enpath-app.js
node _bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/mockups/prototype-smoke-test.js
python -m mkdocs build --strict
git diff --check
```

The smoke suite covers Team setup, Team Career Path isolation, Assessment sequencing, Employee-owned development, multi-Competency Reassessment, scoped Contextual Review, responsibility transfer, capability views, and historical integrity.

## Repository Structure

```text
.
├── _bmad-output/
│   ├── planning-artifacts/
│   │   ├── briefs/                 # Product Brief
│   │   ├── prds/                   # PRD and feature specification
│   │   └── ux-designs/             # UX specification and browser prototype
│   └── implementation-artifacts/   # Approved implementation specifications
├── docs/                            # Curated documentation reading layer
├── .github/workflows/docs.yml       # Smoke, build, and GitHub Pages workflow
├── mkdocs.yml                       # Documentation site configuration
└── requirements-docs.txt            # Documentation dependency
```

Canonical product and implementation artifacts remain under `_bmad-output/`. The `docs/` directory is a curated reading layer and should not silently replace the canonical sources.

## Canonical Artifacts

- [Product Brief](_bmad-output/planning-artifacts/briefs/brief-enpath-repo-2026-08-15/brief.md)
- [Product Requirements Document](_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/prd.md)
- [Feature Specification](_bmad-output/planning-artifacts/prds/prd-enpath-repo-2026-08-16/feature-spec.md)
- [Prototype Experience](_bmad-output/planning-artifacts/ux-designs/ux-enpath-repo-2026-08-12/EXPERIENCE.md)
- [Full Prototype and Documentation Refresh Spec](_bmad-output/implementation-artifacts/spec-full-prototype-and-docs-refresh.md)
- [Canonical Artifact Index](docs/artifacts.md)

## Scope Boundaries

The current En-Path scope intentionally excludes AI recommendations, gamification, promotion workflows, staffing and vacancy workflows, compensation workflows, succession planning, and LMS completion functionality.

