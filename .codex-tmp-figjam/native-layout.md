# En-Path Native FigJam Layout

## Definition of native editable

- Every semantic card is a native FigJam shape or sticky with editable multiline text.
- Every relationship arrow is a native FigJam connector.
- Document and lane boundaries are native FigJam sections or background shapes.
- Keep bullets inside one card as text. Do not create a separate node per bullet.
- Decorative dividers, shadows, and header strips are optional; content and relationships take priority.

## Existing board grid to preserve

The current composite is `13600 x 19000`. Reuse these bounds so each native section replaces its image in place:

| Area | X | Y | W | H |
|---|---:|---:|---:|---:|
| Board header/navigation | 0 | 0 | 13600 | 800 |
| PVB | 240 | 800 | 3600 | 4300 |
| Product Canvas | 4000 | 800 | 5200 | 4300 |
| Personas | 9400 | 800 | 3960 | 4300 |
| Customer Journey Maps | 240 | 5300 | 6400 | 6500 |
| User Story Map | 6800 | 5300 | 6560 | 6500 |
| Cross-Role Swimlane | 240 | 12000 | 13120 | 6600 |

Use 160-240 px gutters. Existing reference renders are the six `*-native.png` files in this directory.

## Shared visual grammar

| Meaning | Fill | Stroke/header | Usage |
|---|---|---|---|
| Employee | `#EAF4FF` | `#2D78AD` | Employee persona, journey, and tasks |
| Manager/reviewer | `#FFF0E6` | `#B9592D` | Manager persona, journey, and decisions |
| HR/Admin | `#ECF8EE` | `#347D48` | Validated HR/L&D content |
| HR Admin draft | `#FFF1C7` | `#D8A72E` dashed | Role-based content without a validated persona |
| En-Path system | `#DCEFFF` | `#4D94C9` | System actions and stored outputs |
| Rule/constraint | `#F3E5F8` | `#7A4DA3` | Trust, permissions, immutable history |
| Pain/open decision | `#FDECE8` | `#E27953` | Pain points and unresolved decisions |
| Neutral/outside scope | `#EEF1F4` | `#657786` | Non-goals and outside-MVP items |
| Outcome/product promise | `#173042` | `#173042` | High-value terminal outputs; white text |

Suggested type scale at the current canvas dimensions:

- Document title: 72-82 px.
- Section/lane heading: 38-46 px.
- Card heading: 24-30 px, bold.
- Card body: 20-24 px, 1.25-1.35 line height.
- Connector labels: 18-20 px.

Use straight or elbow connectors. Solid navy/blue means normal sequence or handoff; coral dashed means a feedback/reuse loop.

## 1. PVB

Layout: three horizontal bands.

1. Vision chain: six equal cards in one row: `FOR -> WHO -> ENPATH -> THAT -> UNLIKE -> DIFFERENTIATOR`.
2. Target audiences: three columns for Employee, HR/L&D, and Manager. Each column is one large editable card containing audience goal, age groups, and business goal.
3. Pain-to-need: three columns. Each has one pain card above one need card. The three need cards converge on one full-width Product Promise card.

Connectors required:

- Five connectors across the six vision cards.
- Three vertical pain-to-need connectors.
- Three need-to-product-promise connectors.

Approximate native objects: 16 content cards, 11 connectors, 5 headings/labels, 1 section = 33.

## 2. Product Canvas

Layout: five horizontal bands.

1. Product goal: Problem card on the left; MVP Outcome chain on the right with seven compact cards: Target, Gap, Roadmap/Next Actions, Follow-up, Evidence/Review, Verified Competency, Updated Roadmap. Put Continuous Product and Role in Performance Reviews below the chain.
2. Core experience loop: nine numbered cards in one row. Actor color is part of each card. Connect 1 through 9 and add a long dashed loop from step 9 back to step 3.
3. Product details/boundaries: four columns: Rules & Dependencies, MVP Requirements, Manual in MVP, Later Phases.
4. Personas/metrics: four columns: Employee, Manager, HR Admin, Success Metrics.
5. Assumptions/constraints/output: three columns: Assumptions, Constraints, Core Output.

Connectors required:

- Six connectors in the seven-step MVP Outcome chain.
- Eight connectors between core-loop steps 1-9.
- One dashed return connector from core-loop step 9 to step 3.

Approximate native objects: 30 content cards, 15 connectors, 7 headings/labels, 1 section = 53.

## 3. Personas

Layout: two equal persona columns, then shared context below.

- Employee column: one persona header plus four cards: Characteristics, Goals, Needs & Expectations, Pain Points.
- Manager column: one persona header plus the same four cards.
- Shared context: two side-by-side cards, Employee to Manager and Manager to Employee.
- Bottom row: Reviewer Nuance and HR Admin Warning.
- Full-width terminal card: Core Product Promise.

Connectors required:

- One connector from each persona column to Shared Context and Collaboration.
- No connectors between descriptive persona cards.

Approximate native objects: 15 content cards, 2 connectors, 3 headings/labels, 1 section = 21.

## 4. Customer Journey Maps

Layout: guardrails, three role journeys, handoff timeline, then trust/open decisions.

1. Purpose/scope: Employee, Manager, HR Admin Draft, and Do Not Assume cards.
2. Employee journey: nine stage cards in one horizontal row. Each stage is one editable card with four internal text blocks: Action, En-Path Output, Pain, Outcome. Add one Moments of Truth card below.
3. Manager journey: eight stage cards in one horizontal row using the same internal format. Add one Moments of Truth card below.
4. HR Admin draft journey: three wide stage cards plus one explicit out-of-scope notice.
5. Cross-role handoffs: seven milestone cards/dots on a single horizontal timeline. This can be a compact summary because the full relationship graph exists in the Cross-Role Swimlane.
6. Bottom row: Trust Constraints and Open Decisions.

Connectors required:

- Eight Employee stage connectors.
- Seven Manager stage connectors.
- Two HR Admin stage connectors.
- Six handoff-timeline connectors.

Approximate native objects: 36 content cards, 23 connectors, 9 headings/labels, 1 section = 69.

If Chrome object creation becomes unstable, make the handoff timeline one native multiline card instead of seven milestones; this saves 12 nodes without losing source content.

## 5. User Story Map

Layout: eight backbone columns, release slices, then discovery gaps.

- Row 1: eight Backbone header cards.
- Under each header: actor cards stacked vertically. Keep one card per actor/system within a backbone, with all that actor's bullets inside it.
- Role count by backbone: `2, 3, 3, 3, 3, 4, 3, 3` (24 role cards). Add the Foundation Rule card under backbone 1.
- Release Slices: a 2 x 2 grid for Slice 0, Slice 1, Slice 2, and Slice 3.
- Bottom: Outside Current MVP; one Open Decisions card containing all ten numbered decisions; BMAD Prerequisites with three input cards plus one gating/outcome card.

Connectors required:

- None. Column alignment and vertical stacking express the story-map relationship more clearly than arrows.

Approximate native objects: 43 content cards, 7 headings/legend items, 1 section = 51.

The key alignment invariant is that each task card remains directly below its matching backbone header.

## 6. Cross-Role Swimlane

Layout: four horizontal lanes across one full-width section.

- HR Admin Draft lane: H1-H3 (3 cards).
- Employee lane: E1-E10 (10 cards).
- Manager/Authorized Reviewer lane: M1-M10 (10 cards).
- En-Path System lane: S1-S7 (7 cards).
- Place six Trust and Flow Guardrail cards in one row below the lanes.
- Put the eight Open Decision categories in a final row. For a lower node count, use one wide native card with eight numbered items.

The 35 source relationships must be native connectors:

```text
H1 -> H2
H2 -> S1  [Publish competency metrics]
S1 -> E1  [Shared standard]
S1 -> M1  [Shared standard]
E1 -> E2
E2 -> S2
S1 -> S2  [Comparison standard]
S2 -> S3
S3 -> E3
S3 -> M2
M1 -> M2
E3 -> E4
M2 -> E4
E4 -> M3
M3 -> S4
S4 -> E5
S4 -> M4
E5 -> E6  [At a later follow-up]
M4 -> M5  [At a later follow-up]
E6 -> M5  [Review together]
M5 -> E7
E7 -> M6
M6 -> S4  [Store jointly confirmed statuses and agreed next actions]
E5 -> E8  [After a project or development event]
E8 -> S5  [Request + evidence]
S5 -> M7
M7 -> M8  [When acting as an authorized reviewer]
M8 -> S6
S6 -> S7
S7 -> E9
S7 -> M9
S7 -> H3
E9 -> E10
M9 -.-> M10  [Reuse data]
M9 -> E4  [Next development cycle]
```

Connector routing:

- Keep within-lane sequencing horizontal.
- Route cross-lane handoffs vertically with elbow connectors.
- Use coral dashed connectors for `M9 -.-> M10` and the return loop `M9 -> E4`.
- Label only the bracketed connectors above; unlabeled arrows can remain thin.

Approximate native objects with eight separate open-decision cards: 44 content cards, 35 connectors, 9 headings/lane labels, 1 section = 89. Combining all open decisions into one card reduces this to 82.

## Estimated total and recommended build order

Content-complete semantic recreation: approximately 320-330 native objects across the board, including about 86 connectors. This is far smaller and more usable than recreating every SVG text line and decorative rectangle (which would exceed 650 objects).

Recommended build order:

1. Create all six FigJam sections and titles in the existing grid.
2. Replace PVB, Personas, and Product Canvas first; they validate card sizing and colors with low connector risk.
3. Build Customer Journey Maps and User Story Map using duplicate-card grids.
4. Build the Cross-Role Swimlane last and connect the 35 relationships only after all H/E/M/S cards are positioned.
5. Delete each old image only after its corresponding native section is complete and visually checked.

For Chrome stability, create no more than roughly 30-50 objects per batch and wait for autosave between sections.
