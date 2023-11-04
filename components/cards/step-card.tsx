import { PreparationStep } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface StepCardProps {
  step: PreparationStep;
}

const StepCard = ({ step }: StepCardProps) => {
  return (
    <article className="p-5 bg-white rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-display text-2xl">Krok {step.order}</h1>
        <Button size="icon" variant="ghost">
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex space-x-4 items-center">
        <div className="aspect-[4/3] flex-shrink-0 object-cover rounded-lg overflow-hidden relative w-64">
          {step.image ? (
            <Image
              alt="Step image"
              src={step.image}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-neutral-50 rounded-lg border h-full w-full"></div>
          )}
        </div>
        <p>{step.description}</p>
      </div>
    </article>
  );
};

export default StepCard;
