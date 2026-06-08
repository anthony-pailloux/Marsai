/**
 * Données de démo MarsAI — covers, vidéos, jury, awards, events, etc.
 *
 * Usage (depuis /back) :
 *   npm run seed:demo
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
    throw new Error("Échec génération des assets (generate_demo_assets.py)");
  }
}

const SHOWCASE_FILM_5 = {
  title: "Et si c'était ça, demain ?",
  title_en: "What If Tomorrow Looked Like This?",
  synopsis:
    "Marseille 2050 : une vision solarpunk où nature, drones et citoyens coexistent.",
  synopsis_en:
    "Marseille 2050: a solarpunk vision where nature, drones and citizens coexist.",
  cover: "demo-cover-05-marseille-2050.jpg",
  director_name: "Léa",
  director_lastname: "DUBOIS",
  ai: "Midjourney + Runway",
};

const DEMO_FILMS = [
  {
    id: 8,
    title: "Le futur souhaitable existe",
    title_en: "The Desirable Future Exists",
    synopsis:
      "Construisons ensemble une Marseille durable, solidaire et innovante.",
    synopsis_en:
      "Let's build together a sustainable, united and innovative Marseille.",
    cover: "demo-cover-08-futur-souhaitable.jpg",
    video: "demo-video-08.mp4",
    country: "Maroc",
    language: "fr",
    duration: 58,
    ai: "Runway Gen-3",
    director_name: "Amine",
    director_lastname: "BENALI",
    email: "amine.benali@demo.marsai.fr",
    featured: 1,
    tags: [1, 3],
  },
  {
    id: 9,
    title: "Neon Dreams",
    title_en: "Neon Dreams",
    synopsis: "Un poème visuel sur la lumière artificielle et les rêves partagés.",
    synopsis_en: "A visual poem on artificial light and shared dreams.",
    cover: "demo-cover-09-neon-dreams.jpg",
    video: "demo-video-09.mp4",
    country: "Portugal",
    language: "en",
    duration: 55,
    ai: "Pika Labs",
    director_name: "Sofia",
    director_lastname: "MARTINS",
    email: "sofia.martins@demo.marsai.fr",
    featured: 1,
    tags: [1, 4],
  },
  {
    id: 10,
    title: "Ocean Code",
    title_en: "Ocean Code",
    synopsis: "Les marées deviennent données, les poissons des pixels.",
    synopsis_en: "Tides become data, fish become pixels.",
    cover: "demo-cover-10-ocean-code.jpg",
    video: "demo-video-10.mp4",
    country: "Japon",
    language: "en",
    duration: 52,
    ai: "Sora",
    director_name: "Yuki",
    director_lastname: "TANAKA",
    email: "yuki.tanaka@demo.marsai.fr",
    featured: 0,
    tags: [2, 3],
  },
  {
    id: 11,
    title: "MarsAI Demain",
    title_en: "MarsAI Tomorrow",
    synopsis:
      "Imaginons ensemble un futur désirable porté par l'intelligence collective.",
    synopsis_en:
      "Let's imagine together a desirable future driven by collective intelligence.",
    cover: "demo-cover-11-marsai-demain.jpg",
    video: "demo-video-11.mp4",
    country: "Italie",
    language: "fr",
    duration: 60,
    ai: "Luma Dream Machine",
    director_name: "Elena",
    director_lastname: "ROSSI",
    email: "elena.rossi@demo.marsai.fr",
    featured: 1,
    tags: [3, 5],
  },
  {
    id: 12,
    title: "Last Garden",
    title_en: "Last Garden",
    synopsis: "Dans un jardin suspendu, une IA apprend à cultiver l'empathie.",
    synopsis_en: "In a floating garden, an AI learns to grow empathy.",
    cover: "demo-cover-12-last-garden.jpg",
    video: "demo-video-12.mp4",
    country: "Ghana",
    language: "en",
    duration: 49,
    ai: "Kling AI",
    director_name: "Kwame",
    director_lastname: "OSEI",
    email: "kwame.osei@demo.marsai.fr",
    featured: 0,
    tags: [2, 3],
  },
  {
    id: 13,
    title: "Marseille 2080",
    title_en: "Marseille 2080",
    synopsis: "Le vieux-port revisité par une intelligence poétique.",
    synopsis_en: "The Old Port reimagined by a poetic intelligence.",
    cover: "demo-cover-13-marseille-2080.jpg",
    video: "demo-video-13.mp4",
    country: "France",
    language: "fr",
    duration: 57,
    ai: "Midjourney + Runway",
    director_name: "Léa",
    director_lastname: "DUBOIS",
    email: "lea.dubois@demo.marsai.fr",
    featured: 1,
    tags: [4, 5],
  },
  {
    id: 14,
    title: "Echo Bloom",
    title_en: "Echo Bloom",
    synopsis: "Une voix synthétique compose l'hymne d'un futur inclusif.",
    synopsis_en: "A synthetic voice composes the hymn of an inclusive future.",
    cover: "demo-cover-14-echo-bloom.jpg",
    video: "demo-video-14.mp4",
    country: "Canada",
    language: "en",
    duration: 54,
    ai: "Stable Video",
    director_name: "Maya",
    director_lastname: "CHEN",
    email: "maya.chen@demo.marsai.fr",
    featured: 0,
    tags: [1, 2],
  },
  {
    id: 15,
    title: "Stellar Dust",
    title_en: "Stellar Dust",
    synopsis: "Poussière d'étoiles et algorithmes, une odyssée courte.",
    synopsis_en: "Stardust and algorithms — a short odyssey.",
    cover: "demo-cover-15-stellar-dust.jpg",
    video: "demo-video-15.mp4",
    country: "Égypte",
    language: "fr",
    duration: 56,
    ai: "Veo",
    director_name: "Omar",
    director_lastname: "HADDAD",
    email: "omar.haddad@demo.marsai.fr",
    featured: 1,
    tags: [1, 3],
  },
];

async function ensureAssignmentTable(conn) {
  const [cols] = await conn.query("SHOW COLUMNS FROM assignment LIKE 'selector_id'");
  if (cols.length > 0) return;

  console.log("→ Migration table assignment (schéma legacy)…");
  const migration = path.join(rootDir, "db", "migrations", "fix_assignment_table.sql");
  const sql = await import("node:fs/promises").then((fs) => fs.readFile(migration, "utf8"));
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith("--") && !s.startsWith("SET "));

  for (const statement of statements) {
    if (statement) await conn.query(statement);
  }
}

async function seed(conn) {
  await ensureAssignmentTable(conn);

  console.log("→ Mise à jour vidéo showcase (Grand Prix, id 5)…");
  await conn.query(
    `UPDATE videos SET title = ?, title_en = ?, synopsis = ?, synopsis_en = ?,
      cover = ?, director_name = ?, director_lastname = ?, ai_tech = ?, tech_resume = ?, creative_resume = ?
     WHERE id = 5`,
    [
      SHOWCASE_FILM_5.title,
      SHOWCASE_FILM_5.title_en,
      SHOWCASE_FILM_5.synopsis,
      SHOWCASE_FILM_5.synopsis_en,
      SHOWCASE_FILM_5.cover,
      SHOWCASE_FILM_5.director_name,
      SHOWCASE_FILM_5.director_lastname,
      SHOWCASE_FILM_5.ai,
      SHOWCASE_FILM_5.ai,
      SHOWCASE_FILM_5.ai,
    ],
  );

  console.log("→ Mise à jour des vidéos existantes (featured)…");
  await conn.query("UPDATE videos SET featured = 1 WHERE id IN (1, 2, 5, 6)");

  console.log("→ Insertion des films démo (8–15)…");
  for (const f of DEMO_FILMS) {
    await conn.query(
      `INSERT INTO videos (
        id, youtube_video_id, video_file_name, title, title_en, synopsis, synopsis_en,
        cover, language, country, duration, tech_resume, ai_tech, creative_resume,
        email, director_name, director_lastname, director_gender, birthday,
        address, director_country, discovery_source, upload_status,
        ownership_certified, promo_consent, featured
      ) VALUES (?, NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Mr', '1990-05-15',
        '12 Rue d''Uzes, Marseille', ?, 'Festival', 'Published', 1, 1, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title), title_en = VALUES(title_en),
        synopsis = VALUES(synopsis), synopsis_en = VALUES(synopsis_en),
        cover = VALUES(cover), video_file_name = VALUES(video_file_name),
        featured = VALUES(featured), upload_status = 'Published'`,
      [
        f.id,
        f.video,
        f.title,
        f.title_en,
        f.synopsis,
        f.synopsis_en,
        f.cover,
        f.language,
        f.country,
        f.duration,
        f.ai,
        f.ai,
        f.ai,
        f.email,
        f.director_name,
        f.director_lastname,
        f.country,
        f.featured,
      ],
    );
  }

  console.log("→ Tags vidéo…");
  await conn.query("DELETE FROM video_tag WHERE video_id BETWEEN 8 AND 15 OR tag_id = 0");
  await conn.query("DELETE FROM video_tag WHERE video_id IN (6, 7) AND tag_id = 0");
  for (const f of DEMO_FILMS) {
    for (const tagId of f.tags) {
      await conn.query(
        "INSERT IGNORE INTO video_tag (video_id, tag_id) VALUES (?, ?)",
        [f.id, tagId],
      );
    }
  }

  console.log("→ Awards & lauréats…");
  await conn.query("DELETE FROM awards_video");
  await conn.query("DELETE FROM awards");
  const awards = [
    { title: "Grand Prix Mars.AI", img: "/uploads/awards/demo-award-01.png", rank: 1, videoId: 5 },
    { title: "Prix du Public", img: "/uploads/awards/demo-award-02.png", rank: 2, videoId: 8 },
    { title: "Prix Innovation IA", img: "/uploads/awards/demo-award-03.png", rank: 3, videoId: 11 },
  ];
  for (const a of awards) {
    const [res] = await conn.query(
      "INSERT INTO awards (title, img, `rank`) VALUES (?, ?, ?)",
      [a.title, a.img, a.rank],
    );
    await conn.query(
      "INSERT INTO awards_video (award_id, video_id) VALUES (?, ?)",
      [res.insertId, a.videoId],
    );
  }

  console.log("→ Jury…");
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
  ];
  for (const [name, first, img, profession, role, order] of extraJury) {
    await conn.query(
      `INSERT INTO jury (name, first_name, img, bio, profession, role_label, is_president, filmography_url, sort_order)
       VALUES (?, ?, ?, 'Membre du jury Mars.AI — sélection 2026.', ?, ?, 0, 'https://marsai.demo', ?)`,
      [name, first, img, profession, role, order],
    );
  }

  console.log("→ Contributeurs & stills…");
  await conn.query("DELETE FROM contributor WHERE video_id BETWEEN 8 AND 15");
  await conn.query("DELETE FROM still WHERE video_id BETWEEN 8 AND 15");
  for (const f of DEMO_FILMS.slice(0, 5)) {
    await conn.query(
      `INSERT INTO contributor (video_id, name, last_name, gender, email, profession)
       VALUES (?, 'Alex', 'MOREAU', 'Mr', ?, 'Monteur IA')`,
      [f.id, `contrib.${f.id}@demo.marsai.fr`],
    );
    await conn.query(
      "INSERT INTO still (file_name, video_id) VALUES (?, ?)",
      [f.cover, f.id],
    );
  }

  console.log("→ Avis sélectionneurs…");
  await conn.query("DELETE FROM video_review WHERE video_id BETWEEN 8 AND 15");
  const reviews = [
    [8, 6, 8, "Visuel fort, très cohérent avec le thème."],
    [9, 6, 7, "Belle direction artistique."],
    [11, 6, 9, "Mon favori — original et poétique."],
    [13, 6, 8, "Excellent ancrage marseillais."],
  ];
  for (const [videoId, userId, rating, comment] of reviews) {
    await conn.query(
      `INSERT INTO video_review (video_id, user_id, rating, comment) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), comment = VALUES(comment)`,
      [videoId, userId, rating, comment],
    );
  }

  console.log("→ Assignations sélectionneur…");
  await conn.query("DELETE FROM assignment");
  const selectorId = 6;
  for (const id of [1, 2, 5, 8, 9, 10, 11, 13]) {
    await conn.query(
      "INSERT IGNORE INTO assignment (selector_id, video_id) VALUES (?, ?)",
      [selectorId, id],
    );
  }

  console.log("→ Événements & réservations…");
  await conn.query(
    `UPDATE events SET illustration = '/uploads/medias/demo-event-01-accueil.jpg', published = 1 WHERE id = 1`,
  );
  await conn.query(
    `UPDATE events SET illustration = '/uploads/medias/demo-event-02-conference.jpg', published = 1 WHERE id = 2`,
  );
  await conn.query(
    `UPDATE events SET illustration = '/uploads/medias/demo-event-03-workshop.jpg', published = 1, stock = 25 WHERE id = 3`,
  );
  const extraEvents = [
    ["Remise des Prix Mars.AI", "Cérémonie de clôture et annonce des lauréats.", "2026-06-13 18:00:00", 120, 200, "/uploads/medias/demo-event-04-awards.jpg", "Salle des Sucres"],
    ["Mars.AI Night — Soirée Electro", "DJ set et VJ mapping autour des futurs souhaitables.", "2026-06-13 21:00:00", 180, 150, "/uploads/medias/demo-event-05-closing.jpg", "Salle PLAZA"],
  ];
  for (const ev of extraEvents) {
    await conn.query(
      `INSERT INTO events (title, description, date, length, stock, illustration, location, published)
       SELECT ?, ?, ?, ?, ?, ?, ?, 1 FROM DUAL
       WHERE NOT EXISTS (SELECT 1 FROM events WHERE title = ?)`,
      [...ev, ev[0]],
    );
  }
  await conn.query("DELETE FROM bookings");
  await conn.query(
    `INSERT INTO bookings (event_id, first_name, last_name, email) VALUES
     (1, 'Camille', 'Durand', 'camille@demo.marsai.fr'),
     (2, 'Thomas', 'Martin', 'thomas@demo.marsai.fr'),
     (3, 'Inès', 'Petit', 'ines@demo.marsai.fr')`,
  );

  console.log("→ Newsletter & abonnés…");
  await conn.query(
    `INSERT IGNORE INTO newsletter_subscribers (email, status, consent_at, confirmed_at, country, locale) VALUES
     ('demo1@marsai.fr', 'active', NOW(), NOW(), 'France', 'fr'),
     ('demo2@marsai.fr', 'active', NOW(), NOW(), 'France', 'fr'),
     ('demo.en@marsai.fr', 'active', NOW(), NOW(), 'UK', 'en')`,
  );

  console.log("→ Paramètres festival…");
  await conn.query("DELETE FROM parameters");
  await conn.query(
    `INSERT INTO parameters (submission_open_at, submission_close_at, max_duration_seconds, festival_name, event_description)
     VALUES ('2026-01-01', '2026-10-12', 60, 'Mars.AI Festival 2026', 'Festival de courts-métrages IA — 60 secondes pour imaginer des futurs souhaitables.')`,
  );

  console.log("→ Messages contact supplémentaires…");
  await conn.query(
    `INSERT INTO contact_messages (name, last_name, subject, email, message, is_read)
     SELECT 'Demo', 'User', 'Question participation', 'demo.contact@marsai.fr', 'Bonjour, puis-je soumettre deux films ?', 0
     FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM contact_messages WHERE email = 'demo.contact@marsai.fr')`,
  );

  await conn.query("ALTER TABLE videos AUTO_INCREMENT = 16");
  console.log("✓ Seed démo terminé.");
}

async function main() {
  console.log("Génération des assets visuels…");
  runAssetGenerator();

  const conn = await mysql.createConnection(dbConfig);
  try {
    await seed(conn);
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
