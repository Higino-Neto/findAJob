/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('OPEN', 'MULTIPLE_CHOICE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "order" INTEGER NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "textAnswer" TEXT,
    "optionId" TEXT,
    "applicationId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_jobId_order_idx" ON "Question"("jobId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Question_jobId_order_key" ON "Question"("jobId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_applicationId_questionId_optionId_key" ON "Answer"("applicationId", "questionId", "optionId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
