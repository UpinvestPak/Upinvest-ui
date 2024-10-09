import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// Generate volatile data with range between 100 and 130
const generateVolatileData = (numPoints: number): StockData[] => {
  const data: StockData[] = [];
  let basePrice = 115; // Starting price

  for (let i = 0; i < numPoints; i++) {
    const date = new Date();
    date.setDate(date.getDate() - numPoints + i);

    // Randomly vary the price up or down
    const priceChange = (Math.random() - 0.5) * 10;
    basePrice += priceChange;

    // Clamp the price between 100 and 130
    basePrice = Math.max(100, Math.min(130, basePrice));

    data.push({
      date: new Date(date),
      close: basePrice,
    });
  }

  return data;
};

// Dummy data for the chart with rapid up and down changes
const dummyData = generateVolatileData(500); // 500 data points

interface StockData {
  date: Date;
  close: number;
}

const MovingAverageChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [data, setData] = useState<StockData[]>(dummyData);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 928;
    const height = 500;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 30;
    const marginLeft = 40;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('style', 'max-width: 100%; height: auto;');

    // Clear previous chart
    svg.selectAll('*').remove();

    const x = d3.scaleUtc()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
      .domain([100, 130]) // Set the Y axis range from 100 to 130
      .range([height - marginBottom, marginTop]);

    const area = d3.area<StockData>()
      .x(d => x(d.date))
      .y0(y(100))
      .y1(d => y(d.close));

    svg.append('path')
      .datum(data)
      .attr('fill', 'steelblue')
      .attr('d', area);

    svg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    svg.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr('x2', width - marginLeft - marginRight)
        .attr('stroke-opacity', 0.1));

  }, [data]);

  // Filter function for time ranges
  const filterDataByRange = (range: string) => {
    const now = new Date();
    let startDate: Date;

    switch (range) {
      case '1m':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case '1y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case '5y':
        startDate = new Date(now.setFullYear(now.getFullYear() - 5));
        break;
      default:
        startDate = new Date(0);
    }

    const filteredData = dummyData.filter(d => d.date >= startDate);
    setData(filteredData);
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button onClick={() => filterDataByRange('1m')} className="px-4 py-2 bg-blue-500 text-white rounded">
          1 Month
        </button>
        <button onClick={() => filterDataByRange('1y')} className="px-4 py-2 bg-blue-500 text-white rounded">
          1 Year
        </button>
        <button onClick={() => filterDataByRange('5y')} className="px-4 py-2 bg-blue-500 text-white rounded">
          5 Years
        </button>
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default MovingAverageChart;
