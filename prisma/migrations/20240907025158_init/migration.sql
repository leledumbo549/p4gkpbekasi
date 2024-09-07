/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropTable
DROP TABLE `Post`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `tblcalon` (
    `NoId` CHAR(4) NOT NULL,
    `Nama` VARCHAR(50) NULL DEFAULT '',
    `Wil` CHAR(2) NULL,
    `Umur` TINYINT NULL,
    `Gender` CHAR(1) NULL,
    `Penatua` VARCHAR(3) NULL DEFAULT '',
    `PPJ` VARCHAR(3) NULL DEFAULT '',

    PRIMARY KEY (`NoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblkuota` (
    `Tahap` TINYINT NOT NULL,
    `Wil` CHAR(2) NOT NULL,
    `Posisi` TINYINT NOT NULL,
    `jumlah` TINYINT NULL DEFAULT 0,

    PRIMARY KEY (`Tahap`, `Wil`, `Posisi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblpemilih` (
    `nohp` VARCHAR(15) NOT NULL,
    `Nama` VARCHAR(100) NULL DEFAULT '',
    `NoReg` CHAR(6) NULL DEFAULT '',
    `Wil` CHAR(2) NULL DEFAULT '',

    PRIMARY KEY (`nohp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblposisi` (
    `Posisi` TINYINT NOT NULL,
    `NamaPosisi` VARCHAR(10) NULL,

    PRIMARY KEY (`Posisi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblwilayah` (
    `Wil` CHAR(2) NOT NULL,
    `Wilayah` VARCHAR(20) NULL DEFAULT '',

    PRIMARY KEY (`Wil`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
