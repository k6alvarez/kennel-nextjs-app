import { GuestReservation } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { INITIAL_STATE } from '../../../components/Reservations/NewClients/formReducer';
import prisma from '../../../lib/prisma';

type Errors = {
  [key in keyof GuestReservation]: string;
};


const validateFields = async (fields: GuestReservation) => {
  const errors: Partial<Errors> = undefined;
  Object.entries(INITIAL_STATE).filter(([key, _value]) => {
    const isRequired = INITIAL_STATE[key].required && !fields[key];
    if (isRequired) {
      errors[key] = `${INITIAL_STATE[key].label} is required`;
    }
  });
  return errors;
}

// POST /api/guest-reservation
export default async function handle(req, res) {
  let apiOptions

  const session = await getSession({ req });
  if (session?.user?.email) {
    apiOptions = {
      data: {
        author: { connect: { email: session?.user?.email } },
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
    res.json(result);
  }
}
