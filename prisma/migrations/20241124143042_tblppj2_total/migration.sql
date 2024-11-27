/*
  Warnings:

  - You are about to drop the column `TotalPPJ` on the `tblcalon2` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tblcalon2` DROP COLUMN `TotalPPJ`;

-- AlterTable
ALTER TABLE `tblcalonPPJ2` ADD COLUMN `Total` INTEGER NOT NULL DEFAULT 0;
