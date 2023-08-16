
import prisma from '../../../lib/prisma';
import { createTransport } from "nodemailer"
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
    html: htmlNewReservationClient({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email }),
  });


  await transport.sendMail({
    to: process.env.EMAIL_FROM,
    from: `Gillette Kennels ${req.body.email}`,
    subject: `New Client Reservation ${process.env.HOSTNAME}`,
    text: textNewReservation({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}` }),
    html: htmlNewReservation({ url: `${process.env.HOSTNAME}/res-guest/${updatedReservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: req.body.email }),
  });
  res.json(updatedReservation);
}

