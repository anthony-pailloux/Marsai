import { resetPassword } from "../../services/users/passwordReset.service.js";

export async function resetPasswordController(req, res) {
  try {
    const { token, password } = req.body;
    await resetPassword(token, password);

    return res.status(200).json({
      success: true,
      message: "Mot de passe mis à jour. Vous pouvez vous connecter.",
    });
  } catch (error) {
    console.error("[resetPassword]", error);
    const status = error.status || 500;
    return res.status(status).json({
      error: error.message || "Erreur lors de la réinitialisation du mot de passe.",
    });
  }
}
