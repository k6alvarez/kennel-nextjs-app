import { GuestReservation } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { text } from 'stream/consumers';
import { themesMap } from '../../../components/appStyles';
import { INITIAL_CLIENT_STATE } from '../../../components/Reservations/GuestClients/guestFormReducer';
import prisma from '../../../lib/prisma';

// POST /api/reservation
// Required fields in body: title
// Optional fields in body: content
type Errors = {
  [key in keyof GuestReservation]: string;
};

const validateFields = async (fields: GuestReservation) => {
  const errors: Partial<Errors> = undefined;
  // Object.entries(INITIAL_CLIENT_STATE).filter(([key, _value]) => {
  //   const fieldIsRequired = INITIAL_CLIENT_STATE[key].required;
  //   const fieldIsEmpty = fields[key].length === 0;
  //   if (fieldIsRequired && fieldIsEmpty) {
  //     errors[key] = `${INITIAL_CLIENT_STATE[key].label} is required`;
  //   }

  //   if (key === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(fields[key])) {
  //     errors[key] = `${INITIAL_CLIENT_STATE[key].label} is not a valid email address`;
  //   }
  // });
  return errors;
}

export default async function handle(req, res) {
  let apiOptions
  const petsAdded = req.body.pets.map((pet) => {
    return {
      id: pet.id
    } 
  })
  
  delete req.body.reservationId
  delete req.body.pets  
  const session = await getSession({ req });
  const sessionUserEmail = session?.user?.email
  if (sessionUserEmail) {
    apiOptions = {
      data: {
        author: { connect: { email: sessionUserEmail } },      
        pets: {connect : petsAdded},       
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
    const result = await prisma.reservation.create(apiOptions);    
    res.json(result);
  }
  
}
