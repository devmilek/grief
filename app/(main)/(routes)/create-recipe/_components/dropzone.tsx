import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/actions/upload-image";
import { toast } from "sonner";

interface DropzoneProps {
  disabled: boolean;
  value: string | undefined;
  setValue: (value: string) => void;
  accept?: Accept;
}

export type uploadImageType = {
  url: string;
  name: string;
  size: number;
};

const Dropzone = ({
  disabled,
  value,
  setValue,
  accept = {
    "image/*": [".png", ".jpeg", ".jpg", ".webp"],
  },
}: DropzoneProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptFiled: File[]) => {
      setIsUploading(true);
      const { url, error } = await uploadImage(acceptFiled[0]);
      if (url) {
        setValue(url);
      }
      if (error) {
        toast.error(error);
      }
      setIsUploading(false);
    },
    [setValue],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
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
              {value}
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
          Obrazy muszą być oryginalnymi, osobistymi zdjęciami w formacie PNG,
          JPG lub WEBP o maksymalnym rozmiarze 5 MB.
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

export default Dropzone;
