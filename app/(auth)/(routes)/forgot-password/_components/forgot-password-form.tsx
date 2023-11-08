"use client";

import OTPInput from "@/components/otp-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { findClerkError } from "@/lib/find-clerk-error";
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const emailFormSchema = z.object({
  email: z.string().email({
    message: "Niepoprawny adres email",
  }),
});

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  if (!isLoaded) {
    return null;
  }

  const onEmailSubmit = async (values: z.infer<typeof emailFormSchema>) => {
    await signIn
      .create({
        strategy: "reset_password_email_code",
        identifier: values.email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
      })
      .catch((err) => {
        err.errors.forEach((error: any) => {
          toast.error(findClerkError(error.code));
        });
      });
  };

  async function reset(e: SyntheticEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          toast.error(
            "Wymagane jest uwierzytelnianie dwuskładnikowe, ten interfejs użytkownika tego nie obsługuje.",
          );
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          toast.message("Zresetowano hasło", {
            description: "Możesz się teraz zalogować",
          });
          router.push("/sign-in");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        err.errors.forEach((error: any) => {
          toast.error(findClerkError(error.code));
        });
      });
  }

  if (!successfulCreation && !complete) {
    return (
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
          <FormField
            name="email"
            control={emailForm.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4">Wyślij email</Button>
        </form>
      </Form>
    );
  }

  if (successfulCreation && !complete) {
    return (
      <form className="space-y-4" onSubmit={reset}>
        <div>
          <Label className="inline-block mb-2">Podaj kod z maila</Label>
          <OTPInput setValue={setCode} />
        </div>
        <div>
          <Label className="inline-block mb-2">Podaj nowe hasło</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Zresetuj hasło
        </Button>
      </form>
    );
  }
};

export default ForgotPasswordForm;
