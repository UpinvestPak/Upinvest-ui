"use client"
import React, { useState } from "react";
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const stats = [
    {
      label: "Investment",
      value: "449.80K",
      icon: WalletIcon,
      mobileOrder: 4,
    },
    {
      label: "Profit",
      value: "185.66",
      icon: TrendingUpIcon,
      mobileOrder: 5,
    },
    {
      label: " Today Return",
      value: "-143.52",
      percentage: "-1.79%",
      icon: BarChart3Icon,
      mobileOrder: 1,
    },
    {
      label: "Dividend",
      value: "449.61K",
      icon: DollarSignIcon,
      mobileOrder: 6,
    },
    {
      label: "Total Return",
      value: "678k",
      icon: LineChartIcon,
      mobileOrder: 2,
    },
    {
      label: "Market Value",
      value: "29.00",
      icon: BarChart2Icon,
      mobileOrder: 3,
    },
    {
      label: "1 Year Return",
      value: "-185.66",
      percentage: "-0.04%",
      icon: CalendarDaysIcon,
      mobileOrder: 7,
    },
    {
      label: "YTD Return",
      value: "0.00",
      icon: CalendarRangeIcon,
      mobileOrder: 8,
    },
  ];

  return (
    
      
      <div className="rounded-2xl bg-gray-50 p-2 mt-3">
        <div
          className="-mx-2 flex snap-x snap-mandatory gap-1 overflow-x-auto px-2 
                        pb-1 scrollbar-thin 
                        scrollbar-track-transparent scrollbar-thumb-[#387ED1] md:mx-0
                        md:grid md:snap-none md:grid-cols-4
                        md:grid-rows-2 md:gap-4 md:px-0 md:pb-0"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`group relative flex 
                           w-[160px] 
                           flex-none transform snap-start flex-col justify-between overflow-hidden rounded-xl 
                           border border-gray-200 bg-white 
                           p-2 shadow-sm transition-all duration-300 
                           hover:-translate-y-1 hover:shadow-lg
                           md:w-auto md:p-5`}
                style={{ order: stat.mobileOrder }}
              >
                {/* Background decoration */}
                <div
                  className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-gray-50 
                              opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                />

                <div className="mb-2 md:mb-3 flex items-center gap-2 md:gap-3">
                  <div className="rounded-lg bg-gray-50 p-1.5 md:p-2 transition-colors duration-300 group-hover:bg-gray-100">
                    <Icon className="h-3 w-3 md:h-4 md:w-4 text-gray-700" />
                  </div>
                  <p className="text-xs md:text-sm font-medium capitalize text-gray-600">
                    {stat.label}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 md:gap-2">
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400">
                    PKR
                  </span>
                  <p className="text-sm md:text-base font-bold text-gray-900 md:text-lg">
                    {stat.value}
                  </p>
                </div>

                {stat.percentage && (
                  <div className="mt-2 md:mt-3">
                    <div
                      className={`inline-flex items-center rounded-full px-1.5 md:px-2 py-0.5 md:py-1 text-[10px] md:text-xs font-semibold
                        ${
                          stat.percentage.startsWith("-")
                            ? "bg-red-50 text-red-700"
                            : "bg-green-50 text-green-700"
                        }`}
                    >
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
                        className={`ml-1 h-2.5 w-2.5 md:h-3 md:w-3 ${
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