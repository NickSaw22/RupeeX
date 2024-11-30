"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return{
            message: "Error while processing"
        }
    }
    const toUser = await prisma.merchant.findFirst({
        where:{
            id: Number(to)
        }
    });

    if(!toUser){
        return {
            message: "User not found"
        }
    }

    await prisma.$transaction(async (txn: any) => {
        //locking
        await txn.$executeRaw`SELECT * FROM "Balance" WHERE "merchantId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await txn.merchantBalance.findUnique({
            where:{
                merchantId: Number(from)
            }
        });

        if(!fromBalance || fromBalance.amount < amount){
            throw new Error('Insufficient funds');
        }

        await txn.merchantBalance.update({
            where: {
                merchantId: Number(from)
            },
            data:{
                amount:{
                    decrement: amount
                }
            }
        });

        await txn.merchantBalance.update({
            where:{
                merchantId: toUser.id
            },
            data:{
                amount:{
                    increment: amount
                }
            }
        });

        await txn.p2pTransfer.create({
            data:{
                fromMerchantId: Number(from),
                toMerchantId: toUser.id,
                amount: amount,
                timestamp: new Date
            }
        })
    })
}