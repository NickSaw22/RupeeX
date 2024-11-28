import cron from 'node-cron';
import prisma from '@repo/db/client';
class SchedulerService {
  public async processScheduledTransfers() {
    const now = new Date();
    const transfers = await prisma.scheduledTransfer.findMany({
      where: {
        status: 'Active',
        nextRun: {
          lte: now,
        },
      },
    });

    for (const transfer of transfers) {
      console.log(`Executing transfer ID: ${transfer.id}`);

      // Update the nextRun field based on the frequency
      let nextRun: Date;
      switch (transfer.frequency) {
        case 'Daily':
          nextRun = new Date(now.setDate(now.getDate() + 1));
          break;
        case 'Weekly':
          nextRun = new Date(now.setDate(now.getDate() + 7));
          break;
        case 'Monthly':
          nextRun = new Date(now.setMonth(now.getMonth() + 1));
          break;
        case 'Yearly':
          nextRun = new Date(now.setFullYear(now.getFullYear() + 1));
          break;
        default:
          throw new Error('Invalid frequency');
      }

      await prisma.scheduledTransfer.update({
        where: { id: transfer.id },
        data: {
          nextRun,
        },
      });
    }
  }

  public startTransferScheduler() {
    cron.schedule('*/5 * * * *', () => this.processScheduledTransfers()); // Run every 5 minutes
  }
}

export default SchedulerService;
