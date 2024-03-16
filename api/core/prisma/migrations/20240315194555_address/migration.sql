/*
  Warnings:

  - You are about to drop the column `Address` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Address";

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "Street" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
