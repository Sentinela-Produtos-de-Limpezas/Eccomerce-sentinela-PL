-- CreateTable
CREATE TABLE "AvaliationOnProduct" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "AvaliationOnProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvaliationOnProduct_userId_productId_key" ON "AvaliationOnProduct"("userId", "productId");

-- AddForeignKey
ALTER TABLE "AvaliationOnProduct" ADD CONSTRAINT "AvaliationOnProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliationOnProduct" ADD CONSTRAINT "AvaliationOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
