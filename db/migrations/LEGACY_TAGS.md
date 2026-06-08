# Tables tags legacy

## Contexte

Le schéma `db/projet_marsai.sql` contient deux systèmes de tags :

| Système | Tables | Statut |
|---------|--------|--------|
| **Actif** | `tags`, `video_tag` | Utilisé par `uploadVideo.controller.js`, `tags.model.js`, `videoTags.model.js` |
| **Legacy** | `tag`, `film_tag` | Non référencé dans le code back actuel |

## Recommandation

- Ne pas utiliser `tag` / `film_tag` pour de nouvelles fonctionnalités.
- Avant suppression : vérifier en base s'il existe des données dans ces tables (`SELECT COUNT(*) FROM tag;`).
- Si vide ou obsolète : exécuter `db/migrations/drop_legacy_tags.sql` (aucune donnée dans le dump canonique).

## Références code

- Modèles actifs : `back/src/models/tags.model.js`, `back/src/models/videoTags.model.js`
- Upload : `back/src/controllers/videos/uploadVideo.controller.js`
