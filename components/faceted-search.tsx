"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useUtilityData } from "./providers/utility-data-provider";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const FacetedSearch = () => {
  const searchParams = useSearchParams();
  const { categories, occasions, cuisines, diets } = useUtilityData();
  const { replace } = useRouter();
  const pathname = usePathname();

  const getSelected = (key: string) => {
    return searchParams.get(key)?.split(",") ?? [];
  };

  const [selectedCategories, setSelectedCategories] = useState(
    getSelected("categories"),
  );
  const [selectedOccasions, setSelectedOccasions] = useState(
    getSelected("occasions"),
  );
  const [selectedCuisines, setSelectedCuisines] = useState(
    getSelected("cuisines"),
  );
  const [selectedDiets, setSelectedDiets] = useState(getSelected("diets"));

  function setParams() {
    const params = new URLSearchParams(searchParams);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }

    if (selectedOccasions.length > 0) {
      params.set("occasions", selectedOccasions.join(","));
    } else {
      params.delete("occasions");
    }

    if (selectedCuisines.length > 0) {
      params.set("cuisines", selectedCuisines.join(","));
    } else {
      params.delete("cuisines");
    }

    if (selectedDiets.length > 0) {
      params.set("diets", selectedDiets.join(","));
    } else {
      params.delete("diets");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="bg-white p-6 rounded-xl">
      <h1 className="font-display text-2xl mb-3">Filtruj</h1>
      <Accordion type="multiple" defaultValue={["categories"]}>
        <FilterItem
          name="Kategorie"
          value="categories"
          items={categories}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
        />
        <FilterItem
          name="Okazje"
          value="occasions"
          items={occasions}
          selectedItems={selectedOccasions}
          setSelectedItems={setSelectedOccasions}
        />
        <FilterItem
          name="Kuchnie"
          value="cuisines"
          items={cuisines}
          selectedItems={selectedCuisines}
          setSelectedItems={setSelectedCuisines}
        />
        <FilterItem
          name="Diety"
          value="diets"
          items={diets}
          selectedItems={selectedDiets}
          setSelectedItems={setSelectedDiets}
        />
      </Accordion>
      <div className="grid">
        <Button onClick={setParams} className="w-full mt-4" variant="outline">
          Zatwierdź
        </Button>
      </div>
    </div>
  );
};

const FilterItem = ({
  name,
  value,
  items,
  selectedItems,
  setSelectedItems,
}: {
  name: string;
  value: string;
  items: {
    name: string;
    slug: string;
  }[];
  selectedItems: string[];
  setSelectedItems: (value: string[] | ((prev: string[]) => string[])) => void;
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="text-base">{name}</AccordionTrigger>
      <AccordionContent className="space-y-4 pl-4">
        {items.map((item) => (
          <CheckboxItem
            name={item.name}
            slug={item.slug}
            checked={selectedItems.includes(item.slug)}
            setSelectedItems={setSelectedItems}
            key={item.slug}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

const CheckboxItem = ({
  slug,
  checked,
  setSelectedItems,
  name,
}: {
  slug: string;
  checked: boolean;
  setSelectedItems: (value: ((prev: string[]) => string[]) | string[]) => void;
  name: string;
}) => {
  return (
    <div className="flex items-center space-x-2" key={slug}>
      <Checkbox
        id={slug}
        checked={checked}
        onCheckedChange={() => {
          setSelectedItems((prev: string[]) => {
            if (prev.includes(slug)) {
              return prev.filter((item) => item !== slug);
            }
            return [...prev, slug];
          });
        }}
      />
      <label
        htmlFor={slug}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
};

export default FacetedSearch;
