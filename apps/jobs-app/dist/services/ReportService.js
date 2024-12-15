"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("@repo/db/client"));
class ReportService {
    async generateUserReport(userId) {
        const user = await client_1.default.user.findUnique({
            where: { id: userId },
            include: {
                OnRampTransaction: true,
                Balance: true,
                sentTransfers: true,
                receivedTransfers: true,
                scheduledTransfers: true,
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const reportContent = `
      User Report for ${user.name} (${user.email})
      Balance: ${user.Balance.map((b) => b.amount).reduce((a, b) => a + b, 0)}
      Sent Transfers: ${user.sentTransfers.length}
      Received Transfers: ${user.receivedTransfers.length}
      Scheduled Transfers: ${user.scheduledTransfers.length}
    `;
        return reportContent;
    }
    async generateMerchantReport(merchantId) {
        const merchant = await client_1.default.merchant.findUnique({
            where: { id: merchantId },
            include: {
                OnRampTransaction: true,
                merchantBalance: true,
                p2pSentTransfers: true,
                p2pReceivedTransfers: true,
                scheduledTransfersToMerchant: true,
                scheduledTransfersFromMerchant: true,
            },
        });
        if (!merchant) {
            throw new Error('Merchant not found');
        }
        const reportContent = `
      Merchant Report for ${merchant.name} (${merchant.email})
      Balance: ${merchant.merchantBalance.map((b) => b.amount).reduce((a, b) => a + b, 0)}
      Sent Transfers: ${merchant.p2pSentTransfers.length}
      Received Transfers: ${merchant.p2pReceivedTransfers.length}
      Scheduled Transfers: ${merchant.scheduledTransfersToMerchant.length + merchant.scheduledTransfersFromMerchant.length}
    `;
        return reportContent;
    }
}
exports.default = ReportService;
