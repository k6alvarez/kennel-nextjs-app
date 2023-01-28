import { Prisma } from '@prisma/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/run
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


    try {
        const result = await prisma.petRun.create({
            data: {
                ...req.body,
                author: { connect: { email: session?.user?.email } },
            },
        });
        res.json(result);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
                res.status(409).send("There is a unique constraint violation, a new user cannot be created with this email");
            }
        }
        throw e
    }


}
