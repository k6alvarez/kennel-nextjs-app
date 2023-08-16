import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { createTransport } from "nodemailer"

import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from "next-auth/providers/email";

import prisma from '../../../lib/prisma';
import { getYear } from '../guest-reservation';
import { themesMap } from '../../../components/appStyles';
import { htmlNewProfile, textNewProfile } from '../../../utils/emailHelpers';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host, origin } = new URL(url);
        const transport = createTransport(server);
        await transport.sendMail({
          to: email,
          from: `Gillette Kennels ${from}`,
          subject: `Your profile at ${host}`,
          text: textNewProfile({ url, host }),
          html: htmlNewProfile({ url, host, origin, email }),
        });
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};