/*
  Warnings:

  - Added the required column `fromMerchantId` to the `scheduledTransfer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "scheduledTransfer" ADD COLUMN     "fromMerchantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_fromMerchantId_fkey" FOREIGN KEY ("fromMerchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
