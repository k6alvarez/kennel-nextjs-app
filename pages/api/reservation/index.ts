import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/reservation
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { arrivalDate, arrivalTime, departureDate, departureTime, dateConfirmed, specialInstructions } = req.body;

  const session = await getSession({ req });
  const result = await prisma.reservation.create({
    data: {
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        departureTime: departureTime,
        dateConfirmed: dateConfirmed,
        specialInstructions: specialInstructions,
        author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
