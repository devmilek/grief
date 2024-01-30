import React from "react";
import CreateRecipeForm from "./_components/create-recipe-form";

const CreateNewRecipePage = () => {
  return (
    <div className="container mt-6 lg:mt-8 max-w-4xl bg-white rounded-xl p-6 lg:p-12">
      <CreateRecipeForm />
    </div>
  );
};

export default CreateNewRecipePage;
