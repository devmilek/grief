"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";

const SetupPage = () => {
  const seedRecipes = async () => {
    try {
      const response = await axios.post("/api/seed/recipes");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container max-w-lg pt-10">
      <h1 className="text-3xl font-bold">Seed database</h1>
      <div className="grid space-y-2 mt-6">
        <Button variant="outline" onClick={seedRecipes}>
          Seed recipes
        </Button>
        <Button variant="outline">Seed users</Button>
      </div>
    </div>
  );
};

export default SetupPage;
