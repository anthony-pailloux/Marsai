/**
 * Test rapide des schémas Zod participation film (source shared/).
 * Usage : node scripts/test-film-validation.mjs
 */
import {
  createFilmSchema,
  uploadFilmFilesSchema,
} from "../src/zodSchema/filmValidationSchema.js";

let passed = 0;
let failed = 0;

function assert(label, condition) {
  if (condition) {
    passed++;
    console.log(`  OK  ${label}`);
  } else {
    failed++;
    console.error(` FAIL ${label}`);
  }
}

const validForm = {
  title: "Mon film",
  title_en: "My film",
  synopsis: "Synopsis FR",
  synopsis_en: "Synopsis EN",
  language: "Français",
  country: "fr",
  duration: 60,
  tech_resume: "Tech",
  ai_tech: "Midjourney",
  creative_resume: "Creative",
  email: "realisateur@example.com",
  director_name: "Jean",
  director_lastname: "Dupont",
  director_gender: "Mr",
  birthday: "15-06-1990",
  address: "12 rue de la Paix",
  director_country: "FR",
  discovery_source: "Réseaux sociaux",
  mobile_number: "+33601020304",
  tags: '["IA"]',
  contributors: "[]",
};

console.log("createFilmSchema");
assert("nominal", createFilmSchema.safeParse(validForm).success);
assert(
  "birthday invalide",
  !createFilmSchema.safeParse({ ...validForm, birthday: "not-a-date" }).success,
);
assert(
  "pays ISO",
  createFilmSchema.safeParse({ ...validForm, country: "fr" }).success,
);

console.log("uploadFilmFilesSchema");
const validFiles = {
  video: [{ mimetype: "video/mp4", size: 25 * 1024 * 1024 }],
  cover: [{ mimetype: "image/jpeg", size: 200 * 1024 }],
  stills: [{ mimetype: "image/png", size: 200 * 1024 }],
  subtitles: [{ originalname: "fr.srt" }],
};
assert("fichiers valides", uploadFilmFilesSchema.safeParse(validFiles).success);
assert(
  "video trop petite",
  !uploadFilmFilesSchema.safeParse({
    ...validFiles,
    video: [{ mimetype: "video/mp4", size: 1024 }],
  }).success,
);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
