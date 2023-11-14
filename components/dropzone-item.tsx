"use client";

import { ImageIcon, Loader2, Trash } from "lucide-react";
import React, { useRef, useState } from "react";
import byteSize from "byte-size";
import Image from "next/image";
import { Button } from "./ui/button";
import { Image as PrismaImage } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DropzoneItemProps {
  file: PrismaImage;
  recipeId: string;
  fbRef: string;
}

const DropzoneItem = ({ file, recipeId, fbRef }: DropzoneItemProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const size = byteSize(file.size);
  const imageRef = useRef<HTMLImageElement>(null);

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/recipe/${recipeId}/image/${file.id}`);
      router.refresh();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border rounded-xl p-4 flex space-x-4 items-center">
      <Image
        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        ref={imageRef}
        src={file.url}
        width={64}
        height={64}
        alt=""
        placeholder="empty"
      />
      <div className="w-full">
        <p className="font-medium text-sm">{file.name}</p>
        <p className="text-sm text-neutral-500 mt-0.5">
          {size.value} {size.unit}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default DropzoneItem;
