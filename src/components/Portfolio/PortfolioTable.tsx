"use client";
import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  FiMoreVertical,
  FiArrowUp,
  FiArrowDown,
  FiTrendingUp,
} from "react-icons/fi";

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
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  const renderMobileView = () => (
    <div className="space-y-2">
      {markets.map((item) => (
        <div
          key={item.name}
          className="relative flex rounded-lg border bg-white p-2 shadow-sm transition-all hover:shadow-md"
        >
          <div className="mt-5 flex items-start justify-between">
            <div>
              <div className="text-xl font-bold text-primary">{item.name}</div>
              <div className="-mt-1 text-[12px] text-gray-500">
                PRICE
                <div className="-mt-2 text-lg font-semibold text-gray-900">
                  {item.avgBuy}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-6 grid grid-cols-3 gap-3">
            <div>
              <div className="mb-1 text-xs font-medium uppercase text-gray-500">
                TOTAL COST
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {item.totalCost}
              </div>

              <div className="mb-1 mt-2 text-xs font-medium uppercase text-gray-500">
                SHARES
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {item.shares}
              </div>
            </div>

            <div>
              <div className="mb-1 text-xs font-medium uppercase text-gray-500">
                Day Return
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">
                  {item.avgBuy}
                </div>
                <div
                  className={` mr-1.5 flex items-center font-medium ${
                    item.dayReturn >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.dayReturn >= 0 ? (
                    <FiArrowUp className="h-4 w-4" />
                  ) : (
                    <FiArrowDown className="h-4 w-4" />
                  )}
                  <span className="ml-">{item.dayReturn}%</span>
                </div>
              </div>

              <div className="mb-1 mt-3 text-xs font-medium uppercase text-gray-500">
                TOTAL Return
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">
                  {item.avgBuy}
                </div>
                <div
                  className={`mr-1.5 flex items-center font-medium ${
                    item.totalReturn >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.totalReturn >= 0 ? (
                    <FiArrowUp className="h-4 w-4" />
                  ) : (
                    <FiArrowDown className="h-4 w-4" />
                  )}
                  <span className="">{item.totalReturn}%</span>
                </div>
              </div>
            </div>

            <div className="ml-1">
              <div className="mb-1 text-xs font-medium uppercase text-gray-500">
                AVG BUY
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {item.avgBuy}
              </div>

              <div className="mb-1 mt-3 text-xs font-medium uppercase text-gray-500">
                MARKET VALUE
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {item.marketValue}
              </div>
            </div>
          </div>

          {/* Three dots menu */}
          <button className="absolute right-1 top-13  rounded-full p-1 hover:bg-gray-100">
            <FiMoreVertical className="h-5 w-5 text-gray-500 " />
          </button>
        </div>
      ))}
    </div>
  );
  const columns: ColumnsType<MarketData> = [
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Symbol</p>,
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex flex-grow items-start space-x-1 text-start md:-ml-3">
          <img
            src={record.icon}
            alt={record.name}
            className="md-ml-0 -ml-1 hidden h-7 w-7 rounded-full md:block md:h-8 md:w-8"
            onError={(e) =>
              (e.currentTarget.src = "https://via.placeholder.com/150")
            }
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.name}
            </p>
            <p className="text-xs font-thin">
              Price <span className="font-medium">{record.avgBuy}</span>
            </p>
          </div>
        </div>
      ),
    },
    {
      title: (
        <p className="whitespace-normal md:whitespace-nowrap">Total Cost</p>
      ),
      dataIndex: "totalCost",
      key: "totalCost",
      sorter: (a, b) => a.totalCost - b.totalCost,
      render: (text) => (
        <p className="text-start text-xs text-black md:text-base">{text}</p>
      ),
    },
    {
      title: <p className="whitespace-normal md:whitespace-nowrap">Avg Buy</p>,
      dataIndex: "avgBuy",
      key: "avgBuy",
      sorter: (a, b) => a.avgBuy - b.avgBuy,
      render: (text) => (
        <p className="text-start text-xs text-black md:text-base">{text}</p>
      ),
    },
    {
      title: (
        <p className="whitespace-normal md:whitespace-nowrap">No. of Shares</p>
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
        <p className="whitespace-normal md:whitespace-nowrap">Market Value</p>
      ),
      dataIndex: "marketValue",
      key: "marketValue",
      sorter: (a, b) => a.marketValue - b.marketValue,
      render: (text) => (
        <p className="text-xs text-black md:text-base">{text}</p>
      ),
    },
    {
      title: (
        <p className="whitespace-normal md:whitespace-nowrap">Day Return</p>
      ),
      dataIndex: "dayReturn",
      key: "dayReturn",
      sorter: (a, b) => a.dayReturn - b.dayReturn,
      render: (text) => (
        <div className="flex flex-col items-start text-xs md:text-sm">
          <p className={`${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {text}%
          </p>
        </div>
      ),
    },
    {
      title: (
        <p className="whitespace-normal md:whitespace-nowrap">Total Return</p>
      ),
      dataIndex: "totalReturn",
      key: "totalReturn",
      sorter: (a, b) => a.totalReturn - b.totalReturn,
      render: (text) => (
        <div className="flex flex-col items-start text-xs md:text-sm">
          <p className={`${text >= 0 ? "text-green-500" : "text-red-500"}`}>
            {text}%
          </p>
        </div>
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

  return (
    <div className="md:mx- relative">
      <div className="mt-5 flex items-center justify-between py-7">
        <h1 className="text-2xl font-semibold text-black">
          Portfolio Holdings
        </h1>
      </div>

      <div className="no-scrollbar sticky -ml-1 mt-2 w-full overflow-auto rounded-md md:-ml-0">
        {isMobile ? (
          renderMobileView()
        ) : (
          <Table
            columns={columns}
            dataSource={markets}
            pagination={false}
            rowKey="name"
            className="custom-table no-scrollbar w-full table-fixed overflow-auto"
            scroll={{ y: 400 }}
          />
        )}
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
    avgBuy: 1.5,
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
    avgBuy: 9.8,
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
