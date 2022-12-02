import prisma from "../../lib/prisma"

export default async function handle(_req, res) {
    const pets = await prisma.holidayPremiumDates.findMany();
    res.json(pets)
}
