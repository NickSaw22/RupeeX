import TransactionTable from "../../../components/TransactionTable";
import { getMerchantTransactions } from "../../lib/actions/getMerchantTransactions";

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
        transactions={sentTransfers}
        type="sent"
      />

      <TransactionTable
        title="Received p2p Transfers"
        transactions={receivedTransfers}
        type="received"
      />
    </div>
  );
}
