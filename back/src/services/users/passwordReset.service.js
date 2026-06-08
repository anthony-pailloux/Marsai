import crypto from "crypto";
import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserByResetToken,
  setPasswordResetToken,
  updatePasswordAndClearReset,
} from "../../models/users/passwordReset.model.js";
import { sendPasswordResetEmail } from "./passwordResetEmail.service.js";

const RESET_TTL_MS = 60 * 60 * 1000;

export async function requestPasswordReset(email) {
  const cleanEmail = String(email || "").trim().toLowerCase();
  const user = await findUserByEmail(cleanEmail);

  if (!user) {
    return { ok: true };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TTL_MS);

  await setPasswordResetToken(user.id, token, expiresAt);

  const appUrl = process.env.APP_URL || "http://localhost:5173";
  const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(token)}`;

  try {
    await sendPasswordResetEmail(user.email, resetUrl, user.name);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[password-reset] SMTP indisponible — lien de dev :", resetUrl);
    } else {
      throw error;
    }
  }

  return { ok: true };
}

export async function resetPassword(token, password) {
  const cleanToken = String(token || "").trim();
  const user = await findUserByResetToken(cleanToken);

  if (!user) {
    const error = new Error("Lien invalide ou expiré.");
    error.status = 400;
    throw error;
  }

  if (!user.password_reset_expires_at || new Date(user.password_reset_expires_at) < new Date()) {
    const error = new Error("Lien expiré. Demandez un nouveau lien.");
    error.status = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await updatePasswordAndClearReset(user.id, passwordHash);

  return { ok: true };
}
