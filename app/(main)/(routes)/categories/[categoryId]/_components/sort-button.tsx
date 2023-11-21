"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SortButton = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const sort = params.get("sortOrder") || "asc";

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    params.set("sortOrder", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sortuj
          <Filter className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="asc">Najnowsze</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">Najstarsze</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
