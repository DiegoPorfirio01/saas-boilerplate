/*
  Warnings:

  - Made the column `description` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "description" SET NOT NULL;
