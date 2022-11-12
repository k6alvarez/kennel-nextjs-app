import { NextApiHandler } from 'next';
import NextAuth, { Theme } from 'next-auth';
import { createTransport } from "nodemailer"

import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from "next-auth/providers/email";

import prisma from '../../../lib/prisma';
import { getYear } from '../guest-reservation';
import { themesMap } from '../../../components/appStyles';

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
        const { host } = new URL(url);
        const transport = createTransport(server);
        await transport.sendMail({
          to: email,
          from,
          subject: `Sign in to ${host}`,
          text: text({ url, host }),
          // we can pass in 'theme' to access default theme as a new parameter
          html: html({ url, host, email, theme: themesMap.light }),
        });
      },

    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     const isAllowedToSignIn = false
  //     if (isAllowedToSignIn) {
  //       return true
  //     } else {
  //       // Return false to display a default error message
  //       return false
  //       // Or you can return a URL to redirect to:
  //       // return '/unauthorized'
  //     }
  //   }
  // },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
 function html(params: { url: string; host: string; email: string, theme?: any }) {
  const { url, host, theme } = params
  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme?.primary || "#22d172"
  const color = {
    background: brandColor || "#f9f9f9",
    text: theme?.textSecondary || "#444",
    mainBackground: theme?.white || "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme?.buttonText || "#fff",
  }

  return `
<body style="background: ${color.background};">
  ${getHeader({color, escapedHost})}


  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: 10px auto; ">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Profile created at Gillette Kennels. Please verify your email address using the link below.
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
              <a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> Log in</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
    ${getFooter()}
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}

export function getFooter() {
  return `
  <tr>
    <td style="text-align: left; padding-right: 10px; font-size: 12px;">
      <p>&copy; ${getYear()} Gillette Kennels. All Rights Reserved</p>
    </td>
  </tr>
  `
}

export function getHeader({color, escapedHost}) {
  return `
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: 10px auto; ">
      <tr>
        <td align="center" style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          <ul style="list-style:none; margin: 0; padding: 0; display: flex; justify-content: space-between;gap: 14px;">
            <li style="flex: 1; display: flex; justify-content: flex-start;">
              <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">Gillette Kennels</a>
            </li>
            <li>
              <a href="${escapedHost}/boarding" style="color: ${color.text}; text-decoration: none;">Boarding</a>
            </li>
            <li>
              <a href="${escapedHost}/training" style="color: ${color.text}; text-decoration: none;">Training</a>
            </li>
          </ul>
        </td>
      </tr>
    </table>
  `
}