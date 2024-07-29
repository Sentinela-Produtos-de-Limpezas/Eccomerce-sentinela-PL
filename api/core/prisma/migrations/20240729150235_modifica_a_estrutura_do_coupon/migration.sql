/*
  Warnings:

  - You are about to drop the column `reactivated` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `valueOrPercent` on the `Coupon` table. All the data in the column will be lost.
  - Added the required column `status` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coupon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "discount" REAL NOT NULL,
    "expireAt" DATETIME NOT NULL,
    "typeDiscount" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_Coupon" ("code", "discount", "expireAt", "id", "typeDiscount") SELECT "code", "discount", "expireAt", "id", "typeDiscount" FROM "Coupon";
DROP TABLE "Coupon";
ALTER TABLE "new_Coupon" RENAME TO "Coupon";
CREATE UNIQUE INDEX "Coupon_code_key" ON "Coupon"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
