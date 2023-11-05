"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";

interface CreateRecipeTabsProps {
  children: React.ReactNode[];
}

const CreateRecipeTabs = ({ children }: CreateRecipeTabsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const step = searchParams.get("step");
  const [activeStep, setActiveStep] = React.useState(step || "basics");

  const handleTabChange = (value: string) => {
    setActiveStep(value);
    router.push(pathname + "?" + queryString.stringify({ step: value }));
  };

  return (
    <Tabs
      className="container pb-8 pt-6"
      defaultValue="basics"
      value={activeStep}
      onValueChange={handleTabChange}
    >
      <div className="flex items-center w-full justify-center">
        <TabsList className="space-x-3">
          <TabsTrigger value="basics">Podstawy</TabsTrigger>
          <TabsTrigger value="ingredients">Składniki</TabsTrigger>
          <TabsTrigger value="steps">Kroki przygotowania</TabsTrigger>
          <TabsTrigger value="additional">Dodatkowe informacje</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="basics" className="max-w-4xl mx-auto mt-10">
        {children[0]}
      </TabsContent>
      <TabsContent value="ingredients" className="max-w-4xl mx-auto mt-10">
        {children[1]}
      </TabsContent>
      <TabsContent value="steps" className="max-w-4xl mx-auto mt-10">
        {children[2]}
      </TabsContent>
      <TabsContent value="additional" className="max-w-4xl mx-auto mt-10">
        {children[3]}
      </TabsContent>
    </Tabs>
  );
};

export default CreateRecipeTabs;
