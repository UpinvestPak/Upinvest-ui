"use client";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import sunburst from "highcharts/modules/sunburst";

sunburst(Highcharts);

const SunburstChart = () => {
  const [isClient, setIsClient] = useState(false);
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
      <div className="w-full max-w-lg">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          className="h-[450px] w-[100%]"
        />
      </div>
    </div>
  );
};

export default SunburstChart;
