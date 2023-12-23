"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRecipeModal } from "@/hooks/use-create-recipe";
import axios from "axios";
import { PlusIcon, UploadCloudIcon } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ImportRecipesCard = () => {
  const [schema, setSchema] = useState("");
  const onSend = async () => {
    try {
      const json = JSON.parse(schema);
      console.log(json);
      for (const recipe of json) {
        await axios.post("/api/recipe/import", recipe);
        toast.success("Przepis został zaimportowany");
      }
      setSchema("");
    } catch (e) {
      console.error(e);
      toast.error("Wystąpił błąd podczas importowania przepisu");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-6 rounded-xl bg-white border flex items-center col-span-4 cursor-pointer">
          <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-700 mr-3">
            <UploadCloudIcon className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-display text-lg">Importuj przepis</h2>
            <p className="text-sm text-neutral-500">
              Podziel się z innymi twoim talentem.
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importuj przepisy</DialogTitle>
        </DialogHeader>
        <Textarea
          rows={10}
          placeholder="Wklej schemat JSON"
          value={schema}
          onChange={(e) => {
            setSchema(e.target.value);
          }}
        />
        <DialogFooter>
          <Button onClick={onSend}>Dodaj</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportRecipesCard;
