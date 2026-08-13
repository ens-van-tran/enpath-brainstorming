---
name: En-Path Policy Desk
description: A precise, evidence-heavy visual system for HR and L&D competency governance.
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
  background: '#F3F4F1'
  surface: '#FCFCFA'
  surface-subtle: '#E9ECE9'
  surface-strong: '#DDE3DF'
  foreground: '#202A2A'
  foreground-muted: '#63706C'
  border: '#D5DCD8'
  border-strong: '#95A39D'
  primary: '#314D45'
  primary-hover: '#263E38'
  on-primary: '#FFFFFF'
  primary-container: '#DCE5E1'
  on-primary-container: '#263B35'
  info: '#315F78'
  info-container: '#DDEAF0'
  warning: '#7F5C11'
  warning-container: '#EFE7D3'
  danger: '#913D35'
  danger-container: '#F0DEDB'
  success: '#356548'
  success-container: '#DDEBDF'
  focus-ring: '#557E70'
  chart-recorded: '#4E6D63'
  chart-employee-reference: '#B27A45'
  chart-expected: '#315F78'
  chart-active-profile: '#4E6D63'
  chart-proposed-profile: '#315F78'
  chart-unknown: '#CBD1CE'
typography:
  display:
    fontFamily: 'Avenir Next, Gill Sans, Calibri, sans-serif'
    fontSize: 28px
    fontWeight: '650'
    lineHeight: '1.15'
    letterSpacing: -0.03em
  heading:
    fontFamily: 'Avenir Next, Gill Sans, Calibri, sans-serif'
    fontSize: 18px
    fontWeight: '650'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body:
    fontFamily: 'Avenir Next, Gill Sans, Calibri, sans-serif'
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: 'Avenir Next, Gill Sans, Calibri, sans-serif'
    fontSize: 12px
    fontWeight: '650'
    lineHeight: '1.35'
    letterSpacing: 0.01em
  caption:
    fontFamily: 'Avenir Next, Gill Sans, Calibri, sans-serif'
    fontSize: 11px
    fontWeight: '450'
    lineHeight: '1.4'
  data:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    fontSize: 12px
    fontWeight: '550'
    lineHeight: '1.4'
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  full: 9999px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  sidebar: 240px
  content-max: 1440px
components:
  app-shell:
    background: '{colors.background}'
    sidebar-background: '{colors.surface}'
    sidebar-width: '{spacing.sidebar}'
    border: '{colors.border}'
  sidebar-nav:
    active-background: '{colors.primary-container}'
    active-foreground: '{colors.on-primary-container}'
    radius: '{rounded.sm}'
  page-header:
    foreground: '{colors.foreground}'
    metadata-foreground: '{colors.foreground-muted}'
  button-primary:
    background: '{colors.primary}'
    hover-background: '{colors.primary-hover}'
    foreground: '{colors.on-primary}'
    radius: '{rounded.sm}'
  governance-card:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.md}'
  status-badge:
    radius: '{rounded.full}'
    label-font: '{typography.caption.fontSize}'
  data-table:
    background: '{colors.surface}'
    header-background: '{colors.surface-subtle}'
    row-border: '{colors.border}'
  validation-panel:
    background: '{colors.danger-container}'
    foreground: '{colors.danger}'
    accent-border: '{colors.danger}'
    radius: '{rounded.sm}'
  pool-choice:
    background: '{colors.surface}'
    selected-background: '{colors.primary-container}'
    border: '{colors.border}'
  category-assignment:
    background: '{colors.surface}'
    border: '{colors.border}'
  role-framework-composer:
    background: '{colors.surface}'
    category-background: '{colors.surface-subtle}'
    selected-background: '{colors.primary-container}'
  level-behavior-grid:
    background: '{colors.surface}'
    header-background: '{colors.surface-subtle}'
    border: '{colors.border}'
  stepper:
    active: '{colors.primary}'
    complete: '{colors.success}'
    pending: '{colors.border-strong}'
  target-fill-bar:
    outline: '{colors.chart-expected}'
    recorded-fill: '{colors.chart-recorded}'
    employee-marker: '{colors.chart-employee-reference}'
    unknown-fill: '{colors.chart-unknown}'
  radar-chart:
    expected-outline: '{colors.chart-expected}'
    recorded-fill: '{colors.chart-recorded}'
    employee-reference-line: '{colors.chart-employee-reference}'
    active-profile-fill: '{colors.chart-active-profile}'
    proposed-profile-outline: '{colors.chart-proposed-profile}'
  chart-panel:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.md}'
  advice-panel:
    background: '{colors.info-container}'
    foreground: '{colors.info}'
    radius: '{rounded.sm}'
  side-panel:
    background: '{colors.surface}'
    border: '{colors.border}'
    radius: '{rounded.lg}'
---

## Brand & Style

En-Path Policy Desk is an internal governance tool, not a consumer dashboard. It should feel accountable, calm, and inspectable. Alignment is strict, density is purposeful, and every important result exposes its basis: scope, framework version, recorded Manager Score, reference-only Employee Score, coverage, and history.

Friendliness comes from plain language and clear recovery paths. The interface does not soften governance with decoration; it reduces anxiety by explaining what failed, who owns the correction, and what happens next.

The selected visual direction is illustrated by `.working/directions-hr-admin.html` under **D - Policy Desk**. The final interactive visual reference is [HR Admin prototype](mockups/hr-admin-prototype.html), covering the application shell, competency authoring, governance review, assessment generation, and gap analytics. This design contract wins on conflict with either artifact.

## Colors

- **Background** `{colors.background}` is a cool neutral canvas that separates the application from spreadsheet-white without feeling decorative.
- **Surface** `{colors.surface}` holds registers, builders, and analytical panels.
- **Primary** `{colors.primary}` marks the current navigation context and consequential primary actions such as Generate, Submit, and Activate.
- **Danger**, **warning**, **success**, and **info** always appear with a text label or icon. Color never carries state alone.
- **Recorded Manager Score** `{colors.chart-recorded}` fills the expected-score outline. **Employee reference** `{colors.chart-employee-reference}` is a dashed secondary series and never appears as the system result.
- **Framework Review** uses `{colors.chart-active-profile}` for the active expected profile and `{colors.chart-proposed-profile}` for the proposed expected profile. These colors never imply assessment results.
- **Unknown** is neutral gray and must be labeled `Unknown` or `Insufficient data`; it never resembles a zero score.

Load-bearing contrast targets are WCAG 2.2 AA: body text and controls at least 4.5:1; large text and non-text UI boundaries at least 3:1. The target outline must remain visible against both the background and actual fill.

## Typography

The local font stack keeps the standalone prototype operational without a network connection. `{typography.display}` is reserved for page titles and key totals. `{typography.heading}` names surfaces and panels. `{typography.body}` carries explanations. `{typography.data}` is used for version IDs, rule IDs, scores, dates, gap expressions, and audit values.

Use sentence case. Avoid all-caps except short register labels and stable identifiers. Numeric values use tabular alignment where supported.

## Layout & Spacing

Desktop web is the primary form factor. The persistent `{spacing.sidebar}` sidebar anchors the navigation. Main content uses a maximum width of `{spacing.content-max}`, with a 12-column grid and 24px gutters. Competency authoring uses editable level behavior and advice grids. Role Framework composition groups selectable Pool competencies inside each assigned Category.

Registers and analytics favor dense tables and aligned panels. Every dense surface begins with a page header that states the current scope and comparison basis before showing numbers.

## Elevation & Depth

Hierarchy comes from tonal layering and borders, not floating cards. `{components.governance-card}` uses no default shadow. Side panels and confirmation dialogs may use one restrained shadow to establish modal depth. Never stack more than one modal layer.

## Shapes

Corners are square to subtly rounded: `{rounded.sm}` for controls and states, `{rounded.md}` for panels, `{rounded.lg}` only for side panels. Pills are reserved for compact status badges. Large playful rounded cards are outside the Policy Desk language.

## Components

- **App shell:** Persistent sidebar plus scoped content header. Sidebar groups are Overview, Framework, Assessment, Analytics, and Governance.
- **Sidebar nav:** Active item uses `{components.sidebar-nav.active-background}` and a strong text label. Parent groups remain expanded for the active route.
- **Page header:** Title, one-sentence purpose, scope chips, framework/version metadata, and one primary action maximum.
- **Button primary:** Used for the next committed step. Secondary actions use neutral outline buttons; destructive actions use danger styling and explicit labels.
- **Governance card:** Bounded summary or work item with title, metadata, accountable owner, and state.
- **Status badge:** Always pairs color with a word such as `Draft`, `In review`, `Changes requested`, `Active`, `Superseded`, `Unknown`, or `Complete`.
- **Data table:** Sticky header on long registers, aligned numeric columns, full-row focus state, and explicit empty/loading/error treatment.
- **Validation panel:** Lists blocking and advisory rules separately. Each finding includes rule ID, current value, expected rule, content owner, and next action.
- **Competency Pool choice:** Shows competency name and description as separate text lines. Selection is explicit, keyboard-operable, and remains visually subordinate to the Category heading.
- **Category assignment:** Shows the Category definition together with its Manager, team, and role scope. Category is a framework grouping and assignment boundary, not a competency taxonomy.
- **Role Framework composer:** Groups assigned Categories and lets HR or the assigned Manager pick relevant competencies from the shared Pool. Omitted Pool competencies remain available elsewhere and are not shown as errors.
- **Level behavior grid:** Columns represent the shared Level Model; rows capture competency-specific behavior descriptions and improvement advice for each level. Empty required cells are visibly incomplete.
- **Stepper:** Shows authoring/review/generation progression. Completed steps remain inspectable.
- **Target fill bar:** The outline represents Expected Score; Manager Score fills the outline because it is the recorded system score. Employee Score may appear only as a labeled reference marker. Never substitute Employee Score when Manager Score is missing.
- **Radar chart:** Team and member analytics show Expected, recorded Manager, and dashed Employee-reference series. Framework Review instead compares active expected and proposed expected profiles. Every radar includes a numeric/table equivalent.
- **Chart panel:** Always states role/level, framework version, assessment date, Manager-score coverage, and aggregation method. Includes a numeric/table equivalent.
- **Advice panel:** Shows HR/Manager-configured guidance and its competency source. It is not presented as AI-generated.
- **Side panel:** Used for member or competency drill-down without losing analytical context. It exposes a stable close action and returns focus to the trigger.

## Do's and Don'ts

| Do | Don't |
|---|---|
| State scope, framework version, assessment date, Manager-score coverage, and comparison basis near every analytical result | Show an unexplained score or chart |
| Explain validation failures with rule, owner, and recovery action | Use generic `Invalid input` messages |
| Label `Unknown` separately from shortfall | Convert missing assessment data to zero |
| Label Employee Score as `reference` wherever it appears | Blend Employee and Manager scores or call Employee Score the recorded result |
| Use restrained neutral surfaces and strict alignment | Use decorative gradients, glass effects, or playful illustration |
| Keep HR and Manager ownership visible | Let HR appear to silently edit Manager-owned content |
| Show active and proposed expected profiles in Framework Review | Reuse assessment-score language for framework-version comparison |
| Show configured advice provenance | Present rule-based advice as generated intelligence |
| Use labels and icons with semantic colors | Rely on red/green alone |
