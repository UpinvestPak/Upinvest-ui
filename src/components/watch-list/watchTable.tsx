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
  ytdChange: number; // Year-to-Date Change percentage
  oneYearChange: number; // 1-Year Change percentage
}


const WatchListTable: React.FC = () => {
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
      render: (text) => <p className="text-xs text-black md:text-base text-start ">{text} <span className='text-xs -ml-0.5'>Pkr</span></p>,
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
          <p className="text-xs font-medium ">{`${record.percentage}%`}</p>
        </div>
      ),
    },
    {
      title: 'YTD Change',
      dataIndex: 'ytdChange',
      key: 'ytdChange',
      responsive: ['md'], // Hidden in mobile view, show on larger screens
      sorter: (a, b) => a.ytdChange - b.ytdChange,
      render: (text, record) => (
        <p className={`text-sm md:text-base ${record.ytdChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {text}%
        </p>
      ),
    },
    {
      title: '1-Year Change',
      dataIndex: 'oneYearChange',
      key: 'oneYearChange',
      responsive: ['md'], // Hidden in mobile view, show on larger screens
      sorter: (a, b) => a.oneYearChange - b.oneYearChange,
      render: (text, record) => (
        <p className={`text-sm md:text-base -ml-3 ${record.oneYearChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {text}%
        </p>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'buyPrice',
      key: 'volume',
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => <p className="text-xs md:text-base -ml-5 text-black">{text}</p>,
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
    
    <div className="relative">
    {/* Sticky Filters */}
    <div className="bg-[#f1f5f9] p-1 md:p-2 rounded-md mt-4 space-x-2 sticky top-0 z-10">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-2 py-1 text-sm font-medium rounded-md ${
            selected === option ? "bg-primary text-white" : "text-black font-normal"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  
    {/* Table Container with Sticky Header */}
    <div className="mt-2 w-full rounded-md bg-white sticky ">
      <Table
        columns={columns}
        dataSource={markets}
        pagination={false}
        rowKey="name"
        className="custom-table w-full table-fixed"
        scroll={{ y: 400 }} 

      />
    </div>

  </div>

  
  );
};

export default WatchListTable;

const markets: MarketData[] = [
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png", 
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png", 
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png", 
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/PTCL_Logo.svg/2048px-PTCL_Logo.svg.png", 
    name: "PTCL",
    company: "Pakistan Telecommunication Company Limited",
    change: 0.5,
    percentage: 0.2,
    buyPrice: 12,
    rangeLow: 10,
    rangeHigh: 15,
    currentPrice: 13,
    changeDirection: "up",
    ytdChange: 5,
    oneYearChange: 6,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/6/66/Oil_and_Gas_Development_Company_logo.png", 
    name: "OGDC",
    company: "Oil & Gas Development Company",
    change: -2,
    percentage: -0.7,
    buyPrice: 100,
    rangeLow: 90,
    rangeHigh: 120,
    currentPrice: 98,
    changeDirection: "down",
    ytdChange: -4,
    oneYearChange: -5,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/d/da/Fauji_Fertilizer_Company_Logo.png", 
    name: "FFC",
    company: "Fauji Fertilizer Company",
    change: 3,
    percentage: 1,
    buyPrice: 105,
    rangeLow: 95,
    rangeHigh: 115,
    currentPrice: 110,
    changeDirection: "up",
    ytdChange: 8,
    oneYearChange: 10,
  },
  {
    icon: "https://seeklogo.com/images/U/unilever-logo-3B472C0E13-seeklogo.com.png", 
    name: "UNILEVER",
    company: "Unilever Pakistan",
    change: 4,
    percentage: 2,
    buyPrice: 2400,
    rangeLow: 2200,
    rangeHigh: 2600,
    currentPrice: 2450,
    changeDirection: "up",
    ytdChange: 10,
    oneYearChange: 12,
  },
  {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Pakistan_International_Airlines_Logo.svg/1024px-Pakistan_International_Airlines_Logo.svg.png", 
    name: "PIA",
    company: "Pakistan International Airlines",
    change: -0.3,
    percentage: -2,
    buyPrice: 5,
    rangeLow: 3,
    rangeHigh: 7,
    currentPrice: 4.5,
    changeDirection: "down",
    ytdChange: -15,
    oneYearChange: -18,
  },
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png", 
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png", 
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png", 
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
  {
    icon: "https://seeklogo.com/images/E/engro-logo-2D55F166AB-seeklogo.com.png", 
    name: "ENGRO",
    company: "Engro Corporation",
    change: 5,
    percentage: 1.5,
    buyPrice: 300,
    rangeLow: 250,
    rangeHigh: 350,
    currentPrice: 320,
    changeDirection: "up",
    ytdChange: 12,
    oneYearChange: 15,
  },
  {
    icon: "https://seeklogo.com/images/H/habib-bank-limited-logo-68A77260BA-seeklogo.com.png", 
    name: "HBL",
    company: "Habib Bank Limited",
    change: -3,
    percentage: -1,
    buyPrice: 120,
    rangeLow: 100,
    rangeHigh: 150,
    currentPrice: 115,
    changeDirection: "down",
    ytdChange: -8,
    oneYearChange: -10,
  },
  {
    icon: "https://www.lucky-cement.com/wp-content/themes/lucky/assets/images/logo/lucky_cement_logo.png", 
    name: "LUCK",
    company: "Lucky Cement",
    change: 7,
    percentage: 2.1,
    buyPrice: 600,
    rangeLow: 550,
    rangeHigh: 700,
    currentPrice: 650,
    changeDirection: "up",
    ytdChange: 18,
    oneYearChange: 20,
  },
];


