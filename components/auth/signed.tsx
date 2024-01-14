import { auth } from "@/lib/auth";
import { PropsWithChildren } from "react";

/**
 * Renders the children components only if the user is signed in.
 *
 * @param children - The components to be rendered if the user is signed in.
 * @returns The rendered children components if the user is signed in, otherwise nothing.
 */
export const SignedIn = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (!session) return;
  return <>{children}</>;
};

/**
 * Renders the children only if the user is not signed in.
 * @param children - The children components to render.
 * @returns The rendered children components if the user is signed out, otherwise null.
 */
export const SignedOut = async ({ children }: PropsWithChildren) => {
  const session = await auth();
  if (session) return;
  return <>{children}</>;
};
