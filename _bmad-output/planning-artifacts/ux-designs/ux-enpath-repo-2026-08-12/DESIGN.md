---
name: En-Path Operations Console
description: A compact, task-forward visual system for HR and L&D competency governance.
status: final
created: 2026-08-12
updated: 2026-08-13
sources:
  - _bmad-output/planning-artifacts/pvb-product-canvas-persona-alignment-review.md
  - Projects/En-Path/docs/As-is Journey Map - HR Admin.md
  - Projects/En-Path/docs/Customer Journey Maps - Persona Views.md
  - Projects/En-Path/docs/Customer Journey Maps.md
  - Projects/En-Path/docs/Product Canvas.md
  - Projects/En-Path/docs/PVB.md
  - Projects/En-Path/Catchup business meeting note.md
  - /Users/vawn/Downloads/Bản sao của To share] Competency Matrix - Draft - Rubric Config (chuột bạch BA).pdf
colors:
  background: 'oklch(97.1% 0.007 210)'
  surface: 'oklch(98.7% 0.006 210)'
  surface-subtle: 'oklch(94.8% 0.012 210)'
  foreground: 'oklch(25% 0.028 225)'
  foreground-muted: 'oklch(48% 0.024 220)'
  border: 'oklch(87% 0.017 210)'
  border-strong: 'oklch(68% 0.028 215)'
  sidebar: 'oklch(31% 0.038 220)'
  sidebar-active: 'oklch(48% 0.09 185)'
  sidebar-foreground: 'oklch(94% 0.009 210)'
  primary: 'oklch(48% 0.09 185)'
  primary-hover: 'oklch(42% 0.09 185)'
  on-primary: 'oklch(98.5% 0.005 190)'
  primary-container: 'oklch(92.8% 0.032 185)'
  info: 'oklch(45% 0.075 235)'
  info-container: 'oklch(94% 0.022 225)'
  warning: 'oklch(49% 0.105 76)'
  warning-container: 'oklch(95% 0.05 86)'
  danger: 'oklch(48% 0.15 28)'
  danger-container: 'oklch(94% 0.04 28)'
  success: 'oklch(48% 0.09 160)'
  success-container: 'oklch(94% 0.035 155)'
  focus-ring: 'oklch(58% 0.12 185)'
  chart-recorded: 'oklch(48% 0.09 185)'
  chart-employee-reference: 'oklch(55% 0.09 255)'
  chart-expected: 'oklch(31% 0.038 220)'
  chart-unknown: 'oklch(68% 0.028 215)'
typography:
  display:
    fontFamily: 'Aptos Display, Avenir Next, sans-serif'
    fontSize: 31px
    fontWeight: '800'
    lineHeight: '1.05'
    letterSpacing: -0.045em
  heading:
    fontFamily: 'Aptos Display, Avenir Next, sans-serif'
    fontSize: 18px
    fontWeight: '750'
    lineHeight: '1.25'
  body:
    fontFamily: 'IBM Plex Sans, Aptos, sans-serif'
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.45'
  label:
    fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif'
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.3'
  data:
    fontFamily: 'IBM Plex Mono, SFMono-Regular, monospace'
    fontSize: 12px
    fontWeight: '550'
    lineHeight: '1.4'
rounded:
  sm: 4px
  md: 7px
  lg: 11px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  sidebar: 232px
  content-max: 1480px
components:
  app-shell:
    background: '{colors.background}'
    sidebar-background: '{colors.sidebar}'
    sidebar-foreground: '{colors.sidebar-foreground}'
    sidebar-width: '{spacing.sidebar}'
  page-header:
    foreground: '{colors.foreground}'
  button-primary:
    background: '{colors.primary}'
    hover-background: '{colors.primary-hover}'
    foreground: '{colors.on-primary}'
    radius: '{rounded.md}'
  panel:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.lg}'
  data-table:
    background: '{colors.surface}'
    header-background: '{colors.surface-subtle}'
    row-border: '{colors.border}'
  tabs:
    background: '{colors.surface-subtle}'
    active-background: '{colors.surface}'
    active-foreground: '{colors.primary}'
  competency-drawer:
    background: '{colors.surface}'
    border: '{colors.border}'
  pool-choice:
    background: '{colors.surface}'
    selected-background: '{colors.primary-container}'
    border: '{colors.border}'
  target-fill-bar:
    outline: '{colors.chart-expected}'
    recorded-fill: '{colors.chart-recorded}'
    employee-marker: '{colors.chart-employee-reference}'
    unknown-fill: '{colors.chart-unknown}'
  radar-chart:
    expected-outline: '{colors.chart-expected}'
    recorded-fill: '{colors.chart-recorded}'
    employee-reference-line: '{colors.chart-employee-reference}'
---

## Brand & Style

En-Path is an internal HR competency-governance work surface. The Hallmark-refined Operations Console is a calm workbench: a softened slate navigation rail, lightly cool neutral canvas, low-chroma panels, muted-teal task actions, a distinct display/body font pairing, and minimal decoration. The palette is intentionally comfortable for long desktop sessions rather than dramatic or brand-heavy.

The prototype intentionally carries less explanatory copy. A page header contains its title and at most one primary action; the interaction itself communicates the task. Governance remains visible through ownership, status, scoped Manager assignments, Public template state, and the Audit Log.

The final interactive visual reference is [HR Admin prototype](mockups/hr-admin-prototype.html). This design contract wins on conflict with the mock.

## Colors

- `{colors.sidebar}` anchors global navigation; `{colors.sidebar-active}` marks the current route.
- `{colors.primary}` marks committed actions, selected items, and recorded Manager data.
- `{colors.chart-expected}` represents the expected skill profile.
- `{colors.chart-recorded}` represents Manager Score, the recorded system result.
- `{colors.chart-employee-reference}` represents Employee Score as a dashed reference only.
- `{colors.chart-unknown}` represents missing Manager data and must be labeled `Unknown`.
- Status colors always include a visible text label such as `Draft`, `Public`, `Active`, or `Unknown`.

## Typography

Use local-first Aptos Display/Avenir Next for headings, IBM Plex Sans/Aptos for body content, and IBM Plex Mono/SFMono for data labels. Sentence case is standard. Compact table headers may use uppercase and letter spacing. Numeric values use tabular alignment where available.

## Layout & Spacing

Desktop web is the primary form factor. A persistent 232px sidebar groups Overview, Framework, Reports, Analytics, and Governance. Content uses compact panels and 12px gaps.

The Competencies surface uses tabs to keep Pool and Categories on one route. Creating a competency opens a right-side drawer so the Pool remains visible behind the task. Framework Templates use a narrow selection column and a wider composition/radar work area; Categories are collapsible to reduce vertical density.

## Elevation & Depth

Hierarchy comes from color, borders, and spacing rather than stacked shadows. Panels have no default shadow. The competency drawer and confirmation dialog use one restrained shadow to establish modal depth. Never open more than one modal layer.

## Shapes

Use 4-7px corners for controls and panels. Status badges may be compact rounded labels. Avoid oversized cards, playful pills, gradients, glass effects, and decorative illustration.

## Components

- **App shell:** Persistent sidebar and content area. Framework Templates belongs under Governance.
- **Page header:** Page title plus at most one primary action group. No eyebrow, breadcrumb repetition, or descriptive paragraph.
- **Tabs:** Pool and Categories share the Competencies route. The selected tab remains visually and programmatically explicit.
- **Competency Pool table:** Shows competency name, role-level rubric count, and status. Do not show repeated descriptions or a summarized `Level coverage` field.
- **Competency drawer:** Creates a competency description, score anchors, improvement advice per score, and the first role-level rubric.
- **Competency editor:** Shows the shared score anchors as readable rows rather than narrow columns.
- **Role-level rubric editor:** Separates role, role level, evaluation criterion, and Below / Meet / Above Expectation behavior.
- **Category register:** Shows a Category and every assigned Role Manager scope. Category assignment supports multiple active Managers.
- **Framework Template composer:** Lets HR or an assigned Manager pick Pool competencies inside collapsible Categories. A template is saved as Draft or made Public directly.
- **Template radar:** Shows the expected competency profile and an adjacent numeric equivalent.
- **People & Managers:** Uses tabs for Role Managers and Employee Import; imported records expose team, role, and level.
- **Role Manager register:** Shows Employee identity, level, team/role scope, effective date, status, and revoke action.
- **Assessment Reports table:** Reports on existing assessment activity and opens evidence in a view-only dialog.
- **Public impact preview:** Shows matched imported Employees and role levels before a Framework Template becomes Public.
- **Team member list:** The full row is the inspection trigger. Do not add a separate Inspect button.
- **Company insight lists:** Show up to five strongest and five weakest known competencies for the selected team.
- **Gap charts:** Team and member radars show Expected, recorded Manager, and Employee-reference series with numeric tables. Team trend adds a dashed six-month-prior Manager series.
- **Prototype fixtures:** Use anonymous labels such as `Employee 101`, `Member 01`, and `Manager - Platform`; never reuse names or identities from persona/interview research.
- **Audit Log:** Searchable event register and export action. It is the governance record; there is no separate Version History page.

## Do's and Don'ts

| Do | Don't |
|---|---|
| Keep pages focused on title, primary action, and task content | Add descriptions that repeat the page title |
| Show Pool and Categories as tabs on one surface | Split them into separate navigation routes |
| Separate shared score anchors from role-level rubrics | Treat a score label as the complete evaluation rubric |
| Create competency in a right drawer | Replace the Pool with a separate creation page |
| Support multiple Manager assignments per Category | Treat Category assignment as single-select |
| Make a valid template Public directly | Add a separate Framework Review queue |
| Include expected-profile radar in Framework Templates | Hide the expected profile in text-only metadata |
| Collapse template Categories when they are not being edited | Force every Category to remain expanded |
| Show team strengths, weaknesses, and six-month movement | Show only one current Average Gap |
| Keep Assessment as reports only | Include a Generate Assessment action |
| Open member detail by clicking the row | Add a redundant Inspect button |
| Label Employee Score as reference-only | Blend Employee and Manager scores |
| Mark missing Manager Score as `Unknown` | Convert missing data to zero |
