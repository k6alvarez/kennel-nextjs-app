import { GuestReservation } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { createTransport } from "nodemailer"
import { INITIAL_STATE } from '../../../components/Reservations/NewClients/guestFormReducer';


type Errors = {
  [key in keyof GuestReservation]: string;
};


const validateFields = async (fields: GuestReservation) => {
  const errors: Partial<Errors> = undefined;
  Object.entries(INITIAL_STATE).filter(([key, _value]) => {
    const fieldIsRequired = INITIAL_STATE[key].required;
    const fieldIsEmpty = fields[key].length === 0;
    if (fieldIsRequired && fieldIsEmpty) {
      errors[key] = `${INITIAL_STATE[key].label} is required`;
    }

    if (key === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(fields[key])) {
      errors[key] = `${INITIAL_STATE[key].label} is not a valid email address`;
    }
  });
  return errors;
}

// POST /api/guest-reservation
export default async function handle(req, res) {
  let apiOptions

  const session = await getSession({ req });
  const sessionUserEmail = session?.user?.email
  if (sessionUserEmail) {
    apiOptions = {
      data: {
        author: { connect: { email: sessionUserEmail } },
        ...req.body,
      },
    }
  } else {
    apiOptions = {
      data: {
        ...req.body,
      },
    }
  }

  const errors = await validateFields(apiOptions.data)
  if (errors) {
    return res.status(400).json({ errors });
  } else {
    const result = await prisma.guestReservation.create(apiOptions);
    const transport = createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    });
    await transport.sendMail({
      to: req.body.email,
      from: process.env.EMAIL_FROM,
      subject: `Your reservation at ${process.env.HOSTNAME}`,
      text: text(),
      html: html({ url: `${process.env.HOSTNAME}/res-guest/${result.id}`, host: process.env.HOSTNAME, email: req.body.email}),
    });
    res.json(result);
  }
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
 function html(params?: { url?: string; host?: string; email?: string, theme?: any }) {


  const escapedHost = params?.host?.replace(/\./g, "&#8203;.")

  const brandColor = params?.theme?.brandColor || "#22d172"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: params?.theme?.buttonText || "#fff",
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Thank you for your reservation at ${escapedHost}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${params.url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Your reservation is pending approval. We will send you an email when it is confirmed.
      </td>
    </tr>
  </table>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text() {
  return `Reservation submitted.`
}
