"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import MapOne from "../Maps/MapOne";
import AreaChart from "../Charts/areaChart";
import WatchListTable from "../watch-list/watchTable";

const ECommerce: React.FC = () => {
  const stocks = [
    { name: 'NSDQ100', value: '19854.51', change: '+0.11%', chartData: [5, 10, 5, 8, 15, 7, 12] },
    { name: 'UK100', value: '8279.77', change: '+0.20%', chartData: [3, 6, 3, 9, 14, 8, 11] },
    { name: 'BTC', value: '62869.95', change: '+0.32%', chartData: [8, 12, 9, 10, 17, 12, 14] },
    { name: 'EURUSD', value: '1.11228', change: '+0.10%', chartData: [4, 9, 7, 10, 12, 5, 9] },
    { name: 'OIL', value: '72.08', change: '+2.18%', chartData: [6, 8, 7, 9, 13, 9, 12] },
  ];

  return (
    <>
     <div className="bg-white z-0  rounded-lg shadow p-1 flex justify-between items-center space-x-4">
  {stocks.map((stock) => (
    <div
      key={stock.name}
      className="flex justify-between items-center w-full border-r last:border-r-0 pr-2 last:pr-0"
    >
      <div className="text-left">
        <div className="font-bold text-sm text-gray-700">{stock.name}</div>
        <div className="text-xl font-semibold text-black">{stock.value}</div>
        <div
          className={`text-sm font-medium ${
            stock.change.includes('+') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {stock.change}
        </div>
      </div>
      <div className="ml-4">
        <AreaChart chartData={stock.chartData}  />
      </div>
    </div>
  ))}
</div>

      

      <div className="mt-4 z-0 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <WatchListTable/>
        </div>
      </div>
    </>
  );
};

export default ECommerce;
