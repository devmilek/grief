import { PreparationStep } from "@prisma/client";
import React from "react";
import StepCard from "./step-card";

interface StepsFeedProps {
  steps: PreparationStep[];
}

const StepsFeed = ({ steps }: StepsFeedProps) => {
  if (steps.length > 0) {
    return (
      <>
        <h1 className="font-display text-3xl mb-8 mt-10">Lista kroków</h1>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </>
    );
  }
};

export default StepsFeed;
