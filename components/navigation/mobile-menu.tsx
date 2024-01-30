import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon, UserIcon } from "lucide-react";
import MobileMenuContent from "./mobile-menu-content";
import { Session } from "next-auth/types";
import UserDropdown from "../user-dropdown";
import Link from "next/link";
import NavbarSearch from "./navbar-search";
import MobileMenuAccordion from "./mobile-menu-accordion";

const MobileMenu = ({
  className,
  session,
}: {
  className?: string;
  session: Session | null;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className={className}>
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full flex-col flex gap-0">
        <SheetHeader className="text-start mb-6">
          <SheetTitle className="font-display text-2xl">Nawigacja</SheetTitle>
        </SheetHeader>
        <NavbarSearch className="w-full" />
        {!session && (
          <div className="space-x-2 xl:flex grid grid-cols-2 mt-4">
            <Button variant="outline" asChild>
              <Link href="/sign-in">Zaloguj się</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Utwórz konto</Link>
            </Button>
          </div>
        )}
        <MobileMenuAccordion />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
