import React, { Suspense } from "react";
import {
  MostPopularFeed,
  MostPopularFeedSkeleton,
} from "./_components/most-popular-feed";
import Sidebar from "@/components/navigation/sidebar/sidebar";
import { getNewestRecipes } from "@/data";
import { NewestFeed, NewestFeedSkeleton } from "./_components/newest-feed";

const Home = async () => {
  return (
    <div>
      {/* <HomeHero /> */}
      {/* LAYOUT */}
      <div className="flex flex-col lg:flex-row lg:space-x-12 container pb-8">
        <div className="flex-1">
          <Suspense fallback={<MostPopularFeedSkeleton />}>
            <MostPopularFeed />
          </Suspense>
          <Suspense fallback={<NewestFeedSkeleton />}>
            <NewestFeed />
          </Suspense>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
