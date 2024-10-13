/*
  Warnings:

  - Added the required column `zipCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Street" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "zipCode" TEXT NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Address_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("City", "Number", "Street", "UserId", "id", "isMain") SELECT "City", "Number", "Street", "UserId", "id", "isMain" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
