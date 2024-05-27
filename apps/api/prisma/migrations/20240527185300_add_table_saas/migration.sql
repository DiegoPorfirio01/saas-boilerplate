/*
  Warnings:

  - A unique constraint covering the columns `[provider_account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provider,user_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email,organization_id]` on the table `invites` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[organization_id,user_id]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `organizations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_account_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `invites` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('PASSWORD_RECOVER');

-- CreateEnum
CREATE TYPE "AccountProvider" AS ENUM ('GITHUB');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER', 'BILLING');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "provider" "AccountProvider" NOT NULL,
ADD COLUMN     "provider_account_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "role" "Role" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "members" ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBER',
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "should_attach_users_by_domain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "domain" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL,
ADD COLUMN     "should_attach_users_by_domain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" "TokenType" NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password_hash" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_account_id_key" ON "accounts"("provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_user_id_key" ON "accounts"("provider", "user_id");

-- CreateIndex
CREATE INDEX "invites_email_idx" ON "invites"("email");

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_organization_id_key" ON "invites"("email", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "members_organization_id_user_id_key" ON "members"("organization_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_slug_key" ON "organizations"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "organizations_domain_key" ON "organizations"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "projects_domain_key" ON "projects"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
