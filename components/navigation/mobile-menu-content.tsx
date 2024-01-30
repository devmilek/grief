"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useUtilityData } from "../providers/utility-data-provider";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import NavbarSearch from "./navbar-search";
import { ROUTES } from "@/constants";

const MobileMenuContent = () => {
  const { categories, cuisines, diets, occasions } = useUtilityData();
  return (
    <div>
      <ScrollArea className="h-full">
        <Accordion type="multiple" className="mt-4">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-base">Kategorie</AccordionTrigger>
            <AccordionContent className="space-y-4 pl-4 grid">
              {categories.map((category) => (
                <ItemLink
                  key={category.slug}
                  href={`${ROUTES.categories}/${category.slug}`}
                  label={category.name}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="occasions">
            <AccordionTrigger className="text-base">Okazje</AccordionTrigger>
            <AccordionContent className="space-y-4 pl-4 grid">
              {occasions.map((item) => (
                <ItemLink
                  key={item.slug}
                  href={`${ROUTES.search}/?occasions=${item.slug}`}
                  label={item.name}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cuisines">
            <AccordionTrigger className="text-base">
              Kuchnie świata
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pl-4 grid">
              {cuisines.map((item) => (
                <ItemLink key={item.slug} href="asd" label={item.name} />
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="Diety">
            <AccordionTrigger className="text-base">Diety</AccordionTrigger>
            <AccordionContent className="space-y-4 pl-4 grid">
              {diets.map((item) => (
                <ItemLink key={item.slug} href="asd" label={item.name} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
};

const ItemLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link className="hover:translate-x-2 transition-transform" href={href}>
      {label}
    </Link>
  );
};

export default MobileMenuContent;
