import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const { id } = await request.json();
  const reservation = await prisma?.guestReservation.update({
    where: { id },
    data: { confirmed: true },
  });

  return new Response(JSON.stringify(reservation));
}
