"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function getMerchantTransactions() {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;

    if(!merchantId){
        throw new Error("User is not logged in");
    }

    try{
        const onRampTransactions = await prisma.onRampTransaction.findMany({
            where:{
                merchantId: Number(merchantId)
            },
            select:{
                id:true,
                status: true,
                token: true,
                provider: true,
                amount: true,
                startTime: true
            },
            orderBy:{
                startTime: "desc"
            }
        });

        const sentTransfers = await prisma.p2pTransfer.findMany({
            where:{
                fromMerchantId:Number(merchantId)
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                toMerchant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                timestamp: "desc",
            },
        });

        const receivedTransfers = await prisma.p2pTransfer.findMany({
            where: {
                toMerchantId: Number(merchantId),
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                fromMerchant: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                timestamp: "desc",
            },
        });

        console.log("OnRamp Transaction: "+onRampTransactions+ " Sent Transfers: "+sentTransfers+ " Received Transfers: "+ receivedTransfers); 
        return {
            onRampTransactions,
            sentTransfers,
            receivedTransfers,
        };

    } catch (error) {
        console.error("Error fetching user transactions:", error);
        throw new Error("Failed to fetch user transactions");
    }
}