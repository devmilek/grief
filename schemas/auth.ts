import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().max(100),
});

export const RegisterSchema = z.object({
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

export const UserInfoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bio: z.string(),
});
