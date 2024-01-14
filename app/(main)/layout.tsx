import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UtilityDataProvider } from "@/components/providers/utility-data-provider";
import { getUtilityData } from "@/data";
import { db } from "@/lib/db";
import React, { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const data = await getUtilityData();

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
