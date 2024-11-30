import cron from 'node-cron';
import prisma from '@repo/db/client';
import { transferExecutor } from './TransferExecutor';
class TransferSchedulerService {
  public async processScheduledTransfers() {
    try {
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
        transfers.map((transfer: any) =>
          transferExecutor(transfer).catch((error) => {
            console.error(`Tranfer ID ${transfer.id} failed: `, error);
          })
        )
      );

      await this.updateLastRunDate();
    }
    catch (error) {
      console.error(`Failed to schedule task: `, error);
    }
  }

  public async updateLastRunDate(){
    try{
      const task = await prisma.scheduledTasksdt.update({
        where:{
          taskName: "processScheduledTransfers",
          isActive:true
        },
        data:{
          lastRun: new Date()
        }
      });
    }
    catch (error) {
      console.error(`Failed to schedule task: `, error);
    }
  }

  public async startTransferScheduler() {
    //cron.schedule('*/5 * * * *', () => this.processScheduledTransfers()); // Run every 5 minutes
    //cron.schedule('*/30 * * * * *', () => this.processScheduledTransfers()); // Run every 0.5 minute
    try{
      const task = await prisma.scheduledTasksdt.findUnique({
        where:{
          taskName: "processScheduledTransfers",
          isActive:true
        }
      });
      if(task){
        console.log("Task cron: ", JSON.stringify(task));
        cron.schedule(task.cronExpression, ()=> this.processScheduledTransfers());
      }
      else{
        console.log("No scheduler present");
      }
    }
    catch (error) {
      console.error(`Failed to schedule task: `, error);
    }
  }
}

export default TransferSchedulerService;
