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
    `NoReg` CHAR(6) NOT NULL,
    `nohp` VARCHAR(15) NOT NULL,
    `Nama` VARCHAR(100) NULL DEFAULT '',
    `Wil` CHAR(2) NULL DEFAULT '',
    `otp` CHAR(6) NULL,

    PRIMARY KEY (`NoReg`)
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

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilihanPertama` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calonNoId` VARCHAR(191) NOT NULL,
    `pemilihNoReg` VARCHAR(191) NOT NULL,
    `posisi` ENUM('PENATUA', 'PPJ') NOT NULL DEFAULT 'PENATUA',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcalon2` (
    `NoId` CHAR(4) NOT NULL,
    `Nama` VARCHAR(50) NULL DEFAULT '',
    `Wil` CHAR(2) NULL,
    `Umur` TINYINT NULL,
    `Gender` CHAR(1) NULL,

    PRIMARY KEY (`NoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblcalonPPJ2` (
    `NoId` CHAR(4) NOT NULL,
    `Nama` VARCHAR(50) NULL DEFAULT '',
    `Wil` CHAR(2) NULL,
    `Umur` TINYINT NULL,
    `Gender` CHAR(1) NULL,

    PRIMARY KEY (`NoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilihanKedua` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pemilihNoReg` VARCHAR(191) NOT NULL,
    `wilayah` INTEGER NOT NULL,
    `calonNoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilihanKeduaPPJ` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pemilihNoReg` VARCHAR(191) NOT NULL,
    `calonNoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PilihanPertama` ADD CONSTRAINT `PilihanPertama_calonNoId_fkey` FOREIGN KEY (`calonNoId`) REFERENCES `tblcalon`(`NoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilihanPertama` ADD CONSTRAINT `PilihanPertama_pemilihNoReg_fkey` FOREIGN KEY (`pemilihNoReg`) REFERENCES `tblpemilih`(`NoReg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilihanKedua` ADD CONSTRAINT `PilihanKedua_pemilihNoReg_fkey` FOREIGN KEY (`pemilihNoReg`) REFERENCES `tblpemilih`(`NoReg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilihanKedua` ADD CONSTRAINT `PilihanKedua_calonNoId_fkey` FOREIGN KEY (`calonNoId`) REFERENCES `tblcalon2`(`NoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilihanKeduaPPJ` ADD CONSTRAINT `PilihanKeduaPPJ_pemilihNoReg_fkey` FOREIGN KEY (`pemilihNoReg`) REFERENCES `tblpemilih`(`NoReg`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilihanKeduaPPJ` ADD CONSTRAINT `PilihanKeduaPPJ_calonNoId_fkey` FOREIGN KEY (`calonNoId`) REFERENCES `tblcalonPPJ2`(`NoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
