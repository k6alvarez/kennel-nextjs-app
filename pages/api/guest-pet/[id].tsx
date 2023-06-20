import prisma from "../../../lib/prisma";

// DELETE /api/guest-pet/:id
export default async function handle(req, res) {
  const petId = req.query.id;
  if (req.method === "DELETE") {
    const guestPet = await prisma.guestPet.delete({
      where: { id: petId },
    });
    res.json(guestPet);
  }

  if (req.method === "PUT") {
    const data = JSON.parse(req.body);
    const guestPet = await prisma.guestPet.update({
      where: { id: petId },
      data,
    });
    res.json(guestPet);
  }
}
