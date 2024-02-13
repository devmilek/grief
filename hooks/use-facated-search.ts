import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useFacetedSearch = (
  searchParams: URLSearchParams,
  pathname: string,
) => {
  const { replace } = useRouter();
  const keys = useMemo(
    () => ["categories", "occasions", "cuisines", "diets"],
    [],
  );
  const initialSelectedItems: Record<string, string[]> = keys.reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {},
  );
  const [selectedItems, setSelectedItems] =
    useState<Record<string, string[]>>(initialSelectedItems);

  const setSelectedItemsCallback = useCallback(setSelectedItems, [
    setSelectedItems,
  ]);

  useEffect(() => {
    const newSelectedItems: Record<string, string[]> = keys.reduce(
      (acc, key) => {
        acc[key] = searchParams.get(key)?.split(",") ?? [];
        return acc;
      },
      {} as Record<string, string[]>,
    );
    setSelectedItemsCallback(newSelectedItems);
  }, [keys, searchParams, setSelectedItemsCallback]);

  const onChecked = useCallback(
    (key: string, slug: string) => {
      setSelectedItemsCallback((prevSelectedItems) => {
        const currentItems = prevSelectedItems[key];
        const newItems = currentItems.includes(slug)
          ? currentItems.filter((item) => item !== slug)
          : [...currentItems, slug];
        return { ...prevSelectedItems, [key]: newItems };
      });
    },
    [setSelectedItemsCallback],
  );
  const setParams = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    keys.forEach((key) => {
      if (selectedItems[key].length > 0) {
        params.set(key, selectedItems[key].join(","));
      } else {
        params.delete(key);
      }
    });
    replace(`${pathname}?${params.toString()}`);
  }, [selectedItems, replace, pathname, searchParams, keys]);

  return { selectedItems, onChecked, setParams };
};
