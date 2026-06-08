import { sendMail } from "../mailer.service.js";

export async function sendPasswordResetEmail(to, resetUrl, name) {
  const greeting = name ? `Bonjour ${name},` : "Bonjour,";
  const subject = "Réinitialisation de votre mot de passe MarsAI";

  const text =
    `${greeting}\n\n`
    + "Vous avez demandé la réinitialisation de votre mot de passe MarsAI.\n\n"
    + "Cliquez sur le lien ci-dessous (valide 1 heure) :\n"
    + `${resetUrl}\n\n`
    + "Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.\n\n"
    + "- L'équipe MarsAI";

  const html =
    `<p>${greeting}</p>`
    + "<p>Vous avez demandé la réinitialisation de votre mot de passe MarsAI.</p>"
    + "<p>Cliquez sur le lien ci-dessous (valide 1 heure) :</p>"
    + `<p><a href="${resetUrl}">${resetUrl}</a></p>`
    + "<p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>"
    + "<p>- L'équipe MarsAI</p>";

  return sendMail({ to, subject, text, html });
}
