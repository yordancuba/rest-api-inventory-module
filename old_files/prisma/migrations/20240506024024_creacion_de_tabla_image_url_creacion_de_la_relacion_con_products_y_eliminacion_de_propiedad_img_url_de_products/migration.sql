/*
  Warnings:

  - You are about to drop the column `image_url` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image_url";

-- CreateTable
CREATE TABLE "ImageUrl" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "ImageUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ImageUrl_productId_key" ON "ImageUrl"("productId");

-- AddForeignKey
ALTER TABLE "ImageUrl" ADD CONSTRAINT "ImageUrl_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
