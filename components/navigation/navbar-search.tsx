"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const NavbarSearch = ({
  className,
  onSearch,
}: {
  className?: string;
  onSearch?: () => void;
}) => {
  const [search, setSearch] = React.useState("");
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      const params = new URLSearchParams(searchParams);
      params.set("q", search);
      replace(`/search?${params.toString()}`);
      setSearch("");
    }
    if (onSearch) onSearch();
  };

  return (
    <form className={cn("relative", className)} onSubmit={handleSubmit}>
      <SearchIcon className="absolute left-2.5 h-4 w-4 text-muted-foreground top-1/2 transform -translate-y-1/2" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-8"
        placeholder="Szukaj przepisu..."
      />
    </form>
  );
};

export default NavbarSearch;
