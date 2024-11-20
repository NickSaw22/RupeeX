-- DropForeignKey
ALTER TABLE "scheduledTransfer" DROP CONSTRAINT "scheduledTransfer_fromMerchantId_fkey";

-- DropForeignKey
ALTER TABLE "scheduledTransfer" DROP CONSTRAINT "scheduledTransfer_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "scheduledTransfer" DROP CONSTRAINT "scheduledTransfer_toMerchantId_fkey";

-- AlterTable
ALTER TABLE "scheduledTransfer" ALTER COLUMN "fromUserId" DROP NOT NULL,
ALTER COLUMN "toMerchantId" DROP NOT NULL,
ALTER COLUMN "fromMerchantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_toMerchantId_fkey" FOREIGN KEY ("toMerchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_fromMerchantId_fkey" FOREIGN KEY ("fromMerchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
