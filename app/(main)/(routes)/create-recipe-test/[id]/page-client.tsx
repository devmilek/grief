"use client";

import { CreateRecipeContext } from "@/components/providers/create-recipe-provider";
import React, { useContext } from "react";

const PageClient = () => {
  const { title } = useContext(CreateRecipeContext);
  return <div>{title}</div>;
};

export default PageClient;
