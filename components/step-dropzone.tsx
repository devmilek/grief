import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropzoneItem from "./dropzone-item";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import axios, { AxiosResponse } from "axios";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import Image from "next/image";

interface StepDropzoneProps {
  disabled: boolean;
  value: string | undefined;
  setValue: (value: string) => void;
  recipeId: String;
}

export type uploadImageType = {
  url: string;
  name: string;
  size: number;
};

const StepDropzone = ({
  disabled,
  value,
  setValue,
  recipeId,
}: StepDropzoneProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    const storageRef = ref(
      storage,
      `images/recipe-${recipeId}/steps/${file.name}`,
    );
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return { url, name: file.name, size: file.size };
  };

  const onDrop = useCallback(async (acceptFiled: File[]) => {
    setIsUploading(true);

    const fbFile = await uploadImage(acceptFiled[0]);
    setValue(fbFile.url);

    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg", ".webp"],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div className="space-x-6 flex items-center">
      <div
        {...getRootProps()}
        className={cn(
          "p-6 max-w-[300px] w-full justify-center text-center aspect-square border rounded-xl flex flex-col items-center hover:border-emerald-600 hover:ring-4 hover:ring-emerald-600/10 transition-all cursor-pointer",
          isDragActive && "border-emerald-600",
          disabled || isUploading ? "bg-neutral-50 pointer-events-none" : "",
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <Image
            src={value}
            height={200}
            width={200}
            className="w-full h-full rounded-lg object-cover"
            alt="Step image"
          />
        ) : (
          <>
            <div className="rounded-xl border p-2.5">
              <UploadCloud className="w-5 h-5" />
            </div>
            {isDragActive ? (
              <p className="text-sm text-neutral-600 mt-3">Upuść tutaj ...</p>
            ) : (
              <p className="text-sm text-neutral-600 mt-3">
                <span
                  className={cn(
                    "font-semibold text-emerald-600",
                    disabled && "text-neutral-400",
                  )}
                >
                  Naciśnij aby dodać
                </span>{" "}
                lub przeciągnij i upuść
              </p>
            )}
          </>
        )}
      </div>
      <div>
        <Label>Dodaj zdjęcie</Label>
        <p className="text-sm text-neutral-500">
          Obrazy muszą być oryginalnymi, osobistymi zdjęciami w formacie SVG,
          PNG, JPG lub WEBP o minimalnym rozmiarze min. 800 x 800 pikseli.
          {value && (
            <div>
              <Button
                onClick={() => {
                  setValue("");
                }}
                className="mt-4"
                variant={"outline"}
              >
                Usuń
              </Button>
            </div>
          )}
        </p>
      </div>
    </div>
  );
};

export default StepDropzone;
