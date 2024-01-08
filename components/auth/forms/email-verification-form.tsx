"use client";

import OtpInput from "react-otp-input";
import React, { FormEvent, useState, useTransition } from "react";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import { verificateByCode } from "@/actions/verificate-with-code";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmailVerificationForm = ({ email }: { email: string }) => {
  const [isPending, startTransition] = useTransition();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      verificateByCode(otp, email).then((data) => {
        setError(data.error);
        if (data.success) {
          toast.success("Email został zweryfikowany, możesz się zalogować");
          router.push(`/sign-in`);
        }
      });
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputStyle={{
          width: "",
        }}
        containerStyle={"space-x-2"}
        renderInput={(props) => (
          <Input
            {...props}
            className={cn(props.className, "text-2xl h-16 w-16")}
          />
        )}
      />
      <Button type="submit" className="w-full mt-4">
        Zweryfukuj email
      </Button>
    </form>
  );
};

export default EmailVerificationForm;
