import { AlertTriangle, ArrowLeft, MailIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VerificationError = ({ message }: { message: string }) => {
  return (
    <div className="text-center">
      <div className="h-14 w-14 mb-6 rounded-xl border flex items-center justify-center text-gray-700 mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h1 className="text-4xl font-display mb-3">{message}</h1>
      <p className="text-gray-500 text-sm mb-8">
        Aby wysłać nowy email weryfikacyjny, zaloguj się do swojego konta i
        przejdź do ustawień.
      </p>
      <Link
        href="/sign-in"
        className="text-emerald-600 font-semibold text-xs flex justify-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Wróć do strony głównej
      </Link>
    </div>
  );
};

export default VerificationError;
