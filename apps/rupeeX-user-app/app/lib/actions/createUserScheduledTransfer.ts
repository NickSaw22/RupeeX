"use server"

import db from "@repo/db/client";
import { z } from 'zod';
import { authOptions } from "../../lib/auth";
import { getServerSession } from 'next-auth';


const scheduledTransferSchema = z.object({
    recipientType: z.enum(['User', 'Merchant']),
    toUserId: z.string().optional(),
    toMerchantId: z.string().optional(),
    amount: z.number().min(1, { message: 'Amount must be greater than 0' }),
    frequency: z.enum(['Daily', 'Weekly', 'Monthly', 'Yearly']),
    isActive: z.boolean(),
});

type ScheduledTransferFormData = z.infer<typeof scheduledTransferSchema>;


export default async function createUserScheduledTransfer(request: ScheduledTransferFormData) {

    try {
        const session = await getServerSession(authOptions);
        console.log("Session details: " + JSON.stringify(session?.user, null, 2));
        if (!session.user) {
            return {
                message: "You are not logged in"
            }
        }
        const data = scheduledTransferSchema.parse(request);
        const recipient = data.recipientType === "Merchant" ? await db.merchant.findUnique({ where: { email: data.toMerchantId }}) : await db.merchant.findUnique({ where: { email: data.toUserId}})
        if (!recipient) {
            return { message: 'User does not exist' };
        }
        console.log("Recipient: ", JSON.stringify(recipient));
        const scheduledTransfer = await db.scheduledTransfer.create({
            data: {
                fromUserId: Number(session?.user?.id),
                toMerchantId: data.recipientType === "Merchant" ? Number(recipient?.id) : null,
                amount: data.amount,
                frequency: data.frequency,
                nextRun: new Date(),
                status: data.isActive ? 'Active' : 'Paused',
            },
        });

        return { message: 'Scheduled transfer created successfully!', scheduledTransfer, status: "Success" };        
    }
    catch (error) {
        console.log(error)
        if (error instanceof z.ZodError) {
            return { message: 'Validation failed' };
        }
        console.error(error);
        return { message: 'Internal server error' };
    }
}
