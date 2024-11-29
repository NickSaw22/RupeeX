import React from 'react';

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

type TransactionTableProps = {
  title: string;
  transactions: Transaction[];
  type: 'onRamp' | 'sent' | 'received';
};

const TransactionTable: React.FC<TransactionTableProps> = ({ title, transactions, type }) => {
  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">{title}</h2>
      <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 border-b border-gray-600">Amount</th>
            {type === 'onRamp' && <th className="px-4 py-2 border-b border-gray-600">Provider</th>}
            <th className="px-4 py-2 border-b border-gray-600">Date</th>
            {type === 'sent' && <th className="px-4 py-2 border-b border-gray-600">To</th>}
            {type === 'received' && <th className="px-4 py-2 border-b border-gray-600">From</th>}
            {type === 'onRamp' && <th className="px-4 py-2 border-b border-gray-600">Status</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t border-gray-700 hover:bg-gray-700">
              <td className="px-4 py-2">{transaction.amount}</td>
              {type === 'onRamp' && <td className="px-4 py-2">{transaction.provider}</td>}
              <td className="px-4 py-2">
                {(transaction.startTime || transaction.timestamp)
                  ? new Date(transaction.startTime ?? transaction.timestamp!).toLocaleString()
                  : 'N/A'}
              </td>
              {type === 'sent' && <td className="px-4 py-2">{transaction.toUser?.name || transaction.toUser?.email || transaction.toMerchant?.name || transaction.toMerchant?.email}</td>}
              {type === 'received' && <td className="px-4 py-2">{transaction.fromUser?.name || transaction.fromUser?.email || transaction.fromMerchant?.name || transaction.fromMerchant?.email}</td>}
              {type === 'onRamp' && <td className="px-4 py-2">{transaction.status}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TransactionTable;