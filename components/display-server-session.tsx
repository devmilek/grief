import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React from "react";

const DisplayServerSession = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h1 className="text-2xl font-medium mb-2">Server session</h1>
      <div className="p-3 rounded-xl bg-foreground text-background">
        {JSON.stringify(session)}
      </div>
    </div>
  );
};

export default DisplayServerSession;
