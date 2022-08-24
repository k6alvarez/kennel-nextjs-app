import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

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
  const result = await prisma.guestReservation.create(apiOptions);
  res.json(result);
}
