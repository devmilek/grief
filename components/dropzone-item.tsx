"use client";

import { ImageIcon, Trash } from "lucide-react";
import React, { useRef } from "react";
import byteSize from "byte-size";
import Image from "next/image";
import { Button } from "./ui/button";
import { Image as PrismaImage } from "@prisma/client";

interface DropzoneItemProps {
  file: PrismaImage;
  id: String;
}

const DropzoneItem = ({ file, id }: DropzoneItemProps) => {
  const size = byteSize(file.size);
  const imageRef = useRef<HTMLImageElement>(null);

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
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DropzoneItem;
