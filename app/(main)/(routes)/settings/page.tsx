import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./_components/settings-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  const profile = await db.profile.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!profile) {
    return redirect("/");
  }

  return (
    <section className="container max-w-2xl pt-10">
      <h1 className="font-display text-3xl">Ustawienia konta</h1>
      <p className="text-sm text-neutral-600 mt-1 mb-6">
        Zaktualizuj swoję zdjęcie oraz dane osobowe tutaj.
      </p>
      <Alert variant="destructive" className="mb-4 bg-red-50">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Zweryfikuj swój email</AlertTitle>
        <AlertDescription className="text-xs">
          Wejdź na swoją skrzynkę email i zweryfikuj swój adres, klikając w link
          zawarty w wiadomości.
        </AlertDescription>
      </Alert>
      <SettingsForm profile={profile} />
    </section>
  );
};

export default SettingsPage;
