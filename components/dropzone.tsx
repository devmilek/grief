"use client";

import React, { useCallback, useRef, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { buildCloudinaryUrl, cn } from "@/lib/utils";
import { getSignature, saveToDatabase } from "@/actions/upload-image";

interface DropzoneProps {
  disabled?: boolean;
  accept?: Accept;
  maxSize?: number;
  onUpload: (src: string) => void;
}

interface Image {
  type?: string;
  src: string;
}

const Dropzone = ({
  disabled = false,
  maxSize = 2 * 1024 * 1024,
  accept = {
    "image/*": [".png", ".jpeg", ".jpg", ".webp"],
  },
  onUpload,
}: DropzoneProps) => {
  const cropperRef = useRef<CropperRef>(null);
  const [image, setImage] = useState<Image | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async () => {
    try {
      setIsUploading(true);
      const canvas = cropperRef.current?.getCanvas();
      if (!canvas) return;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp"),
      );

      if (!blob) return;
      const { timestamp, signature } = await getSignature();

      // upload to cloudinary using the signature
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("folder", "grien");

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL!;

      const data = await fetch(endpoint, {
        method: "POST",
        body: formData,
      }).then((res) => res.json());

      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      });
      onUpload(buildCloudinaryUrl(data?.public_id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      setImage(null);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      for (const file of rejectedFiles) {
        toast.error("Zdjęcie nie spełnia wymagań");
      }

      // ACCEPTED
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        setImage({
          type: file.type,
          src: URL.createObjectURL(file),
        });
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    disabled,
  });

  return (
    <div>
      {/* DROPZONE */}

      <div
        {...getRootProps()}
        className={cn(
          "p-6 w-full justify-center text-center border rounded-xl flex flex-col items-center hover:border-emerald-600 hover:ring-4 hover:ring-emerald-600/10 transition-all cursor-pointer",
          isDragActive && "border-emerald-600",
          disabled || isUploading ? "bg-neutral-50 pointer-events-none" : "",
        )}
      >
        <input {...getInputProps()} />

        <>
          <div className="rounded-xl border p-2.5">
            <UploadCloud className="w-5 h-5" />
          </div>
          {isDragActive ? (
            <p className="text-sm text-neutral-600 mt-3">Upuść tutaj ...</p>
          ) : (
            <div>
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
              <p className="text-xs text-muted-foreground/60 mt-2">
                Maskymalny rozmiar 2MB, akceptowany format .jpg, .jpeg .png
              </p>
            </div>
          )}
        </>
      </div>

      <Dialog open={!!image}>
        <DialogContent>
          <Cropper
            stencilProps={{
              aspectRatio: 4 / 3,
            }}
            ref={cropperRef}
            src={image && image.src}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setImage(null);
              }}
            >
              Anuluj
            </Button>
            <Button
              variant="default"
              disabled={isUploading}
              onClick={async () => {
                await uploadImage();
              }}
            >
              Zapisz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dropzone;
