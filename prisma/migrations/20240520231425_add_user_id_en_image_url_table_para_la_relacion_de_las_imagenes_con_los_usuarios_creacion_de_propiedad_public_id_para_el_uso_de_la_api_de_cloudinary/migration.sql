/*
  Warnings:

  - Added the required column `public_id` to the `ImageUrl` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageUrl" DROP CONSTRAINT "ImageUrl_productId_fkey";

-- AlterTable
ALTER TABLE "ImageUrl" ADD COLUMN     "public_id" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ImageUrl" ADD CONSTRAINT "ImageUrl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageUrl" ADD CONSTRAINT "ImageUrl_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
