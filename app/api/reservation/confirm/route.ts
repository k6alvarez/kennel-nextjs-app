import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const { id } = await request.json();
  const reservation = await prisma?.guestReservation.update({
    where: { id },
    data: { confirmed: true },
  });

  return new Response(JSON.stringify(reservation));
}
