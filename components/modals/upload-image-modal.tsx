"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useUploadModal } from "@/hooks/use-upload-image";

const UploadImageModal = () => {
  const { isOpen, onClose } = useUploadModal();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj zdjęcie</DialogTitle>
          <DialogDescription>
            Dodaj zdjęcie profilowe, aby inni użytkownicy mogli cię rozpoznać.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Anuluj</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageModal;
