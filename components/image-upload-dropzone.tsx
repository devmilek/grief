"use client";

import { storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { AcceptFilesType } from "@/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import ImageUploadCard from "./image-upload-card";

interface ImageUploadDropzoneProps {
  values: string[];
  setValues: (values: string[]) => void;
  acceptFiles: AcceptFilesType;
  maxFiles: number;
  maxSize: number;
}

const ImageUploadDropzone = ({
  values,
  setValues,
  acceptFiles,
  maxFiles,
  maxSize,
}: ImageUploadDropzoneProps) => {
  const [files, setFiles] = useState<
    { name: string; progress: number; url?: string }[]
  >([]);

  const onDrop = useCallback((droppedFiles: File[]) => {
    console.log(droppedFiles);
    droppedFiles.forEach((file) => {
      setFiles((prevFiles) => [...prevFiles, { name: file.name, progress: 0 }]);

      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      });

      uploadTask.then(() => {
        getDownloadURL(storageRef).then((url) => {
          const newValues = [...values, url];
          // setValues(newValues);
          // setFiles((prevFiles) =>
          //   prevFiles.filter((f) => f.name !== file.name),
          // );
        });
      });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFiles,
    maxFiles,
    maxSize,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "py-4 px-6 border rounded-xl flex flex-col items-center hover:border-emerald-600 hover:ring-4 hover:ring-emerald-600/10 transition-all cursor-pointer",
          isDragActive && "border-emerald-600",
          //   disabled || isUploading ? "bg-neutral-50 pointer-events-none" : "",
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
                // disabled && "text-neutral-400",
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
      <div className="mt-6 space-y-2">
        {files.map((file, index) => (
          <ImageUploadCard
            key={index}
            title={file.name}
            url={file.url}
            progress={file.progress}
          />
        ))}
        {values.map((file, index) => (
          <ImageUploadCard key={index} title={file} url={file} progress={100} />
        ))}
      </div>
      <div className="bg-pink-50">{JSON.stringify(files)}</div>
    </div>
  );
};

export default ImageUploadDropzone;
