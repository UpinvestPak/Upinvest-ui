import React, { useEffect } from 'react';
import Highcharts from 'highcharts';

interface DataPoint {
  name: string;
  y: number;
  sliced?: boolean;
  selected?: boolean;
}

interface ChartProps {
  className?: string;
}

const EggYolkChart: React.FC<ChartProps> = ({ className }) => {
  useEffect(() => {
    // @ts-ignore
    Highcharts.chart('chart-container', {
      chart: {
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        valueSuffix: '%'
      },
      credits: {
        enabled: false, // Remove Highcharts logo
      },
  
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      series: [{
        name: 'Percentage',
        colorByPoint: true,
        data: [
          { name: 'meezan', y: 25.02 },
          { name: 'HBL', sliced: true, selected: true, y: 26.71 },
          { name: 'MARI', y: 10.09 },
          { name: 'UBL', y: 15.5 },
          { name: 'BEE', y: 12.68 }
        ] as DataPoint[]
      }]
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className={`w-full ${className}`}>
      <div 
        id="chart-container" 
        className="min-w-[380px] max-w-[800px] mx-auto my-4 -mt-8"
      />
      <style jsx>{`
        .highcharts-data-table table {
          @apply font-sans border border-collapse min-w-[320px] max-w-[500px] w-full mx-auto my-2.5 text-center;
        }
        .highcharts-data-table caption {
          @apply py-4 text-lg text-gray-600;
        }
        .highcharts-data-table th {
          @apply font-semibold p-2;
        }
        .highcharts-data-table td,
        .highcharts-data-table th,
        .highcharts-data-table caption {
          @apply p-2;
        }
        .highcharts-data-table thead tr,
        .highcharts-data-table tr:nth-child(even) {
          @apply bg-gray-50;
        }
        .highcharts-data-table tr:hover {
          @apply bg-blue-50;
        }
      `}</style>
    </div>
  );
};

export default EggYolkChart;