"use client"
import { useState, useEffect } from 'react';

const StockTicker = () => {
  // Example stock data: name, percentage change
  const stocks = [
    { name: 'AAPL', percentage: 2.45 },
    { name: 'GOOGL', percentage: -1.32 },
    { name: 'AMZN', percentage: 0.85 },
    { name: 'TSLA', percentage: -3.14 },
  ];

  const [tickerPosition, setTickerPosition] = useState('100%');

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition((prev) => (parseInt(prev) <= -100 ? '100%' : `${parseInt(prev) - 1}%`));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gray-900 text-white h-10">
      <div
        className="whitespace-nowrap flex space-x-6"
        style={{ transform: `translateX(${tickerPosition})`, transition: 'transform 0.1s linear' }}
      >
        {stocks.map((stock, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-full ${
              stock.percentage >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {stock.name}: {stock.percentage}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;
