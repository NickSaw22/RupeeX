import express from 'express';
import { scheduledTransferScheduler } from './schedulers/ScheduledTransferScheduler';
import { reportScheduler } from './schedulers/ReportScheduler';

const app = express();
const PORT = process.env.PORT || 3004;

//Start all schedulers
//scheduledTransferScheduler();
reportScheduler();

app.get('/', (req, res) => {
    res.send('Schedulers are running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
