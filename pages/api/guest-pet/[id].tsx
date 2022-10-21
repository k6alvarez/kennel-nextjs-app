import prisma from "../../../lib/prisma";

// DELETE /api/guest-pet/:id
export default async function handle(req, res) {
  const petId = req.query.id;
  if (req.method === "DELETE") {
    const guestPet = await prisma.guestPet.delete({
      where: { id: petId },
    });
    res.json(guestPet);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
