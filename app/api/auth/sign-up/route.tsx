import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Resend } from "resend";
import MailConfirmationEmail from "@/emails/email-confirmation";
// import EmailConfirmation from "@/emails/email-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new NextResponse("Wszystkie pola są wymagane", {
        status: 400,
      });
    }

    console.log("WYKONUJE SIGNUP");

    const existingProfile = await db.profile.findUnique({
      where: { email },
    });

    if (existingProfile) {
      return new NextResponse("Użytkownik o takim adresie email już istnieje", {
        status: 400,
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const profile = await db.profile.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    await db.profile.update({
      where: { id: profile.id },
      data: {
        emailVerificationToken,
      },
    });

    //TODO: protect from too many requests by setting a limit on how many times a user can request a password reset

    const data = await resend.emails.send({
      from: "grief@devmilek.pl",
      to: profile.email,
      subject: "Jeszcze tylko jeden krok - Potwierdź swój adres email",
      react: <MailConfirmationEmail token={emailVerificationToken} />,
    });

    return NextResponse.json({ profile });
  } catch (e) {
    console.error(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
