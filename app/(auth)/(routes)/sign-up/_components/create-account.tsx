"use client";

import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import PasswordStrengthBar from "react-password-strength-bar";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clerkErrorsMap } from "@/maps";
import OTPInput from "@/components/otp-input";
import { findClerkError } from "@/lib/find-clerk-error";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Imię jest wymagane.",
  }),
  email: z.string().email({
    message: "Nieprawidłowy adres email.",
  }),
  password: z.string().min(8, {
    message: "Hasło musi mieć co najmniej 8 znaków.",
  }),
});

const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [otp, setOtp] = useState("");

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isLoaded) {
      return;
    }
    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.name,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      err.errors.forEach((error: any) => {
        toast.error(findClerkError(error.code));
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onVerify = async () => {
    if (!isLoaded) {
      return;
    }

    setIsLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/setup-user");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingVerification) {
    return (
      <div>
        <h1 className="text-4xl font-display">Utwórz konto</h1>
        <p className="text-gray-500 text-sm mt-2">
          Zacznij swoją kulinarną przygodę i utwórz swoje konto z użyciem adresu
          email lub kontynuuj z Google lub Facebook.
        </p>
        <Form {...form}>
          <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        autoComplete="off"
                        type="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} className="w-full mt-6" type="submit">
              Utwórz konto
            </Button>
          </form>
        </Form>
        <p className="text-gray-500 text-xs text-center mt-10">
          Masz już konto?{" "}
          <Link href={"sign-in"} className="text-emerald-600 font-semibold">
            Zaloguj się
          </Link>
        </p>
      </div>
    );
  }

  if (pendingVerification) {
    return (
      <div>
        <h1 className="text-4xl font-display">Potwierdź adres email</h1>
        <p className="text-gray-500 text-sm mt-2">
          Wysłalismy na twój adres mailowy kod weryfikacyjny, wpisz go poniżej,
          aby zweryfikować konto.
        </p>
        <div className="my-10">
          <OTPInput setValue={setOtp} />
        </div>
        <Button disabled={isLoading} className="w-full" onClick={onVerify}>
          Kontynuuj
        </Button>
      </div>
    );
  }
};

export default CreateAccount;
