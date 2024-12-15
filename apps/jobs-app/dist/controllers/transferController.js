"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleTransfer = void 0;
const client_1 = __importDefault(require("@repo/db/client"));
const scheduleTransfer = async (req, res) => {
    const { fromUserId, toMerchantId, amount, frequency } = req.body;
    try {
        const newTransfer = await client_1.default.scheduledTransfer.create({
            data: {
                fromUserId,
                toMerchantId,
                amount,
                frequency,
                nextRun: new Date(),
                status: 'Active',
            },
        });
        res.json(newTransfer);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.scheduleTransfer = scheduleTransfer;
