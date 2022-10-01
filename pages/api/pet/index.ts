import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/pet
export default async function handle(req, res) {
  const session = await getSession({ req });
  const result = await prisma.pet.create({
    data: {
      ...req.body,
      owner: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
