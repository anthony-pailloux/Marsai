// src/server.js

import "dotenv/config"; // ⚠️ DOIT être chargé avant les autres imports

import app from "./app.js";
import { env } from "./config/env.js";
import { testConnection } from "./db/index.js";
import { startNewsletterCron } from "./jobs/newsletterCron.job.js";

// Lancement du cron pour les newsletters
startNewsletterCron();

const PORT = env.port;

// ----------------------------
// Test de connexion MySQL
// ----------------------------
try {
  await testConnection();
} catch (error) {
  console.error("Erreur connexion MySQL (raw):", error);
  console.error("name:", error?.name);
  console.error("code:", error?.code);
  console.error("errno:", error?.errno);
  console.error("sqlState:", error?.sqlState);
  console.error("message:", error?.message);
  process.exit(1);
}

// ----------------------------
// Lancement du serveur
// ----------------------------
app.listen(PORT, () => {
  console.log(`server lancé sur ${PORT}`);
});
