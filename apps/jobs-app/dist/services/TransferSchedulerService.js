"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const client_1 = __importDefault(require("@repo/db/client"));
const TransferExecutor_1 = require("./TransferExecutor");
class TransferSchedulerService {
    async processScheduledTransfers() {
        try {
            const now = new Date();
            const transfers = await client_1.default.scheduledTransfer.findMany({
                where: {
                    status: 'Active',
                    nextRun: {
                        lte: now,
                    },
                },
            });
            await Promise.allSettled(transfers.map((transfer) => (0, TransferExecutor_1.transferExecutor)(transfer).catch((error) => {
                console.error(`Tranfer ID ${transfer.id} failed: `, error);
            })));
            await this.updateLastRunDate();
        }
        catch (error) {
            console.error(`Failed to schedule task: `, error);
        }
    }
    async updateLastRunDate() {
        try {
            const task = await client_1.default.scheduledTasksdt.update({
                where: {
                    taskName: "processScheduledTransfers",
                    isActive: true
                },
                data: {
                    lastRun: new Date()
                }
            });
        }
        catch (error) {
            console.error(`Failed to schedule task: `, error);
        }
    }
    async startTransferScheduler() {
        //cron.schedule('*/5 * * * *', () => this.processScheduledTransfers()); // Run every 5 minutes
        //cron.schedule('*/30 * * * * *', () => this.processScheduledTransfers()); // Run every 0.5 minute
        try {
            const task = await client_1.default.scheduledTasksdt.findUnique({
                where: {
                    taskName: "processScheduledTransfers",
                    isActive: true
                }
            });
            if (task) {
                console.log("Task cron: ", JSON.stringify(task));
                node_cron_1.default.schedule(task.cronExpression, () => this.processScheduledTransfers());
            }
            else {
                console.log("No scheduler present");
            }
        }
        catch (error) {
            console.error(`Failed to schedule task: `, error);
        }
    }
}
exports.default = TransferSchedulerService;
