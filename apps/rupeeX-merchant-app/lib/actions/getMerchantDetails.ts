"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client";

export async function getMerchantDetails() {
    const session = await getServerSession(authOptions);
    const merchantId = session?.user?.id;
    console.log(Number(merchantId));
    if(!merchantId){
        throw new Error("User is not logged in");
    }

    try{
        const merchantDetails = await prisma.merchant.findUnique({
            where:{
                id: Number(merchantId)
            }
        });
        return  merchantDetails;
    }
    catch(e){
        console.log("Error: ", e);
    }
}
