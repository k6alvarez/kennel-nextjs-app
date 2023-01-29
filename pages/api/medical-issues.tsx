import prisma from "../../lib/prisma";

export default async function handle(_req, res) {
  const issues = await prisma.medicalIssue.findMany();
  res.json(issues);
}
