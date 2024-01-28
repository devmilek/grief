import { DrumstickIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { ROUTES } from "@/constants";
import Link from "next/link";

interface EmptyStateProps {
  heading?: string;
  description?: string;
  buttonLabel?: string;
}

const EmptyState = ({
  heading = "Nie znaleziono przepisów",
  description = "Spróbuj zmienić kryteria wyszukiwania lub dodaj własny przepis",
  buttonLabel = "Dodaj przepis",
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <DrumstickIcon className="text-emerald-600 h-10 w-10" />
      <h1 className="mt-4">{heading}</h1>
      <p className="text-muted-foreground text-sm">{description}</p>
      <Button asChild className="mt-6">
        <Link href={ROUTES.createRecipe}>{buttonLabel}</Link>
      </Button>
    </div>
  );
};

export default EmptyState;
