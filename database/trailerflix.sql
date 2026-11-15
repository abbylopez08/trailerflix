CREATE DATABASE IF NOT EXISTS trailerflix
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE trailerflix;

CREATE TABLE IF NOT EXISTS `contenido` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`titulo` varchar(255) NOT NULL,
	`sinopsis` text NOT NULL,
	`temporada` int,
	`trailer` text,
	`categoria_id` int NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `categoria` (
	`id_categoria` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nombre_categoria` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id_categoria`)
);
CREATE TABLE IF NOT EXISTS `genero` (
	`id_genero` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nombre_genero` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id_genero`)
);
CREATE TABLE IF NOT EXISTS `actores` (
	`id_actores` int AUTO_INCREMENT NOT NULL UNIQUE,
	`nombre_actores` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id_actores`)
);
CREATE TABLE IF NOT EXISTS `contenido_generos` (
	`id_contenido` int NOT NULL,
	`genero_id` int NOT NULL,
	PRIMARY KEY (`id_contenido`, `genero_id`)
);
CREATE TABLE IF NOT EXISTS `contenido_actores` (
	`id_contenido` int NOT NULL,
	`actor_id` int NOT NULL,
	PRIMARY KEY (`id_contenido`, `actor_id`)
);
ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk5` FOREIGN KEY (`categoria_id`) REFERENCES `categoria`(`id_categoria`);
ALTER TABLE `contenido_generos` ADD CONSTRAINT `contenido_generos_fk0` FOREIGN KEY (`id_contenido`) REFERENCES `contenido`(`id`);
ALTER TABLE `contenido_generos` ADD CONSTRAINT `contenido_generos_fk1` FOREIGN KEY (`genero_id`) REFERENCES `genero`(`id_genero`);
ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk0` FOREIGN KEY (`id_contenido`) REFERENCES `contenido`(`id`);
ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk1` FOREIGN KEY (`actor_id`) REFERENCES `actores`(`id_actores`);