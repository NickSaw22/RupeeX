"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = __importDefault(require("@repo/db/client"));
class SchedulerService {
    async processScheduledTransfers() {
        const now = new Date();
        const transfers = await client_1.default.scheduledTransfer.findMany({
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
            let nextRun;
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
            await client_1.default.scheduledTransfer.update({
                where: { id: transfer.id },
                data: {
                    nextRun,
                },
            });
        }
    }
    startTransferScheduler() {
        node_cron_1.default.schedule('*/5 * * * *', () => this.processScheduledTransfers()); // Run every 5 minutes
    }
}
exports.default = SchedulerService;
