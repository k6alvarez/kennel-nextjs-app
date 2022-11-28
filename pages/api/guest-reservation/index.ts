import { GuestReservation } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { INITIAL_USER_STATE } from '../../../components/Reservations/formInitialState';
import prisma from '../../../lib/prisma';



type Errors = {
  [key in keyof GuestReservation]: string;
};


const validateFields = (fields: GuestReservation) => {
  const errors: Partial<Errors> = {};
  fields && Object.entries(INITIAL_USER_STATE).filter(([key, _value]) => {
    const fieldIsRequired = INITIAL_USER_STATE[key].required;
    const fieldIsEmpty = fields[key].length === 0;

    if (fieldIsRequired && fieldIsEmpty) {
      errors[key] = `${INITIAL_USER_STATE[key].label} is required`;
    }

    if (key === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(fields[key])) {
      errors[key] = `${INITIAL_USER_STATE[key].label} is not a valid email address`;
    }
  });
  return errors;
}

// POST /api/guest-reservation
export default async function handle(req, res) {
  let apiOptions
  delete req.body.reservationId
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

  const errors = validateFields(apiOptions.data)
  if (errors && Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  } else {
    const result = await prisma.guestReservation.create(apiOptions);
    return res.json(result);
  }

}



export const getYear = () => {
  const date = new Date();
  return date.getFullYear();
};