import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma"

export default async function handle(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).send("Unauthorized. Please sign in.");
        return;
    }
    const reservations = await prisma.reservation.findMany({
        where: {
            author: {
                email: session.user.email,
            },
            createdAt: {
                gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
            },
        },
        include: {
            author: true,
            pets: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const guestReservations = await prisma.guestReservation.findMany({
        where: {
            email: session.user.email,
        },
        include: {
            pets: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    res.json([...guestReservations, ...reservations, ...guestReservations, ...reservations]);
}
