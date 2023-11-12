"use client";

import React from "react";
import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

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

const SignUpForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test@test.pl",
      password: "12345678",
      name: "milosz",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const profile = await axios.post("/api/auth/sign-up", values);
      toast.success("Konto zostało utworzone.", {
        description: "Możesz się teraz zalogować.",
      });
      router.push("/sign-in");
    } catch (err: any) {
      console.log(err);
      //TODO: handle and show errors
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <div>
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
    </div>
  );
};

export default SignUpForm;
