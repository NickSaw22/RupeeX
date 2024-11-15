"use server"

import bcrypt from "bcrypt";
import db from "@repo/db/client";

type MerchantUser = {
    email: string;
    name: string;
    password: string
}

export async function createMerchantUser(req: MerchantUser) {
    try{
        const existingMerchant = await db.merchant.findUnique({ where:{ email: req.email } });

        if(existingMerchant){
            return { message: "Merchant with this email already exists."}
        }

        const hashedPassword = await bcrypt.hash(req.password, 10);

        const merchant = await db.merchant.create({
            data:{
                email: req.email,
                password: hashedPassword,
                name: req.name
            }
        });
        return merchant;
    }
    catch(e){
        return "Error occured while creating user";
    }
}