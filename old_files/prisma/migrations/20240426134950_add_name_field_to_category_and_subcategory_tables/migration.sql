/*
  Warnings:

  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;
