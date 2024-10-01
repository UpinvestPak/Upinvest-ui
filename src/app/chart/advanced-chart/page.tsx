import AdvancedChart from "@/components/Charts/AdvancedChart";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
 
};

const AdvancedChartPage: React.FC = () => {
  return (
    <DefaultLayout>
      <AdvancedChart />
    </DefaultLayout>
  );
};

export default AdvancedChartPage;
