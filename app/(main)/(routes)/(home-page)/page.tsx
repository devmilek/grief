import DisplayServerSession from "@/components/display-server-session";
import { db } from "@/lib/db";
import React, { Suspense } from "react";
import { DateTime } from "luxon";
import HomeHero from "./_components/hero/home-hero";
import HomeSidebar from "./_components/sidebar/home-sidebar";
import { NewestFeed, NewestFeedSkeleton } from "./_components/newest-feed";
import {
  MostPopularFeed,
  MostPopularFeedSkeleton,
} from "./_components/most-popular-feed";

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
        <HomeSidebar />
      </div>
    </div>
  );
};

export default Home;
