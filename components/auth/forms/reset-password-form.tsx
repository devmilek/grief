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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import ResetPasswordModal from "../../modals/reset-password-modal";
import axios from "axios";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Niepoprawny adres email",
  }),
});

const ResetPasswordForm = () => {
  const [isSent, setIsSent] = useState(false);

  const emailForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/auth/reset-password", data);
      setIsSent(true);
      emailForm.reset();
    } catch (e: any) {
      console.log(e);
      //TODO: handle and show errors
    }
  };

  const isLoading = emailForm.formState.isSubmitting;

  return (
    <>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={emailForm.control}
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
          <Button disabled={isLoading} className="w-full mt-4">
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Zresetuj hasło
          </Button>
        </form>
      </Form>
      <ResetPasswordModal open={isSent} setOpen={setIsSent} />
    </>
  );
};

export default ResetPasswordForm;
