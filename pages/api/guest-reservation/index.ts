import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/guest-reservation
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  let apiOptions
  const { name } = req.body;

  const session = await getSession({ req });
  if (session?.user?.email) {
    apiOptions = {
      data: {
        author: { connect: { email: session?.user?.email } },
        name: name,
      },
    }
  } else {
    apiOptions = {
      data: {
        name: name,
      },
    }
  }
  const result = await prisma.guestReservation.create(apiOptions);
  res.json(result);
}
