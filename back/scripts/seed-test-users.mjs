/**
 * Comptes de test MarsAI — 1 utilisateur par rôle (superadmin, admin, selector).
 *
 * Usage (depuis /back) : npm run seed:users
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backDir = path.resolve(__dirname, "..");

dotenv.config({ path: path.join(backDir, ".env") });

const TEST_PASSWORD = "MarsAI2026!";

const TEST_USERS = [
  {
    email: "test.superadmin@marsai.fr",
    role: "superadmin",
    name: "Test",
    last_name: "SuperAdmin",
  },
  {
    email: "test.admin@marsai.fr",
    role: "admin",
    name: "Test",
    last_name: "Admin",
  },
  {
    email: "test.selector@marsai.fr",
    role: "selector",
    name: "Test",
    last_name: "Selector",
  },
];

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "projet_marsai",
};

async function seedTestUsers(conn) {
  const passwordHash = await bcrypt.hash(
    TEST_PASSWORD,
    Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  );

  for (const user of TEST_USERS) {
    await conn.query(
      `INSERT INTO users (email, password_hash, role, name, last_name)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         password_hash = VALUES(password_hash),
         role = VALUES(role),
         name = VALUES(name),
         last_name = VALUES(last_name),
         updated_at = NOW()`,
      [user.email, passwordHash, user.role, user.name, user.last_name],
    );
    console.log(`✓ ${user.role.padEnd(11)} → ${user.email}`);
  }
}

async function main() {
  console.log("Seed comptes de test MarsAI…");
  const conn = await mysql.createConnection(dbConfig);
  try {
    await seedTestUsers(conn);
    console.log("✓ Comptes de test prêts.");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
