# Product Model

## Organization structure

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

`Department` is not an En-Path domain. If an organization calls a unit “PDO department,” it is represented as a Team when that is the operating scope required for Members, Framework, Career Path, and Manager responsibility.

## Competency configuration boundary

```text
System Competency Library
  -> copied into Framework Template
      -> copied into independent Team Framework
          -> immutable Published Framework Revision
              -> immutable Assessment Snapshot
```

Later source edits never silently rewrite downstream copies or historical decisions.

## Assessment authority

```text
Manager assigns Assessment
  -> Employee submits Self-Assessment
      -> Manager completes separate Manager Assessment
          -> Official Ratings become effective together
```

Unanswered Self-Assessment items are `Not Answered`. Missing Official Ratings are `Unknown`. Neither state is converted to Level 1.

## Initial Assessment and Reassessment

- An unrated Competency uses Initial Assessment behavior.
- A rated eligible Competency may enter Reassessment.
- One Reassessment Request may contain several Competency Items.
- Each item keeps separate Evidence, Contextual Review, status, rating, rationale, and next action.
- The parent Request never receives a blended rating.

## Development and capability

Development Plans remain Employee-owned. Manager review is advisory and applies to a captured snapshot. Capability Overview counts comparable Official Ratings separately from active development coverage.

