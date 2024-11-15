'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hook/useAuthRedirect";

export default function Home() {
  const router = useRouter();


  useAuthRedirect(true);

  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
