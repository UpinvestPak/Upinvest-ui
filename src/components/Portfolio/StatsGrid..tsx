import React from 'react';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  DollarSign,
  LineChart,
  BarChart2,
  CalendarDays,
  CalendarRange
} from 'lucide-react';

const StatsGrid = () => {
  const stats = [
    { 
      label: "Investment Amount", 
      value: "449.80K", 
      icon: Wallet,
      mobileOrder: 4 
    },
    { 
      label: "Realized Profit", 
      value: "185.66", 
      icon: TrendingUp,
      mobileOrder: 5 
    },
    { 
      label: "Today's Return (%)", 
      value: "-143.52", 
      percentage: "-1.79%", 
      icon: BarChart3,
      mobileOrder: 1 
    },
    { 
      label: "Reported dividend", 
      value: "449.61K", 
      icon: DollarSign,
      mobileOrder: 6 
    },
    { 
      label: "Total return", 
      value: "678k", 
      icon: LineChart,
      mobileOrder: 2 
    },
    { 
      label: "Market value", 
      value: "29.00", 
      icon: BarChart2,
      mobileOrder: 3 
    },
    { 
      label: "1 year Return (%)", 
      value: "-185.66", 
      percentage: "-0.04%", 
      icon: CalendarDays,
      mobileOrder: 7 
    },
    { 
      label: "YTD return", 
      value: "0.00", 
      icon: CalendarRange,
      mobileOrder: 8 
    }
  ];

  return (
    <div className="bg-gray-50 rounded-2xl p-2">
      {/* Scroll container with horizontal scroll on mobile */}
      <div className="flex md:grid gap-1 md:gap-4 overflow-x-auto pb-1 md:pb-0 
                      md:grid-cols-4 md:grid-rows-2 
                      snap-x snap-mandatory md:snap-none
                      scrollbar-thin  scrollbar-track-transparent
                      -mx-4 px-4 md:mx-0 md:px-0 scrollbar-thumb-[#387ED1]">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`flex-none w-[180px] md:w-auto 
                         snap-start
                         group flex flex-col justify-between p-5 rounded-xl 
                         bg-white border border-gray-200 
                         shadow-sm hover:shadow-lg transition-all duration-300 
                         transform hover:-translate-y-1
                         relative overflow-hidden md:order-none`}
              style={{ order: stat.mobileOrder }}
            >
              {/* Background decoration */}
              <div className="absolute -right-8 -top-8 w-16 h-16 bg-gray-50 rounded-full 
                            opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gray-700"  />
                </div>
                <p className="text-gray-600 text-sm font-medium capitalize">{stat.label}</p>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-xs uppercase text-gray-400 font-medium tracking-wider">PKR</span>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              </div>
              
              {stat.percentage && (
                <div className="mt-4">
                  <div
                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold
                      ${stat.percentage.startsWith("-")
                        ? "bg-red-50 text-red-700"
                        : "bg-green-50 text-green-700"
                      }`}
                  >
                    {stat.percentage}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-1 h-3 w-3 ${
                        stat.percentage.startsWith("-") ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M12 19V5" />
                      <path d="m5 12 7-7 7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsGrid;