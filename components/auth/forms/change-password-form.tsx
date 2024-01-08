"use client";

import React from "react";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

const formSchema = z.object({
  password: z.string().min(8, {
    message: "Hasło musi mieć co najmniej 8 znaków.",
  }),
});

const ChangePasswordForm = ({
  resetPasswordToken,
}: ChangePasswordFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        "/api/auth/change-password",
        {
          ...values,
          token: resetPasswordToken,
        },
        {
          //FIXME: make request faster to remove timeout
          timeout: 20000,
        },
      );
      toast.success("Hasło zostało zmienione.", {
        description: "Możesz się teraz zalogować.",
      });
      form.reset();
      router.push("/sign-in");
    } catch (e: any) {
      console.log(e);
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nowe hasło</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Zmień hasło
        </Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
