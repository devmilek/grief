"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);

  const handleNextPage = () => {
    params.set("page", String(currentPage + 1));
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    params.set("page", String(currentPage - 1));
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center mt-8">
      <Button
        variant="outline"
        size="icon"
        className="mr-2"
        disabled={currentPage == 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage == 1}
        onClick={handlePrevPage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1 text-center font-medium text-sm">
        Strona {currentPage} z {totalPages}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="mr-2"
        disabled={currentPage == totalPages}
      >
        <ChevronRight className="h-4 w-4" onClick={handleNextPage} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage == totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
