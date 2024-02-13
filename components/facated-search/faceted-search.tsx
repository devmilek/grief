"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Accordion } from "../ui/accordion";
import { useUtilityData } from "../providers/utility-data-provider";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterItem from "./filter-item";
import { useFacetedSearch } from "@/hooks/use-facated-search";

const FacetedSearch = () => {
  const searchParams = useSearchParams();
  const { categories, occasions, cuisines, diets } = useUtilityData();
  const pathname = usePathname();

  const { selectedItems, onChecked, setParams } = useFacetedSearch(
    searchParams,
    pathname,
  );

  return (
    <div className=" w-full">
      <h1 className="font-display text-2xl mb-3">Filtruj</h1>
      <Accordion type="multiple" defaultValue={["categories"]}>
        <FilterItem
          name="Kategorie"
          value="categories"
          items={categories}
          selectedItems={selectedItems["categories"]}
          onChecked={(slug) => onChecked("categories", slug)}
        />
        <FilterItem
          name="Okazje"
          value="occasions"
          items={occasions}
          selectedItems={selectedItems["occasions"]}
          onChecked={(slug) => onChecked("occasions", slug)}
        />
        <FilterItem
          name="Kuchnie"
          value="cuisines"
          items={cuisines}
          selectedItems={selectedItems["cuisines"]}
          onChecked={(slug) => onChecked("cuisines", slug)}
        />
        <FilterItem
          name="Diety"
          value="diets"
          items={diets}
          selectedItems={selectedItems["diets"]}
          onChecked={(slug) => onChecked("diets", slug)}
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
