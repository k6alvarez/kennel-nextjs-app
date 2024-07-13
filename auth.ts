import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Nodemailer from "next-auth/providers/nodemailer";
import sendVerificationRequest from "./lib/emails/sendVerificationRequest";
import { updateUserPermissions } from "./lib/user/updateUserPermissions";

const prisma = new PrismaClient();

const providers: Provider[] = [
  Nodemailer({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: process.env.EMAIL_SMTP_SECURE === "true",
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_RECIEVERS,
    sendVerificationRequest,
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    async signIn({ user }) {
      const isUserEmailAdmin = process.env.INITIAL_ADMIN_EMAILS?.split(
        ","
      ).some((email) => email === user.email);

      if (isUserEmailAdmin && user.id) {
        updateUserPermissions(user.id, ["ADMIN", "USER"]);
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
});
