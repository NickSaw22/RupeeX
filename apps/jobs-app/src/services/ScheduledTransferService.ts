import db from '@repo/db/client';
import { logger } from '../../utils/logger';
import { transferExecutor } from './TransferExecutor';



const fetchPendingTransfers = async() =>{
    try{
        const transfers = await db.scheduledTransfer.findMany({
            where:{
                status: 'Active',
                nextRun: { lte: new Date() },
            }
        })

        if(transfers && transfers.length === 0){
            logger.info('No pending transfers found');
        }

        return transfers;
    }
    catch(error){ 
        logger.error('Error occured fetching pending transfers: '+error);
        throw error;
    }
}

const processTransfers = async() => {
    const transfers = await fetchPendingTransfers();
    await Promise.allSettled(
        transfers.map((transfer) => 
            transferExecutor(transfer).catch((error) => {
                logger.error(`Tranfer ID ${transfer.id} failed: `, error);
            })
        )
    );
    logger.info('Completed processing scheduled transfers.');
}
export const executeScheduledTransfers = async () => {
    try {
        // Log the start of the scheduled task
        logger.info('Starting scheduled transfer process...');
        await processTransfers();
    }
    catch(error){
        logger.error('Error during scheduled transfer execution: ' + error);

    }    
}
