import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { CheckboxItem } from "./checkbox-item";

export const FilterItem = ({
  name,
  value,
  items,
  selectedItems,
  // setSelectedItems,
  onChecked,
}: {
  name: string;
  value: string;
  items: {
    name: string;
    slug: string;
  }[];
  selectedItems: string[];
  onChecked: (slug: string) => void;
  // setSelectedItems: (value: string[] | ((prev: string[]) => string[])) => void;
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
            // setSelectedItems={setSelectedItems}
            key={item.slug}
            onChecked={onChecked}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
