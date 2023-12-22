import DisplayServerSession from "@/components/display-server-session";
import { db } from "@/lib/db";
import React from "react";
import { DateTime } from "luxon";
import HomeHero from "./_components/hero/home-hero";
import MainDishesFeed from "./_components/main-dishes-feed";
import HomeSidebar from "./_components/sidebar/home-sidebar";
import NewestFeed from "./_components/newest-feed";

const Home = async () => {
  // TODO: get most popular by likes request
  const recipeFromLast30Days = await db.recipe.findMany({
    where: {
      published: true,
      createdAt: {
        gte: DateTime.local().minus({ days: 30 }).toJSDate(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 5,
  });

  const mostPopularMainDishes = await db.recipe.findMany({
    where: {
      published: true,
      category: {
        slug: "dania-glowne",
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      profile: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 3,
  });

  return (
    <div>
      {recipeFromLast30Days.length > 0 && (
        <HomeHero recipes={recipeFromLast30Days} />
      )}
      {/* LAYOUT */}
      <div className="flex space-x-12 container py-12">
        <div className="flex-1">
          <MainDishesFeed recipes={mostPopularMainDishes} />
          <NewestFeed />
        </div>
        <HomeSidebar />
      </div>
    </div>
  );
};

export default Home;
