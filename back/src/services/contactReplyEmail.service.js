import { sendMail } from "./mailer.service.js";

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function isSmtpConfigured() {
  return Boolean(
    process.env.MAIL_HOST &&
      process.env.MAIL_USER &&
      process.env.MAIL_PASS,
  );
}

export async function sendContactReplyEmail({
  to,
  subject,
  originalMessage,
  reply,
}) {
  const text = `Bonjour,

Nous avons bien reçu ton message :
"${originalMessage}"

Réponse de l'équipe MarsAI :
"${reply}"

— MarsAI
`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5">
      <p>Bonjour,</p>

      <p><strong>Nous avons bien reçu ton message :</strong></p>
      <blockquote style="margin:12px 0;padding:10px 12px;border-left:4px solid #ddd;background:#fafafa">
        ${escapeHtml(originalMessage)}
      </blockquote>

      <p><strong>Réponse de l'équipe MarsAI :</strong></p>
      <blockquote style="margin:12px 0;padding:10px 12px;border-left:4px solid #ddd;background:#fafafa">
        ${escapeHtml(reply)}
      </blockquote>

      <p>— MarsAI</p>
    </div>
  `;

  return sendMail({
    to,
    subject: `[MarsAI] Re: ${subject}`,
    text,
    html,
  });
}
