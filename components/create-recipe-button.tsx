"use client";

import { useCreateRecipeModal } from "@/hooks/use-create-recipe";
import { Slot } from "@radix-ui/react-slot";
import React, { ComponentProps, PropsWithChildren } from "react";

const CreateRecipeButton = ({ children }: PropsWithChildren) => {
  const { onOpen } = useCreateRecipeModal();
  return <Slot onClick={onOpen}>{children}</Slot>;
};

export default CreateRecipeButton;
