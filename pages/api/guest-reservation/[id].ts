import prisma from '../../../lib/prisma';

// PUT /api/guest-reservation/:id
export default async function handle(req, res) {

    const reservationId = req.body.reservationId;
    delete req.body.reservationId;
    const updatedReservation = await prisma.guestReservation.update({
        where: { id: reservationId },
        data: { ...req.body },
    });
    res.json(updatedReservation);
}
