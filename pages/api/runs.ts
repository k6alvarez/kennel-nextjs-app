import prisma from "../../lib/prisma"

export default async function handle(_req, res) {
    const runs = await prisma.petRun.findMany();
    res.json(runs)
}
