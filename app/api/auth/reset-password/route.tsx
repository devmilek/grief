import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import ResetPasswordEmail from "@/emails/reset-password-email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return new NextResponse("Email jest wymagany", { status: 400 });
    }

    const profile = await db.profile.findUnique({
      where: {
        email,
      },
    });

    if (!profile) {
      return new NextResponse(
        "Nie znaleziono użytkownika o podanym adresie email",
        { status: 404 },
      );
    }

    //TODO: protect from too many requests by setting a limit on how many times a user can request a password reset

    const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1));

    await db.profile.update({
      where: {
        id: profile.id,
      },
      data: {
        resetPasswordToken: resetPasswordToken,
        resetPasswordTokenExpiry: expiryDate,
      },
    });

    //TODO: make an info that this token is valid for 24h

    const data = await resend.emails.send({
      from: "grief@devmilek.pl",
      to: profile.email,
      subject: "Zresetuj swoje hasło - Grief",
      react: <ResetPasswordEmail token={resetPasswordToken} />,
    });

    return NextResponse.json({ message: "Email wysłany" });
  } catch (e) {
    console.log(e);
    return new NextResponse("Coś poszło nie tak", { status: 500 });
  }
}
