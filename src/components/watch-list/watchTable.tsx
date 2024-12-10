import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useMedia from 'use-media';
import { useWatchlist } from '@/hooks/useWatchlist';
import WatchlistActionMenu from './watchListActionMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';

interface WatchListSymbol {
  id: number;
  name: string;
  symbol: string;
}

interface MarketData {
  id: number;  
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
  ytdChange: number;
  oneYearChange: number;
}

const WatchListTable: React.FC = () => {
  const isLargeScreen = useMedia({ minWidth: 1024 });
  const [selected, setSelected] = useState("1D");
  const options = ["1D", "7D", "1M", "6M", "1Y", "3Y", "5Y"];
  const [tableData, setTableData] = useState<MarketData[]>([]);

  const { 
    instruments,
    error, 
    removeInstrument
  } = useWatchlist();

  

  const handleRemoveFromWatchlist = (instrumentId: number) => {
    removeInstrument(instrumentId);
  };

  const handleAddToPortfolio = (instrumentId: number) => {
    // TODO: Implement portfolio addition logic
    console.log('Add to portfolio:', instrumentId);
  };
  const portfolioId = useSelector((state: RootState) => state.watchlist.currentPortfolioId);


  useEffect(() => {
    if (instruments) {
      const transformedData: MarketData[] = instruments.map((instrument) => ({
        id: instrument.id,
        icon: '/path/to/default/icon.png',
        name: instrument.name,
        company: instrument.symbol,
        change: 0,
        percentage: 0,
        buyPrice: 0,
        rangeLow: 0,
        rangeHigh: 0,
        currentPrice: 0,
        changeDirection: 'up',
        ytdChange: 0,
        oneYearChange: 0
      }));
      setTableData(transformedData);
    }
  }, [instruments]);

  const columns: ColumnsType<MarketData> = [
    {
      title: 'Market',
      dataIndex: 'name',
      key: 'name',
      width: isLargeScreen ? 170 : 118,
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-start text-start space-x-1 md:-ml-2">
          <img
            src={record.icon}
            alt={record.name}
            className="h-8 w-7 rounded-full md:w-9 md:h-10"
          />
          <div className="flex flex-col">
            <p className="text-xs font-medium leading-tight text-black md:text-base">
              {record.company}
            </p>
            <p className="text-[10px] whitespace-break-spaces leading-tight text-gray-500 md:text-xs md:-mt-1">
              <span className="">{record.name}</span>
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
        <div className={`text-left text-sm md:text-base ${
          record.changeDirection === 'up' ? 'text-green-500' : 'text-red-500'
        }`}>
          <p className="text-sx font-normal md:text-base">{record.change}</p>
          <p className="text-xs font-medium">{`${record.percentage}%`}</p>
        </div>
      ),
    },
    {
      title: 'YTD ',
      dataIndex: 'ytdChange',
      key: 'ytdChange',
      responsive: ['md'],
      sorter: (a, b) => a.ytdChange - b.ytdChange,
      render: (text, record) => (
        <p className={`text-sm md:text-base ${record.ytdChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {text}%
        </p>
      ),
    },
    {
      title: '1Year',
      dataIndex: 'oneYearChange',
      key: 'oneYearChange',
      responsive: ['md'],
      sorter: (a, b) => a.oneYearChange - b.oneYearChange,
      render: (text, record) => (
        <p className={`text-sm md:text-base ${record.oneYearChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {text}%
        </p>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'buyPrice',
      key: 'volume',
      sorter: (a, b) => a.buyPrice - b.buyPrice,
      render: (text) => (
        <p className="text-xs md:text-base text-black">{text}</p>
      ),
      className: "w-[10px] lg:w-[150px]",
    },
    {
      title: '52W Range',
      key: 'range',
      width: 160,
      responsive: ['md'],
      render: (_, record) => (
        <div className="relative py-3 text-left">
          <span className="absolute left-0 top-0.5 text-xs font-medium">
            {record.rangeLow}
          </span>
          <span className="absolute right-0 top-0.5 text-xs font-medium">
            {record.rangeHigh}
          </span>
          <div className="relative mt-3 h-3 w-full rounded-full bg-[#f1f1f1]">
            <div
              className="absolute h-3 rounded-full bg-[#f1f1f1]"
              style={{
                width: `${((record.currentPrice - record.rangeLow) / (record.rangeHigh - record.rangeLow)) * 100}%`,
              }}
            />
            <div
              className="absolute -ml-2 -mt-0.5 h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-primary shadow"
              style={{
                left: `${((record.currentPrice - record.rangeLow) / (record.rangeHigh - record.rangeLow)) * 100}%`,
              }}
              aria-label={`Current Price: ${record.currentPrice}`}
            />
          </div>
        </div>
      ),
    },
    {
      title: 'High',
      dataIndex: 'rangeHigh',
      key: 'high',
      width: 50,
      responsive: ['xs'],
      render: (text) => <span className="text-xs">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
      title: 'Low',
      dataIndex: 'rangeLow',
      key: 'low',
      width: 46,
      responsive: ['xs'],
      render: (text) => <span className="text-xs">{text}</span>,
      sorter: (a, b) => a.buyPrice - b.buyPrice,
    },
    {
      title: "",
      key: "action",
      width: 30,
      responsive: ["md"],
      render: (_, record) => (
        <div className="flex justify-center">
           <WatchlistActionMenu
        instrumentId={record.id}
        onRemove={handleRemoveFromWatchlist}
        onAddToPortfolio={handleAddToPortfolio}
        symbol={record.company}  
        name={record.name}      
        portfolioId={portfolioId as number}

      />
        </div>
      ),
    },
  ];

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <div className="bg-[#f1f5f9] p-1 md:p- rounded-md mt-4 space-x-2 sticky top-0 z-10">
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

      <div className="mt-2 w-full rounded-md bg-white overflow-auto no-scrollbar">
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          className="custom-table w-full table-fixed no-scrollbar"
          scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default WatchListTable;