-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Street" TEXT NOT NULL,
    "Number" TEXT NOT NULL,
    "City" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Address_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("City", "Number", "Street", "UserId", "id", "isMain") SELECT "City", "Number", "Street", "UserId", "id", "isMain" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_CategoriesOnProduct" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    PRIMARY KEY ("productId", "categoryId"),
    CONSTRAINT "CategoriesOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CategoriesOnProduct" ("categoryId", "productId") SELECT "categoryId", "productId" FROM "CategoriesOnProduct";
DROP TABLE "CategoriesOnProduct";
ALTER TABLE "new_CategoriesOnProduct" RENAME TO "CategoriesOnProduct";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "couponId" INTEGER,
    CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("couponId", "id", "status", "total", "userId") SELECT "couponId", "id", "status", "total", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_ProductOnOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "ProductOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProductOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProductOnOrder" ("id", "orderId", "productId", "quantity") SELECT "id", "orderId", "productId", "quantity" FROM "ProductOnOrder";
DROP TABLE "ProductOnOrder";
ALTER TABLE "new_ProductOnOrder" RENAME TO "ProductOnOrder";
CREATE UNIQUE INDEX "ProductOnOrder_productId_orderId_key" ON "ProductOnOrder"("productId", "orderId");
CREATE TABLE "new_AvaliationOnProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "AvaliationOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AvaliationOnProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AvaliationOnProduct" ("comment", "id", "productId", "rating", "userId") SELECT "comment", "id", "productId", "rating", "userId" FROM "AvaliationOnProduct";
DROP TABLE "AvaliationOnProduct";
ALTER TABLE "new_AvaliationOnProduct" RENAME TO "AvaliationOnProduct";
CREATE UNIQUE INDEX "AvaliationOnProduct_userId_productId_key" ON "AvaliationOnProduct"("userId", "productId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
