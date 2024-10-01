import Inbox from "@/components/Inbox";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import TabView from "@/components/watch-list/tabView";

export const metadata: Metadata = {
  title: "Next.js Inbox | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Inbox page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const InboxPage: React.FC = () => {
  return (
    <DefaultLayout>
      <TabView/>
    </DefaultLayout>
  );
};

export default InboxPage;
