/*
  Warnings:

  - You are about to drop the `Authenticator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Authenticator" DROP CONSTRAINT "Authenticator_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "roles" TEXT[] DEFAULT ARRAY['user']::TEXT[];

-- DropTable
DROP TABLE "Authenticator";
