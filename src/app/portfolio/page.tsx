import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AssetChart from "@/components/Portfolio/AssetChart";
import HistoryTrade from "@/components/Portfolio/HistoryTrade";
import Holding from "@/components/Portfolio/Holdings";
import StatsGrid from "@/components/Portfolio/StatsGrid.";
import PayoutTable from "@/components/Portfolio/PayOutSection";
import PortfolioTable from "@/components/Portfolio/PortfolioTable";
import SunburstChart from "@/components/Portfolio/SunburstChart ";
import React from "react";

function Page() {
  return (
    <div>
      <DefaultLayout>
        <div className="ml-2 bg-white">
          <StatsGrid />
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="mb-4 w-full shadow-xl lg:mb-0 lg:w-[65%]">
              <AssetChart />
            </div>
            <div className="w-full shadow-xl lg:w-[32%] ">
              <Holding />
            </div>
          </div>
          <PortfolioTable />
          <PayoutTable />
          <HistoryTrade />{" "}
        </div>
      </DefaultLayout>
    </div>
  );
}

export default Page;
