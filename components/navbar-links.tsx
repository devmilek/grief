"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Category, Occasion, Cuisine, Diet } from "@prisma/client";

interface NavbarLinksProps {
  categories: Category[];
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
}

const NavbarLinks = ({
  categories,
  occasions,
  cuisines,
  diets,
}: NavbarLinksProps) => {
  const components = [
    {
      name: "Kategorie",
      data: categories,
    },
    {
      name: "Okazje",
      data: occasions,
    },
    {
      name: "Kuchnie świata",
      data: cuisines,
    },
    {
      name: "Dieta",
      data: diets,
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {components.map((component) => (
          <NavigationMenuItem key={component.name}>
            <NavigationMenuTrigger>{component.name}</NavigationMenuTrigger>
            <NavigationMenuContent className="p-8 rounded-2xl border">
              <h2 className="font-display text-2xl text-emerald-600 mb-5">
                {component.name}
              </h2>
              <div className="grid grid-cols-2 w-max gap-x-10 gap-y-4">
                {component.data.map((item) => (
                  <Link
                    className="text-sm hover:translate-x-2 transition-all"
                    href=""
                    key={item.id}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarLinks;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
