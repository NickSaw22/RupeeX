import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { BalanceCard } from "../../../components/BalanceCard";

async function getBalance() {
    const session = await getServerSession(authOptions);
    console.log(session?.user?.id);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    console.log("Balance: "+ balance);
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            toUserId: Number(session?.user?.id)
        }
    });
    return txns.map((t:any) => ({
        time: t.timestamp,
        amount: t.amount,
        status: "Success",
        provider: "Wallet"
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            P2P Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <SendCard />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}