import React from 'react';
import { getOnRampTransactions } from '../../../lib/actions/getOnRampTransactions';
import { Card } from "@repo/ui/card";
import GenericChart from '../../../components/GenericChart';
import { getMerchantTransactions } from '../../../lib/actions/getMerchantTransactions';
import { p2pTransfersLinked } from '../../../lib/actions/p2pTransfersLinked';
import TransactionsLineChart from '../../../components/TransactionsLineChart';
import { SummaryCard } from '../../../components/SummaryCard';

export default async function Dashboard() {
    const transactionData = await getOnRampTransactions();
    const { onRampTransactions } = await getMerchantTransactions();
    const { sentTransfers, receivedTransfers } = await p2pTransfersLinked();

    // Create network chart data structure
    const networkData = [
        ...sentTransfers,
        ...receivedTransfers
    ];
    return (
        <div className="min-w-screen min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
                <h1 className="text-3xl font-semibold text-blue-800 mb-6">
                    Transaction Flow Details
                </h1>
                
                 {/* Summary Cards Section */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                  <SummaryCard
                    title="Current Balance"
                    value="$12,345"
                    icon={<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>}
                    bgColor="bg-gradient-to-r from-blue-900 to-blue-700"                  
                  />
                  <SummaryCard
                    title="Total Transactions"
                    value="1,234"
                    icon={<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4l3 8 4-16 3 8h4"></path></svg>}
                    bgColor="bg-gradient-to-r from-blue-500 to-sky-400"
                  />
                  <SummaryCard
                    title="Today's Transactions"
                    value="567"
                    icon={<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>}
                    bgColor="bg-gradient-to-r from-sky-500 to-sky-400"
                  />
                </div>                
                {/* Charts Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-5">
                    <Card title="Chart 1">
                        {transactionData ? (
                            <TransactionsLineChart data={transactionData} />
                        ) : (
                            <p className="text-gray-600 animate-pulse">Loading transactions...</p>
                        )}
                    </Card>
                    <Card title="Chart 2">
                        {onRampTransactions ? (
                            <GenericChart chartType='bar' data={onRampTransactions} title='Bar Chart Transactions' />
                        ) : (
                            <p className="text-gray-600 animate-pulse">Loading transactions...</p>
                        )}
                    </Card>
                    <Card title="Chart 3">
                        {onRampTransactions ? (
                            <GenericChart chartType='pie' data={onRampTransactions} title='Pie Chart Transactions' />
                        ) : (
                            <p className="text-gray-600 animate-pulse">Loading transactions...</p>
                        )}
                    </Card>
                    {/* <Card title="Chart 4">
                        {networkData ? (
                            <GenericChart chartType='network' data={networkData} title='Network Chart Transactions' />
                        ) : (
                            <p className="text-gray-600 animate-pulse">Loading transactions...</p>
                        )}
                    </Card> */}
                </div>
            </div>
        </div>
    );
}
