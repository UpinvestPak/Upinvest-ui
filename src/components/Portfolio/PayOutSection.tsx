"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useMedia from "use-media";

interface MarketData {
  icon: string; // URL or path to the company's icon
  symbol: string; // Stock symbol (e.g., ENGRO, HBL)
  dividends: number; // Dividend amount in Pkr
  bonusShares: number; // Number of bonus shares
  totalTax: number; // Total tax in Pkr
  company: string;     // Company name

}

const PayoutTable: React.FC = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 }); // lg screen

  const columns: ColumnsType<MarketData> = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      width: isLargeScreen ? 370 : 128,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start md:-ml-2">
        <img
          src={record.icon}
          alt={record.symbol}
          className="h-8 w-7 rounded-full md:h-10 md:w-9"
        />
        <div className="flex flex-col">
          <p className="text-xs font-medium leading-tight text-black md:text-base">
            {record.symbol}
          </p>
          <p className="whitespace-break-spaces text-[10px] leading-tight text-gray-500 md:-mt-1 md:text-xs">
            <span className="">{record.company}</span>
          </p>
        </div>
      </div>
      ),
    },
    {
      title: "Dividends",
      dataIndex: "dividends",
      key: "dividends",
      sorter: (a, b) => a.dividends - b.dividends,
      render: (text) => (
        <p className="text-start  text-black">
          Pkr {text} 
        </p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Bonus (shares)</p>
      ),      dataIndex: "bonusShares",
      key: "bonusShares",
      sorter: (a, b) => a.bonusShares - b.bonusShares,
      render: (text) => (
        <p className="text-start text- text-black">
          {text} 
        </p>
      ),
    },
    {
      title: (
        <p className="md:whitespace-nowrap whitespace-normal">Total Tax</p>
      ),    
        dataIndex: "totalTax",
      key: "totalTax",
      sorter: (a, b) => a.totalTax - b.totalTax,
      render: (text) => (
        <p className="text-start  text-black">
         Pkr {text} 
        </p>
      ),
    },
  ];

  const [selected, setSelected] = useState("1D");

  return (
    <div className="relative ">
      <div className="flex items-center justify-between mt-16 py-5">
        <h1 className="text-2xl font-semibold text-black">Payout Overview</h1>
      </div>


      <div className="mt-2 w-full  rounded-md bg-white">
        <Table
          columns={columns}
          dataSource={marketData}
          pagination={false}
          rowKey="symbol"
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default PayoutTable;

const options = ["1D", "1W", "1M", "1Y"]; // Sample filter options

const marketData: MarketData[] = [
  {
    symbol: "ENGRO",
    company: "Engro Corporation",
    icon: "path_to_engro_icon", // URL or path to the company's icon
    dividends: 120,
    bonusShares: 5,
    totalTax: 20,
  },
  {
    symbol: "HBL",
    company: "Habib Bank Limited",
    icon: "path_to_hbl_icon",
    dividends: 80,
    bonusShares: 3,
    totalTax: 15,
  },
  {
    symbol: "LUCK",
    company: "Lucky Cement",
    icon: "path_to_lucky_cement_icon",
    dividends: 150,
    bonusShares: 8,
    totalTax: 25,
  },
  {
    symbol: "PTCL",
    company: "Pakistan Telecommunication Company Limited",
    icon: "path_to_ptcl_icon",
    dividends: 60,
    bonusShares: 2,
    totalTax: 10,
  },
  {
    symbol: "OGDC",
    company: "Oil & Gas Development Company",
    icon: "path_to_ogdc_icon",
    dividends: 110,
    bonusShares: 4,
    totalTax: 18,
  },
  {
    symbol: "FFC",
    company: "Fauji Fertilizer Company",
    icon: "path_to_ffc_icon",
    dividends: 90,
    bonusShares: 6,
    totalTax: 22,
  },
  {
    symbol: "PIA",
    company: "Pakistan International Airlines",
    icon: "path_to_pia_icon",
    dividends: 50,
    bonusShares: 1,
    totalTax: 5,
  },
];

