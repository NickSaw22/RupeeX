"use server"

import bcrypt from "bcrypt";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

// type MerchantUser = {
//     email: string;
//     name?: string;
//     password: string;
//     phoneNumber?: string;
//     businessType?: string;
//     businessAddress?: string;
//     profilePicture?: string;
// }
interface Merchant {
    email: string;
    name: string | null;
    password: string;
    phoneNumber: string | null;
    businessType: string | null;
    businessAddress: string | null;
    profilePicture: string | null;
  }

export async function updateMerchantUser(req: Merchant) {
    try {
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id;
        const existingMerchant = await db.merchant.findUnique({ where: { email: req.email } });

        if (!existingMerchant) {
            return { message: "Merchant with this email does not exists." }
        }

        const hashedPassword = await bcrypt.hash(req.password, 10);
        console.log(JSON.stringify(req));
        const merchant = await db.merchant.update({
            where: {
                id: Number(userId)
            },
            data: {
                email: req.email,
                password: req.password,
                name: req.name,
                phoneNumber: req.phoneNumber,
                businessType: req.businessType,
                businessAddress: req.businessAddress,
                profilePicture: req.profilePicture
            }
        });
        console.log(JSON.stringify(merchant));
        return merchant;
    }
    catch (e) {
        return "Error occured while updating user";
    }
}