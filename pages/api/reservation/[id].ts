import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { createTransport } from "nodemailer"
import { themesMap } from "../../../components/appStyles";
import { htmlReservationConfirmedClient, textReservationConfirmedClient } from "../../../utils/emailHelpers";

// DELETE /api/reservation/:id
export default async function handle(req, res) {
    const reservationId = req.query.id;
    const reservationEmail = JSON.parse(req.body).reservationEmail;
    const session = await getSession({ req });
    const data = JSON.parse(req.body);
    delete data.reservationEmail;

    if (!session) {
        res.status(401).send("Unauthorized. Please sign in.");
        return;
    }

    const transport = createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
        }
    });

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const isAdmin = user?.permissions?.includes("ADMIN");

    if (req.method === "DELETE" && isAdmin) {
        const reservation = await prisma.reservation.delete({
            where: { id: reservationId },
        });
        res.json(reservation);
    } else if (isAdmin) {
        const reservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: { ...data },
        });

        if (data.confirmed) {
            await transport.sendMail({
                to: reservationEmail,
                from: `Gillette Kennels ${process.env.EMAIL_FROM}`,
                subject: `Your reservation at ${process.env.HOSTNAME}`,
                text: textReservationConfirmedClient({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}` }),
                html: htmlReservationConfirmedClient({ url: `${process.env.HOSTNAME}/reservation/${reservation.id}`, origin: process.env.HOSTNAME }),
            });
        }
        res.json(reservation);
    } else {
        res.status(403).send("Forbidden. You do not have permission to make this request.");
        return;
    }
}
