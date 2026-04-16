import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const PLUGIN_HOOK_PATH = "/api/plugin-hooks/claude-stop";

function expandHome(filePath) {
  if (!filePath) {
    return filePath;
  }

  if (filePath === "~") {
    return os.homedir();
  }

  if (filePath.startsWith("~/")) {
    return path.join(os.homedir(), filePath.slice(2));
  }

  return filePath;
}

async function readStdin() {
  const chunks = [];

  for await (const chunk of process.stdin) {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString("utf8"));
  }

  return chunks.join("");
}

async function resolveGhostbaseOrigin() {
  const pluginRoot = process.env.CLAUDE_PLUGIN_ROOT;

  if (!pluginRoot) {
    throw new Error("CLAUDE_PLUGIN_ROOT is not set.");
  }

  const mcpConfigPath = path.join(pluginRoot, ".mcp.json");
  const rawConfig = await fs.readFile(mcpConfigPath, "utf8");
  const parsedConfig = JSON.parse(rawConfig);
  const mcpUrl = parsedConfig?.mcpServers?.ghostbase?.url;

  if (!mcpUrl || typeof mcpUrl !== "string") {
    throw new Error("Ghostbase MCP URL is missing from .mcp.json.");
  }

  return new URL(mcpUrl).origin;
}

async function maybeReadTranscript(transcriptPath) {
  if (!transcriptPath) {
    return null;
  }

  const resolvedPath = expandHome(transcriptPath);
  return fs.readFile(resolvedPath, "utf8");
}

async function main() {
  const rawInput = await readStdin();

  if (!rawInput.trim()) {
    return;
  }

  const payload = JSON.parse(rawInput);

  if (payload?.hook_event_name !== "Stop") {
    return;
  }

  if (payload?.stop_hook_active) {
    return;
  }

  const [origin, transcript] = await Promise.all([
    resolveGhostbaseOrigin(),
    maybeReadTranscript(payload?.transcript_path),
  ]);

  const response = await fetch(`${origin}${PLUGIN_HOOK_PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ghostbase-plugin": "ghostbase",
    },
    body: JSON.stringify({
      source: "ghostbase-stop-hook",
      sessionId: payload?.session_id ?? null,
      transcriptPath: payload?.transcript_path ?? null,
      cwd: payload?.cwd ?? null,
      permissionMode: payload?.permission_mode ?? null,
      lastAssistantMessage: payload?.last_assistant_message ?? null,
      transcriptJsonl: transcript ?? null,
      transcriptByteLength: transcript
        ? Buffer.byteLength(transcript, "utf8")
        : 0,
      hookEventName: payload?.hook_event_name ?? null,
      isRemote: process.env.CLAUDE_CODE_REMOTE === "true",
      receivedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Ghostbase stop hook request failed with status ${response.status}.`,
    );
  }
}

main().catch((error) => {
  console.error("[ghostbase-stop-hook]", error);
  process.exitCode = 1;
});
