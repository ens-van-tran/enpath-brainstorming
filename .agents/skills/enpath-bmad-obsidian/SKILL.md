---
name: enpath-bmad-obsidian
description: Archive, index, and refresh En-Path BMAD artifacts in the personal Obsidian vault. Use when the user asks to save, sync, publish, browse, or keep a readable copy of BMAD product, UX, architecture, backlog, sprint, or implementation documents in `Projects/En-Path/bmad`.
---

# EnPath BMAD Obsidian

## Overview

Maintain a readable Obsidian mirror of BMAD outputs without changing the canonical project artifacts. The vault root is `Projects/En-Path/bmad`; all vault operations must use the `obsidian` CLI.

## Input And Discovery

1. Ask for the source artifact path only when it cannot be inferred from the request. Accept a specific Markdown file or a BMAD output folder.
2. Discover candidates under `_bmad-output/planning-artifacts`, `_bmad-output/implementation-artifacts`, and any user-supplied source path. Read the source before writing a vault note.
3. Derive the artifact type, title, status, and source path from the document. Ask for only genuinely missing context: a reader-facing summary or a decision/change reason.
4. Do not invent project facts. Preserve unknowns and draft status exactly as written in the source.

## Vault Structure

Use these vault-relative paths:

- `Projects/En-Path/bmad/README.md` - index and current phase
- `Projects/En-Path/bmad/planning/<artifact>.md` - briefs, PRDs, UX, architecture, epics, readiness reports, and research
- `Projects/En-Path/bmad/implementation/<artifact>.md` - sprint plans, stories, QA, reviews, and retrospectives

Keep the source document body in the artifact note. Prepend this frontmatter:

```yaml
---
title: <title>
artifact_type: <type>
status: <draft|final|unknown>
source_path: <workspace-relative source path>
synced_at: <ISO 8601 timestamp>
---
```

## Sync Workflow

1. Check that Obsidian Desktop is running and its CLI is enabled. If `obsidian` reports it cannot find Obsidian, stop and tell the user to open Obsidian; do not attempt a filesystem write to the vault.
2. Use `obsidian files list path="Projects/En-Path/bmad"` and `obsidian read path="..."` to discover existing notes.
3. Create missing notes with `obsidian create`; use `obsidian write` only when the user explicitly requests a refresh or confirms replacement. Never write directly to `/Users/vawn/DEVs/my-obsidian-sync` with filesystem tools.
4. Use a workspace temporary file for substantial Markdown, then pass its content to the CLI. For example:

```bash
obsidian write path="Projects/En-Path/bmad/planning/product-brief.md" content="$(< .codex-tmp-enpath-bmad-note.md)"
```

5. Maintain `README.md` as an index: current BMAD phase, links to synced artifacts, each artifact's source path, status, and sync date. Preserve manual notes in `README.md` when refreshing it.
6. Read the created or refreshed note through `obsidian read` and report its vault-relative path.

## Refresh And Safety

When a target note already exists, show its source path and current sync date. Refresh it only with explicit user authorization. Preserve a `## Manual notes` section verbatim; if it is absent, do not add one unless the user supplies notes. Never delete, move, or bulk-replace vault notes.

## Completion

Report the source artifact(s), destination note(s), and whether the action created or refreshed each one. If the CLI was unavailable, explain the one setup action needed and leave the canonical BMAD files untouched.
