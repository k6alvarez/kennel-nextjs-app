import prisma from "../../../lib/prisma";

// PUT /api/profile/:id
export default async function handle(req, res) {
    const userId = req.query.id;
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: { id: userId },
        data: { name: name},
    });
    res.json(user);
}