import { createTransport } from "nodemailer";
import { Reservation } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { INITIAL_RESERVATION_STATE } from '../../../components/Reservations/formInitialState';

import prisma from '../../../lib/prisma';
import { htmlNewReservationClient, textNewReservation, textNewReservationClient } from "../../../utils/emailHelpers";

// POST /api/reservation
type Errors = {
  [key in keyof Reservation]: string;
};

const validateFields = async (fields: Reservation) => {

  const errors: Partial<Errors> = {};
  fields && Object.entries(fields).filter(([key, value]) => {

    if (!INITIAL_RESERVATION_STATE[key]) return;

    const fieldIsRequired = INITIAL_RESERVATION_STATE[key].required;
    const fieldIsEmpty = value.toString().length === 0;


    if (fieldIsRequired && fieldIsEmpty) {
      errors[key] = `${INITIAL_RESERVATION_STATE[key].label} is required`;
    }

    if (key === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(fields[key])) {
      errors[key] = `${INITIAL_RESERVATION_STATE[key].label} is not a valid email address`;
    }
  });
  return errors;
}

export default async function handle(req, res) {
  let apiOptions
  const petsAdded = req.body.pets.map((pet) => {
    return {
      id: pet.id
    }
  })

  delete req.body.reservationId
  delete req.body.pets
  const session = await getSession({ req });
  const sessionUserEmail = session?.user?.email
  if (sessionUserEmail) {
    apiOptions = {
      data: {
        author: { connect: { email: sessionUserEmail } },
        pets: { connect: petsAdded },
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
  if (errors && Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  } else {
    const reservation = await prisma.reservation.create(apiOptions);

    const transport = createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transport.sendMail({
      to: sessionUserEmail,
      from: `Gillette Kennels ${process.env.EMAIL_FROM}`,
      subject: `Your reservation at ${process.env.HOSTNAME}`,
      text: textNewReservationClient({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}` }),
      html: htmlNewReservationClient({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: sessionUserEmail }),

    });

    await transport.sendMail({
      to: process.env.EMAIL_FROM,
      from: `Gillette Kennels ${sessionUserEmail}`,
      subject: `New Client Reservation ${process.env.HOSTNAME}`,
      text: textNewReservation({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}` }),
      html: htmlNewReservationClient({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}`, host: process.env.HOSTNAME, origin: process.env.HOSTNAME, email: sessionUserEmail }),
    });
    return res.json(reservation);
  }

}
