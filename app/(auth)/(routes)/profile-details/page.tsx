"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUploadModal } from "@/hooks/use-upload-image";
import { initUser } from "@/lib/init-profile";
import { User } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const SetupUser = async () => {
  const user: User = await initUser();
  const { onOpen } = useUploadModal();
  return (
    <section className="flex items-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-display">Uzupełnij profil</h1>
        <p className="text-gray-500 text-sm mt-2">
          Pozwól innym użytkowniką cie rozpoznać uzupełniając poniższe pola.
        </p>
        <div>
          <Label>Zdjęcie profilowe</Label>
          <div className="flex justify-center space-y-2 flex-col items-center">
            <Image
              src={user.image || ""}
              width={200}
              height={200}
              className="h-28 w-28 rounded-full"
              alt="User image"
            />
            <Button
              variant="outline"
              onClick={() => {
                onOpen();
              }}
            >
              Dodaj zdjęcie
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupUser;
