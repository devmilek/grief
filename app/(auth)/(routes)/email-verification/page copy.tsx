import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";
import { verificateWithToken } from "@/actions/verificate-with-token";
import EmailVerificationError from "@/components/auth/email-verification-error";
import EmailVerificationContainer from "@/components/auth/email-verification-container";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const EmailVerificationPage = async ({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) => {
  if (!searchParams?.token) {
    return redirect("/");
  }
  const data = await verificateWithToken(searchParams.token);
  if (data.error) {
    return <EmailVerificationError message={data.error} />;
  }
  return (
    <EmailVerificationContainer>
      <h1 className="text-4xl font-display">Email został zweryfikwany</h1>
      <p className="text-gray-500 text-sm mt-4">
        Twój adres email został zweryfikowany. Możesz teraz korzystać z
        wszystkich funkcjonalności aplikacji.
      </p>
      <Link
        href={"/sign-up"}
        className="text-emerald-600 font-semibold text-xs text-center mt-6 w-full flex justify-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span>Przejdź do strony głównej</span>
      </Link>
    </EmailVerificationContainer>
  );
};

export default EmailVerificationPage;
