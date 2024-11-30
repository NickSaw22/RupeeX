import TransactionTable from "@repo/ui/transactionTable";
import { getMerchantTransactions } from "../../lib/actions/getMerchantTransactions";

type Transaction = {
  id: number;
  amount: number;
  provider?: string;
  status?: string;
  timestamp?: Date;
  startTime?: Date;
  toUser?: { name: string | null; email: string | null };
  fromUser?: { name: string | null; email: string | null };
  toMerchant?: { name: string | null; email: string | null };
  fromMerchant?: { name: string | null; email: string | null };
};
export default async function Transactions() {
  const { onRampTransactions, sentTransfers, receivedTransfers } = await getMerchantTransactions();

  return (
    <div className="w-full p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Transaction Data</h1>

      <TransactionTable
        title="On-Ramp Transactions"
        transactions={onRampTransactions}
        type="onRamp"
      />

      <TransactionTable
        title="Sent p2p Transfers"
        transactions={sentTransfers as Transaction[]}
        type="sent"
      />

      <TransactionTable
        title="Received p2p Transfers"
        transactions={receivedTransfers as Transaction[]}
        type="received"
      />
    </div>
  );
}
