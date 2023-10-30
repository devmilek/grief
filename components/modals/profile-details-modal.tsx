"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useProfileDetails } from "@/hooks/use-profile-details";
import { Label } from "../ui/label";
import Image from "next/image";
import { Button } from "../ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { currentUser } from "@/lib/current-profile";

const formSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(2),
  bio: z.string().optional(),
});

const ProfileDetailsModal = () => {
  const { isOpen, onClose, data } = useProfileDetails();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      bio: "",
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display tracking-wide text-2xl">
            Uzupełnij profil
          </DialogTitle>
          <DialogDescription>
            Pozwól innym użytkowniką cie rozpoznać uzupełniając poniższe pola.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form></form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetailsModal;
