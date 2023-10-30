"use client";

import React from "react";
import { cn } from "@/lib/utils";
import CreateAccount from "./_components/create-account";

const Page = () => {
  const steps = [1, 2, 3];
  const currentStep = 1;
  return (
    <section className="flex items-center justify-center relative">
      <div className="max-w-md px-4">
        <CreateAccount />
      </div>
      {/* <div className="flex items-center space-x-2 absolute bottom-4">
        {steps.map((step) => (
          <div
            key={step}
            className={cn(
              "h-1 rounded-full",
              currentStep === step
                ? "w-14 bg-emerald-600"
                : "w-10 bg-neutral-200",
            )}
          ></div>
        ))}
      </div> */}
    </section>
  );
};

export default Page;
