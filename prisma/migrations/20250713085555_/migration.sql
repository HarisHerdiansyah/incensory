/*
  Warnings:

  - Added the required column `isVisible` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVisible` to the `vr_contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "isVisible" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "vr_contents" ADD COLUMN     "isVisible" BOOLEAN NOT NULL;
