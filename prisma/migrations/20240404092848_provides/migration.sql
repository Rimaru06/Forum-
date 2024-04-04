/*
  Warnings:

  - Added the required column `provide` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "provider" AS ENUM ('GOGGLE', 'GITHUB', 'password');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provide" "provider" NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;
