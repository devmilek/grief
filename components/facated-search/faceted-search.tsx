"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useUtilityData } from "../providers/utility-data-provider";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterItem } from "./filter-item";

const FacetedSearch = () => {
  const searchParams = useSearchParams();
  const { categories, occasions, cuisines, diets } = useUtilityData();
  const { replace } = useRouter();
  const pathname = usePathname();

  const getSelected = (key: string) => {
    return searchParams.get(key)?.split(",") ?? [];
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    getSelected("categories"),
  );

  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    getSelected("occasions"),
  );

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    getSelected("cuisines"),
  );

  const [selectedDiets, setSelectedDiets] = useState<string[]>(
    getSelected("diets"),
  );

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
    <div className=" w-full">
      <h1 className="font-display text-2xl mb-3">Filtruj</h1>
      <Accordion type="multiple" defaultValue={["categories"]}>
        <FilterItem
          name="Kategorie"
          value="categories"
          items={categories}
          selectedItems={selectedCategories}
          onChecked={(slug) => {
            setSelectedCategories((prev) => {
              if (prev.includes(slug)) {
                return prev.filter((item) => item !== slug);
              }
              return [...prev, slug];
            });
          }}
        />
        <FilterItem
          name="Okazje"
          value="occasions"
          items={occasions}
          selectedItems={selectedOccasions}
          onChecked={(slug) => {
            setSelectedOccasions((prev) => {
              if (prev.includes(slug)) {
                return prev.filter((item) => item !== slug);
              }
              return [...prev, slug];
            });
          }}
        />
        <FilterItem
          name="Kuchnie"
          value="cuisines"
          items={cuisines}
          selectedItems={selectedCuisines}
          onChecked={(slug) => {
            setSelectedCuisines((prev) => {
              if (prev.includes(slug)) {
                return prev.filter((item) => item !== slug);
              }
              return [...prev, slug];
            });
          }}
        />
        <FilterItem
          name="Diety"
          value="diets"
          items={diets}
          selectedItems={selectedDiets}
          onChecked={(slug) => {
            setSelectedDiets((prev) => {
              if (prev.includes(slug)) {
                return prev.filter((item) => item !== slug);
              }
              return [...prev, slug];
            });
          }}
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

export default FacetedSearch;
