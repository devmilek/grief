import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UtilityDataProvider } from "@/components/providers/utility-data-provider";
import { db } from "@/lib/db";
import React, { ReactNode } from "react";

const getUtilityData = async () => {
  const [categories, occasions, cuisines, diets] = await db.$transaction([
    db.category.findMany({
      orderBy: {
        recipes: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            recipes: true,
          },
        },
      },
    }),
    db.occasion.findMany(),
    db.cuisine.findMany(),
    db.diet.findMany(),
  ]);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { categories, occasions, cuisines, diets };
};

const MainLayout = async ({ children }: { children: ReactNode }) => {
  // TODO: Create store to dont fetch data every time

  const { categories, occasions, cuisines, diets } = await getUtilityData();

  return (
    <UtilityDataProvider
      categories={categories}
      cuisines={cuisines}
      diets={diets}
      occasions={occasions}
    >
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
    </UtilityDataProvider>
  );
};

export default MainLayout;
