import React from "react";
import { 
  WalletIcon, 
  TrendingUpIcon, 
  BarChart3Icon, 
  DollarSignIcon, 
  LineChartIcon, 
  BarChart2Icon, 
  CalendarDaysIcon, 
  CalendarRangeIcon,
} from "lucide-react";

const StatsGrid = () => {
  const stats = [
    {
      label: "Investment",
      value: "449.80K",
      icon: WalletIcon,
    }, 
    {
      label: "Market Value",
      value: "29.00",
      icon: BarChart2Icon,
    },
   
    {
      label: " Today P/L",
      value: "-143.52",
      percentage: "-1.79%",
      icon: BarChart3Icon,
    },
    {
      label: "Total P/L",
      value: "678k",
      percentage: "-0.04%",
      icon: LineChartIcon,
    },
    {
      label: "Dividend",
      value: "449.61K",
      icon: DollarSignIcon,
     
    },
    {
      label: " unrealise  Profit",
      value: "185.66",
      icon: TrendingUpIcon,
    },
   
    {
      label: "1 Year Return",
      value: "-185.66",
      percentage: "-0.04%",
      icon: CalendarDaysIcon,
    },
    {
      label: "YTD Return",
      value: "0.00",
      percentage: "-0.04%",

      icon: CalendarRangeIcon,
    },
   
  ];

  return (
<div className="rounded-2xl bg-gray-50 md:p-2 md:mt-3 mt-1">
  <div className="grid grid-rows-2 grid-flow-col auto-cols-[160px] gap-1 overflow-x-auto  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#387ED1] md:grid-rows-2 md:grid-cols-4 md:auto-cols-auto md:grid-flow-row md:gap-4 md:px-0 md:pb-0">
    {stats.map((stat, idx) => {
      const Icon = stat.icon;
      // Calculate row position for mobile view (alternating between 1 and 2)
      const desktopOrderClass = `md:order-1}`;

      return (
        <div
          key={idx}
          className={` ${desktopOrderClass}
            snap-start group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 
            bg-white pl-2 pt-2  shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-5`}
        >
          <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
          <div className="mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
            <div className="rounded-lg bg-gray-50 p-1.5 md:p-2 transition-colors duration-300 group-hover:bg-gray-100">
              <Icon className="h-3 w-3 md:h-4 md:w-4 text-gray-700" />
            </div>
            <p className="text-base  capitalize text-gray-600">{stat.label}</p>
          </div>
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400">PKR</span>
            <p className="  font-bold text-gray-900 text-lg">{stat.value}</p>
          </div>
          {stat.percentage && (
            <div className="mt- md:mt-3">
              <div className={`inline-flex items-center rounded-full px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold ${
                stat.percentage.startsWith("-") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}>
                {stat.percentage}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`ml-1 h-2.5 w-2.5 md:h-3 md:w-3 ${stat.percentage.startsWith("-") ? "rotate-180" : ""}`}
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