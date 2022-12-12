import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/content-item
export default async function handle(req, res) {
    const { name, page, content } = req.body;

    const session = await getSession({ req });
    const result = await prisma.contentItem.create({
        data: {
            name,
            page,
            content,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
