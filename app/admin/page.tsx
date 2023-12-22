import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  const isAdmin = await db.profile.findUnique({
    where: {
      id: session.user.id,
      role: Role.admin,
    },
  });

  if (!isAdmin) {
    return redirect("/");
  }

  return <div className="container"></div>;
};

export default AdminPage;
