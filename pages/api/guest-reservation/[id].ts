
// import { getSession } from "next-auth/react";
// import prisma from "../../../lib/prisma";
// import { createTransport } from "nodemailer"
// import { getFooter, getHeader } from '../auth/[...nextauth]';
// import { themesMap } from "../../../components/appStyles";

// // DELETE /api/guest-reservation/:id
// export default async function handle(req, res) {
//     const data = req.body;
//     const reservationEmail = data.reservationEmail || data.email;
//     delete data.reservationEmail;
//     const reservationId = data.reservationId || data.id;
//     delete data.reservationId;

//     // const petsAdded = req.body.pets
//     // const reservationId = req.body.reservationId;
//     // delete req.body.reservationId
//     // delete req.body.pets


//     const session = await getSession({ req });


//     if (!session) {
//         res.status(401).send("Unauthorized. Please sign in.");
//         return;
//     }

//     const transport = createTransport({
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//             user: process.env.EMAIL_SERVER_USER,
//             pass: process.env.EMAIL_SERVER_PASSWORD
//         }
//     });

//     const user = await prisma.user.findUnique({
//         where: { email: session.user.email },
//     });

//     const isAdmin = user?.permissions?.includes("ADMIN");

//     if (req.method === "DELETE" && isAdmin) {
//         const reservation = await prisma.guestReservation.delete({
//             where: { id: reservationId },
//         });
//         res.json(reservation);
//     } else if (isAdmin) {
//         const reservation = await prisma.guestReservation.update({
//             where: { id: reservationId },
//             data: { ...data },
//         });        

//         if (data.confirmed) {
//             await transport.sendMail({
//                 to: reservationEmail,
//                 from: `Gillette Kennels ${process.env.EMAIL_FROM}`,
//                 subject: `Your reservation at ${process.env.HOSTNAME}`,
//                 text: confirmedText({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}` }),
//                 html: confirmedHtml({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}`, origin: process.env.HOSTNAME, theme: themesMap.light }),
//             });
//         }
//         res.json(reservation);
//     } else {
//         res.status(403).send("Forbidden. You do not have permission to make this request.");
//         return;
//     }
// }

// function confirmedHtml(params?: { url?: string; theme?: any, origin?: string }) {
//     const { url, theme, origin } = params

//     const brandColor = theme?.primary || "#22d172"
//     const color = {
//         background: brandColor || "#f9f9f9",
//         text: theme?.textSecondary || "#444",
//         mainBackground: theme?.white || "#fff",
//         buttonBackground: brandColor,
//         buttonBorder: brandColor,
//         buttonText: theme?.buttonText || "#fff",
//     }

//     return `
//     <body style="background: ${color.background}; padding: 10px;">


//       ${getHeader({ color, origin })}


//       <table width="100%" border="0" cellspacing="20" cellpadding="0"
//         style="background: ${color.mainBackground}; max-width: 1000px; margin: 10px auto; ">
//         <tr>
//           <td align="center"
//             style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
//             Your reservation has been confirmed.
//           </td>
//         </tr>
//         <tr>
//           <td align="center" style="padding: 20px 0;">
//             <table border="0" cellspacing="0" cellpadding="0">
//               <tr>
//                 <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
//                     target="_blank"
//                     style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;"> View your reservation details </a></td>
//               </tr>
//             </table>
//           </td>
//         </tr>        
//         ${getFooter()}
//       </table>
//     </body>
//     `
// }

// /** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
// function confirmedText({ url }) {
//     return `Thank you for your reservation at ${process.env.HOSTNAME}. Your reservation has been confirmed. View your reservation details: ${url} `
// }
import prisma from '../../../lib/prisma';
import { createTransport } from "nodemailer"
import { getFooter, getHeader } from '../auth/[...nextauth]';
import { themesMap } from '../../../components/appStyles';
import { htmlNewReservation, htmlNewReservationClient, textNewReservation, textNewReservationClient } from '../../../utils/emailHelpers';

// PUT /api/guest-reservation/:id
export default async function handle(req, res) {
  const reservationId = req.body.reservationId;
  delete req.body.reservationId
  delete req.body.pets
  const updatedReservation = await prisma.guestReservation.update({
    where: { id: reservationId },
    data: { ...req.body },
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
    from: `Gillette Kennels ${process.env.EMAIL_FROM}`,
    subject: `Your reservation at ${process.env.HOSTNAME}`,
    text: textNewReservationClient({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}` }),
    html: htmlNewReservationClient({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email, theme: themesMap.light }),
  });


  await transport.sendMail({
    to: process.env.EMAIL_FROM,
    from: `Gillette Kennels ${req.body.email}`,
    subject: `New Client Reservation ${process.env.HOSTNAME}`,
    text: textNewReservation({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}` }),
    html: htmlNewReservation({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email, theme: themesMap.light }),
  });
  res.json(updatedReservation);
}

