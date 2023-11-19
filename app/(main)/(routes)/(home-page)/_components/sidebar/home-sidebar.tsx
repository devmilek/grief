import React from "react";
import CategoriesFeed from "./categories-feed";
import { db } from "@/lib/db";

const HomeSidebar = async () => {
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
    <aside className="hidden lg:block w-[400px]">
      <CategoriesFeed categories={categories} />
    </aside>
  );
};

export default HomeSidebar;
