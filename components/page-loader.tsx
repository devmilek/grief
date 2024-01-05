import { Loader2 } from "lucide-react";
import React from "react";

const PageLoader = () => {
  return (
    <div>
      <Loader2 className="h-10 w-10 bg-emerald-600 animate-spin" />
    </div>
  );
};

export default PageLoader;
