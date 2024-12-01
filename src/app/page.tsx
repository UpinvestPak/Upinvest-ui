import AuthWrapper from "@/components/AuthWrapper";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function Home() {


  return (
    <DefaultLayout>
      <AuthWrapper>
      <ECommerce />
      </AuthWrapper>
      </DefaultLayout>
  );
}
