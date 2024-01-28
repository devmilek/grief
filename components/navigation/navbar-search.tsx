"use client";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const NavbarSearch = () => {
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
  };

  return (
    <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-xs w-full hidden xl:inline-block"
        placeholder="Szukaj przepisu..."
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="flex-shrink-0"
      >
        <SearchIcon className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default NavbarSearch;
