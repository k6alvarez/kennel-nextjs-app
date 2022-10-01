import prisma from '../../../lib/prisma';

// DELETE /api/pet/:id
export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const pet = await prisma.pet.delete({
      where: { id: postId },
    });
    res.json(pet);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}
