import { User } from "@prisma/client";
import { create } from "zustand";

interface ProfileDetailsStore {
  isOpen: boolean;
  data: User | null;
  setData: (user: User) => void;
  onOpen: () => void;
  onClose: () => void;
}

export const useProfileDetails = create<ProfileDetailsStore>((set) => ({
  isOpen: false,
  data: null,
  setData: (user: User) => set({ data: user }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
