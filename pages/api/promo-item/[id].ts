import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// DELETE /api/promo-item/:id
export default async function handle(req, res) {
    const promoId = req.query.id;
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
    if (req.method === 'DELETE') {
        const promoItem = await prisma.promoItem.delete({
            where: { id: promoId },
        });
        res.json(promoItem);
    } else {
        const promoItem = await prisma.promoItem.update({
            where: { id: promoId },
            data: { ...req.body },
        });
        res.json(promoItem);
    }
}
