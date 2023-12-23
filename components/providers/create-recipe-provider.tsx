"use client";

import { createContext, useState } from "react";

interface CreateRecipeContextType {
  title: string;
  setTitle: (title: string) => void;
}

export const CreateRecipeContext = createContext<CreateRecipeContextType>({
  title: "",
  setTitle: () => {},
});

interface Props {
  children: React.ReactNode;
  initTitle?: string;
}

export const CreateRecipeProvider = ({ children, initTitle }: Props) => {
  const [title, setTitle] = useState(initTitle || "");

  return (
    <CreateRecipeContext.Provider value={{ title, setTitle }}>
      {children}
    </CreateRecipeContext.Provider>
  );
};
