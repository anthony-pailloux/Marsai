/**
 * Génère les portraits jury et met à jour la table jury.
 * Usage (depuis /back) : node scripts/seed-jury-images.mjs
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backDir = path.resolve(__dirname, "..");
const rootDir = path.resolve(backDir, "..");

dotenv.config({ path: path.join(backDir, ".env") });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "projet_marsai",
};

function runAssetGenerator() {
  const script = path.join(rootDir, "scripts", "generate_demo_assets.py");
  const result = spawnSync("python", [script], { stdio: "inherit", cwd: rootDir });
  if (result.status !== 0) {
    throw new Error("Échec génération des assets jury");
  }
}

async function seedJury(conn) {
  console.log("→ Mise à jour des images jury…");
  await conn.query("DELETE FROM jury WHERE id > 2");
  await conn.query(
    `UPDATE jury SET img = 'demo-jury-julien-valros.jpg', bio = 'Réalisateur et expert en narration immersive. Président du jury Mars.AI 2026.',
     profession = 'Réalisateur', role_label = 'PRÉSIDENT DU JURY', is_president = 1, sort_order = 1 WHERE id = 1`,
  );
  await conn.query(
    `UPDATE jury SET img = 'demo-jury-julie-masson.jpg', bio = 'Productrice de films courts et consultante en innovation créative.',
     profession = 'Productrice', role_label = 'PRODUCTRICE', is_president = 0, sort_order = 2 WHERE id = 2`,
  );
  const extraJury = [
    ["CHEN", "Sarah", "demo-jury-sarah-chen.jpg", "Directrice artistique IA", "CRÉATRICE", 3],
    ["DUBOIS", "Marc", "demo-jury-marc-dubois.jpg", "Scénariste & chercheur", "SCÉNARISTE", 4],
    ["OKAFOR", "Aisha", "demo-jury-aisha-okafor.jpg", "Documentariste", "DOCUMENTARISTE", 5],
    ["ROSSI", "Elena", "demo-jury-elena-rossi.jpg", "Experte éthique IA", "ÉTHIQUE IA", 6],
    ["PETIT", "Lucas", "demo-jury-lucas-petit.jpg", "Monteur & compositeur", "MONTAGE", 7],
  ];
  for (const [name, first, img, profession, role, order] of extraJury) {
    await conn.query(
      `INSERT INTO jury (name, first_name, img, bio, profession, role_label, is_president, filmography_url, sort_order)
       VALUES (?, ?, ?, 'Membre du jury Mars.AI — sélection 2026.', ?, ?, 0, 'https://marsai.demo', ?)`,
      [name, first, img, profession, role, order],
    );
  }
  console.log("✓ 7 membres du jury (1 président + 6 membres) avec photos.");
}

async function main() {
  console.log("Génération des portraits jury…");
  runAssetGenerator();

  const conn = await mysql.createConnection(dbConfig);
  try {
    await seedJury(conn);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
