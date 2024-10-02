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
        <div className="flex items-start text-start space-x-1 md:space-x-1.5 ">
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
      render: (text) => <p className="text-xs text-black md:text-base text-start">{text}</p>,
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
      render: (text) => <p className="text-xs md:text-base text-black">{text}</p>,
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
  const [selected, setSelected] = useState("1D");
  const options = ["1D", "7D", "1M", "6M", "1Y","3Y", "5Y"];


  return (
    
    <>
    <div className="flex md:space-x-4 bg-[#f1f5f9] p-1 md:p-2 rounded-md mt-4 space-x-2 ">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-2 py-1  text-sm font-medium   rounded-md  ${
            selected === option
              ? "bg-primary text-white"
              : "text-black font-normal  "
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
    icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
    name: "BTC",
    company: "Bitcoin",
    change: 2000,
    percentage: 5,
    buyPrice: 37000,
    rangeLow: 30000,
    rangeHigh: 45000,
    currentPrice: 39000,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025",
    name: "DOGE",
    company: "Dogecoin",
    change: -0.01,
    percentage: -0.5,
    buyPrice: 0.2,
    rangeLow: 0.1,
    rangeHigh: 0.3,
    currentPrice: 0.15,
    changeDirection: "down",
  },

  {
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
    name: "SOL",
    company: "Solana",
    change: 1,
    percentage: 0.5,
    buyPrice: 40,
    rangeLow: 20,
    rangeHigh: 50,
    currentPrice: 35,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    name: "MATIC",
    company: "Polygon",
    change: 0.25,
    percentage: 1,
    buyPrice: 1.5,
    rangeLow: 0.5,
    rangeHigh: 2,
    currentPrice: 1.25,
    changeDirection: "up",
  },

  {
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
    name: "ETH",
    company: "Ethereum",
    change: 100,
    percentage: 1,
    buyPrice: 2400,
    rangeLow: 1800,
    rangeHigh: 2500,
    currentPrice: 2300,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025",
    name: "XRP",
    company: "XRP",
    change: 0.056,
    percentage: 0.1,
    buyPrice: Math.round(0.593 * 1000), // Convert to integer
    rangeLow: Math.round(0.38 * 1000),  // Convert to integer
    rangeHigh: Math.round(0.74 * 1000), // Convert to integer
    currentPrice: Math.round(0.6 * 1000), // Convert to integer
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/apple-aapl-logo.png?v=025",
    name: "AAPL",
    company: "Apple Inc.",
    change: -1,
    percentage: -1,
    buyPrice: 145,
    rangeLow: 120,
    rangeHigh: 150,
    currentPrice: 142,
    changeDirection: "down",
  },
  {
    icon: "https://cryptologos.cc/logos/tesla-tsla-logo.png?v=025",
    name: "TSLA",
    company: "Tesla, Inc.",
    change: 3,
    percentage: 3,
    buyPrice: 700,
    rangeLow: 650,
    rangeHigh: 750,
    currentPrice: 725,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/google-googl-logo.png?v=025",
    name: "GOOGL",
    company: "Alphabet Inc.",
    change: -5,
    percentage: -1,
    buyPrice: 2600,
    rangeLow: 2400,
    rangeHigh: 2800,
    currentPrice: 2550,
    changeDirection: "down",
  },
 
  {
    icon: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=025",
    name: "BNB",
    company: "Binance Coin",
    change: 5,
    percentage: 2,
    buyPrice: 300,
    rangeLow: 200,
    rangeHigh: 350,
    currentPrice: 310,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025",
    name: "DOGE",
    company: "Dogecoin",
    change: -0.01,
    percentage: -0.5,
    buyPrice: 0.2,
    rangeLow: 0.1,
    rangeHigh: 0.3,
    currentPrice: 0.15,
    changeDirection: "down",
  },

  {
    icon: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
    name: "SOL",
    company: "Solana",
    change: 1,
    percentage: 0.5,
    buyPrice: 40,
    rangeLow: 20,
    rangeHigh: 50,
    currentPrice: 35,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=025",
    name: "MATIC",
    company: "Polygon",
    change: 0.25,
    percentage: 1,
    buyPrice: 1.5,
    rangeLow: 0.5,
    rangeHigh: 2,
    currentPrice: 1.25,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png?v=025",
    name: "SHIB",
    company: "Shiba Inu",
    change: 0.000005,
    percentage: 1,
    buyPrice: 0.000006,
    rangeLow: 0.000002,
    rangeHigh: 0.00001,
    currentPrice: 0.000007,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=025",
    name: "LINK",
    company: "Chainlink",
    change: 0.1,
    percentage: 2,
    buyPrice: 25,
    rangeLow: 20,
    rangeHigh: 30,
    currentPrice: 26,
    changeDirection: "up",
  },
  {
    icon: "https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=025",
    name: "LTC",
    company: "Litecoin",
    change: -2,
    percentage: -1,
    buyPrice: 150,
    rangeLow: 100,
    rangeHigh: 200,
    currentPrice: 148,
    changeDirection: "down",
  },
];
