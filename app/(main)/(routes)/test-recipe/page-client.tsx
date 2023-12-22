"use client";

import { useCreateRecipe } from "@/components/providers/create-recipe-provider";

const PageClient = ({ recipes }: { recipes: any }) => {
  const { setTitle, title } = useCreateRecipe();
  return (
    <div>
      <h1>{title}</h1>
      <button
        onClick={() => {
          console.log(recipes);
        }}
      >
        change
      </button>
    </div>
  );
};

export default PageClient;
