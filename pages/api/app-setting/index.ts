import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/app-setting
export default async function handle(req, res) {
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

    const result = await prisma.appSetting.create({
        data: {
            ...req.body,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
