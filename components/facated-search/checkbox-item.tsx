import React from "react";
import { Checkbox } from "../ui/checkbox";

export const CheckboxItem = ({
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
