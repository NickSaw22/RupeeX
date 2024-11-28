import db from '@repo/db/client';
type Frequency = 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

const calculateNextRun = (frequency: Frequency): Date => {
    const now = new Date();

    switch (frequency) {
        case 'Daily':
            return new Date(now.setDate(now.getDate() + 1));
        case 'Weekly':
            return new Date(now.setDate(now.getDate() + 7));
        case 'Monthly':
            return new Date(now.setMonth(now.getMonth() + 1));
        case 'Yearly':
            return new Date(now.setFullYear(now.getFullYear() + 1));
        default:
            throw new Error(`Unknown frequency: ${frequency}`);
    }
};

const updateBalance = async (tx: any, userId: number, amount: number, isMerchant: boolean = false) => {
    const balanceTable = isMerchant ? 'merchantBalance' : 'balance';
    const balanceField = isMerchant ? 'merchantId' : 'userId';

    const balance = await tx[balanceTable].findUnique({
        where: { [balanceField]: userId },
    });

    if (!balance || balance.amount < amount) {
        throw new Error(`Insufficient funds for ${isMerchant ? 'merchant' : 'user'} ID: ${userId}`);
    }

    await tx[balanceTable].update({
        where: { [balanceField]: userId },
        data: { amount: { decrement: amount } },
    });
};

const addBalance = async (tx: any, merchantId: number, amount: number) => {
    await tx.merchantBalance.update({
        where: { merchantId },
        data: { amount: { increment: amount } },
    });
};


export const transferExecutor = async (transfer: any) => {
    console.log(`Starting execution for transfer ID: ${JSON.stringify(transfer)}`);

    await db.$transaction(async (tx) => {
        //deduct from sender's user balance
        if (transfer.fromUserId) {
            await updateBalance(tx, transfer.fromUserId, transfer.amount);
        }

        //deduct from sender merchant's balance
        if (transfer.fromMerchantId) {
            await updateBalance(tx, transfer.fromMerchantId, transfer.amount, true);
        }

        //add to merchant balance
        if (transfer.toMerchantId) {
            await addBalance(tx, transfer.toMerchantId, transfer.amount);
        }

        //update scheduled transfer's next run date
        const nextRun = calculateNextRun(transfer.frequency);

        await tx.scheduledTransfer.update({
            where: { id: transfer.id },
            data: {
                nextRun: nextRun,
                status: nextRun ? 'Active' : 'Completed',
            }
        });
    });
    console.info(`Transfer ID ${transfer.id} completed successfully`);
}