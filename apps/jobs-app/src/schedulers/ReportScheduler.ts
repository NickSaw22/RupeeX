import { scheduleJob } from 'node-schedule';
import { generateReport } from '../services/ReportService';

export const reportScheduler = () => {
    // Schedule a report generation every 24 hours
    scheduleJob('0 0 * * *', async () => {
        console.log('Generating daily report...');
        await generateReport();
    });
};
