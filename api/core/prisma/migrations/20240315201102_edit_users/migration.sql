/*
  Warnings:

  - You are about to drop the column `CpfOrCnpj` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `FullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,cpforcnpj,phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpforcnpj` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_CpfOrCnpj_key";

-- DropIndex
DROP INDEX "User_Email_key";

-- DropIndex
DROP INDEX "User_Phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "CpfOrCnpj",
DROP COLUMN "Email",
DROP COLUMN "FullName",
DROP COLUMN "Password",
DROP COLUMN "Phone",
ADD COLUMN     "cpforcnpj" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_cpforcnpj_phone_key" ON "User"("email", "cpforcnpj", "phone");
