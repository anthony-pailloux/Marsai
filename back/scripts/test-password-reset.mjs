#!/usr/bin/env node
/**
 * Tests d'intégration : reset password + sanity API.
 * Usage: cd back && node scripts/test-password-reset.mjs
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const API = `http://127.0.0.1:${process.env.PORT || 3000}`;
const TEST_EMAIL = "admin@marsai.com";
const NEW_PASSWORD = "TestPass123!";
const WEAK_PASSWORD = "short";

let passed = 0;
let failed = 0;

function ok(name) {
  passed++;
  console.log(`  ✓ ${name}`);
}

function fail(name, detail) {
  failed++;
  console.error(`  ✗ ${name}`);
  if (detail) console.error(`    ${detail}`);
}

async function api(pathname, body) {
  const res = await fetch(`${API}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }
  return { status: res.status, data };
}

async function main() {
  console.log("\n=== Tests MarsAI — reset password ===\n");

  try {
    const h = await fetch(`${API}/api/health`);
    const hd = await h.json();
    if (h.status === 200 && hd.status === "ok") ok("GET /api/health");
    else fail("GET /api/health", JSON.stringify(hd));
  } catch (e) {
    fail("GET /api/health", e.message);
    console.error("\nBackend inaccessible. Lancez: cd back && npm run dev\n");
    process.exit(1);
  }

  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
  });

  const [[userBefore]] = await pool.execute(
    "SELECT id, password_hash FROM users WHERE email = ? LIMIT 1",
    [TEST_EMAIL],
  );

  if (!userBefore) {
    fail(`Utilisateur test ${TEST_EMAIL} introuvable en BDD`);
    await pool.end();
    process.exit(1);
  }

  const originalHash = userBefore.password_hash;

  const unknown = await api("/api/users/forgot-password", { email: "nobody@example.com" });
  if (unknown.status === 200 && unknown.data?.success) ok("POST forgot-password (email inconnu → 200 générique)");
  else fail("POST forgot-password (email inconnu)", JSON.stringify(unknown.data));

  const forgot = await api("/api/users/forgot-password", { email: TEST_EMAIL });
  if (forgot.status === 200 && forgot.data?.success) ok("POST forgot-password (email valide)");
  else fail("POST forgot-password (email valide)", JSON.stringify(forgot.data));

  const [[userToken]] = await pool.execute(
    "SELECT password_reset_token, password_reset_expires_at FROM users WHERE email = ?",
    [TEST_EMAIL],
  );

  if (userToken?.password_reset_token) ok("Token enregistré en BDD");
  else fail("Token enregistré en BDD", "password_reset_token NULL");

  if (userToken?.password_reset_expires_at && new Date(userToken.password_reset_expires_at) > new Date()) {
    ok("Expiration token dans le futur");
  } else {
    fail("Expiration token", String(userToken?.password_reset_expires_at));
  }

  const badToken = await api("/api/users/reset-password", {
    token: "invalid-token-xyz",
    password: NEW_PASSWORD,
  });
  if (badToken.status === 400) ok("POST reset-password (token invalide → 400)");
  else fail("POST reset-password (token invalide)", `status ${badToken.status}`);

  const weak = await api("/api/users/reset-password", {
    token: userToken.password_reset_token,
    password: WEAK_PASSWORD,
  });
  if (weak.status === 400 && weak.data?.errors) ok("POST reset-password (validation Zod mot de passe faible)");
  else fail("POST reset-password (validation)", JSON.stringify(weak.data));

  const reset = await api("/api/users/reset-password", {
    token: userToken.password_reset_token,
    password: NEW_PASSWORD,
  });
  if (reset.status === 200 && reset.data?.success) ok("POST reset-password (succès)");
  else fail("POST reset-password (succès)", JSON.stringify(reset.data));

  const [[userAfter]] = await pool.execute(
    "SELECT password_reset_token, password_reset_expires_at FROM users WHERE email = ?",
    [TEST_EMAIL],
  );
  if (!userAfter.password_reset_token && !userAfter.password_reset_expires_at) {
    ok("Token effacé après reset");
  } else {
    fail("Token effacé après reset", JSON.stringify(userAfter));
  }

  const login = await api("/api/users/login", { email: TEST_EMAIL, password: NEW_PASSWORD });
  if (login.status === 200 && login.data?.token) ok("POST login (nouveau mot de passe)");
  else fail("POST login (nouveau mot de passe)", JSON.stringify(login.data));

  const reuse = await api("/api/users/reset-password", {
    token: userToken.password_reset_token,
    password: NEW_PASSWORD,
  });
  if (reuse.status === 400) ok("POST reset-password (token réutilisé → 400)");
  else fail("POST reset-password (token réutilisé)", `status ${reuse.status}`);

  await pool.execute(
    "UPDATE users SET password_hash = ?, password_reset_token = NULL, password_reset_expires_at = NULL WHERE email = ?",
    [originalHash, TEST_EMAIL],
  );
  ok("Mot de passe d'origine restauré en BDD");

  const videos = await fetch(`${API}/api/videos`);
  if (videos.status === 200) ok("GET /api/videos");
  else fail("GET /api/videos", `status ${videos.status}`);

  const awards = await fetch(`${API}/api/awards`);
  if (awards.status === 200) ok("GET /api/awards");
  else fail("GET /api/awards", `status ${awards.status}`);

  await pool.end();

  console.log(`\n=== Résultat : ${passed} OK, ${failed} échec(s) ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
