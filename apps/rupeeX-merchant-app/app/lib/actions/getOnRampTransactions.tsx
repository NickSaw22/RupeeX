"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;
    console.log(Number(merchantId));
    if(!merchantId){
        throw new Error("User is not logged in");
    }

    try{
        const onRampTransactions = await prisma.onRampTransaction.findMany({
            where:{
                merchantId: Number(merchantId)
            },
            select:{
                amount: true,
                startTime: true
            },
            orderBy:{
                startTime: "desc"
            }
        });
        return  onRampTransactions || [];;
    }
    catch(e){

    }
}
