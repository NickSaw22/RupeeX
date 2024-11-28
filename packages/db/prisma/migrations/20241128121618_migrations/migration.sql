-- DropForeignKey
ALTER TABLE "OnRampTransaction" DROP CONSTRAINT "OnRampTransaction_userId_fkey";

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
