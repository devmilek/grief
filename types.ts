import { Category, Occasion, Cuisine, Diet, Recipe } from "@prisma/client";

export type ClerkErrors =
  | "form_password_pwned"
  | "form_identifier_exists"
  | "form_password_incorrect"
  | "form_identifier_not_found"
  | "form_param_nil"
  | "form_code_incorrect";

export interface AcceptFilesType {
  [key: string]: string[];
}

export type UtilityData = {
  categories: (Category & {
    _count: {
      recipes: number;
    };
  })[];
  occasions: Occasion[];
  cuisines: Cuisine[];
  diets: Diet[];
};

export type RecipeWithCategoryAndUser = Recipe & {
  category: {
    name: string;
    slug: string;
  };
  user: {
    name: string;
    id: string;
  };
};
