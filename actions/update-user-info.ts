"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserInfoSchema } from "@/schemas/auth";
import { z } from "zod";

export const updateUserInfo = async (
  userInfo: z.infer<typeof UserInfoSchema>,
) => {
  const session = await auth();

  if (!session) {
    throw new Error("Nie posiadasz uprawnień do wykonania tej akcji.");
  }

  const validatedFiels = UserInfoSchema.safeParse(userInfo);

  if (!validatedFiels.success) {
    throw new Error("Nieprawidłowe dane.");
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: validatedFiels.data.name,
      email: validatedFiels.data.email,
      bio: validatedFiels.data.bio,
    },
  });
};
