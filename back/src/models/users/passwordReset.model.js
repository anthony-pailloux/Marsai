import { pool } from "../../db/index.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, email, name FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows[0] || null;
}

export async function setPasswordResetToken(userId, token, expiresAt) {
  await pool.execute(
    `UPDATE users
     SET password_reset_token = ?, password_reset_expires_at = ?, updated_at = NOW()
     WHERE id = ?`,
    [token, expiresAt, userId],
  );
}

export async function findUserByResetToken(token) {
  const [rows] = await pool.execute(
    `SELECT id, email, password_reset_expires_at
     FROM users
     WHERE password_reset_token = ?
     LIMIT 1`,
    [token],
  );
  return rows[0] || null;
}

export async function updatePasswordAndClearReset(userId, passwordHash) {
  await pool.execute(
    `UPDATE users
     SET password_hash = ?, password_reset_token = NULL, password_reset_expires_at = NULL, updated_at = NOW()
     WHERE id = ?`,
    [passwordHash, userId],
  );
}
