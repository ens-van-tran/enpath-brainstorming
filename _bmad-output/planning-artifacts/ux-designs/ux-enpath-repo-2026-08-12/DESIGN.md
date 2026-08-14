---
name: En-Path Growth OS
description: Role-gateway visual and interaction contract for competency, assessment, career path and IDP operations.
status: final
created: 2026-08-12
updated: 2026-08-14
source_of_truth: User prototype update dated 2026-08-14
prototype_entries:
  - mockups/login.html
  - mockups/hr-admin-prototype.html
  - mockups/line-manager.html
  - mockups/employee-prototype.html
---

# En-Path Growth OS — Design Contract

The 2026-08-14 prototype update makes [Login As](mockups/login.html) the default demo entry. It routes to the specialized [HR Admin](mockups/hr-admin-prototype.html), integrated [Manager](mockups/line-manager.html), and specialized [Employee](mockups/employee-prototype.html) prototypes.

## Product character

En-Path feels like a dependable growth operating system: structured enough for governance, fast enough for Managers to own, and optimistic enough for employees to understand where they can go next. The interface does not introduce an HR approval queue for team frameworks. Trust comes from completeness validation, immutable versions, impact previews, status history, notifications and audit evidence.

The visual language combines:

- Deep ink navigation for accountable operational context.
- A warm mist canvas with a subtle grid and organic teal/amber light fields.
- Paper-like data surfaces that avoid an entirely flat white page.
- Muted teal for progress and successful completion.
- Amber for attention, readiness and pending evidence.
- Soft coral for confirmed gaps, blocked states and destructive actions.
- Blue for snapshots, targets and informational comparison.

## Typography

- Display and analytical headings use `Iowan Old Style`, `Palatino Linotype`, Palatino or Georgia. This gives career and growth moments a humane editorial voice.
- Body and controls use `Avenir Next`, Avenir, `Gill Sans` or Calibri for dense B2B readability without relying on Inter, Roboto or Arial.
- Score, percentage and date layouts use tabular numerals where supported.
- Headings use sentence case. Statuses use lifecycle wording exactly as defined by the domain.

## Design tokens

| Purpose | Token | Value |
|---|---|---|
| Navigation ink | `--ink-900` | `#102B33` |
| Work canvas | `--mist-100` | `#EEF2EB` |
| Data surface | `--paper` | `#FFFEF9` |
| Progress | `--teal` | `#2D7D73` |
| Attention | `--amber` | `#D18B2E` |
| Critical gap | `--coral` | `#D76555` |
| Target / snapshot | `--blue` | `#4B759F` |
| Boundary | `--line` | `#D6E0D9` |

Text and essential UI boundaries target WCAG 2.2 AA. Semantic color always appears with a label, number, icon or pattern. Missing assessment data is labeled `Unknown` or presented as an empty state; it never appears as zero.

## App shell

Desktop uses a persistent 264px dark sidebar, role identity card, scoped navigation and centered content up to 1480px. The integrated Manager keeps a sticky translucent top bar with `Jump to demo state` and `Reset demo data`. Persona switching no longer occurs inside a workspace; every role exposes `Log out`, which returns to Login As.

At widths below 820px:

- Navigation becomes an off-canvas sidebar opened from the mobile header.
- Tables become labeled card rows.
- Modals occupy the full viewport with a persistent action footer.
- The career graph becomes a simplified vertical path.
- Multi-column analysis and form layouts collapse to one column.

## Login As gateway

Login As uses a split role-gateway layout: a dark En-Path identity panel and a warm operational canvas containing exactly three role cards. Each card names one role, gives one short scope statement and exposes one entry action. The gateway does not imitate production authentication and does not ask for credentials.

At narrow widths, the identity panel becomes a compact introduction above a one-column role list. Role buttons remain single-line and at least 44px tall.

## Core components

### Page header

Every screen begins with a small contextual kicker, editorial title, one-sentence outcome, scope/version chips and no more than two primary actions. Framework and assessment headers always reveal the active snapshot or working version.

### Status badge and timeline

Status badges support Framework (`Draft`, `Published`, `Superseded`, `Archived`), Assessment (`Not Started`, `Active`, `Completed`, `Cancelled`, `Expired`), Request, IDP and Action lifecycle states. Timeline entries include actor, date, status and a plain-language note.

### Cards, registers and drawers

- KPI cards are drill-down controls, not decoration.
- Tables are used for comparable records; every row exposes a real detail or mutation action.
- Drawers preserve list context for employee, framework, request, audit and development-plan detail.
- Modals handle create/edit/assign/publish/confirmation work. Assessment workspace and IDP detail use full pages.

### Validation and impact preview

Validation names what is missing and how to recover. Framework publication is blocked by incomplete expected scores or guidance. Assignment, rating-scale activation and framework publication show downstream framework, Manager, active-assessment, employee, IDP and snapshot impact before mutation.

### Data visualization

- Radar: self, recorded Manager and expected/target profiles; accompanied by a numeric equivalent.
- Heatmap: employee × competency with explicit `On track`, `Gap 1`, `Gap 2+` and `Unknown` labels.
- Bars and donuts: clickable drill-downs for adoption, gaps, completion and status distribution.
- Funnel: assessment assignment through completion.
- Career graph: configured nodes and transitions with current, selected, optional and locked treatments.

Charts answer a product question and route to the relevant list. They never stand alone as decorative dashboard filler.

## Motion

Page content rises subtly on route changes. Modal and drawer entry establish spatial hierarchy. Score, progress and status updates animate briefly; published changes finish with a toast. `prefers-reduced-motion` disables meaningful duration.

## Domain-specific visual rules

- Published Framework and Rating Scale versions look stable and are never edited in place.
- Draft comparison uses paired neutral/current and amber/proposed panels.
- Manager Score is the recorded assessment result. Self Score is explicitly labeled and optional.
- Expected Score and Target Expected Score use the blue comparison treatment.
- A competency gap uses coral only when a completed Manager score is below expectation.
- Destructive actions require confirmation; blocked archive/delete actions explain the recovery path.
- Employee empty states explain when information becomes available and offer the relevant assessment request CTA.

## Implementation mapping

- `mockups/enpath.css` owns tokens, layout, responsive behavior, components and motion.
- `mockups/enpath-app.js` owns shared seed data, localStorage persistence, charts, view rendering and real CTA behavior.
- `mockups/tokens.css` and `mockups/prototype-theme.css` adapt the standalone HR Admin and Employee prototypes to the Manager visual system without replacing their existing business logic.
- `mockups/login.html` and `mockups/demo-session.js` own role entry and Logout navigation.
- `mockups/prototype-smoke-test.js` exercises Login As destinations, role Logout, all 22 integrated routes, direct-file storage fallback and cross-persona mutations without external dependencies.
