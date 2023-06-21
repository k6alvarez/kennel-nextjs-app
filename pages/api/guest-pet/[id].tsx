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
    console.log("🚀 ~ file: [id].tsx:15 ~ handle ~ data:", data);
    const guestPet = await prisma.guestPet.update({
      where: { id: petId },
      data,
    });
    res.json(guestPet);
  }
}
