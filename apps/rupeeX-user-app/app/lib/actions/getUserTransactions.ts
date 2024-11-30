"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function getUserTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if(!userId){
        throw new Error("User is not logged in");
    }

    try{
        const onRampTransactions = await prisma.onRampTransaction.findMany({
            where:{
                userId: Number(userId)
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
                fromUserId:Number(userId)
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                toUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
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
                toUserId: Number(userId),
            },
            select: {
                id: true,
                amount: true,
                timestamp: true,
                fromUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
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