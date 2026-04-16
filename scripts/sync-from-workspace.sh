#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MARKETPLACE_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
WORKSPACE_ROOT="$(cd "${MARKETPLACE_ROOT}/../.." && pwd)"
SOURCE_PLUGIN_DIR="${WORKSPACE_ROOT}/claude-plugin/ghostbase/"
TARGET_PLUGIN_DIR="${MARKETPLACE_ROOT}/plugins/ghostbase/"
SOURCE_AI_COLE_AGENT="${WORKSPACE_ROOT}/.claude/agents/ai-cole.md"
TARGET_AI_COLE_AGENT="${MARKETPLACE_ROOT}/templates/project/.claude/agents/ai-cole.md"

if [[ ! -d "${SOURCE_PLUGIN_DIR}" ]]; then
  echo "Missing source plugin directory: ${SOURCE_PLUGIN_DIR}" >&2
  exit 1
fi

mkdir -p "${TARGET_PLUGIN_DIR}"
mkdir -p "$(dirname "${TARGET_AI_COLE_AGENT}")"

rsync -a --delete "${SOURCE_PLUGIN_DIR}" "${TARGET_PLUGIN_DIR}"
cp "${SOURCE_AI_COLE_AGENT}" "${TARGET_AI_COLE_AGENT}"

node - "${TARGET_PLUGIN_DIR}/.claude-plugin/plugin.json" <<'EOF'
const fs = require("fs");
const pluginJsonPath = process.argv[2];
const plugin = JSON.parse(fs.readFileSync(pluginJsonPath, "utf8"));
delete plugin.version;
fs.writeFileSync(pluginJsonPath, `${JSON.stringify(plugin, null, 2)}\n`);
EOF

echo "Synced Ghostbase plugin into ${TARGET_PLUGIN_DIR}"
