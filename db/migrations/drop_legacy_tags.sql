-- Migration optionnelle : supprime les tables tags legacy (vide dans le dump canonique).
-- Vérifier avant exécution : SELECT COUNT(*) FROM tag; SELECT COUNT(*) FROM film_tag;
-- Voir db/migrations/LEGACY_TAGS.md

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `film_tag`;
DROP TABLE IF EXISTS `tag`;

SET FOREIGN_KEY_CHECKS = 1;
