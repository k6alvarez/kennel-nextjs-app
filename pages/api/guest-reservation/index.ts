
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/guestReservation
export default async function handle(req, res) {
    const {
        name,
        lastName,
        email,
        address,
        addressUnit,
        city,
        state,
        zip,
        phone,
        altPhone,
        emergencyContactName,
        emergencyContactPhone,
        arrivalDate,
        arrivalTime,
        departureDate,
        departureTime,
        dateConfirmed,
        specialInstructions,
        howHear,
        petOneType,
        petOneName,
        petOneBreed,
        petOneGender,
        petOneFixed,
        petOneColor,
        petOneImage,
        petOneLargeImage,
        petOneVaccinations,
        petOneVaccinationsLargeImage,
        petOneAge,
        petOneWeight,
        petOneVet,
        petOnePreferredRunSize,
        petOneFeeding,
        petOneFeedingCount,
      } = req.body;

  const session = await getSession({ req });
  const result = await prisma.guestReservation.create({
      data: {
        author: { connect: { email: session?.user?.email } },
        name: name,
        lastName: lastName,
        email: email,
        address: address,
        addressUnit: addressUnit,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        altPhone: altPhone,
        emergencyContactName: emergencyContactName,
        emergencyContactPhone: emergencyContactPhone,
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
        departureDate: departureDate,
        departureTime: departureTime,
        dateConfirmed: dateConfirmed,
        specialInstructions: specialInstructions,
        howHear: howHear,
        petOneType: petOneType,
        petOneName: petOneName,
        petOneBreed: petOneBreed,
        petOneGender: petOneGender,
        petOneFixed: petOneFixed,
        petOneColor: petOneColor,
        petOneImage: petOneImage,
        petOneLargeImage: petOneLargeImage,
        petOneVaccinations: petOneVaccinations,
        petOneVaccinationsLargeImage: petOneVaccinationsLargeImage,
        petOneAge: petOneAge,
        petOneWeight: petOneWeight,
        petOneVet: petOneVet,
        petOnePreferredRunSize: petOnePreferredRunSize,
        petOneFeeding: petOneFeeding,
        petOneFeedingCount: petOneFeedingCount,
    },
  });
  res.json(result);
}
