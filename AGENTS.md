# En-Path Repository Instructions

## Obsidian Project Context

- Treat the personal Obsidian vault at `~/DEVs/my-obsidian-sync/` as a primary source of user-authored En-Path product context.
- Before planning, analyzing, reviewing, documenting, or implementing an En-Path task, search and read the relevant notes under `Projects/En-Path/` in the vault.
- Access the vault through the `obsidian-cli` skill and the `obsidian` CLI. Never read or modify vault files directly with filesystem tools.
- Read only the notes relevant to the current task; do not load the entire vault without a specific need.
- When vault notes conflict with repository code or documentation, identify the discrepancy and ask for clarification if it materially affects the task.
- Keep the vault as the source of truth for the user's informal notes, discovery findings, interviews, and evolving product decisions unless the user specifies another authoritative source.

## En-Path Vault Sync Direction

- The shared project vault is named `enpath-vault` and is located at `/Users/vawn/DEVs/works/En-Path/enpath-vault`.
- The personal reading and note-taking vault is named `my-obsidian-sync` and is located at `/Users/vawn/DEVs/my-obsidian-sync`.
- The default source and destination subtree is `Projects/En-Path/` in both vaults.
- When the user says "sync En-Path project docs to my personal vault", "sync docs En-Path về vault cá nhân", or equivalent wording, interpret it as a pull from `enpath-vault` to `my-obsidian-sync`.
- For a pull, read source files with `obsidian <command> vault=enpath-vault` and create, update, and verify destination files with `obsidian <command> vault=my-obsidian-sync`.
- When the user explicitly says "push", "publish", "share", or "update enpath-vault from my personal vault" for a named En-Path file or folder, interpret it as a scoped push from `my-obsidian-sync` to `enpath-vault`.
- A push must have an explicit file or folder scope. If the scope cannot be inferred unambiguously, ask for the path instead of pushing the entire `Projects/En-Path/` tree.
- For a push, read source files with `obsidian <command> vault=my-obsidian-sync` and create, update, and verify destination files with `obsidian <command> vault=enpath-vault`.
- Within an explicitly requested push scope, treat the personal-vault copy as the source version. Never update unrelated shared-vault notes.
- In either direction, create missing destination notes and update matching notes, but never delete notes that exist only in the destination vault.
- Preserve an existing `## Manual notes` section in the destination copy. If other destination-only edits would be overwritten and cannot be merged safely, report the conflict instead of silently discarding them.
- Never infer a reverse-sync direction from the current active vault; determine direction only from the user's wording and the rules above.
- Never access either vault through direct filesystem writes; all vault operations must go through the `obsidian-cli` skill and the `obsidian` CLI.

## BMAD Artifact Persistence

- Keep BMAD artifacts under `_bmad-output/planning-artifacts/` and `_bmad-output/implementation-artifacts/` as the canonical project copies.
- After every successful BMAD workflow that creates or updates an artifact, automatically invoke the `enpath-bmad-obsidian` skill to create or refresh its readable mirror under `Projects/En-Path/bmad/` in the personal Obsidian vault.
- This instruction is standing authorization to refresh the matching vault mirror when its canonical artifact is changed by the current workflow; do not ask for refresh confirmation again.
- Sync only artifacts created or changed by the current workflow. Do not bulk-refresh unrelated BMAD artifacts.
- Maintain `Projects/En-Path/bmad/README.md` as the artifact index and current-phase overview, including source paths, statuses, and sync timestamps.
- Preserve any `## Manual notes` section in existing vault mirrors and in the BMAD index when refreshing them.
- Verify every synced note by reading it back through the `obsidian` CLI and report both the canonical source path and vault destination.
- If Obsidian or its CLI is unavailable, keep the canonical artifact intact, report that the vault mirror is pending, and never write directly to the vault through filesystem tools.
