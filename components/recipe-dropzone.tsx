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
import { Image } from "@prisma/client";
import { useRouter } from "next/navigation";

interface RecipeDropzoneProps {
  disabled: boolean;
  recipeId: String;
  images: Image[];
  // onImagesChange: (files: any) => void;
}

export type uploadImageType = {
  url: string;
  name: string;
  size: number;
};

const RecipeDropzone = ({
  disabled,
  recipeId,
  images,
} // onImagesChange,
: RecipeDropzoneProps) => {
  const [files, setFiles] = useState<any[]>(images);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const uploadImage = async (file: File) => {
    const storageRef = ref(storage, `images/recipe-${recipeId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return { url, name: file.name, size: file.size };
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);

    for (const file of acceptedFiles) {
      // const retFile = await uploadImage(file);
      // setFiles((prev) => [...prev, retFile]);
      console.log(file);
      const fbFile = await uploadImage(file);
      const image: AxiosResponse = await axios.post(
        `/api/recipe/${recipeId}/image`,
        {
          url: fbFile.url,
          size: fbFile.size,
          name: fbFile.name,
        },
      );
      console.log(image.data);
      // onImagesChange(image.data);
      setFiles((prev) => [
        ...prev,
        {
          url: fbFile.url,
          size: fbFile.size,
          name: fbFile.name,
        },
      ]);
      console.log(files);
    }

    setIsUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".svg", ".jpeg", ".jpg", ".webp"],
    },
    maxFiles: 5,
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "py-4 px-6 border rounded-xl flex flex-col items-center hover:border-emerald-600 hover:ring-4 hover:ring-emerald-600/10 transition-all cursor-pointer",
          isDragActive && "border-emerald-600",
          disabled || isUploading ? "bg-neutral-50 pointer-events-none" : "",
        )}
      >
        <input {...getInputProps()} />
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
        <p className="text-xs text-neutral-500 mt-1">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>
      {files.map((file) => (
        <DropzoneItem key={file.id} id={recipeId} file={file} />
      ))}
    </div>
  );
};

export default RecipeDropzone;
