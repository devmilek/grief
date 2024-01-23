import React, { Suspense } from "react";
import { NewestFeed, NewestFeedSkeleton } from "./_components/newest-feed";
import {
  MostPopularFeed,
  MostPopularFeedSkeleton,
} from "./_components/most-popular-feed";
import Sidebar from "@/components/navigation/sidebar/sidebar";

const Home = async () => {
  return (
    <div>
      {/* <HomeHero /> */}
      {/* LAYOUT */}
      <div className="flex flex-col lg:flex-row lg:space-x-12 container py-8">
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
