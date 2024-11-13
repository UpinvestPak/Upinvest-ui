"use client";
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useMedia from "use-media";

interface MarketData {
  icon: string;       
  name: string;
  company: string;     // Added company to interface
  totalCost: number;  
  avgBuy: number;    
  shares: number;    
  marketValue: number; 
  dayReturn: number;  
  totalReturn: number; 
}

const HistoryTrade: React.FC = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 });

  const columns: ColumnsType<MarketData> = [
    {
      title: <p className="md:whitespace-nowrap whitespace-normal">Symbol</p>,
      dataIndex: "name",
      key: "name",
      width: isLargeScreen ? 390 : 128,

      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start md:-ml-2">
          <img
            src={record.icon}
            alt={record.name}
            className="h-8 w-7 rounded-full md:h-10 md:w-9"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.name}
            </p>
            <p className="text-xs text-gray-500 leading-tight">
              {record.company}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Average Buy</p>
      ),
      dataIndex: "avgBuy",
      key: "avgBuy",
      sorter: (a, b) => a.avgBuy - b.avgBuy,
      render: (text) => <p className="text-start  text-base text-black">{text}</p>,
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Average Sell</p>
      ),
      dataIndex: "marketValue",
      key: "marketValue",
      sorter: (a, b) => a.marketValue - b.marketValue,
      render: (text) => <p className="text-start text-base text-black">{text}</p>,
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Profit/Loss</p>
      ),
      dataIndex: "totalReturn",
      key: "totalReturn",
      sorter: (a, b) => a.totalReturn - b.totalReturn,
      render: (text) => <p className="text-start text-base text-black">{text}%</p>,
    },
    {
      title: <p className="md:whitespace-nowrap whitespace-normal">Dividend</p>,
      dataIndex: "dayReturn",
      key: "dayReturn",
      sorter: (a, b) => a.dayReturn - b.dayReturn,
      render: (text) => <p className="text-start text-base text-black">{text}%</p>,
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-between md:mt-8 mt-2 py-5">
        <h1 className="text-2xl font-semibold text-black">History Overview</h1>
      </div>

      <div className="mt-2 w-full rounded-md bg-white">
        <Table
          columns={columns}
          dataSource={markets}
          pagination={false}
          rowKey="name"
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default HistoryTrade;

const markets: MarketData[] = [
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Engro_logo.png",
    name: "ENG",
    company: "Engro Corporation",
    totalCost: 150000,
    avgBuy: 300.00,
    shares: 500,
    marketValue: 160000,
    dayReturn: 1.50,
    totalReturn: 6.70,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Habib_Bank_Limited_logo.svg/1200px-Habib_Bank_Limited_logo.svg.png",
    name: "HBL",
    company: "Habib Bank Limited",
    totalCost: 120000,
    avgBuy: 150.00,
    shares: 800,
    marketValue: 125000,
    dayReturn: -0.80,
    totalReturn: 4.20,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Lucky_Cement_logo.svg/1280px-Lucky_Cement_logo.svg.png",
    name: "LUCK",
    company: "Lucky Cement Company",
    totalCost: 90000,
    avgBuy: 450.00,
    shares: 200,
    marketValue: 95000,
    dayReturn: 0.60,
    totalReturn: 5.60,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Oil_Company_logo.png",
    name: "OIL",
    company: "Pakistan State Oil",
    totalCost: 180000,
    avgBuy: 90.00,
    shares: 2000,
    marketValue: 170000,
    dayReturn: -1.30,
    totalReturn: -5.50,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Fauji_Fertilizer_Company_logo.svg/1280px-Fauji_Fertilizer_Company_logo.svg.png",
    name: "FFC",
    company: "Fauji Fertilizer Company",
    totalCost: 85000,
    avgBuy: 85.00,
    shares: 1000,
    marketValue: 90000,
    dayReturn: 0.70,
    totalReturn: 5.90,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Unilever.svg/1024px-Unilever.svg.png",
    name: "UNIL",
    company: "Unilever Pakistan",
    totalCost: 500000,
    avgBuy: 2500.00,
    shares: 200,
    marketValue: 520000,
    dayReturn: 0.20,
    totalReturn: 4.00,
  }
];