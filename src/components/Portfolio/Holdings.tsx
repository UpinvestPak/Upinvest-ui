"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sunburst from "highcharts/modules/sunburst";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import PieChart from "./PieChart";
import SunburstChart from "./SunburstChart ";

sunburst(Highcharts);

const Holding = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedFirst, setSelectedFirst] = useState("Today");
  const [selectedSecond, setSelectedSecond] = useState("Standard");

  const toggleDropdownFirst = () => {
    setIsOpenFirst(!isOpenFirst);
  };

  const toggleDropdownSecond = () => {
    setIsOpenSecond(!isOpenSecond);
  };

  return (
    <div>
      <div className="flex justify-between">
        {/* First Dropdown */}
        <div className="relative flex w-44 justify-end px-4 py-4">
          <button
            onClick={toggleDropdownFirst}
            className="flex w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedFirst}
            {isOpenFirst ? (
              <FaChevronUp className="h-4 w-4" />
            ) : (
              <FaChevronDown className="h-4 w-4" />
            )}
          </button>

          {isOpenFirst && (
            <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
              <ul className="py-1 text-gray-700">
                <li
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedFirst === "Today" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedFirst("Today");
                    setIsOpenFirst(false);
                  }}
                >
                  {selectedFirst === "Today" && (
                    <FaCheck className="mr-2 h-4 w-4 text-black" />
                  )}
                  Today
                </li>
                <li
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedFirst === "Total" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedFirst("Total");
                    setIsOpenFirst(false);
                  }}
                >
                  {selectedFirst === "Total" && (
                    <FaCheck className="mr-2 h-4 w-4 text-black" />
                  )}
                  Total
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Second Dropdown */}
        <div className="relative flex w-44 justify-end px-4 py-4">
          <button
            onClick={toggleDropdownSecond}
            className="flex w-full items-center justify-between rounded-md border bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedSecond}
            {isOpenSecond ? (
              <FaChevronUp className="h-4 w-4" />
            ) : (
              <FaChevronDown className="h-4 w-4" />
            )}
          </button>

          {isOpenSecond && (
            <div className="absolute z-10 mt-2 w-full rounded-md border bg-white shadow-lg">
              <ul className="py-1 text-gray-700">
                <li
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedSecond === "Advanced" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedSecond("Advanced");
                    setIsOpenSecond(false);
                  }}
                >
                  {selectedSecond === "Advanced" && (
                    <FaCheck className="mr-2 h-4 w-4 text-black" />
                  )}
                  Advanced
                </li>
                <li
                  className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100 ${
                    selectedSecond === "Standard" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    setSelectedSecond("Standard");
                    setIsOpenSecond(false);
                  }}
                >
                  {selectedSecond === "Standard" && (
                    <FaCheck className="mr-2 h-4 w-4 text-black" />
                  )}
                  Standard
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Conditional Rendering of Charts */}
      <div className="mt-8 flex justify-center">
        {selectedSecond === "Standard" ? (
          <div className="w-full max-w-lg">
            <PieChart /> {/* Renders the pie chart component */}
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <SunburstChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default Holding;
