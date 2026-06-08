/**
 * Smoke test MarsAI — parcours critiques (API).
 *
 * Prérequis : API sur http://localhost:3000, comptes seed (npm run seed:users)
 * Usage : npm run smoke:test
 */
const API = process.env.SMOKE_API_URL || "http://localhost:3000/api";
const PASSWORD = "MarsAI2026!";

const USERS = [
  { label: "Superadmin", email: "test.superadmin@marsai.fr", role: "superadmin" },
  { label: "Admin", email: "test.admin@marsai.fr", role: "admin" },
  { label: "Selector", email: "test.selector@marsai.fr", role: "selector" },
];

let passed = 0;
let failed = 0;

function decodeJwtPayload(token) {
  const part = token.split(".")[1];
  return JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
}

async function request(method, path, { token, body, expectStatus } = {}) {
  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data = null;
  const text = await res.text();
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  return { status: res.status, data };
}

function ok(name) {
  passed += 1;
  console.log(`  OK  ${name}`);
}

function fail(name, detail) {
  failed += 1;
  console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function testHealth() {
  const { status, data } = await request("GET", "/health");
  if (status === 200 && data?.status === "ok") ok("API health");
  else fail("API health", `status=${status}`);
}

async function testLogins() {
  const tokens = {};

  for (const user of USERS) {
    const { status, data } = await request("POST", "/users/login", {
      body: { email: user.email, password: PASSWORD },
    });

    if (status !== 200 || !data?.token) {
      fail(`Login ${user.label}`, `status=${status}`);
      continue;
    }

    const payload = decodeJwtPayload(data.token);
    if (payload.role !== user.role) {
      fail(`Login ${user.label}`, `role=${payload.role}`);
      continue;
    }

    tokens[user.role] = data.token;
    ok(`Login ${user.label}`);
  }

  return tokens;
}

async function testAdminEvents(adminToken, selectorToken) {
  const adminRes = await request("GET", "/admin/events", { token: adminToken });
  if (adminRes.status === 200 && Array.isArray(adminRes.data)) {
    ok("Admin events list (admin)");
  } else if (adminRes.status === 200 && Array.isArray(adminRes.data?.data)) {
    ok("Admin events list (admin)");
  } else {
    fail("Admin events list (admin)", `status=${adminRes.status}`);
  }

  const selectorRes = await request("GET", "/admin/events", { token: selectorToken });
  if (selectorRes.status === 403 || selectorRes.status === 401) {
    ok("Admin events denied (selector)");
  } else {
    fail("Admin events denied (selector)", `status=${selectorRes.status}`);
  }
}

async function testCmsSections() {
  const all = await request("GET", "/cms");
  if (all.status === 200 && Array.isArray(all.data?.data) && all.data.data.length > 0) {
    ok("CMS all content (utilisé par useCmsContent)");
  } else {
    fail("CMS all content", `status=${all.status}`);
  }

  for (const section of ["concept", "hero"]) {
    const { status, data } = await request("GET", `/cms/home/${section}/fr`);
    if (status === 200 && data?.success && Array.isArray(data?.data)) {
      ok(`CMS home/${section} (fr)`);
    } else {
      fail(`CMS home/${section} (fr)`, `status=${status}`);
    }
  }
}

async function testPublicEvents() {
  const { status, data } = await request("GET", "/events");
  const list = Array.isArray(data) ? data : data?.data;
  if (status === 200 && Array.isArray(list)) ok("Public events list");
  else fail("Public events list", `status=${status}`);
}

async function testSuperadminUsers(superToken, adminToken) {
  const superRes = await request("GET", "/users", { token: superToken });
  if (superRes.status === 200) ok("Users list (superadmin)");
  else fail("Users list (superadmin)", `status=${superRes.status}`);

  const adminRes = await request("GET", "/users", { token: adminToken });
  if (adminRes.status === 403 || adminRes.status === 401) {
    ok("Users list denied (admin)");
  } else {
    fail("Users list denied (admin)", `status=${adminRes.status}`);
  }
}

async function main() {
  console.log(`Smoke test → ${API}\n`);

  await testHealth();
  const tokens = await testLogins();

  if (!tokens.admin || !tokens.selector || !tokens.superadmin) {
    console.log("\nArrêt : exécutez `npm run seed:users` puis relancez.");
    process.exit(1);
  }

  await testAdminEvents(tokens.admin, tokens.selector);
  await testCmsSections();
  await testPublicEvents();
  await testSuperadminUsers(tokens.superadmin, tokens.admin);

  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Smoke test error:", err.message);
  process.exit(1);
});
