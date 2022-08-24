import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const validateFields = async (fields: any) => {
  const errors: any = {};
  if (!fields.name) {
    errors.name = 'Name is required';
  }
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
