import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./_components/settings-form";

const SettingsPage = async () => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  return (
    <section className="container max-w-2xl pt-10">
      <h1 className="font-display text-3xl">Ustawienia konta</h1>
      <p className="text-sm text-neutral-600 mt-1 mb-6">
        Zaktualizuj swoję zdjęcie oraz dane osobowe tutaj.
      </p>
      <SettingsForm profile={profile} />
    </section>
  );
};

export default SettingsPage;
