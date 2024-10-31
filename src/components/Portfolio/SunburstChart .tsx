"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sunburst from "highcharts/modules/sunburst";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import PieChart from "./PieChart";


sunburst(Highcharts);

const SunburstChart = () => {
  const [isClient, setIsClient] = useState(false);
  const [isOpenFirst, setIsOpenFirst] = useState(false);
  const [isOpenSecond, setIsOpenSecond] = useState(false);
  const [selectedFirst, setSelectedFirst] = useState("Today");
  const [selectedSecond, setSelectedSecond] = useState("Advanced");

  const toggleDropdownFirst = () => {
    setIsOpenFirst(!isOpenFirst);
  };

  const toggleDropdownSecond = () => {
    setIsOpenSecond(!isOpenSecond);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { id: "0.0", parent: "", color: "transparent", name: "" },

    // Continents (Level 1)
    { id: "1.1", parent: "0.0", name: "Asia", value: 460000000 },
    { id: "1.2", parent: "0.0", name: "Africa", value: 130000000 },
    { id: "1.3", parent: "0.0", name: "Europe", value: 74700000 },
    { id: "1.4", parent: "0.0", name: "Americas", value: 1000000000 },
    { id: "1.5", parent: "0.0", name: "Oceania", value: 43000000 },

    // Countries in Asia (Level 2)
    { id: "2.1", parent: "1.1", name: "China", value: 1400000000 },
    { id: "2.2", parent: "1.1", name: "India", value: 1360000000 },
    { id: "2.3", parent: "1.1", name: "Japan", value: 126000000 },
    { id: "2.1", parent: "1.1", name: "China", value: 1400000000 },
    { id: "2.2", parent: "1.1", name: "India", value: 1360000000 },
    { id: "2.3", parent: "1.1", name: "Japan", value: 126000000 },
    { id: "2.7", parent: "1.4", name: "Germany", value: 83000000 },
    { id: "2.8", parent: "1.4", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.4", name: "UK", value: 66000000 },
    { id: "2.1", parent: "1.4", name: "China", value: 1400000000 },
    { id: "2.2", parent: "1.4", name: "India", value: 1360000000 },
    { id: "2.3", parent: "1.4", name: "Japan", value: 126000000 },

    { id: "2.7", parent: "1.5", name: "Germany", value: 83000000 },
    { id: "2.8", parent: "1.5", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.5", name: "UK", value: 66000000 },
    { id: "2.1", parent: "1.5", name: "China", value: 1400000000 },
    { id: "2.2", parent: "1.5", name: "India", value: 1360000000 },
    { id: "2.3", parent: "1.5", name: "Japan", value: 126000000 },

    // Countries in Africa (Level 2)
    { id: "2.4", parent: "1.2", name: "Nigeria", value: 206000000 },
    { id: "2.5", parent: "1.2", name: "Ethiopia", value: 112000000 },
    { id: "2.6", parent: "1.2", name: "Egypt", value: 100000000 },

    { id: "2.7", parent: "1.3", name: "Germany", value: 83000000 },
    { id: "2.8", parent: "1.3", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.3", name: "UK", value: 66000000 },
    { id: "2.8", parent: "1.3", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.3", name: "UK", value: 66000000 },
    { id: "2.8", parent: "1.3", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.3", name: "UK", value: 66000000 },

    { id: "2.8", parent: "1.3", name: "France", value: 67000000 },
    { id: "2.9", parent: "1.3", name: "UK", value: 66000000 },
  ];

  const options = {
    chart: {
      height: "100%",
    },
    title: {
      text: "Holdings",
    },
    subtitle: {},
    credits: {
      enabled: false, // Remove Highcharts logo
    },

    series: [
      {
        type: "sunburst",
        data: data,
        allowTraversingTree: true,
        cursor: "pointer",
        dataLabels: {
          format: "{point.name}",
          filter: {
            property: "innerArcLength",
            operator: ">",
            value: 16,
          },
        },
        levels: [
          {
            level: 1,
            levelIsConstant: false,
            dataLabels: {
              filter: {
                property: "outerArcLength",
                operator: ">",
                value: 64,
              },
            },
          },
          {
            level: 2,
            colorByPoint: true,
          },
          {
            level: 3,
            colorVariation: {
              key: "brightness",
              to: -0.5,
            },
          },
        ],
      },
    ],
    tooltip: {
      headerFormat: "",
      pointFormat: "Holdings",
    },
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
    <div className="flex justify-between">
      {/* First Dropdown */}
      <div className="relative w-44 flex justify-end py-4 px-4">
        <button
          onClick={toggleDropdownFirst}
          className="flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedFirst}
          {isOpenFirst ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
        </button>

        {isOpenFirst && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
            <ul className="py-1 text-gray-700">
              <li
                className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
                  selectedFirst === 'Today' ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSelectedFirst('Today');
                  setIsOpenFirst(false);
                }}
              >
                {selectedFirst === 'Today' && <FaCheck className="w-4 h-4 mr-2 text-black" />}
                Today
              </li>
              <li
                className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
                  selectedFirst === 'Total' ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSelectedFirst('Total');
                  setIsOpenFirst(false);
                }}
              >
                {selectedFirst === 'Total' && <FaCheck className="w-4 h-4 mr-2 text-black" />}
                Total
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Second Dropdown */}
      <div className="relative w-44 flex justify-end py-4 px-4">
        <button
          onClick={toggleDropdownSecond}
          className="flex items-center justify-between w-full px-4 py-2 text-gray-700 bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedSecond}
          {isOpenSecond ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
        </button>

        {isOpenSecond && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
            <ul className="py-1 text-gray-700">
              <li
                className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
                  selectedSecond === 'Advanced' ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSelectedSecond('Advanced');
                  setIsOpenSecond(false);
                }}
              >
                {selectedSecond === 'Advanced' && <FaCheck className="w-4 h-4 mr-2 text-black" />}
                Advanced
              </li>
              <li
                className={`px-4 py-2 flex items-center hover:bg-gray-100 cursor-pointer ${
                  selectedSecond === 'Standard' ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSelectedSecond('Standard');
                  setIsOpenSecond(false);
                }}
              >
                {selectedSecond === 'Standard' && <FaCheck className="w-4 h-4 mr-2 text-black" />}
                Standard
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

    {/* Conditional Rendering of Charts */}
    <div className="mt-8 flex justify-center">
      {selectedSecond === 'Standard' ? (
        <div className="w-full max-w-lg">
          <PieChart /> {/* Renders the pie chart component */}
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            className="h-[450px] w-[100%]"
          />
        </div>
      )}
    </div>
  </div>
  );
};

export default SunburstChart;
