import express from 'express';
import { generateUserReport, generateMerchantReport } from './controllers/reportController';
import { scheduleTransfer } from './controllers/transferController';
import TransferSchedulerService from './services/TransferSchedulerService';

const app = express();
const transferSchedulerService = new TransferSchedulerService();

app.use(express.json());

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! from jobs app`);
});
app.post('/schedule-transfer', scheduleTransfer);
app.get('/generate-user-report/:userId', generateUserReport);
app.get('/generate-merchant-report/:merchantId', generateMerchantReport);

app.listen(3004, () => {
  console.log('Server is running on port 3004');
  transferSchedulerService.startTransferScheduler();
});
