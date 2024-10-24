import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AssetChart from "@/components/Portfolio/AssetChart";
import StatsGrid from "@/components/Portfolio/HomeSection";
import PayoutTable from "@/components/Portfolio/PayOutSection";
import PortfolioTable from "@/components/Portfolio/PortfolioTable";
import SunburstChart from "@/components/Portfolio/SunburstChart ";
import React from "react";

function Page() {
  return (
    <div>
      <DefaultLayout>
        <div className="bg-white ml-2">
          <StatsGrid />
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="w-full lg:w-[65%] shadow-xl mb-4 lg:mb-0">
              <AssetChart />
            </div>
            <div className="w-full lg:w-[32%] shadow-xl ">
              <SunburstChart />
            </div>
          </div>
          <PortfolioTable/>
          <PayoutTable/>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Page;
