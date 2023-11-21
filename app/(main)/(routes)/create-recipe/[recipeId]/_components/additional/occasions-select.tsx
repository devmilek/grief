"use client";

import { useUtilityData } from "@/components/providers/utility-data-provider";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Occasion } from "@prisma/client";
import axios from "axios";
import { XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

interface OccasionsSelectProps {
  recipeId: string;
}

const OccasionsSelect = ({ recipeId }: OccasionsSelectProps) => {
  const { occasions } = useUtilityData();
  const [selectedOccasions, setSelectedOccasions] = useState<Occasion[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`/api/recipe/${recipeId}/occasions`);
      console.log("SELECTED OCCASIONS", res.data);
      setSelectedOccasions(res.data);
    };

    fetch();
  }, [recipeId]);

  // const { isLoading } = useQuery({
  //   queryFn: async () => {
  //     const res = await axios.get(`/api/recipe/${recipeId}/occasions`);
  //     setSelectedOccasions(res.data);
  //     console.log("SELECTED OCCASIONS", res.data);
  //     return res.data;
  //   },
  // });

  const handleValueChange = async (id: string) => {
    const exists = selectedOccasions.find((item) => item.id === id);
    if (exists) {
      return toast.error("Ta okazja już została dodana");
    }

    const addPromise = axios.post(`/api/recipe/${recipeId}/occasions`, {
      id,
    });

    toast.promise(addPromise, {
      loading: "Dodawanie okazji...",
      success: (data) => {
        setSelectedOccasions([...selectedOccasions, data.data]);
        return "Okazja została dodana";
      },
      error: "Wystąpił błąd",
    });

    try {
      await addPromise;
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    const deletePromise = axios.delete(
      `/api/recipe/${recipeId}/occasions/${id}`,
    );

    toast.promise(deletePromise, {
      loading: "Usuwanie okazji...",
      success: () => {
        setSelectedOccasions(
          selectedOccasions.filter((item) => item.id !== id),
        );
        return "Okazja została usunięta";
      },
      error: "Wystąpił błąd",
    });

    try {
      await deletePromise;
    } catch (e) {
      console.log(e);
      toast.error("Wystąpił błąd");
    }
  };

  return (
    <div>
      <Select value="" onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Wybierz okazje" />
        </SelectTrigger>
        <SelectContent>
          {occasions.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedOccasions.map((data) => (
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-neutral-200"
            key={data.id}
            onClick={() => {
              handleDelete(data.id);
            }}
          >
            {data.name}
            <XIcon className="ml-2 h-2 w-2" />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default OccasionsSelect;
