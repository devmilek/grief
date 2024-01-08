"use client";

import React, { useState } from "react";
import StepsFeed from "./steps-feed";
import { PreparationStep } from "@prisma/client";
import StepsForm from "./steps-form";
import { useQuery } from "react-query";
import axios from "axios";

interface StepsFormProps {
  recipeId: string;
}

const Steps = ({ recipeId }: StepsFormProps) => {
  const [steps, setSteps] = useState<PreparationStep[]>([]);

  const { isLoading, error, data, refetch } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/api/recipe/${recipeId}/steps`);
      setSteps(res.data);
      return res.data;
    },
  });

  const deleteStep = (stepId: string) => {
    setSteps(steps.filter((i) => i.id !== stepId));
  };

  const pushStep = (step: PreparationStep) => {
    setSteps([...steps, step]);
  };

  const onReorder = () => {
    console.log("reorder");
    refetch();
  };

  return (
    <div className="p-8">
      <StepsForm pushStep={pushStep} steps={steps} />
      <StepsFeed onReorder={onReorder} deleteStep={deleteStep} steps={steps} />
    </div>
  );
};

export default Steps;
