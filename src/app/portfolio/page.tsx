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
          <div className="flex flex-col gap-4 lg:flex-row mt-7">
            <div className=" w-full md:shadow-md lg:mb-0 lg:w-[65%] border-2  ">
              <AssetChart />
            </div>
            <div className="w-full md:shadow-lg border-2 lg:w-[32.5%] ">
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
