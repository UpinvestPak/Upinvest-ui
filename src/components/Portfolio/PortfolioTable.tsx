"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { FiMoreVertical } from "react-icons/fi";
import useMedia from "use-media";

interface MarketData {
  icon: string;
  name: string;
  totalCost: number;
  avgBuy: number;
  shares: number;
  marketValue: number;
  dayReturn: number;
  totalReturn: number;
}

const PortfolioTable: React.FC = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 }); 
  const defaultImage = "https://via.placeholder.com/150"; 


  const columns: ColumnsType<MarketData> = [
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Symbol</p>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start md:-ml-3    flex-grow">
          <img
            src={record.icon}
            alt={record.name}
            className="h-7 w-7 rounded-full md:h-8 md:w-8 -ml-1 md-ml-0 hidden md:block"
            onError={(e) => (e.currentTarget.src = defaultImage)} // Fallback image on error
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.name}
            </p>
            <p className="text-xs font-thin ">
              Price  <span className="font-medium">23.7</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Total Cost</p>
      ),
      dataIndex: "totalCost",
      key: "totalCost",
      sorter: (a, b) => a.totalCost - b.totalCost,
      render: (text) => (
        <p className="text-start text-xs text-black md:text-base">
          {text}
        </p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Avg Buy</p>
      ),
      dataIndex: "avgBuy",
      key: "avgBuy",
      sorter: (a, b) => a.avgBuy - b.avgBuy,
      render: (text) => (
        <p className="text-start text-xs text-black md:text-base">
          {text} 
        </p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">No. of Shares</p>
      ),
      dataIndex: "shares",
      key: "shares",
      sorter: (a, b) => a.shares - b.shares,
      render: (text) => (
        <p className="text-xs text-black md:text-base">{text}</p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Market Value</p>
      ),
      dataIndex: "marketValue",
      key: "marketValue",
      width: "20%",
      sorter: (a, b) => a.marketValue - b.marketValue,
      render: (text) => (
        <p className="text-xs text-black md:text-base">{text}</p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Day Return</p>
      ),
      dataIndex: "dayReturn",
      key: "dayReturn",
      sorter: (a, b) => a.dayReturn - b.dayReturn,
      render: (text, record) => (
        <div className="text-xs flex flex-col items-start">
          <p className={` ${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {record.avgBuy}
          </p>
          <p className={`${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {text}%
          </p>
        </div>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Total Return</p>
      ),
      dataIndex: "totalReturn",
      key: "totalReturn",
      sorter: (a, b) => a.totalReturn - b.totalReturn,
      render: (text, record) => (
        <div className="text-xs flex flex-col items-start">
          <p className={`${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {record.avgBuy}
          </p>
          <p className={`${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {text}%
          </p>
        </div>
      ),
    },
    
    {
      title: "",
      key: "action",
      width: "50px", // Set a very small width for the last column
      responsive: ["md"], // Hidden in mobile view, show on larger screens

      render: (_, record) => (
        <div className="flex justify-end">
          <button className="text-gray-400 hover:text-black" aria-label="More options">
            <FiMoreVertical size={20} />
          </button>
        </div>
      ),
    },
  ];
  
  


  return (
    <div className="relative md:mx-">
      <div className="flex items-center justify-between py-7 mt-5">
        <h1 className="text-2xl font-semibold text-black">Portfolio Holdings</h1>
      </div>
     
      <div className="no-scrollbar sticky mt-2 w-full overflow-auto rounded-md bg-white -ml-1 md:-ml-0">
        <Table
          columns={columns}
          dataSource={markets} // Make sure to pass your data here
          pagination={false}
          rowKey="name"
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default PortfolioTable;




const markets: MarketData[] = [
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Engro_logo.png", // Engro logo
    name: "Eng",
    totalCost: 150000,
    avgBuy: 30.5,
    shares: 500,
    marketValue: 160000,
    dayReturn: 1.5,
    totalReturn: 6.7,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Habib_Bank_Limited_logo.svg/1200px-Habib_Bank_Limited_logo.svg.png", // HBL logo
    name: "HhB",
    totalCost: 120000,
    avgBuy: 1.50,
    shares: 800,
    marketValue: 125000,
    dayReturn: -0.8,
    totalReturn: 4.2,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Lucky_Cement_logo.svg/1280px-Lucky_Cement_logo.svg.png", // Lucky Cement logo
    name: "Luck",
    totalCost: 90000,
    avgBuy: 450,
    shares: 200,
    marketValue: 95000,
    dayReturn: 0.6,
    totalReturn: 5.6,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Oil_Company_logo.png", // Placeholder oil company logo
    name: "Oil",
    totalCost: 180000,
    avgBuy: 9.80,
    shares: 2000,
    marketValue: 170000,
    dayReturn: -1.3,
    totalReturn: -5.5,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Fauji_Fertilizer_Company_logo.svg/1280px-Fauji_Fertilizer_Company_logo.svg.png", // Fauji Fertilizer logo
    name: "Fauji",
    totalCost: 85000,
    avgBuy: 85,
    shares: 1000,
    marketValue: 90000,
    dayReturn: 0.7,
    totalReturn: 5.9,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Unilever.svg/1024px-Unilever.svg.png", // Unilever logo
    name: "Unil",
    totalCost: 500000,
    avgBuy: 250,
    shares: 200,
    marketValue: 520000,
    dayReturn: 0.2,
    totalReturn: 4.0,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/PTCL_logo.svg/1280px-PTCL_logo.svg.png", // PTCL logo
    name: "Pakist",
    totalCost: 40000,
    avgBuy: 20,
    shares: 2000,
    marketValue: 42000,
    dayReturn: 1.0,
    totalReturn: 5.0,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/PIA_logo.svg/800px-PIA_logo.svg.png", // PIA logo
    name: "PIA",
    totalCost: 30000,
    avgBuy: 15,
    shares: 2000,
    marketValue: 31000,
    dayReturn: 0.5,
    totalReturn: 3.3,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/25/Kapco_logo.png", // Kapco logo
    name: "Kdm",
    totalCost: 100000,
    avgBuy: 50,
    shares: 2000,
    marketValue: 102000,
    dayReturn: 0.2,
    totalReturn: 2.0,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/8/80/Pakistan_Stock_Exchange_logo.png", // PSX logo
    name: "Psx",
    totalCost: 50000,
    avgBuy: 25,
    shares: 2000,
    marketValue: 48000,
    dayReturn: -0.4,
    totalReturn: -4.0,
  },
];
