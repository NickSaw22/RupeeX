"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("./controllers/reportController");
const transferController_1 = require("./controllers/transferController");
const TransferSchedulerService_1 = __importDefault(require("./services/TransferSchedulerService"));
const app = (0, express_1.default)();
const transferSchedulerService = new TransferSchedulerService_1.default();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express JS on Vercel');
});
app.get('/ping', (req, res) => {
    res.send('pong 🏓');
});
app.get('/test', (req, res) => {
    res.send('test');
});
app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end(`Hello! from jobs app`);
});
app.post('/schedule-transfer', transferController_1.scheduleTransfer);
app.get('/generate-user-report/:userId', reportController_1.generateUserReport);
app.get('/generate-merchant-report/:merchantId', reportController_1.generateMerchantReport);
app.listen(3004, () => {
    console.log('Server is running on port 3004');
    transferSchedulerService.startTransferScheduler();
});
