import { User } from "@prisma/client";
import { create } from "zustand";

interface CreateRecipeModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateRecipeModal = create<CreateRecipeModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
