# Comptes de test MarsAI

Comptes créés pour le développement local — **1 utilisateur par rôle**.

## Connexion

| Élément | Valeur |
|--------|--------|
| **Page de connexion** | [http://localhost:5173/login](http://localhost:5173/login) |
| **API login** | `POST http://localhost:3000/api/users/login` |
| **Mot de passe commun** | `MarsAI2026!` |

## Utilisateurs

| Rôle | Email | Mot de passe | Prénom | Nom | Redirection après login |
|------|-------|--------------|--------|-----|-------------------------|
| **Superadmin** | `test.superadmin@marsai.fr` | `MarsAI2026!` | Test | SuperAdmin | `/admin` (accès complet + gestion utilisateurs) |
| **Admin** | `test.admin@marsai.fr` | `MarsAI2026!` | Test | Admin | `/admin` (dashboard, sans page Utilisateurs) |
| **Sélectionneur** | `test.selector@marsai.fr` | `MarsAI2026!` | Test | Selector | `/selector/videos` |

## Droits par rôle

### Superadmin
- Accès à toutes les routes `/admin/*`
- Gestion des utilisateurs (`/admin/users`)
- Création d'autres comptes (admin, selector, superadmin)
- Invitations par email

### Admin
- Accès au dashboard `/admin/*` (vidéos, événements, newsletter, messages, etc.)
- **Pas** d'accès à la page Utilisateurs (réservée au superadmin)

### Sélectionneur
- Accès à `/selector/videos` uniquement
- Évaluation des films qui lui sont assignés
- Redirigé automatiquement hors de `/admin`

## Recréer les comptes

Depuis le dossier `back/` :

```bash
npm run seed:users
```

Le script met à jour le mot de passe si l'email existe déjà.

## Exemple de requête API

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test.admin@marsai.fr\",\"password\":\"MarsAI2026!\"}"
```

Réponse attendue : `{ "success": true, "token": "...", ... }`
