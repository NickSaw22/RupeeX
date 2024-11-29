/*
  Warnings:

  - You are about to drop the `ScheduledTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ScheduledTask";

-- CreateTable
CREATE TABLE "ScheduledTasksdt" (
    "id" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "cronExpression" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastRun" TIMESTAMP(3),

    CONSTRAINT "ScheduledTasksdt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScheduledTasksdt_taskName_key" ON "ScheduledTasksdt"("taskName");
