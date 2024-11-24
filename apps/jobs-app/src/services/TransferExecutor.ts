import db from '@repo/db/client';
import { logger } from '../../utils/logger';
import { calculateNextRun } from '../models/transferProcessor';

export const transferExecutor = async(transfer: any) => {
    logger.info(`Starting execution for transfer ID: ${transfer.id}`);

    await db.$transaction(async (tx)=>{
        //deduct from sender's balance
        if(transfer.fromUserId){
            const senderBalance = await tx.balance.findUnique({
                where:{
                    userId: Number(transfer.fromUserId)
                }
            });

            if(!senderBalance || senderBalance.amount<transfer.amount){
                logger.error(`Insufficient funds for user ID: ${transfer.fromUserId}`);
                throw new Error(`Insufficient funds for user ID: ${transfer.fromUserId}`);
            }

            await tx.balance.update({
                where:{
                    userId: Number(transfer.fromUserId)
                },
                data:{
                    amount:{
                        decrement: transfer.amount
                    }
                }
            });
        }

        //Add amount to reciever's balance
        if(transfer.toMerchantId){
            await tx.merchantBalance.update({
                where:{ merchantId: Number(transfer.toMerchantId)},
                data:{ amount:{increment:transfer.amount}}
            });
        }

        //update scheduled transfer's next run date
        const nextRun = calculateNextRun(transfer.frequency);

        await tx.scheduledTransfer.update({
            where:{ id: transfer.id},
            data:{
                nextRun: nextRun,
                status: nextRun ? 'Active' : 'Completed',
            }
        });
    });
    logger.info(`Transfer ID ${transfer.id} completed successfully`);
}