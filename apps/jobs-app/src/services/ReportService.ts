import prisma from '@repo/db/client';

class ReportService {
  public async generateUserReport(userId: number) {
    const user = await prisma.user.findUnique({
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
      Balance: ${user.Balance.map((b: any) => b.amount).reduce((a: any, b: any) => a + b, 0)}
      Sent Transfers: ${user.sentTransfers.length}
      Received Transfers: ${user.receivedTransfers.length}
      Scheduled Transfers: ${user.scheduledTransfers.length}
    `;

    return reportContent;
  }

  public async generateMerchantReport(merchantId: number) {
    const merchant = await prisma.merchant.findUnique({
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
      Balance: ${merchant.merchantBalance.map((b:any) => b.amount).reduce((a: any, b: any) => a + b, 0)}
      Sent Transfers: ${merchant.p2pSentTransfers.length}
      Received Transfers: ${merchant.p2pReceivedTransfers.length}
      Scheduled Transfers: ${merchant.scheduledTransfersToMerchant.length + merchant.scheduledTransfersFromMerchant.length}
    `;
    return reportContent;
  }
}

export default ReportService;
