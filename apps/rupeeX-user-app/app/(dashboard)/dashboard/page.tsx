import React from 'react';
import TransactionsLineChart from '../../../components/TransactionsLineChart';
import { getOnRampTransactions } from '../../lib/actions/getOnRampTransactions';
import { Card } from "@repo/ui/card";
export default async function Dashboard() {
  const transactionData = await getOnRampTransactions();
  return (
    <div className="w-screen min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Transaction Flow Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="Chart 1">
            {transactionData ? (
              <TransactionsLineChart data={transactionData} />
            ) : (
              <p className="text-gray-600 animate-pulse">Loading transactions...</p>
            )}
          </Card>
          <Card title="Chart 2">
            {transactionData ? (
              <TransactionsLineChart data={transactionData} />
            ) : (
              <p className="text-gray-600 animate-pulse">Loading transactions...</p>
            )}
          </Card>
          <Card title="Chart 3">
            {transactionData ? (
              <TransactionsLineChart data={transactionData} />
            ) : (
              <p className="text-gray-600 animate-pulse">Loading transactions...</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
