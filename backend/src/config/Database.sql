CREATE DATABASE IF NOT EXISTS `maisaedu` DEFAULT CHARACTER SET utf8;
USE `maisaedu`;

CREATE TABLE IF NOT EXISTS `student` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ra` VARCHAR(45) NOT NULL COMMENT 'Registro Acadêmico do estudante',
  `cpf` VARCHAR(11) NOT NULL COMMENT 'CPF do estudante (apenas números)',
  `name` VARCHAR(100) NOT NULL COMMENT 'Nome completo do estudante',
  `email` VARCHAR(100) NOT NULL COMMENT 'E-mail de contato do estudante',
  `isActive` TINYINT DEFAULT 1 COMMENT 'Flag para soft delete (1=ativo, 0=inativo)',
  `createdOn` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
  `updatedOn` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ra_UNIQUE` (`ra`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
);

CREATE TABLE IF NOT EXISTS `manager` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT 'Nome completo do gerente',
  `email` VARCHAR(100) NOT NULL COMMENT 'E-mail de login',
  `password` VARCHAR(255) NOT NULL COMMENT 'Senha criptografada',
  `isAdmin` TINYINT DEFAULT 0 COMMENT 'Flag para privilégios de administrador (1=admin, 0=gerente comum)',
  `isActive` TINYINT DEFAULT 1 COMMENT 'Flag para soft delete (1=ativo, 0=inativo)',
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação do registro',
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Data da última atualização',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
);

