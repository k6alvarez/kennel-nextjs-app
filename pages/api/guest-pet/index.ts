import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/guest-pet
export default async function handle(req, res) {
    const reservationId = req.body.reservationId
    const session = await getSession({ req });

    delete req.body.reservationId

    const result = await prisma.guestPet.create({
        data: {
            ...req.body,
            guestReservation: { connect: { id: reservationId } },
        },
    });

    res.json(result);
}
