import cron from 'node-cron';
import prisma from '@repo/db/client';
import { transferExecutor } from './TransferExecutor';
class TransferSchedulerService {
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

    await Promise.allSettled(
      transfers.map((transfer) => 
          transferExecutor(transfer).catch((error) => {
              console.error(`Tranfer ID ${transfer.id} failed: `, error);
          })
      )
    );
  }

  public startTransferScheduler() {
    //cron.schedule('*/5 * * * *', () => this.processScheduledTransfers()); // Run every 5 minutes
    cron.schedule('*/30 * * * * *', () => this.processScheduledTransfers()); // Run every 0.5 minute

  }
}

export default TransferSchedulerService;
