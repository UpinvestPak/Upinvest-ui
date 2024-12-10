"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import AreaChart from "../Charts/areaChart";
import WatchListTable from "../watch-list/watchTable";
import AssetChart from "../Portfolio/AssetChart";
import Holding from "../Portfolio/Holdings";

const ECommerce: React.FC = () => {
  const stocks = [
    {
      name: "NSDQ100",
      value: "19854.51",
      change: "+0.11%",
      chartData: [5, 10, 5, 8, 15, 7, 12],
    },
    {
      name: "UK100",
      value: "8279.77",
      change: "+0.20%",
      chartData: [3, 6, 3, 9, 14, 8, 11],
    },
    {
      name: "BTC",
      value: "62869.95",
      change: "+0.32%",
      chartData: [8, 12, 9, 10, 17, 12, 14],
    },
    {
      name: "EURUSD",
      value: "1.11228",
      change: "+0.10%",
      chartData: [4, 9, 7, 10, 12, 5, 9],
    },
    {
      name: "OIL",
      value: "72.08",
      change: "+2.18%",
      chartData: [6, 8, 7, 9, 13, 9, 12],
    },
  ];

  return (
    <>
      <div className="z-0 flex  items-center justify-between space-x-4 rounded-lg bg-white p-1 shadow">
        {stocks.map((stock) => (
          <div
            key={stock.name}
            className="flex w-full items-center justify-between border-r pr-2 last:border-r-0 last:pr-0"
          >
            <div className="text-left">
              <div className="text-sm font-bold text-gray-700">
                {stock.name}
              </div>
              <div className="text-xl font-semibold text-black">
                {stock.value}
              </div>
              <div
                className={`text-sm font-medium ${
                  stock.change.includes("+") ? "text-green-500" : "text-red-500"
                }`}
              >
                {stock.change}
              </div>
            </div>
            <div className="ml-4">
              <AreaChart chartData={stock.chartData} />
            </div>
          </div>
        ))}
      </div>

      <div className="">
      <div className="flex flex-col gap-4 lg:flex-row mt-7">
            <div className=" w-full md:shadow-md lg:mb-0 lg:w-[65%] border-2  ">
              <AssetChart />
            </div>
            <div className="w-full md:shadow-lg border-2 lg:w-[32.5%] ">
              <Holding />
            </div>
          </div>
        <div className="col-span-12 xl:col-span-8">
          <WatchListTable />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
