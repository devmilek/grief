import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/user";
import { redirect } from "next/navigation";
import React from "react";
import { verificateWithToken } from "@/actions/verificate-with-token";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VerificationPending from "@/components/auth/verification-pending";
import VerificationSuccess from "@/components/auth/verification-success";
import VerificationError from "@/components/auth/verification-error";

const EmailVerificationPage = async ({
  searchParams,
}: {
  searchParams?: {
    token?: string;
  };
}) => {
  const session = await auth();
  if (searchParams?.token) {
    const data = await verificateWithToken(searchParams.token);
    if (data.error) {
      return <VerificationError message={data.error} />;
    }
    if (data.success) {
      return <VerificationSuccess />;
    }
  }

  if (!session && !searchParams?.token) {
    return redirect("/");
  }

  if (session) {
    const user = await getUserById(session.user.id);
    if (user?.emailVerified) {
      return <VerificationSuccess />;
    }
    return <VerificationPending />;
  }
};

export default EmailVerificationPage;
