-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema petdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `petdb` ;

-- -----------------------------------------------------
-- Schema petdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petdb` DEFAULT CHARACTER SET utf8 ;
USE `petdb` ;

-- -----------------------------------------------------
-- Table `pet`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `pet` ;

CREATE TABLE IF NOT EXISTS `pet` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pet_name` VARCHAR(45) NOT NULL,
  `fam_name` VARCHAR(45) NOT NULL,
  `tasks` VARCHAR(300) NOT NULL,
  `daily_rate` DECIMAL(6,2) NOT NULL,
  `num_days` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `pet`
-- -----------------------------------------------------
START TRANSACTION;
USE `petdb`;
INSERT INTO `pet` (`id`, `pet_name`, `fam_name`, `tasks`, `daily_rate`, `num_days`) VALUES (1, 'Fido', 'Smith', 'walk once day during lunch', 6.25, 5);
INSERT INTO `pet` (`id`, `pet_name`, `fam_name`, `tasks`, `daily_rate`, `num_days`) VALUES (2, 'Whiskers', 'Fredrickson', 'check food water litter box', 4.75, 3);

COMMIT;
