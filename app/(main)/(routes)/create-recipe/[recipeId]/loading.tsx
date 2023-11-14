import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="container flex h-screen items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
