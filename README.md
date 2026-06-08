🚀 MarsAI – Festival de Courts Métrages IA

Plateforme web dédiée au festival MarsAI, permettant la soumission, la gestion et la valorisation de courts métrages générés par intelligence artificielle.

👥 Équipe

Projet réalisé par : Loriana, Vanessa, Edouard, Anthony, Mickael.

🏗 Architecture du projet

```
marsai/
├── front/        → Application React (Vite)
├── back/         → API Node.js / Express
├── db/           → Script SQL + migrations
├── docs/         → Guides (routes, S3, reCAPTCHA, YouTube…)
└── README.md
```

⚙️ Stack technique

- **Frontend** : React (Vite), React Router, Tailwind CSS, i18next
- **Backend** : Node.js, Express, MySQL, JWT, Zod
- **Intégrations** : Scaleway S3, YouTube OAuth, SMTP, reCAPTCHA

📥 Installation locale (Laragon / MAMP)

1. Cloner le repository et installer les dépendances :

```bash
cd front && npm install
cd ../back && npm install
```

2. Créer la base `projet_marsai` et importer `db/projet_marsai.sql`.

3. Si la base existait déjà avec l'ancien schéma `assignment`, exécuter aussi `db/migrations/fix_assignment_table.sql`.

4. Copier les fichiers d'environnement :

```bash
cp back/.env.example back/.env
cp front/.env.example front/.env
```

5. Renseigner au minimum :
   - **back** : `PORT`, `DB_*`, `JWT_SECRET`, `FRONT_ORIGIN`
   - **front** : `VITE_API_URL`, `VITE_RECAPTCHA_SITE_KEY` (si upload)

6. Lancer les deux serveurs :

```bash
# Terminal 1
cd back && npm run dev

# Terminal 2
cd front && npm run dev
```

Application : http://localhost:5173 — API : http://localhost:3000

📚 Documentation complémentaire

- Routes et rôles : `docs/info_routes_role.md`
- Scaleway S3 : `docs/S3_SETUP.md`
- reCAPTCHA : `docs/racaptcha.md`
- YouTube OAuth : `docs/GuideDebutant-CreerUneChaineYouTubeEtRecupererLesInfosOAuth.md`

🔐 Variables d'environnement

| Variable | Dossier | Description |
|----------|---------|-------------|
| `PORT` | back | Port API (ex: 3000) |
| `FRONT_ORIGIN` | back | URL front pour CORS |
| `JWT_SECRET` | back | Clé JWT |
| `JWT_EXPIRES_IN` | back | Durée token (défaut: 24h) |
| `VITE_API_URL` | front | URL de l'API |
| `VITE_RECAPTCHA_SITE_KEY` | front | Clé publique reCAPTCHA |
| `SCALEWAY_*` | back | Stockage vidéos (voir docs/S3_SETUP.md) |
| `MAIL_*` | back | Envoi emails (contact, newsletter) |

⚠️ Ne jamais committer les fichiers `.env`.

📦 Bonnes pratiques

- Ne pas modifier directement la base en production
- Ne jamais exposer les variables sensibles
- Toujours créer une branche pour les nouvelles fonctionnalités
