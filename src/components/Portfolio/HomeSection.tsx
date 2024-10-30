const StatsGrid = () => {
  const stats = [
    { label: "Investment Amount", value: "449.80K" },
    { label: "Realized Profit", value: "185.66" },
    { label: "Today's Return (%)", value: "-143.52", percentage: "-1.79%" },
    { label: "Reported dividend", value: "449.61K" },
    { label: "Total return", value: " 678k" },
    { label: "Market value", value: "29.00" },
    { label: "1 year Return (%)", value: "-185.66", percentage: "-0.04%" },

    { label: "YTD return", value: "0.00" },
  ];

  return (
    <div className="grid grid-flow-col md:gap-3  gap-2 overflow-x-auto py-6 md:grid-cols-4 md:grid-rows-2 scrollbar-thin scrollbar-thumb-[#387ED1] scrollbar-track-gray-200 scroll-smooth md:px-">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-center pt-2 pb-1 md:px-4  pl-2 pr-7 md:pr-2  md:pl-3 rounded-xl shadow-md bg-white border-2 border-gray-100 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:border-gray-200"
        >
          <div className="flex flex-col space-y-2">
            <p className="text-gray-600 text-sm font-semibold capitalize whitespace-nowrap">{stat.label}</p>
          </div>
          <div className="flex items-center gap-x-1 pt-1">
            <span className="text-[11px] uppercase text-neutral-500 md:text-xs">PKR</span>
            <p className="md:text-lg md:font-bold text-base font-medium text-black">{stat.value}</p>
          </div>
          {stat.percentage && (
            <div
              className={` inline-flex items-center justify-center rounded-lg px-2 py-0.5 transition-colors focus:outline-none text-xs md:text-sm font-bold h-max ${
                                              
                stat.percentage.startsWith("-")
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`ml-1 h-4 w-4 md:h-5 md:w-5 ${
                  stat.percentage.startsWith("-") ? "lucide-arrow-down" : "lucide-arrow-up"
                }`}
              >
                {stat.percentage.startsWith("-") ? (
                  <>
                    <path d="M12 5v14"></path>
                    <path d="m19 12-7 7-7-7"></path>
                  </>
                ) : (
                  <>
                    <path d="M12 19V5"></path>
                    <path d="m5 12 7-7 7 7"></path>
                  </>
                )}
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
