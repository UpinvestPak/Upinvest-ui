"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import useMedia from "use-media";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/navigation";


const DividendTable = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 });
  const router = useRouter();
  const handleRowClick = (record: { symbol: any; }) => {
    router.push(`/dividend/${record.symbol}?symbol=${record.symbol}`);
  };
  const columns: ColumnsType<any> = [
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Symbol</p>,
      dataIndex: "symbol",
      key: "symbol",
      width: isLargeScreen ? 200 : 158,
      sorter: (a, b) => a.symbol.localeCompare(b.symbol),
      render: (text, record) => (
        <div className="flex items-start space-x-1 text-start">
          <img
            src={record.icon}
            alt={record.symbol}
            className="h-8 w-7 rounded-full md:h-10 md:w-9"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.symbol}
            </p>
            <p className="whitespace-break-spaces text-[10px] leading-tight text-gray-500 md:text-xs">
              {record.company}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Gross Dividend</p>,
      dataIndex: "price",
      key: "price",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <p className="text-start text-base text-black">{Number(text).toFixed(2)}</p>
      ),
    },
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Tax Amount</p>,
      dataIndex: "tax",
      key: "tax",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.tax - b.tax,
      render: (text) => (
        <p className="text-start text-base text-black">{Number(text).toFixed(2)}</p>
      ),
    },
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Net Dividends</p>,
      dataIndex: "netDividends",
      key: "netDividends",
      width: isLargeScreen ? 120 : 100,
      sorter: (a, b) => a.netDividends - b.netDividends,
      render: (text) => (
        <p className="text-start text-base text-black">{Number(text).toFixed(2)}</p>
      ),
    },
    {
      title: "",
      key: "action",
      width: 30,
      responsive: ["md"],
      render: () => (
        <div className="flex justify-end">
          <button
            className="text-gray-400 hover:text-black"
            aria-label="More options"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
      ),
    },
  ];

  const dummyData = [
    {
      id: "1",
      symbol: "AAPL",
      company: "Apple Inc.",
      icon: "https://via.placeholder.com/40",
      price: 150.25,
      tax: 15.02,
      netDividends: 135.23,
    },
    {
      id: "2",
      symbol: "MSFT",
      company: "Microsoft Corp.",
      icon: "https://via.placeholder.com/40",
      price: 200.5,
      tax: 20.05,
      netDividends: 180.45,
    },
    {
      id: "3",
      symbol: "GOOGL",
      company: "Alphabet Inc.",
      icon: "https://via.placeholder.com/40",
      price: 250.75,
      tax: 25.08,
      netDividends: 225.67,
    },
  ];

  return (
    <div className="relative">
      <div className="mt-5 flex items-center justify-between py-5 md:mt-10">
        <h1 className="text-2xl font-semibold text-black">Dividend</h1>
      </div>
      <div className="mt-2 w-full rounded-md bg-white">
        <Table
          columns={columns}
          dataSource={dummyData}  
          className="custom-table no-scrollbar w-full table-fixed overflow-auto"
          scroll={{ x: "max-content", y: 400 }}
        />
      </div>
    </div>
  );
};

export default DividendTable;