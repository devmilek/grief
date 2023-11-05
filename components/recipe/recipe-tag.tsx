import { LucideIcon } from "lucide-react";
import React from "react";

interface RecipeTagProps {
  name: string;
  icon?: LucideIcon;
}

const RecipeTag = ({ name, icon }: RecipeTagProps) => {
  if (icon) {
    const Icon = icon;
  }
  return (
    <div>
      {icon && <Icon className="w-4 h-4 mr-1" />}
      {name}
    </div>
  );
};

export default RecipeTag;
