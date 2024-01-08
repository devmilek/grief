import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import crypto from "crypto";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationCodeByEmail = async (email: string) => {
  try {
    const verificationCode = await db.verificationCode.findFirst({
      where: { email },
    });

    return verificationCode;
  } catch {
    return null;
  }
};

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000 * 24); // 24 hours

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verficationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verficationToken;
};

export const generateVerificationCode = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes

  const existingCode = await getVerificationCodeByEmail(email);

  if (existingCode) {
    await db.verificationCode.delete({
      where: {
        id: existingCode.id,
      },
    });
  }

  const verificationCode = await db.verificationCode.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationCode;
};
