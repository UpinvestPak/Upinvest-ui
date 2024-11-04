"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import MovingAverageChart from "./indecesChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const IndecesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState("KSE100");
  const tabs = [
    "KSE100",
    "ALLSHR",
    "KSE30",
    "KMI30",
    "BKTI",
    "OGTI",
    "KMIALLSHR",
    "PSXDIV20",
    "UPP9",
    "NITPGI",
    "NBPPGI",
    "MZNPI",
    "JSMFI",
    "ACI",
    "JSGBKTI",
    "MII30",
    "HBLTTI",
  ];
  const record = {
    rangeLow: 120,
    rangeHigh: 180,
    currentPrice: 150,
  };

  return (
    <div className=" md:mx-3 ">
      <div className=" flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black">Indeces Overview</h1>
      </div>

      <div className="mt-6">
        {/* Scrollable Tab List */}
        <div
          className="hide-scrollbar relative flex space-x-2 overflow-x-auto border-b-4 border-[#d8d8d8] font-medium md:space-x-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative z-10 px-4 py-2 text-sm transition-colors duration-300 md:px-6 md:py-3 ${
                activeTab === tab
                  ? "z-20 text-primary" // Ensure active tab has higher z-index
                  : "text-black hover:border-gray-300"
              }`}
            >
              {tab}
              {/* Highlight active tab */}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 z-10 h-[4px] bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className=" relative mt-8 flex flex-col items-center justify-center  space-x-10  rounded-lg p-3 shadow-lg  md:flex-row">
        <div className="w-full   rounded-lg  md:w-[40%]  ">
          <div className="mt-3 flex items-center text-center">
            <p className="text-2xl font-bold text-black">86,383.38</p>
            <p className="ml-3 flex items-center text-lg font-semibold text-green-500">
              <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
              +719.41 (0.84%)
            </p>
          </div>

          <p className="text-xs text-gray-500 ">As of Oct 9, 2024 11:44 AM</p>

          <div className="mt-7 grid grid-cols-3 gap-5">
            <div>
              <p className="text-sm font-medium  text-black">HIGH</p>
              <p className="text-base text-black">86,383.38</p>
            </div>
            <div>
              <p className="text-sm font-medium  text-black">LOW</p>
              <p className="text-base text-black">85,823.81</p>
            </div>
            <div>
              <p className="text-sm font-medium  text-black">VOLUME</p>
              <p className="text-base text-black">149,988,777</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">1-YEAR CHANGE</p>
              <p className="text-base  text-green-500">+81.01%</p>
            </div>
            <div>
              <p className="text-sm font-medium text-black">YTD CHANGE</p>
              <p className="text-base  text-green-500">+33.59%</p>
            </div>
            <div>
              <p className="text-sm font-medium  text-black">PREVIOUS CLOSE</p>
              <p className="text-base text-black">85,663.97</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-8">
            <div className="text-black">
              <p className="text-sm font-medium  text-black">DAY RANGE</p>
              <div className="relative py-5 text-left">
                <span className="absolute left-0 top-[1px]  mt-2 text-xs font-medium">
                  {record.rangeLow}
                </span>
                <span className="absolute right-0 top-0.5 mt-2 text-xs font-medium">
                  {record.rangeHigh}
                </span>
                <div className="relative mt-3 h-3 w-full rounded-full bg-[#f1f1f1]">
                  <div
                    className="absolute h-3 rounded-full"
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
            </div>

            <div className="text-black">
              <p className="text-sm font-medium  text-black">52-WEEK RANGE</p>
              <div className="relative py-5 text-left">
                <span className="absolute left-0 top-0.5 mt-2 text-xs font-medium text-black">
                  {record.rangeLow}
                </span>
                <span className="absolute right-0 top-0.5 mt-2 text-xs font-medium">
                  {record.rangeHigh}
                </span>
                <div className="relative mt-3 h-3 w-full rounded-full bg-[#f1f1f1]">
                  <div
                    className="absolute h-3 rounded-full "
                    style={{
                      width: `${
                        ((record.currentPrice - record.rangeLow) /
                          (record.rangeHigh - record.rangeLow)) *
                        100
                      }%`,
                    }}
                  ></div>
                  <div
                    className="absolute -ml-2 -mt-0.5 h-4 w-4 cursor-pointer rounded-full border border-gray-300 bg-primary text-black shadow"
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
            </div>
          </div>

          {/* Range Slider (Day Range) */}
        </div>

        {/* Chart taking 60% */}
        <div className="w-[115%] py-4 pr-8 justify-center md:w-3/5 md:py-0 md:pr-0">
          <MovingAverageChart />
        </div>
      </div>
    </div>
  );
};

export default IndecesTable;
