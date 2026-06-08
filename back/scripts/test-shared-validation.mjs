/**
 * Test rapide des schémas Zod partagés (partner, event, user).
 * Usage : npm run test:shared-validation
 */
import { createPartnerSchema } from "../src/zodSchema/partnerValidationSchema.js";
import {
  createEventSchema,
  publishEventSchema,
} from "../src/zodSchema/eventValidationSchema.js";
import {
  emailSchema,
  passwordSchema,
  createUserSnakeSchema,
} from "../src/zodSchema/userValidationSchema.js";

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

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const futureDate = tomorrow.toISOString().slice(0, 10);

console.log("createPartnerSchema");
assert(
  "nominal",
  createPartnerSchema.safeParse({
    name: "Acme",
    url: "https://example.com",
  }).success,
);

console.log("createEventSchema");
assert(
  "nominal",
  createEventSchema.safeParse({
    title: "Atelier IA",
    date: futureDate,
    length: 90,
    stock: 30,
  }).success,
);

console.log("publishEventSchema");
assert(
  "nominal",
  publishEventSchema.safeParse({ published: true }).success,
);

console.log("user schemas");
assert(
  "email",
  emailSchema.safeParse({ email: "admin@example.com" }).success,
);
assert(
  "password fort",
  passwordSchema.safeParse({ password: "Abcdef1!" }).success,
);
assert(
  "createUserSnake",
  createUserSnakeSchema.safeParse({ name: "Jean", last_name: "Dupont" }).success,
);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
