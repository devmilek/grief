import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import QueryCard from "./_components/query-card";

const SearchPage = () => {
  return (
    <section className="container flex space-x-6 mt-6">
      <QueryCard />
      <div className="w-full"></div>
    </section>
  );
};

export default SearchPage;
