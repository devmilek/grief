import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShareIcon } from "lucide-react";
import React from "react";
import { getShareUrl, SocialPlatforms } from "@phntms/react-share";
import Link from "next/link";
import { FacebookShareButton, FacebookIcon } from "next-share";
import {
  ShareFacebookButton,
  ShareTwitterButton,
} from "./share-social-media-button";

const ShareRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const baseUrl = process.env.BASE_URL;
  const url = `https://grief.devmilek.com/recipe/${recipeId}`;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShareIcon className="h-4 w-4" />
          <span className="sr-only">Udostępnij</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Udostępnij przepis</DialogTitle>
          <DialogDescription>
            Skopiuj link i udostępnij go znajomym
          </DialogDescription>
        </DialogHeader>
        <div>
          <ShareFacebookButton url={url} />
          <ShareTwitterButton url={url} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareRecipeButton;
