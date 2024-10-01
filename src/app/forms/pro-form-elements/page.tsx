import React from "react";
import ProFormElements from "@/components/ProFormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
 
};

const ProFormElementsPage = () => {
  return (
    <DefaultLayout>
      <ProFormElements />
    </DefaultLayout>
  );
};

export default ProFormElementsPage;
