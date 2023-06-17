
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// DELETE /api/reservation/:id
export default async function handle(req, res) {
    const reservationId = req.query.id;
    const session = await getSession({ req });
    if (!session) {
        res.status(401).send("Unauthorized. Please sign in.");
        return;
    }
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const isAdmin = user?.permissions?.includes("ADMIN");

    if (!isAdmin) {
        res
            .status(403)
            .send("Forbidden. You do not have permission to make this request.");
        return;
    }
    if (req.method === "DELETE") {
        const reservation = await prisma.reservation.delete({
            where: { id: reservationId },
        });
        res.json(reservation);
    } else {
        const reservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: { ...JSON.parse(req.body) },
        });
        res.json(reservation);
    }
}
