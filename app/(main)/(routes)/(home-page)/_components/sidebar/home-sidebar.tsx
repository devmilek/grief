import React from "react";
import CategoriesFeed from "./categories-feed";
import { db } from "@/lib/db";
import QuotesCard from "./quotes-card";

const HomeSidebar = async () => {
  //TODO: get categories with recipe count from context
  const categories = await db.category.findMany({
    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
    orderBy: {
      recipes: {
        _count: "desc",
      },
    },
  });

  return (
    <aside className="w-full lg:w-[400px] space-y-6 lg:space-y-10">
      <CategoriesFeed />
      <QuotesCard />
    </aside>
  );
};

export default HomeSidebar;
