import prisma from "../../lib/prisma"

export default async function handle(_req, res) {
    const hours = await prisma.businessHours.findMany();
    res.json(hours)
}
