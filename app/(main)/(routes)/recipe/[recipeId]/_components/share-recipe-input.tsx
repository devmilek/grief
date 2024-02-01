import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

export const ShareRecipeInput = () => {
  return (
    <div>
      <Input readOnly />
      <Button variant='secondary'>
        <CopyIcon />
      </Button>
    </div>
  )
}