import React from "react";
import CreateRecipeForm from "./_components/create-recipe-form";

const CreateNewRecipePage = () => {
  return (
    <div className="container mt-8 max-w-4xl bg-white rounded-xl p-12 mb-16">
      <CreateRecipeForm />
    </div>
  );
};

export default CreateNewRecipePage;
