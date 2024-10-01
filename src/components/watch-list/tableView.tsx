import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface MarketData {
  icon: string;
  name: string;
  company: string;
  change: number;
  percentage: number;
  buyPrice: number;
  rangeLow: number;
  rangeHigh: number;
  currentPrice: number;
  changeDirection: 'up' | 'down';
}

const MarketTable: React.FC = () => {
  const columns: ColumnsType<MarketData> = [
    {
      title: 'Market',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-start text-start space-x-0 md:space-x-1.5 ">
          <img
            src={record.icon}
            alt={record.name}
            className="h-8 w-7 rounded-full md:w-9 md:h-10"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.name}
            </p>
            <p className="text-[10px] leading-tight text-gray-500 md:text-xs md:-mt-1">
              {record.company}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'buyPrice',
      key: 'buyPrice',
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => <p className="text-sm text-black md:text-base text-start">{text}</p>,
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      sorter: (a, b) => a.change - b.change,
      render: (text, record) => (
        <div
          className={`text-left text-sm md:text-base ${
            record.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          <p className="text-sx font-normal md:text-base">{record.change}</p>
          <p className="text-xs font-medium ">{`[${record.percentage}%]`}</p>
        </div>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'buyPrice',
      key: 'volume',
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => <p className="text-sm md:text-base text-black">{text}</p>,
    },
    {
      title: '52W Range',
      key: 'range',
      responsive: ['md'], // Show on larger screens
      render: (text, record) => (
        <div className="relative py-3 text-left">
          <span className="absolute left-0 top-0.5 text-xs font-medium">
            {record.rangeLow}
          </span>
          <span className="absolute right-0 top-0.5  text-xs font-medium">
            {record.rangeHigh}
          </span>
          <div className="relative mt-3 h-3 w-full rounded-full bg-[#f1f1f1]">
            <div
              className="absolute h-3 rounded-full bg-[#f1f1f1]"
              style={{
                width: `${
                  ((record.currentPrice - record.rangeLow) /
                    (record.rangeHigh - record.rangeLow)) *
                  100
                }%`,
              }}
            ></div>
            <div
              className="absolute -ml-2 -mt-0.5 h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-primary shadow"
              style={{
                left: `${
                  ((record.currentPrice - record.rangeLow) /
                    (record.rangeHigh - record.rangeLow)) *
                  100
                }%`,
              }}
              aria-label={`Current Price: ${record.currentPrice}`}
            ></div>
          </div>
        </div>
      ),
    },
    {
      title: 'High',
      dataIndex: 'rangeHigh',
      key: 'high',
      responsive: ['xs'], // Show on smaller screens
      render: (text) => <span className="text-xs ">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,

    },
    {
      title: 'Low',
      dataIndex: 'rangeLow',
      key: 'low',
      responsive: ['xs'], // Show on smaller screens
      render: (text) => <span className="text-xs ">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,

    },
  ];
  const [selected, setSelected] = useState("7D");
  const options = ["1D", "7D", "1M", "6M", "1Y","3Y", "5Y"];


  return (
    
    <>
    <div className="flex md:space-x-4 bg-[#f1f5f9] p-1 md:p-2 rounded-md mt-4 space-x-2 ">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-2 py-0.5 rounded-md ${
            selected === option
              ? "bg-primary text-white"
              : "text-gray-800 hover:text-primary"
          }`}
        >
          {option}
        </button>
      ))}
    </div>

    <div className="mt-2 w-full rounded-md bg-white ">
      <Table
        columns={columns}
        dataSource={markets}
        pagination={false}
        rowKey="name"
        className="custom-table w-full table-fixed"
      />
    </div>
    </>
  );
};

export default MarketTable;

const markets: MarketData[] = [
  {
    icon: 'https://img.icons8.com/color/48/nvidia.png',
    name: 'NVDA',
    company: 'NVIDIA Corporation',
    change: -2.64,
    percentage: -2.13,
    buyPrice: 121.54,
    rangeLow: 39.17,
    rangeHigh: 140.54,
    currentPrice: 92,
    changeDirection: 'down',
  },
  {
    icon: 'https://img.icons8.com/plasticine/100/xrp.png',
    name: 'XRP',
    company: 'XRP',
    change: 0.056,
    percentage: 0.1,
    buyPrice: 0.593,
    rangeLow: 0.38,
    rangeHigh: 0.74,
    currentPrice: 0.6,
    changeDirection: 'up',
  },
];
