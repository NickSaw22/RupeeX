/*
  Warnings:

  - Added the required column `isActive` to the `scheduledTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheduledTransfer" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
