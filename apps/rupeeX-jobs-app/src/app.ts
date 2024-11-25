import express from 'express';
import { generateUserReport, generateMerchantReport } from './controllers/reportController';
import { scheduleTransfer } from './controllers/transferController';
import SchedulerService from './services/schedulerService';

const app = express();
const schedulerService = new SchedulerService();

app.use(express.json());

app.post('/schedule-transfer', scheduleTransfer);
app.get('/generate-user-report/:userId', generateUserReport);
app.get('/generate-merchant-report/:merchantId', generateMerchantReport);

app.listen(3004, () => {
  console.log('Server is running on port 3004');
  schedulerService.startTransferScheduler();
});
