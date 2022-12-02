import prisma from "../../lib/prisma"

export default async function handle(_req, res) {
    const dates = await prisma.holidayPremiumDates.findMany();
    res.json(dates)
}
