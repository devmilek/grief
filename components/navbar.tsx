import { ChefHat } from "lucide-react";
import Link from "next/link";
import React from "react";
import NavbarLinks from "./navbar-links";
import { db } from "@/lib/db";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession();

  const [categories, occasions, cuisines, diets] = await db.$transaction([
    db.category.findMany(),
    db.occasion.findMany(),
    db.cuisine.findMany(),
    db.diet.findMany(),
  ]);

  return (
    <header className="bg-white border-b">
      <div className="container flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-2xl font-display flex items-center">
            <ChefHat className="h-6 w-6 mr-2 text-emerald-600" />
            grien
          </Link>
          <NavbarLinks
            categories={categories}
            occasions={occasions}
            cuisines={cuisines}
            diets={diets}
          />
        </div>
        <div className="flex space-x-5">
          <Input className="ml-auto w-72" placeholder="Szukaj przepisu..." />
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
