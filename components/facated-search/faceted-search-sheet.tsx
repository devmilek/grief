import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import FacetedSearch from "./faceted-search";
import { ScrollArea } from "../ui/scroll-area";

const FacetedSearchSeet = ({ className }: { className: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className={className}>
          <Filter className="w-4 h-4 mr-2" />
          Filtruj
        </Button>
      </SheetTrigger>
      <SheetContent>
        <ScrollArea className="h-full">
          <FacetedSearch />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default FacetedSearchSeet;
