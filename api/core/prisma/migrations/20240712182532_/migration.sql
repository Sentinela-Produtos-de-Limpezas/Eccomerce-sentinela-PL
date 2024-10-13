/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "AvaliationOnProduct_userId_productId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
