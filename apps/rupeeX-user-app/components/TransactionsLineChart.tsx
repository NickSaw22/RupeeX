"use client";

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Transaction = {
  amount: number;
  startTime: Date;
};

type LineChartProps = {
  data: Transaction[];
};

const TransactionsLineChart: React.FC<LineChartProps> = ({ data }) => {
  const chartData = data.map((transaction) => [
    new Date(transaction.startTime).getTime(),
    transaction.amount,
  ]);

  const options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Transaction Amounts Over Time',
    },
    xAxis: {
      type: 'datetime',
      title: { text: 'Date' },
    },
    yAxis: {
      title: { text: 'Amount' },
    },
    series: [
      {
        name: 'Transaction Amount',
        data: chartData,
        tooltip: {
          valuePrefix: '$',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default TransactionsLineChart;
