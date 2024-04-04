/*
  Warnings:

  - You are about to drop the column `provide` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "provide";

-- DropEnum
DROP TYPE "provider";
