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
import { ArrowDownAZ } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SortButton = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const sort = params.get("orderBy") || "desc";

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (value: string) => {
    params.set("orderBy", value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Sortuj
          <ArrowDownAZ className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sortuj według</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sort} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="desc">Najnowsze</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="asc">Najstarsze</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortButton;
