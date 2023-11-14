import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AuthorCardProps {
  profile: Profile;
}

const AuthorCard = ({ profile }: AuthorCardProps) => {
  return (
    <div className="bg-white rounded-xl p-8 flex space-x-4">
      <Avatar className="">
        <AvatarFallback className="uppercase">
          {profile.name?.slice(0, 2)}
        </AvatarFallback>
        {profile.image && <AvatarImage src={profile.image} />}
      </Avatar>
      <div>
        <p className="text-xs text-neutral-500">Napisane przez</p>
        <h2 className="font-semibold">{profile.name}</h2>
        <p className="text-sm text-neutral-500 mt-2">{profile.bio}</p>
      </div>
    </div>
  );
};

export default AuthorCard;
