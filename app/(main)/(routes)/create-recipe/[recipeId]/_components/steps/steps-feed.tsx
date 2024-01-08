"use client";

import { PreparationStep } from "@prisma/client";
import React, { useEffect, useState } from "react";
import StepCard from "./step-card";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

interface StepsFeedProps {
  steps: PreparationStep[];
  deleteStep: (stepId: string) => void;
  onReorder: () => void;
}

const StepsFeed = ({ steps, deleteStep, onReorder }: StepsFeedProps) => {
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

    handleReorder(bulkUpdateData);
  };

  const handleReorder = async (
    updateData: { id: string; position: number }[],
  ) => {
    try {
      console.log(updateData);
      await axios.put(`/api/recipe/${params.recipeId}/steps/reorder`, {
        list: updateData,
      });
      onReorder();
      toast.success("Zmieniono kolejność kroków");
    } catch {
      toast.error("Nie udało się zmienić kolejności kroków");
    }
  };

  if (steps.length > 0) {
    return (
      <>
        <h1 className="font-display text-3xl mb-8 mt-10">Lista kroków</h1>
        <div className="space-y-4"></div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              //TODO: try to extract to separate component
              //TODO: add edit functionality
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {steps.map((step, index) => (
                  <StepCard
                    deleteStep={deleteStep}
                    key={step.id}
                    step={step}
                    index={index}
                  />
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
