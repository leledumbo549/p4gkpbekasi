/*
  Warnings:

  - The primary key for the `tblcalon2` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `NoId` on the `tblcalon2` table. The data in that column could be lost. The data in that column will be cast from `Char(4)` to `Char(3)`.

*/
-- AlterTable
ALTER TABLE `tblcalon2`
    ADD COLUMN `Jabatan` VARCHAR(7) NULL DEFAULT '',
    ADD COLUMN `Ranking` TINYINT NULL;

-- CreateTable
CREATE TABLE `tblcalon2old` (
    `NoId` CHAR(4) NOT NULL,
    `Nama` VARCHAR(50) NULL DEFAULT '',
    `Wil` CHAR(2) NULL,
    `Umur` TINYINT NULL,
    `Gender` CHAR(1) NULL,
    `Total` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`NoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
