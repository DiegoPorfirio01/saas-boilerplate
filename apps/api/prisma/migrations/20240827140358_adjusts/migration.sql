/*
  Warnings:

  - You are about to drop the column `description` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `domain` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `should_attach_users_by_domain` on the `projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- DropIndex
DROP INDEX "projects_domain_key";

-- DropIndex
DROP INDEX "projects_organization_id_slug_key";

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "domain",
DROP COLUMN "should_attach_users_by_domain";

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
