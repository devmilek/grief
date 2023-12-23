import { Category, Occasion, Cuisine, Diet } from "@prisma/client";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";

interface FooterProps {
  categories: Category[];
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
}

const Footer = async ({
  categories,
  occasions,
  cuisines,
  diets,
}: FooterProps) => {
  const items = [
    {
      title: "Kategorie",
      items: categories,
    },
    {
      title: "Okazje",
      items: occasions,
    },
    {
      title: "Kuchnie świata",
      items: cuisines,
    },
    {
      title: "Diety",
      items: diets,
    },
  ];

  const ITEMS_PER_COLUMN = 9;

  return (
    <footer className="pt-10 container">
      <div className="rounded-xl p-10 bg-white flex xl:space-x-8 flex-col xl:flex-row">
        <div className="xl:max-w-xs mb-10 xl:mb-0">
          <Link href="/" className="flex items-center">
            <ChefHat className="h-6 w-6 mr-2 text-emerald-600" />
            <p className="font-display text-2xl">Grief</p>
          </Link>
          <p className="text-neutral-500 text-sm mt-2">
            Odkryj kulinarne sekrety, Grien to pasja, inspiracja i smak, w
            jednym miejscu
          </p>
        </div>
        <div className="gap-x-4 gap-y-8 grid grid-cols-2 md:grid-cols-4 w-full">
          {items.map((item) => (
            <div key={item.title}>
              <h2 className="font-display text-emerald-600 text-2xl">
                {item.title}
              </h2>
              <div className="space-y-2 flex flex-col mt-4">
                {item.items.slice(0, ITEMS_PER_COLUMN).map((link) => {
                  return (
                    <Fragment key={link.id}>
                      <Link href="/" className="text-sm">
                        {link.name}
                      </Link>
                    </Fragment>
                  );
                })}
                {item.items.length > ITEMS_PER_COLUMN && (
                  <p className="text-sm font-medium">
                    {item.items.length - ITEMS_PER_COLUMN} więcej
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Copyright */}
      <div className="text-sm text-neutral-500 flex items-center justify-between py-8 ">
        <p>Copyright © 2023 grien</p>
        <p>by: @devmilek</p>
      </div>
    </footer>
  );
};

export default Footer;
