import React from "react";
import CategoriesFeed from "./categories-feed";
import { db } from "@/lib/db";
import QuotesCard from "./quotes-card";

const Sidebar = async () => {
  return (
    <aside className="w-full lg:w-[400px] space-y-6">
      <CategoriesFeed />
      <QuotesCard />
    </aside>
  );
};

export default Sidebar;
