"use client";

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
import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Niepoprawny adres email",
  }),
  password: z.string().min(6, {
    message: "Hasło musi zawierać conajmniej 6 znaków",
  }),
});

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });

      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        console.log(result);
      }
    } catch (err: any) {
      console.error("error", err.errors[0].longMessage);
    }
  };

  return (
    <section className="max-w-md px-4 flex items-center justify-center w-full mx-auto">
      <div className="">
        <h1 className="text-4xl font-display">Witaj ponownie</h1>
        <p className="text-gray-500 text-sm mt-2">
          Kontynuuj swoją kulinarną przygodę i zaloguj się z użyciem adresu
          email lub kontynuuj z Google lub Facebook.
        </p>
        <Form {...form}>
          <form className="mt-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hasło</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Zaloguj się
            </Button>
          </form>
        </Form>
        <p className="text-gray-500 text-xs text-center mt-10">
          Nie masz jeszcze konta?{" "}
          <Link href={"/sign-up"} className="text-emerald-600 font-semibold">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
