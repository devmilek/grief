import { ArrowLeft, CheckCircle2, MailIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const VerificationSuccess = () => {
  return (
    <div className="text-center">
      <div className="h-14 w-14 mb-6 rounded-xl border flex items-center justify-center text-gray-700 mx-auto">
        <CheckCircle2 className="w-7 h-7" />
      </div>
      <h1 className="text-4xl font-display mb-3">Email został zweryfikowany</h1>
      <p className="text-gray-500 text-sm">
        Możesz teraz korzystać z wszystkich funkcjonalności aplikacji.
      </p>
      <Button className="mt-8 mb-8" asChild>
        <Link href="/">Przejdź do strony głównej</Link>
      </Button>
    </div>
  );
};

export default VerificationSuccess;
