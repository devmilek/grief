import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SignUpForm from "@/components/auth/forms/sign-up-form";

const Page = () => {
  return (
    <>
      <h1 className="text-4xl font-display">Utwórz konto</h1>
      <p className="text-gray-500 text-sm mt-2">
        Zacznij swoją kulinarną przygodę i utwórz swoje konto z użyciem adresu
        email lub kontynuuj z Google lub Facebook.
      </p>
      <SignUpForm />
      <p className="text-gray-500 text-xs text-center mt-10">
        Masz już konto?{" "}
        <Link href={"sign-in"} className="text-emerald-600 font-semibold">
          Zaloguj się
        </Link>
      </p>
    </>
  );
};

export default Page;
