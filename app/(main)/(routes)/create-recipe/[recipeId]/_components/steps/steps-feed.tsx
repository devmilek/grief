"use client";

import { PreparationStep } from "@prisma/client";
import React, { useEffect, useState } from "react";
import StepCard from "./step-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GripVerticalIcon, XIcon } from "lucide-react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import axios from "axios";
import router from "next/router";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

interface StepsFeedProps {
  steps: PreparationStep[];
}

const StepsFeed = ({ steps }: StepsFeedProps) => {
  const router = useRouter();
  const params = useParams();
  const [localSteps, setLocalSteps] = useState(steps);

  useEffect(() => {
    setLocalSteps(steps);
  }, [steps]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(localSteps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedSteps = items.slice(startIndex, endIndex + 1);

    setLocalSteps(items);

    const bulkUpdateData = updatedSteps.map((step) => ({
      id: step.id,
      position: items.findIndex((item) => item.id === step.id),
    }));

    onReorder(bulkUpdateData);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      await axios.put(`/api/recipe/${params.recipeId}/steps/reorder`, {
        list: updateData,
      });
      toast.success("Zmieniono kolejność kroków");
      router.refresh();
    } catch {
      toast.error("Nie udało się zmienić kolejności kroków");
    }
  };

  if (steps.length > 0) {
    return (
      <>
        <h1 className="font-display text-3xl mb-8 mt-10">Lista kroków</h1>
        <div className="space-y-4">
          {/* {steps.map((step, index) => (
            <article key={step.id} className="p-5 bg-white rounded-xl border">
              <div className="flex items-center justify-between mb-3">
                <h1 className="font-display text-2xl">Krok {index + 1}</h1>
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost">
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
          ))} */}
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided) => (
                      <article
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-5 bg-white rounded-xl border"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h1 className="font-display text-2xl">
                            Krok {index + 1}
                          </h1>
                          <div className="flex space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              {...provided.dragHandleProps}
                            >
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
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
};

export default StepsFeed;
