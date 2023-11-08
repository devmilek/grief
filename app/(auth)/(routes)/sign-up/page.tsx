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
    </section>
  );
};

export default Page;
