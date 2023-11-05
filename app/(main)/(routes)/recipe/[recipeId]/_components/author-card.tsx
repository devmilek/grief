import { Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AuthorCardProps {
  profile: Profile;
}

const AuthorCard = ({ profile }: AuthorCardProps) => {
  return (
    <div className="bg-white rounded-xl p-8 flex space-x-4">
      <Image
        alt=""
        src={profile.image}
        width={42}
        height={42}
        className="rounded-full"
      />
      <div>
        <p className="text-xs text-neutral-500">Napisane przez</p>
        <h2 className="font-semibold">{profile.name}</h2>
      </div>
    </div>
  );
};

export default AuthorCard;
