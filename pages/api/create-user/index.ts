import { Prisma } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

const adapter = PrismaAdapter(prisma)


// POST /api/create-user
export default async function handle(req, res) {
    // use the adapter to check if the user exists in the database already or not
    const user = await adapter.getUserByEmail(req.body.email)
    // if the user exists, return a 409 error
    if (user) {
        res.status(409).send("A new user cannot be created with this email.");
        return;
    }
    // if the user does not exist, create the user with the adapter
    try {
        const result = await adapter.createUser({
            name: req.body.name,
            email: req.body.email,
            emailVerified: null,
        })
        res.json(result);
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {

            if (e.code === 'P2002') {
                console.log(
                    'There is a unique constraint violation, a new user cannot be created with this email'
                )
                res.status(409).send("A new user cannot be created with this email.");
            }
        } else {
            console.log('error', e)
        }
    }
}

