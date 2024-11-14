-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('Daily', 'Weekly', 'Monthly', 'Yearly');

-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('Active', 'Paused', 'Completed');

-- CreateTable
CREATE TABLE "scheduledTransfer" (
    "id" SERIAL NOT NULL,
    "fromUserId" INTEGER NOT NULL,
    "toMerchantId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "nextRun" TIMESTAMP(3) NOT NULL,
    "status" "TransferStatus" NOT NULL,

    CONSTRAINT "scheduledTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_toMerchantId_fkey" FOREIGN KEY ("toMerchantId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledTransfer" ADD CONSTRAINT "scheduledTransfer_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
