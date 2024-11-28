import express from 'express';
import { generateUserReport, generateMerchantReport } from './controllers/reportController';
import { scheduleTransfer } from './controllers/transferController';
<<<<<<< HEAD
import TransferSchedulerService from './services/TransferSchedulerService';

const app = express();
const transferSchedulerService = new TransferSchedulerService();
=======
import SchedulerService from './services/schedulerService';

const app = express();
const schedulerService = new SchedulerService();
>>>>>>> main

app.use(express.json());

app.post('/schedule-transfer', scheduleTransfer);
app.get('/generate-user-report/:userId', generateUserReport);
app.get('/generate-merchant-report/:merchantId', generateMerchantReport);

app.listen(3004, () => {
  console.log('Server is running on port 3004');
<<<<<<< HEAD
  transferSchedulerService.startTransferScheduler();
=======
  schedulerService.startTransferScheduler();
>>>>>>> main
});
