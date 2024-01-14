"use client";

import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";
import React, { useState } from "react";
import Dropzone, { Accept } from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ImageResizeModal from "./image-resize-modal";

interface ImageDropzoneProps {
  accept?: Accept;
}

const ImageDropzone = ({
  accept = {
    "image/png": [],
    "image/jpeg": [],
  },
}: ImageDropzoneProps) => {
  const [file, setFile] = useState<File>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const acceptedFormats = Object.keys(accept)
    .map((key) => key.replace("image/", ""))
    .join(", ");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Dropzone onDrop={onDrop} accept={accept} maxFiles={1}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <section
            className={cn(
              "border rounded-xl py-5 px-6 hover:border-gray-300 transition-colors cursor-pointer bg-white box-border text-center",
              {
                "border-emerald-600 border-2": isDragActive,
              },
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="p-2 border rounded-lg bg-white shadow-sm inline-block">
              <FileUp className="text-muted-foreground" />
            </div>
            <p className="text-md mt-3">
              <span className="font-medium text-emerald-600">
                Kliknij aby dodać
              </span>{" "}
              lub przeciągnij i upuść
            </p>
            <span className="inline-block text-sm text-muted-foreground">
              Akceptowane formaty:{" "}
              <span className="uppercase">{acceptedFormats}</span>
            </span>
          </section>
        )}
      </Dropzone>
      <ImageResizeModal
        open={isModalOpen}
        setIsOpen={setIsModalOpen}
        file={file}
      />
    </>
  );
};

export default ImageDropzone;
