/*
  Warnings:

  - A unique constraint covering the columns `[questionId,order]` on the table `Option` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Option" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Option_questionId_order_idx" ON "Option"("questionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Option_questionId_order_key" ON "Option"("questionId", "order");
