import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// DELETE /api/service/:id
export default async function handle(req, res) {
    const contentId = req.query.id;
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
        const service = await prisma.service.delete({
            where: { id: contentId },
        });
        res.json(service);
    } else {
        const service = await prisma.service.update({
            where: { id: contentId },
            data: { ...req.body },
        });
        res.json(service);
    }
}
