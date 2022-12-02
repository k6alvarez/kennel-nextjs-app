import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/premium-holiday-date
export default async function handle(req, res) {
    delete req.body.reservationId
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
        res.status(403).send("Forbidden. You do not have permission to make this request.");
        return;
    }

    const result = await prisma.holidayPremiumDates.create({
        data: {
            ...req.body,
        },
    });
    res.json(result);
}
