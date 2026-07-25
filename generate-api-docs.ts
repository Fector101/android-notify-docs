import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { VERSION_ORDER } from "./src/pages/versions-data/index.js";
import { VERSION_MAP } from "./src/pages/versions-data/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function generateMarkdown(version: string, data: any): string {
  const lines: string[] = [];
  lines.push(`# Android Notify v${version} — API Reference\n`);

  const notifMethods = data?.NOTIFICATION_METHODS || {};
  const notifEntries = Object.entries(notifMethods);
  if (notifEntries.length) {
    lines.push(`## Notification\n`);
    for (const [key, m] of notifEntries) {
      const method = m as any;
      lines.push(`### ${method.signature || key}\n`);
      if (method.description) lines.push(`${method.description}\n`);
      lines.push(`**Returns:** ${method.returns || "None"}\n`);
      if (method.args?.length) {
        lines.push(`| Parameter | Description |`);
        lines.push(`|-----------|-------------|`);
        for (const a of method.args) {
          lines.push(`| \`${a.name}\` | ${a.desc} |`);
        }
        lines.push("");
      }
    }
  }

  const handlers = data?.HANDLER_METHODS || [];
  if (handlers.length) {
    lines.push(`## NotificationHandler\n`);
    for (const m of handlers) {
      lines.push(`### ${m.signature}\n`);
      if (m.description) lines.push(`${m.description}\n`);
      lines.push(`**Returns:** ${m.returns || "None"}\n`);
      if (m.args?.length) {
        lines.push(`| Parameter | Description |`);
        lines.push(`|-----------|-------------|`);
        for (const a of m.args) {
          lines.push(`| \`${a.name}\` | ${a.desc} |`);
        }
        lines.push("");
      }
    }
  }

  const styles = data?.STYLE_ATTRIBUTES;
  if (styles) {
    const styleEntries = Object.entries(styles);
    if (styleEntries.length) {
      lines.push(`## NotificationStyles (deprecated)\n`);
      for (const [key, m] of styleEntries) {
        const style = m as any;
        lines.push(`### ${style.signature || key}\n`);
        if (style.description) lines.push(`${style.description}\n`);
      }
    }
  }

  return lines.join("\n");
}

const outDir = path.join(__dirname, "public", "api");
fs.mkdirSync(outDir, { recursive: true });

for (const version of VERSION_ORDER) {
  const data = VERSION_MAP[version];
  if (!data) continue;
  const md = generateMarkdown(version, data);
  const filePath = path.join(outDir, `android-notify-v${version}-api.md`);
  fs.writeFileSync(filePath, md, "utf8");
  console.log(`✅ Generated ${filePath}`);
}
