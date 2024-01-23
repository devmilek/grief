"use client";

import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

interface CheckboxContainerProps {
  id: string;
  label: string;
}

const CheckboxContainer = ({ id, label }: CheckboxContainerProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        onClick={() => {
          console.log("clicked");
        }}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none text-neutral-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxContainer;
