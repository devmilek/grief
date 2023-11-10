import { Account, AuthOptions, Profile, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const profile = await db.profile.findUnique({
          where: { email },
        });

        if (!profile) {
          return null;
        }

        const userPassword = profile.hashedPassword;

        const isValidPassword = bcrypt.compareSync(password, userPassword);

        if (!isValidPassword) {
          return null;
        }

        return profile;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({
      session,
      token, //   user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt(params: {
      token: JWT;
      user?: User | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
      isNewUser?: boolean | undefined;
    }) {
      if (params.user) {
        params.token.email = params.user.email;
      }

      return params.token;
    },
  },
};
