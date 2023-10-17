-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `passwordHash` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `subscribed` BOOLEAN NOT NULL DEFAULT false,
    `phone` VARCHAR(191) NOT NULL,
    `phoneConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `hasViber` BOOLEAN NOT NULL DEFAULT false,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    INDEX `User_email_phone_idx`(`email`, `phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `authorityLevel` ENUM('FULL_CONTROL', 'CREATE_JOBS') NOT NULL,

    UNIQUE INDEX `Admin_userDataId_key`(`userDataId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Partner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `creditLine` BOOLEAN NOT NULL,
    `firmName` VARCHAR(191) NOT NULL,
    `firmEmail` VARCHAR(191) NOT NULL,
    `firmPhone` VARCHAR(191) NOT NULL,
    `firmHasViber` BOOLEAN NOT NULL DEFAULT false,
    `firmAddress` VARCHAR(191) NOT NULL,
    `firmEKATTE` VARCHAR(191) NOT NULL,
    `competentInSurvey` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInLayout` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInCadastre` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInPUP` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInGrading` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInConstructionLayout` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInDeformations` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInGeneralEngineering` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `competentInEvaluations` ENUM('UNABLE', 'ABLE', 'WILLING') NOT NULL DEFAULT 'WILLING',
    `hasTotalStation` BOOLEAN NOT NULL DEFAULT true,
    `hasGNSS` BOOLEAN NOT NULL DEFAULT true,
    `hasBaseRoverSetup` BOOLEAN NOT NULL DEFAULT false,
    `hasLevel` BOOLEAN NOT NULL DEFAULT false,
    `hasDrone` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Partner_userDataId_key`(`userDataId`),
    UNIQUE INDEX `Partner_firmName_key`(`firmName`),
    UNIQUE INDEX `Partner_firmEmail_key`(`firmEmail`),
    UNIQUE INDEX `Partner_firmPhone_key`(`firmPhone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userDataId` INTEGER NOT NULL,
    `additionalEmail` VARCHAR(191) NOT NULL DEFAULT '',
    `additionalEmailConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `additionalSubscribed` BOOLEAN NOT NULL DEFAULT false,
    `additionalPhone` VARCHAR(191) NOT NULL DEFAULT '',
    `additionalPhoneConfirmed` BOOLEAN NOT NULL DEFAULT false,
    `additionalHasViber` BOOLEAN NOT NULL DEFAULT false,
    `preferredModeOfCommunication` ENUM('PHONE', 'VIBER', 'EMAIL') NOT NULL DEFAULT 'PHONE',
    `communicationLineId` INTEGER NOT NULL,

    UNIQUE INDEX `Client_userDataId_key`(`userDataId`),
    UNIQUE INDEX `Client_communicationLineId_key`(`communicationLineId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunicationLine` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `open` BOOLEAN NOT NULL DEFAULT true,
    `adminId` INTEGER NOT NULL,
    `partnerId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `communicationLineId` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `by` ENUM('ADMIN', 'CLIENT', 'PARTNER') NOT NULL,
    `sentWith` ENUM('WEBSITE', 'VIBER', 'EMAIL') NOT NULL,
    `contents` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NOT NULL,
    `clientId` INTEGER NOT NULL,
    `adminId` INTEGER NULL,
    `partnerId` INTEGER NULL,
    `communicationLineId` INTEGER NOT NULL,
    `clientDescription` VARCHAR(191) NOT NULL,
    `adminDescription` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `status` ENUM('REGISTERED', 'ASSIGNED', 'REJECTED', 'ACCEPTED', 'CLIENT_CONTACTED', 'CLIENT_LOST', 'CLIENT_REJECTED', 'IN_PROGRESS', 'FINISHED', 'UNABLE_TO_FINISH') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Partner` ADD CONSTRAINT `Partner_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userDataId_fkey` FOREIGN KEY (`userDataId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_communicationLineId_fkey` FOREIGN KEY (`communicationLineId`) REFERENCES `CommunicationLine`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `CommunicationLine` ADD CONSTRAINT `CommunicationLine_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunicationLine` ADD CONSTRAINT `CommunicationLine_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `Partner`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_communicationLineId_fkey` FOREIGN KEY (`communicationLineId`) REFERENCES `CommunicationLine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_partnerId_fkey` FOREIGN KEY (`partnerId`) REFERENCES `Partner`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_communicationLineId_fkey` FOREIGN KEY (`communicationLineId`) REFERENCES `CommunicationLine`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
