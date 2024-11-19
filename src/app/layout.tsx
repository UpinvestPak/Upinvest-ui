'use client'
import "flatpickr/dist/flatpickr.min.css";
import "nouislider/dist/nouislider.css";
import "dropzone/dist/dropzone.css";
import "@/css/satoshi.css";
import "@/css/simple-datatables.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo/client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { usePathname } from 'next/navigation';
import { StoreProvider } from "@/lib/redux/provider";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isProtectedRoute = !pathname?.includes('/auth/');
  useAuthRedirect(isProtectedRoute);
  
  return <>{children}</>;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <ApolloProvider client={client}>
            <AuthWrapper>
              {loading ? <Loader /> : children}
            </AuthWrapper>
          </ApolloProvider>
        </StoreProvider>
      </body>
    </html>
  );
}