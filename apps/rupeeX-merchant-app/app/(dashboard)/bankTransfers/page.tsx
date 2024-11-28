import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.id);
  const balance = await prisma.merchantBalance.findFirst({
    where: {
      merchantId: Number(session?.user?.id),
    },
  });
  console.log("Balance: " + balance);
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      merchantId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="text-4xl text-purple-700 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AddMoney />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
