import React from "react";
import StepsFeed from "./steps-feed";
import { PreparationStep } from "@prisma/client";
import StepsForm from "./steps-form";

interface StepsFormProps {
  steps: PreparationStep[];
}

const Steps = ({ steps }: StepsFormProps) => {
  return (
    <div className="p-8">
      <StepsForm steps={steps} />
      <StepsFeed steps={steps} />
    </div>
  );
};

export default Steps;
