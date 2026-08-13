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
colors:
  background: '#F4F7F9'
  surface: '#FFFFFF'
  surface-subtle: '#E9F0F4'
  foreground: '#172A39'
  foreground-muted: '#607585'
  border: '#D8E2E8'
  border-strong: '#91A9B8'
  sidebar: '#123B5D'
  sidebar-active: '#245371'
  sidebar-foreground: '#D5E3EC'
  primary: '#176A78'
  primary-hover: '#105966'
  on-primary: '#FFFFFF'
  primary-container: '#D9ECED'
  info: '#23526F'
  info-container: '#E0EDF5'
  warning: '#986000'
  warning-container: '#FFF0CF'
  danger: '#B34438'
  danger-container: '#FCE4E0'
  success: '#24756F'
  success-container: '#DCEEEA'
  focus-ring: '#2D8791'
  chart-recorded: '#176A78'
  chart-employee-reference: '#C77A35'
  chart-expected: '#123B5D'
  chart-unknown: '#C8D4DB'
typography:
  display:
    fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif'
    fontSize: 26px
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  heading:
    fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif'
    fontSize: 17px
    fontWeight: '700'
    lineHeight: '1.25'
  body:
    fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif'
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.45'
  label:
    fontFamily: 'Segoe UI, Helvetica Neue, Arial, sans-serif'
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.3'
  data:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: 12px
    fontWeight: '550'
    lineHeight: '1.4'
rounded:
  sm: 4px
  md: 5px
  lg: 7px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  sidebar: 220px
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

En-Path is an internal HR and L&D work surface. The Operations Console direction is compact, precise, and easy to scan: a navy sidebar, blue-gray canvas, white panels, teal actions, readable sans-serif typography, and minimal decoration.

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

Use the local Segoe UI-led stack so the standalone HTML remains readable without network dependencies. Sentence case is standard. Compact table headers may use uppercase and letter spacing. Numeric values use tabular alignment where available.

## Layout & Spacing

Desktop web is the primary form factor. A persistent 220px sidebar groups Overview, Framework, Reports, Analytics, and Governance. Content uses compact panels and 12px gaps.

The Competencies surface uses tabs to keep Pool and Categories on one route. Creating a competency opens a right-side drawer so the Pool remains visible behind the task. Framework Templates use a narrow selection column and a wider composition/radar work area; Categories are collapsible to reduce vertical density.

## Elevation & Depth

Hierarchy comes from color, borders, and spacing rather than stacked shadows. Panels have no default shadow. The competency drawer and confirmation dialog use one restrained shadow to establish modal depth. Never open more than one modal layer.

## Shapes

Use 4-7px corners for controls and panels. Status badges may be compact rounded labels. Avoid oversized cards, playful pills, gradients, glass effects, and decorative illustration.

## Components

- **App shell:** Persistent sidebar and content area. Framework Templates belongs under Governance.
- **Page header:** Page title plus at most one primary action group. No eyebrow, breadcrumb repetition, or descriptive paragraph.
- **Tabs:** Pool and Categories share the Competencies route. The selected tab remains visually and programmatically explicit.
- **Competency Pool table:** Shows competency name, each shared level as an explicit badge, and status. Do not show competency description or a summarized `Level coverage` field.
- **Competency drawer:** Creates a competency with a name, behavior, and improvement advice for each active shared level. Validation keeps incomplete content in the drawer.
- **Competency editor:** Shows behavior and advice as two editable rows across the shared levels.
- **Competency editor:** Selecting a Pool row opens its behavior-by-level grid on the same surface.
- **Category register:** Shows a Category and every assigned Role Manager scope. Category assignment supports multiple active Managers.
- **Framework Template composer:** Lets HR or an assigned Manager pick Pool competencies inside collapsible Categories. A template is saved as Draft or made Public directly.
- **Template radar:** Shows the expected competency profile and an adjacent numeric equivalent.
- **Role Manager register:** Shows Employee identity, team/role scope, effective date, status, and revoke action.
- **Assessment Reports table:** Reports on existing assessment activity; it does not launch or generate an assessment.
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
| Show every competency level explicitly | Show a vague `Level coverage` summary |
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
