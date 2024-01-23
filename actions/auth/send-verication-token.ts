"use server";

import { sendVerificationEmail } from "@/actions/auth/mail";
import { generateVerificationToken } from "@/lib/tokens";

export const sendVerificationToken = async (email: string) => {
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: true };
};
