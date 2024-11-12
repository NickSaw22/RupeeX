import React from 'react';

type Transaction = {
  id: number;
  amount: number;
  provider?: string;
  status?: string;
  timestamp?: Date;
  startTime?: Date;
  toUser?: { name: string | null; email: string };
  fromUser?: { name: string | null; email: string };
};

type TransactionTableProps = {
  title: string;
  transactions: Transaction[];
  type: 'onRamp' | 'sent' | 'received';
};

const TransactionTable: React.FC<TransactionTableProps> = ({ title, transactions, type }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Amount</th>
            {type === 'onRamp' && <th className="px-4 py-2 border">Provider</th>}
            <th className="px-4 py-2 border">Date</th>
            {type === 'sent' && <th className="px-4 py-2 border">To</th>}
            {type === 'received' && <th className="px-4 py-2 border">From</th>}
            {type === 'onRamp' && <th className="px-4 py-2 border">Status</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t">
              <td className="px-4 py-2">{transaction.amount}</td>
              {type === 'onRamp' && <td className="px-4 py-2">{transaction.provider}</td>}
              {/* <td className="px-4 py-2">{new Date(transaction.startTime || transaction.timestamp).toLocaleString()}</td> */}
              {type === 'sent' && <td className="px-4 py-2">{transaction.toUser?.name || transaction.toUser?.email}</td>}
              {type === 'received' && <td className="px-4 py-2">{transaction.fromUser?.name || transaction.fromUser?.email}</td>}
              {type === 'onRamp' && <td className="px-4 py-2">{transaction.status}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TransactionTable;
