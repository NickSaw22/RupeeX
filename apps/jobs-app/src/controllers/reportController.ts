import { Request, Response } from 'express';
import ReportService from '../services/reportService';

const reportService = new ReportService();

export const generateUserReport = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const report = await reportService.generateUserReport(Number(userId));
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const generateMerchantReport = async (req: Request, res: Response) => {
  const { merchantId } = req.params;
  try {
    const report = await reportService.generateMerchantReport(Number(merchantId));
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
