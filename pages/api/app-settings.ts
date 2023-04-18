import prisma from "../../lib/prisma"

// GET /api/app-settings
export default async function handle(req, res) {
    const appSettings = await prisma.appSetting.findFirst();
    res.json(appSettings);
}