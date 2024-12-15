"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMerchantReport = exports.generateUserReport = void 0;
const ReportService_1 = __importDefault(require("../services/ReportService"));
const reportService = new ReportService_1.default();
const generateUserReport = async (req, res) => {
    const { userId } = req.params;
    try {
        const report = await reportService.generateUserReport(Number(userId));
        res.json(report);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.generateUserReport = generateUserReport;
const generateMerchantReport = async (req, res) => {
    const { merchantId } = req.params;
    try {
        const report = await reportService.generateMerchantReport(Number(merchantId));
        res.json(report);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
};
exports.generateMerchantReport = generateMerchantReport;
