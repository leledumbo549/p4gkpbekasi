/*
  Warnings:

  - A unique constraint covering the columns `[nohp]` on the table `KirimPesan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `KirimPesan_nohp_key` ON `KirimPesan`(`nohp`);
