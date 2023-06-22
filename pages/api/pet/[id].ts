import prisma from '../../../lib/prisma';

// DELETE /api/pet/:id
export default async function handle(req, res) {
  const petId = req.query.id;
  if (req.method === 'DELETE') {
    const pet = await prisma.pet.delete({
      where: { id: petId },
    });
    res.json(pet);
  }

  if (req.method === 'PUT') {
    const pet = await prisma.pet.update({
      where: { id: petId },
      data: req.body,
    });
    res.json(pet);
  }
}
