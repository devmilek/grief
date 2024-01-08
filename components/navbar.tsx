import { ChefHat, Search, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavbarLinks from "./navbar-links";
import { db } from "@/lib/db";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import { Category, Cuisine, Diet, Occasion } from "@prisma/client";
import { auth } from "@/lib/auth";

interface NavbarProps {
  categories: Category[];
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
}

const Navbar = async ({
  categories,
  occasions,
  cuisines,
  diets,
}: NavbarProps) => {
  const session = await auth();

  return (
    <header className="bg-white border-b fixed inset-x-0 z-50">
      <div className="container flex justify-between items-center h-16">
        <div className="flex space-x-4">
          <Link href="/" className="text-2xl font-display flex items-center">
            <ChefHat className="h-6 w-6 mr-2 text-emerald-600" />
            grien
          </Link>
          <NavbarLinks
            className="hidden md:flex"
            categories={categories}
            occasions={occasions}
            cuisines={cuisines}
            diets={diets}
          />
        </div>
        <div className="flex space-x-3 flex-1 justify-end">
          <Input
            className="max-w-xs w-full hidden xl:inline-block"
            placeholder="Szukaj przepisu..."
          />
          <Button size="icon" variant="ghost">
            <SearchIcon className="w-4 h-4" />
          </Button>
          {session ? (
            <UserDropdown profile={session.user} />
          ) : (
            <div className="space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Zaloguj się</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Utwórz konto</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
