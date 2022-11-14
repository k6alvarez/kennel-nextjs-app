import prisma from '../../../lib/prisma';
import { PetProps } from '../../profile';

// PUT /api/guest-reservation/:id
export default async function handle(req, res) {
    const petsAdded = req.body.pets.for        
    const reservationId = req.body.reservationId;
    delete req.body.reservationId
    delete req.body.pets  
    const updatedReservation = await prisma.guestReservation.update({
        where: { id: reservationId },
        data: { ...req.body, pets: { connect : petsAdded } },
    });
    res.json(updatedReservation);
}
