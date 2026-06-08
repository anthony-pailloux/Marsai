import { getApiBaseUrl } from "./apiBase.js";

export const NEWSLETTER_BLOCK_TEMPLATES = [
  { type: "image", label: "Image" },
  { type: "divider", label: "Divider" },
];

export function newsletterFullUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${getApiBaseUrl()}${path}`;
}

export function toDatetimeLocal(value) {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export function escapeNewsletterHtml(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function buildNewsletterPreview({
  subject,
  title,
  background,
  contentHtml,
  blocks,
}) {
  const esc = escapeNewsletterHtml;

  const blocksHtml = blocks
    .map((b) => {
      if (b.type === "divider") {
        return `<hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:16px 0" />`;
      }
      if (b.type === "image" && b.url) {
        return `<img alt="${esc(b.alt || "")}" src="${esc(
          b.url,
        )}" style="width:100%;border-radius:12px;margin:12px 0" />`;
      }
      return "";
    })
    .join("");

  const unsubscribeUrl =
    "http://localhost:5173/newsletter/unsubscribe?token=TEST";

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${esc(subject || "Newsletter")}</title>
</head>
<body style="margin:0;background:${esc(background)};font-family:Arial,sans-serif;">
  <div style="max-width:650px;margin:0 auto;padding:28px;">
    <div style="background:#fff;border-radius:18px;padding:22px;">
      ${
        title?.trim()
          ? `<h1 style="margin:0 0 16px;font-size:28px">${esc(title)}</h1>`
          : ""
      }

      ${contentHtml || ""}

      ${blocksHtml}

      <hr style="border:none;border-top:1px solid rgba(0,0,0,.12);margin:22px 0" />
      <p style="font-size:12px;opacity:.75;margin:0">
        Unsubscribe:
        <a href="${esc(unsubscribeUrl)}">click here</a>
      </p>
    </div>
  </div>
</body>
</html>`;
}

export function parseNewsletterBlocks(contentJson) {
  let parsed = contentJson;
  if (typeof parsed === "string") {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      parsed = { blocks: [] };
    }
  }
  if (!parsed || typeof parsed !== "object") parsed = { blocks: [] };
  return (parsed?.blocks || []).filter(
    (b) => b?.type === "image" || b?.type === "divider",
  );
}
