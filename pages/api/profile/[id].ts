import { User } from "@prisma/client";
import prisma from "../../../lib/prisma";

// PUT /api/profile/:id
export default async function handle(req: { query: { id: any; }; body: any; }, res: { json: (arg0: User) => void; }) {
    const userId = req.query.id;



    const user = await prisma.user.update({
        where: { id: userId },
        data: { ...req.body },
    });

    res.json(user);
}