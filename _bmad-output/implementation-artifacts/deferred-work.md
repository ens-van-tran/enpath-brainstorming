# Deferred Work

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Add repair controls for dangling Career Path transitions imported into a Working Draft.
  evidence: Validation blocks publication for a transition whose Position no longer exists, but the current graph UI omits that edge and offers no delete control.

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Define safe archival or upstream-change guards for Career Positions whose Role Level is removed.
  evidence: An unassigned Role Level can be deleted while a Working Draft Position still references it, leaving the locked Position identity invalid and not repairable in the current UI.

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Define how the Career tree renders a DAG Position with multiple incoming transitions.
  evidence: The current recursive tree duplicates the same Position card for each parent, which can misrepresent one Team Position as multiple targets.

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Align assignment effective-date behavior with either immediate-only or scheduled activation semantics.
  evidence: The assignment form accepts future dates but applies Team, Role, Manager, and Career Path changes immediately.

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Distinguish missing competency lineage from a truly Unknown Official Rating in target comparisons.
  evidence: A name-matched rating and target that both lack System Competency IDs currently render as Unknown instead of Not Comparable.

- source_spec: `_bmad-output/implementation-artifacts/spec-team-scoped-career-path-prototype.md`
  summary: Add automated real-browser responsive regression checks for Career Path layouts.
  evidence: The smoke harness validates rendered markup but cannot detect CSS overflow, overlap, or broken connectors; desktop and mobile are currently checked manually.
