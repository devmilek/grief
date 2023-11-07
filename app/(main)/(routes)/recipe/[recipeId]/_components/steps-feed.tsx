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
          <div>
            <div className="aspect-[4/3] flex-shrink-0 object-cover rounded-lg overflow-hidden relative w-52">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsFeed;
