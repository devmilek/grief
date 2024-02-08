import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

const SectionWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("p-5 sm:p-6 lg:p-8 bg-white rounded-xl", className)}>
      {children}
    </div>
  );
};

export default SectionWrapper;
