import { PreparationStep } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { GripVerticalIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Draggable } from "@hello-pangea/dnd";

interface StepCardProps {
  step: PreparationStep;
  index: number;
}

const StepCard = ({ step, index }: StepCardProps) => {
  //TODO: add remove step functionality
  return (
    <Draggable key={step.id} draggableId={step.id} index={index}>
      {(provided) => (
        <article
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="p-5 bg-white rounded-xl border"
        >
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-display text-2xl">Krok {index + 1}</h1>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" {...provided.dragHandleProps}>
                <GripVerticalIcon className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
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
      )}
    </Draggable>
  );
};

export default StepCard;
