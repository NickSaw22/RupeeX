"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log(Number(userId));
    if(!userId){
        throw new Error("User is not logged in");
    }

    try{
        const onRampTransactions = await prisma.onRampTransaction.findMany({
            where:{
                userId: Number(userId)
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
