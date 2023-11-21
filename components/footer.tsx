import { Category, Occasion, Cuisine, Diet } from "@prisma/client";
import { ChefHat } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  return (
    <footer className="pt-10 container">
      <div className="rounded-xl p-10 bg-white flex space-x-8">
        <div className="max-w-xs">
          <Link href="/" className="flex items-center">
            <ChefHat className="h-6 w-6 mr-2 text-emerald-600" />
            <p className="font-display text-2xl">Grief</p>
          </Link>
          <p className="text-neutral-500 text-sm mt-2">
            Odkryj kulinarne sekrety, Grien to pasja, inspiracja i smak, w
            jednym miejscu
          </p>
        </div>
        <div className="space-x-4 justify-between grid grid-cols-5 w-full">
          <div>
            <h2 className="font-display text-emerald-600 text-2xl">
              Kategorie
            </h2>
            <div className="space-y-2 flex flex-col mt-4">
              {categories.map((category) => (
                <Link key={category.id} href="/" className="text-sm">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-emerald-600 text-2xl">Okazje</h2>
            <div className="space-y-2 flex flex-col mt-4">
              {occasions.map((occasion) => (
                <Link key={occasion.id} href="/" className="text-sm">
                  {occasion.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <h2 className="font-display text-emerald-600 text-2xl">
              Kuchnie świata
            </h2>
            <div className="gap-2 flex-col mt-4 grid grid-cols-2">
              {cuisines.map((cuisine) => (
                <Link key={cuisine.id} href="/" className="text-sm">
                  {cuisine.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-emerald-600 text-2xl">Diety</h2>
            <div className="space-y-2 flex flex-col mt-4">
              {diets.map((diet) => (
                <Link key={diet.id} href="/" className="text-sm">
                  {diet.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm text-neutral-500 flex items-center justify-between py-8 ">
        <p>Copyright © 2023 grien</p>
        <p>by: @devmilek</p>
      </div>
    </footer>
  );
};

export default Footer;
