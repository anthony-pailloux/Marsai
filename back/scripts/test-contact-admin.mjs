#!/usr/bin/env node
/**
 * Tests d'intégration : contact admin + service email de réponse.
 * Usage: cd back && node scripts/test-contact-admin.mjs
 */
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {
  isSmtpConfigured,
  sendContactReplyEmail,
} from "../src/services/contactReplyEmail.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const API = `http://127.0.0.1:${process.env.PORT || 3000}`;
const JWT_SECRET = process.env.JWT_SECRET;

let passed = 0;
let failed = 0;
let testMessageId = null;

function ok(name) {
  passed++;
  console.log(`  ✓ ${name}`);
}

function fail(name, detail) {
  failed++;
  console.error(`  ✗ ${name}`);
  if (detail) console.error(`    ${detail}`);
}

function adminToken(role = "admin") {
  return jwt.sign({ sub: 4, role }, JWT_SECRET, { expiresIn: "1h" });
}

async function request(method, pathname, { token, body } = {}) {
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API}${pathname}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
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
  console.log("\n=== Tests MarsAI — contact admin ===\n");

  if (typeof isSmtpConfigured === "function") ok("contactReplyEmail.isSmtpConfigured exporté");
  else fail("contactReplyEmail.isSmtpConfigured exporté");

  if (typeof sendContactReplyEmail === "function") ok("contactReplyEmail.sendContactReplyEmail exporté");
  else fail("contactReplyEmail.sendContactReplyEmail exporté");

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

  const noAuth = await request("GET", "/api/contact/admin/messages");
  if (noAuth.status === 401) ok("GET messages sans token → 401");
  else fail("GET messages sans token", `status ${noAuth.status}`);

  const selector = await request("GET", "/api/contact/admin/messages", {
    token: adminToken("selector"),
  });
  if (selector.status === 403) ok("GET messages rôle selector → 403");
  else fail("GET messages rôle selector", `status ${selector.status}`);

  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME,
  });

  const testEmail = `test-contact-${Date.now()}@example.com`;
  const [insert] = await pool.execute(
    `INSERT INTO contact_messages (name, last_name, subject, email, message, is_read)
     VALUES (?, ?, ?, ?, ?, 0)`,
    ["Test", "ContactAdmin", "Sujet test script", testEmail, "Message original pour test auto"],
  );
  testMessageId = insert.insertId;
  ok(`Message test inséré (id=${testMessageId})`);

  const token = adminToken("admin");
  const list = await request("GET", "/api/contact/admin/messages", { token });
  if (list.status === 200 && Array.isArray(list.data)) {
    const found = list.data.some((m) => m.id === testMessageId);
    if (found) ok("GET messages admin → contient le message test");
    else fail("GET messages admin", "message test absent");
  } else {
    fail("GET messages admin", JSON.stringify(list.data));
  }

  const read = await request("POST", `/api/contact/admin/messages/${testMessageId}/read`, {
    token,
  });
  if (read.status === 200 && read.data?.ok) {
    ok("POST read → 200");
  } else {
    fail("POST read", JSON.stringify(read.data));
  }

  const [[afterRead]] = await pool.execute(
    "SELECT is_read, read_at FROM contact_messages WHERE id = ?",
    [testMessageId],
  );
  if (afterRead?.is_read === 1 && afterRead?.read_at) ok("BDD : is_read=1 après read");
  else fail("BDD après read", JSON.stringify(afterRead));

  const replyText = `Réponse test ${Date.now()}`;
  const reply = await request("POST", `/api/contact/admin/messages/${testMessageId}/reply`, {
    token,
    body: { reply: replyText, replied_by: 4 },
  });
  if (reply.status === 200 && reply.data?.ok) ok("POST reply → 200");
  else fail("POST reply", JSON.stringify(reply.data));

  const [[afterReply]] = await pool.execute(
    "SELECT reply, replied_at, replied_by, is_read FROM contact_messages WHERE id = ?",
    [testMessageId],
  );
  if (afterReply?.reply === replyText && afterReply?.replied_at && afterReply?.replied_by === 4) {
    ok("BDD : reply + replied_at + replied_by enregistrés");
  } else {
    fail("BDD après reply", JSON.stringify(afterReply));
  }

  const emptyReply = await request("POST", `/api/contact/admin/messages/${testMessageId}/reply`, {
    token,
    body: { reply: "   " },
  });
  if (emptyReply.status === 400) ok("POST reply vide → 400");
  else fail("POST reply vide", `status ${emptyReply.status}`);

  const notFound = await request("POST", "/api/contact/admin/messages/999999/reply", {
    token,
    body: { reply: "test" },
  });
  if (notFound.status === 404) ok("POST reply id inexistant → 404");
  else fail("POST reply id inexistant", `status ${notFound.status}`);

  if (!isSmtpConfigured()) {
    ok("SMTP non configuré → reply en BDD sans erreur (comportement attendu)");
  } else {
    try {
      await sendContactReplyEmail({
        to: testEmail,
        subject: "Test direct service",
        originalMessage: "<script>alert(1)</script>",
        reply: "Réponse & test \"quotes\"",
      });
      ok("sendContactReplyEmail direct (SMTP configuré)");
    } catch (e) {
      fail("sendContactReplyEmail direct", e.message);
    }
  }

  await pool.execute("DELETE FROM contact_messages WHERE id = ?", [testMessageId]);
  ok("Message test supprimé");

  await pool.end();

  console.log(`\n=== Résultat : ${passed} OK, ${failed} échec(s) ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
