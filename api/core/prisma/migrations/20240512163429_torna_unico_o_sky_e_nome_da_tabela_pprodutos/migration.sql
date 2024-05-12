/*
  Warnings:

  - A unique constraint covering the columns `[sku,name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_name_key" ON "Product"("sku", "name");
