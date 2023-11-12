import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ResetPasswordModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ResetPasswordModal = ({ open, setOpen }: ResetPasswordModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email został wysłany</DialogTitle>
          <DialogDescription>
            Sprawdź swoją skrzynkę pocztową i kliknij w link, aby zresetować
            hasło.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Zamknij</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
