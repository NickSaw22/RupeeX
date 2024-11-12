import { getUserTransactions } from "../../lib/actions/getUserTransactions";
import TransactionTable from "../../../components/TransactionTable";

export default async function Transactions() {
  const { onRampTransactions, sentTransfers, receivedTransfers } = await getUserTransactions();

  return (
    <div className="w-full p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Transaction Data</h1>

      {onRampTransactions ? (
        <TransactionTable
        title="On-Ramp Transactions"
        transactions={onRampTransactions}
        type="onRamp"
        />            ) : (
                <p>Loading transactions...</p>
            )}
      

      {/* <TransactionTable
        title="Sent p2p Transfers"
        transactions={sentTransfers}
        type="sent"
      />

      <TransactionTable
        title="Received p2p Transfers"
        transactions={receivedTransfers}
        type="received"
      /> */}
    </div>
  );
}
