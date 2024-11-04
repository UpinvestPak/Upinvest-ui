import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts/highstock';

const MovingAverageChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null); // Ref for the Highcharts chart instance

  useEffect(() => {
    const initChart = async () => {
      // Fetch the stock data with proper typing
      const data: number[][] = await fetch(
        'https://demo-live-data.highcharts.com/aapl-c.json'
      ).then((response) => response.json());

      // Ensure the chart container is available
      if (chartContainerRef.current) {
        // Initialize the chart with the correct options
        chartRef.current = Highcharts.stockChart({
          chart: {
            renderTo: chartContainerRef.current, // Correctly specify the renderTo property
            height: 400,
          },
          

          rangeSelector: {
            inputEnabled: false, // Disable the date range input fields

            buttons: [
              {
                type: 'month',
                count: 1,
                text: '1m',
              },
              {
                type: 'month',
                count: 3,
                text: '3m',
              },
              {
                type: 'month',
                count: 6,
                text: '6m',
              },
              {
                type: 'year',
                count: 1,
                text: '1y',
              },
              {
                type: 'all',
                text: 'All',
              },
            ],
            selected: 1, // Default selected button (3 months)
          },

          xAxis: {
            type: 'datetime',
            labels: {
              format: '{value:%e %b}',
            },
          },

          series: [
            {
              name: 'AAPL Stock Price',
              data: data,
              type: 'area',
              color: '#387ed1',
              fillOpacity: 0.5,
              threshold: null,
              tooltip: {
                valueDecimals: 2,
              },
            },
          ],

          credits: {
            enabled: false, // Remove Highcharts logo
          },

          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  chart: {
                    height: 300,
                  },
              
                  navigator: {
                    enabled: false,
                  },
                },
              },
            ],
          },
        });
      }
    };

    initChart(); // Call the init function

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div ref={chartContainerRef} id="container" className="w-full h-[400px]" />
    </div>
  );
};

export default MovingAverageChart;
