import { scheduleJob } from 'node-schedule';
import { executeScheduledTransfers } from '../services/ScheduledTransferService';

export const scheduledTransferScheduler = () => {
    // Schedule the transfer job to run every 5 minutes
    scheduleJob('*/5 * * * *', async () => {
        console.log('Executing scheduled transfers...');
        await executeScheduledTransfers();
    });
};
