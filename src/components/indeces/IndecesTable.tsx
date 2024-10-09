"use client";
import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import MovingAverageChart from "./indecesChart";

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

  return (
    <div className=" md:mx-3 ">
      <div className="ml-3 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-black">Indices Overview</h1>
      </div>
      <div className="mt-6">
        <div className="hide-scrollbar flex space-x-2 overflow-x-auto border-b-2  font-medium md:space-x-2 ">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border-2 px-2 py-1 text-sm font-medium  md:px-6 md:py-2  ${
                activeTab === tab
                  ? "border-2 border-b-2  border-primary bg-primary  text-white "
                  : "font-normal text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        {/* Scrollable Tab List */}
        <div
          className="hide-scrollbar flex space-x-2 overflow-x-auto   border-b-4 border-[#d8d8d8] font-medium md:space-x-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-sm transition-colors duration-300 md:px-6 md:py-3 ${
                activeTab === tab
                  ? "border-b-1 border-primary text-primary" // Selected tab: primary color underline and text
                  : " border-[#d8d8d8] text-black hover:border-gray-300" // Default tab: transparent underline with hover effect
              }`}
            >
              {tab}
              {/* Highlight active tab */}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 flex space-x-6">
      {/* Box taking 40% */}
      <div className="w-2/5 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center">
          <p className="text-4xl font-bold text-gray-800">86,383.38</p>
          <p className="text-green-500 font-semibold text-2xl mt-1">
            +719.41 (0.84%)
          </p>
          <p className="text-gray-500 mt-2">As of Oct 9, 2024 11:44 AM</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-gray-600">HIGH</p>
            <p className="font-bold text-lg">86,383.38</p>
          </div>
          <div>
            <p className="text-gray-600">LOW</p>
            <p className="font-bold text-lg">85,823.81</p>
          </div>
          <div>
            <p className="text-gray-600">VOLUME</p>
            <p className="font-bold text-lg">149,988,777</p>
          </div>
          <div>
            <p className="text-gray-600">1-YEAR CHANGE</p>
            <p className="font-bold text-green-500 text-lg">+81.01%</p>
          </div>
          <div>
            <p className="text-gray-600">YTD CHANGE</p>
            <p className="font-bold text-green-500 text-lg">+33.59%</p>
          </div>
          <div>
            <p className="text-gray-600">PREVIOUS CLOSE</p>
            <p className="font-bold text-lg">85,663.97</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-gray-600">DAY RANGE</p>
            <p className="font-bold text-lg">85,823.81 – 86,383.38</p>
          </div>
          <div>
            <p className="text-gray-600">52-WEEK RANGE</p>
            <p className="font-bold text-lg">47,217.74 – 86,383.39</p>
          </div>
        </div>

        {/* Range Slider (Day Range) */}
        <div className="relative mt-4">
          <div className="w-full h-1 bg-gray-300 rounded-full">
            <div className="absolute h-1 bg-black rounded-full" style={{ width: '100%' }}></div>
          </div>
          <div className="absolute top-0 h-3 w-3 bg-black rounded-full" style={{ left: '100%' }}></div>
        </div>
      </div>

      {/* Chart taking 60% */}
      <div className="w-3/5">
        <MovingAverageChart />
      </div>
    </div>


    </div>
  );
};

export default IndecesTable;
