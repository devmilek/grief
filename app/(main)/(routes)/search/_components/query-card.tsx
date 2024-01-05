"use client";

import { useUtilityData } from "@/components/providers/utility-data-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const QueryCard = () => {
  const { categories } = useUtilityData();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  console.log(searchParams.values());

  const createPageURL = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.append(name, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white w-80 p-6 rounded-xl">
      <h1 className="font-display text-2xl">Filtruj</h1>
      <Accordion type="multiple">
        <AccordionItem value="categories">
          <AccordionTrigger>Kategorie</AccordionTrigger>
          <AccordionContent className="space-y-4 pl-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  onCheckedChange={() => {
                    createPageURL("category", category.id);
                  }}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default QueryCard;
