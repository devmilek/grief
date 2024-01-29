import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useUtilityData } from "../providers/utility-data-provider";
import MobileMenuContent from "./mobile-menu-content";

const MobileMenu = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className={className}>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <MobileMenuContent />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
