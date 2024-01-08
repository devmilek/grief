import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import bcrypt from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    // const { password, token } = await req.json();
    // if (!password || !token) {
    //   return new NextResponse("Brak wymaganych danych", { status: 400 });
    // }
    // const profile = await db.user.findUnique({
    //   where: {
    //     resetPasswordToken: token,
    //   },
    // });

    // if (!profile) {
    //   return new NextResponse("Nie znaleziono profilu", { status: 404 });
    // }

    // const resetPasswordTokenExpiry = profile.resetPasswordTokenExpiry;
    // if (!resetPasswordTokenExpiry) {
    //   return new NextResponse("Link wygasł", { status: 400 });
    // }

    // const today = new Date();

    // if (today > resetPasswordTokenExpiry) {
    //   return new NextResponse("Link wygasł", { status: 400 });
    // }

    // const hashedPassword = bcrypt.hashSync(password, 10);

    // await db.profile.update({
    //   where: {
    //     id: profile.id,
    //   },
    //   data: {
    //     hashedPassword,
    //     resetPasswordToken: null,
    //     resetPasswordTokenExpiry: null,
    //   },
    // });

    return NextResponse.json({ message: "Hasło zostało zmienione" });
  } catch (e) {
    console.log(e);
    return new NextResponse("Coś poszło nie tak", { status: 500 });
  }
}
