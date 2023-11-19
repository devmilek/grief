import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { db } from "@/lib/db";
import React, { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  // TODO: Create store to dont fetch data every time
  const [categories, occasions, cuisines, diets] = await db.$transaction([
    db.category.findMany(),
    db.occasion.findMany(),
    db.cuisine.findMany(),
    db.diet.findMany(),
  ]);
  return (
    <>
      <Navbar
        categories={categories}
        cuisines={cuisines}
        diets={diets}
        occasions={occasions}
      />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer
        categories={categories}
        cuisines={cuisines}
        diets={diets}
        occasions={occasions}
      />
    </>
  );
};

export default MainLayout;
