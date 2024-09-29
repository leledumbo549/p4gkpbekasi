-- CreateTable
CREATE TABLE `Pengaturan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `openPemilihan1` BOOLEAN NOT NULL DEFAULT false,
    `openPemilihan2` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
