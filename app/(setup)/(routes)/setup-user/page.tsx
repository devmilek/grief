import { initProfile } from "@/lib/init-profile";
import { redirect } from "next/navigation";
import React from "react";

const SetupUser = async () => {
  const user = await initProfile();
  return redirect("/");
};

export default SetupUser;
