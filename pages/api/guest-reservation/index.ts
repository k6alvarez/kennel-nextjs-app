import prisma from '../../../lib/prisma';

// POST /api/guest-reservation
export default async function handle(req, res) {
  const { email, name, arrivalDate, arrivalTime, departureDate, departureTime, dateConfirmed, specialInstructions } = req.body;
  const result = await prisma.guestReservation.create({
    data: {
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        departureTime: departureTime,
        dateConfirmed: dateConfirmed,
        specialInstructions: specialInstructions,
        email: email,
        name: name
    },
  });
  res.json(result);
}
