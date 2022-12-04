import prisma from '../../../lib/prisma';

// POST /api/guest-pet
export default async function handle(req, res) {
    console.log("🚀 ~ file: index.ts:5 ~ handle ~ req", req.body)
    const reservationId = req.body.reservationId

    delete req.body.reservationId
    delete req.body.guestReservation

    const result = await prisma.guestPet.create({
        data: {
            ...req.body,
            reservations: { connect: { id: reservationId } },
        },
    });
    res.json(result);
}
