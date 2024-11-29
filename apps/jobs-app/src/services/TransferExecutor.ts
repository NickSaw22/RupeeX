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

const p2pTransfer = async (txn: any, transfer: any) => {
    const { fromMerchantId, toMerchantId, fromUserId, amount } = transfer;
    try{
        console.log("From and To Id: " + JSON.stringify(transfer));

        if (fromUserId) {
            await txn.$executeRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;
            await updateBalance(txn, fromUserId, amount);
        }

        if (fromMerchantId) {
            await txn.$executeRaw`SELECT * FROM "MerchantBalance" WHERE "merchantId" = ${Number(fromMerchantId)} FOR UPDATE`;
            await updateBalance(txn, fromMerchantId, amount, true);
        }

        if (toMerchantId) {
            await addBalance(txn, toMerchantId, amount);
        }

        console.log("P2P payload: ", JSON.stringify(transfer));

        await txn.p2pTransfer.create({
            data: {
                fromUserId: fromUserId ? Number(fromUserId) : null,
                fromMerchantId: fromMerchantId ? Number(fromMerchantId) : null,
                toMerchantId: Number(toMerchantId),
                amount: amount,
                timestamp: new Date()
            }
        });
    }catch (error) {
        console.error("Error during p2pTransfer: ", error);
        throw error;
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
        // Add as p2p transfer
        await p2pTransfer(tx, transfer);

        // Update scheduled transfer's next run date
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
};