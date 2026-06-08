import { requestPasswordReset } from "../../services/users/passwordReset.service.js";

const GENERIC_MESSAGE =
  "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.";

export async function requestPasswordResetController(req, res) {
  try {
    const { email } = req.body;
    await requestPasswordReset(email);

    return res.status(200).json({
      success: true,
      message: GENERIC_MESSAGE,
    });
  } catch (error) {
    console.error("[requestPasswordReset]", error);
    return res.status(500).json({
      error: "Impossible d'envoyer l'email de réinitialisation pour le moment.",
    });
  }
}
