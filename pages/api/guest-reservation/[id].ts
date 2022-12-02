import prisma from '../../../lib/prisma';
import { createTransport } from "nodemailer"
import { getFooter, getHeader } from '../auth/[...nextauth]';
import { themesMap } from '../../../components/appStyles';

// PUT /api/guest-reservation/:id
export default async function handle(req, res) {
  const petsAdded = req.body.pets.for
  const reservationId = req.body.reservationId;
  delete req.body.reservationId
  delete req.body.pets
  const updatedReservation = await prisma.guestReservation.update({
    where: { id: reservationId },
    data: { ...req.body, pets: { connect: petsAdded } },
  });

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
    text: text({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}` }),
    html: html({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email, theme: themesMap.light }),
  });


  await transport.sendMail({
    to: process.env.EMAIL_FROM,
    from: req.body.email,
    subject: `New Client Reservation ${process.env.HOSTNAME}`,
    text: text({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}` }),
    html: htmlGKApp({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email, theme: themesMap.light }),
  });
  res.json(updatedReservation);
}

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params?: { url?: string; host?: string; origin?: string; email?: string, theme?: any }) {
  const { url, host, theme, origin } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")

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
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ color, origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Thank you for your reservation at <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Your reservation is pending approval. We will contact you via email for confirmation
        </td>
  
      </tr>
      ${getFooter()}
    </table>
  </body>
  `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url }) {
  return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation is pending approval. We will contact you via email for confirmation. View your reservation details: ${url} `
}


function htmlGKApp(params?: { url?: string; host?: string; origin?: string; email?: string, theme?: any }) {
  const { url, host, theme, origin } = params
  const escapedHost = host?.replace(/\./g, "&#8203;.")

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
  <body style="background: ${color.background}; padding: 10px;">
  
  
    ${getHeader({ color, origin })}
  
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: 10px auto; ">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          New client reservation submitted at <a href="${escapedHost}" style="color: ${color.text}; text-decoration: none;">${escapedHost}</a>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View reservation details </a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          This reservation is pending approval.
        </td>
  
      </tr>
      ${getFooter()}
    </table>
  </body>
  `
}
