import { Request, Response } from 'express';
import prisma from '@repo/db/client';

export const scheduleTransfer = async (req: Request, res: Response) => {
  const { fromUserId, toMerchantId, amount, frequency } = req.body;

  try {
    const newTransfer = await prisma.scheduledTransfer.create({
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
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
