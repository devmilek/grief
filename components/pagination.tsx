"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const goBack = () => {
    router.push(createPageURL(currentPage - 1));
  };

  const goNext = () => {
    router.push(createPageURL(currentPage + 1));
  };

  const allPages = generatePagination(currentPage, totalPages);
  return (
    <div className="flex">
      <Button variant="ghost" disabled={currentPage <= 1} onClick={goBack}>
        <ChevronLeft className="w-4 h-4 mr-2" />
        Cofnij
      </Button>
      <div className="flex-1 flex items-center justify-center space-x-2">
        {allPages.map((page) => {
          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
      <Button
        disabled={currentPage >= totalPages}
        variant="ghost"
        onClick={goNext}
      >
        Dalej
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return (
    <Button asChild variant={isActive ? "outline" : "ghost"} size="icon">
      <Link href={href}>{page}</Link>
    </Button>
  );
}

export default Pagination;
