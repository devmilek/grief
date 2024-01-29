import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";
import { UtilityDataProvider } from "@/components/providers/utility-data-provider";
import { getUtilityData } from "@/data";
import { db } from "@/lib/db";
import React, { ReactNode } from "react";

const fetchUtilityData = async () => {
  const baseurl = process.env.BASE_URL;
  const response = await fetch(baseurl + "api/utility-data", {
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const data = await fetchUtilityData();

  return (
    <UtilityDataProvider {...data}>
      <>
        <Navbar {...data} />
        <main className="pt-16 min-h-screen">{children}</main>
        <Footer {...data} />
      </>
    </UtilityDataProvider>
  );
};

export default MainLayout;
