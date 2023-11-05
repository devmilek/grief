import { PreparationStep } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface StepsFeedProps {
  steps: PreparationStep[];
}

const StepsFeed = ({ steps }: StepsFeedProps) => {
  return (
    <div className="bg-white p-8 rounded-xl w-full">
      {steps.map((step) => (
        <div
          key={step.id}
          className="flex items-center space-x-6 py-10 border-b"
        >
          <div className="w-full">
            <h2 className="font-display text-2xl">Krok {step.order}</h2>
            <p className="mt-2">{step.description}</p>
          </div>
          <Image
            className="aspect-[4/3] w-52 object-cover flex-shrink-0 rounded-xl"
            src={step.image}
            alt=""
            height={300}
            width={300}
          />
        </div>
      ))}
    </div>
  );
};

export default StepsFeed;
