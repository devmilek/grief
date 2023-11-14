"use client";

import { Button } from "@/components/ui/button";
import { Ingredient } from "@prisma/client";
import axios from "axios";
import { Loader2, XIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface IngredientCardProps {
  ingredient: Ingredient;
}

const IngredientCard = ({ ingredient }: IngredientCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `/api/recipe/${params.recipeId}/ingredient/${ingredient.id}`,
      );
      toast.success("Składnik został usunięty");
      router.refresh();
    } catch (e) {
      toast.error("Nie udało się usunąć składnika");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div
      className="px-6 py-3 rounded-xl border text-sm flex items-center"
      key={ingredient.id}
    >
      <p className="font-medium mr-6">
        {ingredient.quantity} {ingredient.unit}
      </p>
      <p>{ingredient.name}</p>
      <Button
        onClick={onDelete}
        size="icon"
        className="ml-auto"
        variant="ghost"
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <XIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default IngredientCard;
