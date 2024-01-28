import React from "react";
import { db } from "@/lib/db";
import ChangePasswordForm from "@/components/auth/forms/change-password-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ForgotPasswordPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const ForgotPasswordPage = async ({
  searchParams,
}: ForgotPasswordPageProps) => {
  // if (searchParams.token) {
  //   const profile = await db.user.findUnique({
  //     where: {
  //       resetPasswordToken: searchParams.token as string,
  //     },
  //   });
  //   const isExpired =
  //     new Date(profile?.resetPasswordTokenExpiry as Date) < new Date();
  //   if (!profile || isExpired || !profile.resetPasswordToken) {
  //     return (
  //       <section className="max-w-md px-4 flex items-center justify-center w-full mx-auto">
  //         <div className="">
  //           <h1 className="text-4xl font-display">Niepoprawny token</h1>
  //           <p className="text-gray-500 text-sm mt-2 mb-6">
  //             Token wygasł lub nie istnieje, możesz spróbować ponownie.
  //           </p>
  //           <Button className="w-full" asChild>
  //             <Link href="/forgot-password">Wróc do resetowania</Link>
  //           </Button>
  //         </div>
  //       </section>
  //     );
  //   }
  //   return (
  //     <section className="max-w-md px-4 flex items-center justify-center w-full mx-auto">
  //       <div className="">
  //         <h1 className="text-4xl font-display">Zmień hasło</h1>
  //         <p className="text-gray-500 text-sm mt-2 mb-6">
  //           Wpisz nowe hasło, aby zresetować hasło do konta.
  //         </p>
  //         {/* <ChangePasswordForm
  //           resetPasswordToken={searchParams.token as string}
  //         /> */}
  //       </div>
  //     </section>
  //   );
  // } else {
  //   return (
  //     <section className="max-w-md px-4 flex items-center justify-center w-full mx-auto">
  //       <div className="">
  //         <h1 className="text-4xl font-display">Zapomniane hasło</h1>
  //         <p className="text-gray-500 text-sm mt-2 mb-6">
  //           Wpisz adres email powiązany z Twoim kontem, a my wyślemy Ci link do
  //           zmiany hasła.
  //         </p>
  //         <ResetPasswordForm />
  //       </div>
  //     </section>
  //   );
  // }
};

export default ForgotPasswordPage;
