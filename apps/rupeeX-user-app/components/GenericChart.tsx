"use client"

import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import networkGraph from 'highcharts/modules/networkgraph';

if (typeof Highcharts === 'object') {
    networkGraph(Highcharts);
}
  

type ChartProps = {
    chartType: 'line' | 'bar' | 'pie'| 'network';
    data: any;
    title: string;
};

const Chart: React.FC<ChartProps> = ({ chartType, data, title}) => {
    const commonOptions = {
        title: {
            text: title,
        },
        credits:{
            enabled: false,
        },
    };
    
    //line chart options
    const lineChartOptions = {
        ...commonOptions,
        chart:{
            type:'line',
        },
        xAxis:{
            type:'datetime',
            title:{
                text:'Date'
            },
        },
        yAxis:{
            title:{ text: 'Amount'}
        },
        series:[{
            name:'Transaction Amount',
            data: data.map((transaction: any) => {
                new Date(transaction.startTime).getTime(),
                transaction.amount
            })
        }],
    };

    //bar chart options
    const barChartOptions = {
        ...commonOptions,
        chart:{
            type: 'bar'
        },
        xAxis:{
            categories: data.map((transaction:any) => new Date(transaction.startTime).toLocaleDateString()),
            title:{text:'Date'}
        },
        yAxis:{title:'Amount'},
        series:[{
            name:'Transaction Amount',
            data: data.map((transaction: any)=>transaction.amount)
        }]
    }

    //pie chart options
    const pieChartOptions = {
        ...commonOptions,
        chart:{
            type:'pie'
        },
        series:[{
            name:'Transaction Amount',
            data:data.map((txn:any)=>({
                name: new Date(txn.startTime).toLocaleDateString(),
                y: txn.amount
            }))
        }]
    }

    //network graph options
    data.forEach((element:any) => {
        console.log("Id: "+ element.id + " From User: " + element.fromUser + " To User: "+ element.toUser+ "\n");
    });
    
    const networkGraphOptions = {
        ...commonOptions,
        chart: { type: 'networkgraph' },
        plotOptions: {
            networkgraph: {
                keys: ['from', 'to', 'weight'],
            },
        },
        series: [{
            data: data.map((transaction: any) => ({
                from: transaction.fromUserId,
                to: transaction.toUserId,
                weight: transaction.amount,
            })),
        }],
    };
    

    //chartOptions as per type
    let chartOptions;
    switch(chartType){
        case 'line':
            chartOptions = lineChartOptions;
            break;
        case 'bar':
            chartOptions = barChartOptions;
            break;
        case 'pie':
            chartOptions = pieChartOptions;
            break;
        case 'network':
            chartOptions = networkGraphOptions;
            break;
        default:
            chartOptions = lineChartOptions;
    }

    return <HighchartsReact highcharts = {Highcharts} options = {chartOptions} />
};

export default Chart;