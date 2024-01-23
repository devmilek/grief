"use server";

import { auth } from "@/lib/auth";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (file: File) => {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const key = `${session.user.id}/${file.name}`;

  const storageRef = ref(storage, key);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return { url };
};
