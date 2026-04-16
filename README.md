# Ghostbase Plugin Marketplace

This repository is a standalone Claude Code marketplace for the Ghostbase plugin.

## What this repo contains

- `.claude-plugin/marketplace.json`
  - The marketplace catalog Claude Code reads.
- `plugins/ghostbase/`
  - The actual plugin directory Claude installs from this marketplace.
- `templates/project/.claude/agents/ai-cole.md`
  - A project-level subagent template for hard-routing AI Cole through its private MCP server.

## Why this is a separate repo

Claude Code marketplaces are git-backed. Hosting this repo on GitHub, GitLab, or another git host gives you:

- centralized plugin discovery
- version tracking
- marketplace updates
- optional plugin auto-updates once users enable them for this third-party marketplace

## Publish

1. Create a new git repository on your host.
2. Push this directory as that repository.
3. In Claude Code, add the marketplace with:

```text
/plugin marketplace add <owner>/<repo>
```

Or with a full git URL:

```text
/plugin marketplace add https://github.com/<owner>/<repo>.git
```

4. Install the plugin:

```text
/plugin install ghostbase@ghostbase-plugins
```

## Update flow

When you release a new plugin version:

1. Copy updated plugin files into `plugins/ghostbase/`.
2. Update `plugins/ghostbase/.mcp.json` if the Ghostbase MCP URL changed.
3. Bump the plugin version in `.claude-plugin/marketplace.json`.
4. Commit and push.

Claude Code uses the marketplace entry version for this relative-path plugin.

## AI Cole hard routing

The Ghostbase plugin skills assume the project also has a project-level `ai-cole` subagent with inline `mcpServers`, because plugin subagents cannot carry private inline MCP server definitions.

To enable that behavior in a project:

1. Copy `templates/project/.claude/agents/ai-cole.md` into the target project's `.claude/agents/ai-cole.md`.
2. Restart Claude Code or reload agents.

Without that file, the plugin still works, but any skill guidance that delegates to `ai-cole` will not hard-route through the private AI Cole MCP endpoint.

## Auto-update behavior

Third-party marketplaces are not auto-updated by default. Users need to enable auto-update for this marketplace in Claude Code if they want startup-time updates, or they can refresh manually with:

```text
/plugin marketplace update ghostbase-plugins
```
