import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).send("Unauthorized. Please sign in.");
        return;
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });
    const pets = await prisma.pet.findMany({
        where: { ownerId: user.id },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(pets)
}