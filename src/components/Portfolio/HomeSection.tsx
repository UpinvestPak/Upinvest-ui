const StatsGrid = () => {
    const stats = [
      { label: "Investment Amount", value: "449.80K" },
      { label: "Unrealized Profit", value: "185.66" },
      { label: "Today's Return (%)", value: "-143.52", percentage: "-1.79%" },
      { label: "Payouts", value: " 0.00" },
      { label: "Market Value", value: "449.61K" },
      { label: "Available Cash", value: "441.76K" },
      { label: "Realized Profit", value: " 0.00" },
      { label: "Total Return (%)", value: "-185.66", percentage: "-0.04%" },
      { label: "Deductions", value: "29.00" },
      { label: "TAX", value: "0.00" },
    ];
  
    return (
      <div className="grid grid-flow-col gap-2 overflow-x-auto py-4 md:grid-cols-5 md:grid-rows-2 scrollbar-thin scrollbar-thumb-[#387ED1] scrollbar-track-gray-200 scroll-smooth">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center rounded-lg h-full w-36 md:w-auto border-0 bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10),0px_1px_2px_0px_rgba(0,0,0,0.06)] mt-2"
          >
            <div className="flex flex-col space-y-1.5 ml-3 mt-1">
              <p className="text-gray-700 text-sm capitalize">{stat.label}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-1 pt-0">
              <span className="ml-3 text-[10px] uppercase text-neutral-700 md:text-xs">
                pkr
              </span>
              <p className="text-sm font-medium text-black">{stat.value}</p>
            </div>
            {stat.percentage && (
              <div
                className={`inline-flex items-center rounded-md px-2.5 py-0.5 transition-colors focus:outline-none text-[10px] md:text-xs font-bold h-max ${
                  stat.percentage.startsWith("-")
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
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
                  className={`lucide lucide-arrow-${
                    stat.percentage.startsWith("-") ? "down" : "up"
                  } h-3 w-3 md:h-4 md:w-4`}
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
  