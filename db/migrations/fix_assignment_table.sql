-- Corrige la table assignment (schéma initial invalide).
-- Exécuter une fois sur une base existante si la table n'a pas selector_id / video_id.

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `assignment`;

CREATE TABLE `assignment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `selector_id` int NOT NULL,
  `video_id` int NOT NULL,
  `assigned_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_selector_video` (`selector_id`,`video_id`),
  KEY `fk_assignment_selector` (`selector_id`),
  KEY `fk_assignment_video` (`video_id`),
  CONSTRAINT `fk_assignment_selector` FOREIGN KEY (`selector_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assignment_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
