import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// DELETE /api/run/:id
export default async function handle(req, res) {
    const runID = req.query.id;
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
        const petRun = await prisma.petRun.delete({
            where: { id: runID },
        });
        res.json(petRun);
    } else {
        const petRun = await prisma.petRun.update({
            where: { id: runID },
            data: { ...req.body },
        });
        res.json(petRun);
    }
}
