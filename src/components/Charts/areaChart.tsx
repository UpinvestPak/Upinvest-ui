import React from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

interface AreaChartProps {
  chartData: number[]; // Define chartData as an array of numbers
}

const AreaChart: React.FC<AreaChartProps> = ({ chartData }) => {
  const options: ApexOptions = {  // Explicitly type the options object
    series: [{
      data: chartData, // Pass the chart data directly (array of numbers)
    }],
    chart: {
      type: 'area',
      height: 100,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false, // Disable the toolbar (menu) on the top
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth', // Smooth or straight line
    },
    fill: {
      type: 'gradient', // Gradient fill for better visuals
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
      },
    },
    title: {
      text: '', // Empty text to remove the title
    },
    xaxis: {
      labels: {
        show: false, // Hide the x-axis labels
      },
      axisBorder: {
        show: false, // Hide the x-axis border
      },
      axisTicks: {
        show: false, // Hide the x-axis ticks
      },
    },
    yaxis: {
      show: false, // Hide the y-axis completely
    },
    grid: {
      show: false, // Hide grid lines
    },
    legend: {
      show: false, // Hide legend if you don't need it
    },
  };

  return <ApexCharts options={options} series={options.series} type="area" height={90} />;
};

export default AreaChart;
