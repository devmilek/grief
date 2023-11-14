"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { storage } from "@/lib/firebase";
import { ref } from "firebase/storage";

interface ImageUploadCardProps {
  url?: string;
  title: string;
  progress: number;
}

const ImageUploadCard = ({ url, title, progress }: ImageUploadCardProps) => {
  const handleDelete = () => {
    console.log("delete");
  };
  return (
    <div className="border rounded-xl p-4 flex items-center space-x-4">
      {url ? (
        <Image
          src={url}
          alt="d"
          width={100}
          height={100}
          className="aspect-square w-20 rounded-lg"
        />
      ) : (
        <div className="aspect-square w-20 rounded-lg bg-neutral-100 border flex items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="truncate font-medium text-sm">{title}</h2>
        <div className="flex items-center space-x-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm">{progress}%</p>
        </div>
      </div>
      {url && (
        <Button size="icon" variant="destructive" className="flex-shrink-0">
          <Trash className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};

export default ImageUploadCard;
