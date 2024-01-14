"use client";

import ReactCrop, { type Crop } from "react-image-crop";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

import { CropperRef, Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface ImageResizeModalProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  file?: File;
}

const ImageResizeModal = ({ open, setIsOpen, file }: ImageResizeModalProps) => {
  const cropperRef = useRef<CropperRef>(null);
  const onCrop = () => {
    if (cropperRef.current) {
      console.log(cropperRef.current.getCoordinates());
      // You are able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      console.log(
        cropperRef.current
          .getCanvas({
            maxHeight: 1000,
            maxWidth: 1000,
          })
          ?.toDataURL(),
      );
    }
  };

  if (!file) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setIsOpen(false);
      }}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Przycinanie zdjęcia</DialogTitle>
          <DialogDescription>
            Przytnij zdjęcie aby wybrać najlepszy kadr
          </DialogDescription>
        </DialogHeader>
        <Cropper
          ref={cropperRef}
          src={URL.createObjectURL(file)}
          className={"h-96 "}
          stencilProps={{
            aspectRatio: 4 / 3,
          }}
        />
        {/* <div className="flex items-center justify-center mt-4 bg-gray-300 relative h-96 flex-1">
          <Cropper
            src={URL.createObjectURL(file)}
            onChange={onChange}
            className={"cropper flex-1"}
          />
        </div> */}
        <DialogFooter>
          <Button
            variant={"outline"}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Anuluj
          </Button>
          <Button onClick={onCrop}>Przytnij</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageResizeModal;
