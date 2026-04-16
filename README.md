# Ghostbase Plugin Marketplace

This repository is a standalone Claude Code marketplace for the Ghostbase plugin.

## What this repo contains

- `.claude-plugin/marketplace.json`
  - The marketplace catalog Claude Code reads.
- `plugins/ghostbase/`
  - The actual plugin directory Claude installs from this marketplace.

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

## Included AI Cole agent

The Ghostbase plugin now includes its own packaged `ai-cole` subagent, so it works immediately after install without adding any extra project files.

If the plugin installs but the `ai-cole` agent does not appear right away:

1. Run `/plugin marketplace update ghostbase-plugins`
2. Update or reinstall `ghostbase@ghostbase-plugins`
3. Run `/reload-plugins`

If Claude still shows the old plugin contents, clear the local plugin cache and reinstall:

```bash
rm -rf ~/.claude/plugins/cache
```

## Auto-update behavior

Third-party marketplaces are not auto-updated by default. Users need to enable auto-update for this marketplace in Claude Code if they want startup-time updates, or they can refresh manually with:

```text
/plugin marketplace update ghostbase-plugins
```
