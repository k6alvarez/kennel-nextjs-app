import prisma from "../../lib/prisma";

export default async function handle(_req, res) {
  const services = await prisma.service.findMany();
  res.json(services);
}
