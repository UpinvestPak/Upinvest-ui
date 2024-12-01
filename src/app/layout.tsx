"use client";
import "flatpickr/dist/flatpickr.min.css";
import "nouislider/dist/nouislider.css";
import "dropzone/dist/dropzone.css";
import "@/css/satoshi.css";
import "@/css/simple-datatables.css";
import "@/css/style.css";
import Loader from "@/components/common/Loader";
import { ApolloProvider } from "@apollo/client";
import { StoreProvider } from "@/lib/redux/provider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/lib/redux/store";
import client from "@/lib/apollo/client";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <StoreProvider>
          <PersistGate loading={<Loader />} persistor={persistor}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
          </PersistGate>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
