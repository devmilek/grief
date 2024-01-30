import SignInForm from "@/components/auth/forms/sign-in-form";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <>
      <h1 className="text-4xl font-display">Witaj ponownie</h1>
      <p className="text-gray-500 text-sm mt-2">
        Kontynuuj swoją kulinarną przygodę i zaloguj się z użyciem adresu email
        lub kontynuuj z Google lub Facebook.
      </p>
      <SignInForm />
      <p className="text-gray-500 text-xs text-center mt-10">
        Nie masz jeszcze konta?{" "}
        <Link href={"/sign-up"} className="text-emerald-600 font-semibold">
          Zarejestruj się
        </Link>
      </p>
    </>
  );
};

export default SignIn;
