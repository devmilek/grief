import React, { ReactNode } from "react";
import authBg from "@/assets/auth-bg.jpg";
import Image from "next/image";
import Link from "next/link";
import { ChefHat } from "lucide-react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="h-screen grid lg:grid-cols-2 md:p-4 lg:p-10 bg-white">
      <section className="rounded-xl relative overflow-hidden hidden lg:block">
        <div className="z-20 absolute inset-0 p-8 h-full flex flex-col justify-between">
          <Link
            href="/"
            className="font-display text-2xl flex items-center text-white"
          >
            <ChefHat className="mr-3" />
            grief
          </Link>
          <div className="text-white">
            <h1 className="font-display text-3xl tracking-wide">
              Człowiek nie może prawidłowo myśleć, kochać i spać, jeśli
              wcześniej porządnie się nie najadał.
            </h1>
            <p className="mt-3">- Virginia Woolf</p>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 bg-opacity-50 z-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <Image
          src={authBg}
          fill
          quality={80}
          alt="Food on plate"
          placeholder="blur"
          className="object-cover"
        />
      </section>
      {children}
    </main>
  );
};

export default AuthLayout;
