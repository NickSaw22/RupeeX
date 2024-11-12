import React from 'react';
import TransactionsLineChart from '../../../components/TransactionsLineChart';
import { getOnRampTransactions } from '../../lib/actions/getOnRampTransactions';


export default async function Dashboard() {
  const transactionData = await getOnRampTransactions();
  return (
    <div className="w-screen min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Transaction Data
        </h1>
        <div className="w-full h-96">
            {transactionData ? (
                <TransactionsLineChart data={transactionData} />
            ) : (
                <p>Loading transactions...</p>
            )}
        </div>
      </div>
    </div>
  );
}