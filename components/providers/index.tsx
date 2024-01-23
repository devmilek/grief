import React, { PropsWithChildren } from "react";
import QueryProvider from "./query-provider";
import { SessionProvider } from "next-auth/react";
import { UtilityDataProvider } from "./utility-data-provider";
import { Toaster } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <Toaster richColors closeButton />
      </QueryProvider>
    </SessionProvider>
  );
};
