"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Profile } from "@prisma/client";
import { Book, LogOut, Plus, Settings, UserIcon } from "lucide-react";
import Link from "next/link";
import { useCreateRecipeModal } from "@/hooks/use-create-recipe";
import { SignOutButton } from "@clerk/nextjs";

interface UserButtonProps {
  profile: Profile;
}

const UserDropdown = ({ profile }: UserButtonProps) => {
  const { onOpen } = useCreateRecipeModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="py-2">
          <div className="flex items-center space-x-3">
            <Avatar>
              {profile.image && <AvatarImage src={profile.image} />}
              <AvatarFallback className="uppercase">
                {profile.name?.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm">{profile.name}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        side="top"
        sideOffset={20}
      >
        <DropdownMenuLabel>Twoje konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 w-4 h-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen();
            }}
          >
            <Plus className="mr-2 w-4 h-4" />
            <span>Utwórz przepis</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/your-recipes">
              <Book className="mr-2 w-4 h-4" />
              <span>Zarządzaj przepisami</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            <span>Ustawienia</span>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <SignOutButton>
              <div>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Wyloguj się</span>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
