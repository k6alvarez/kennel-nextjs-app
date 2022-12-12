import prisma from '../../../lib/prisma';

// DELETE /api/content-item/:id
export default async function handle(req, res) {
    const contentId = req.query.id;
    if (req.method === 'DELETE') {
        const contentItem = await prisma.contentItem.delete({
            where: { id: contentId },
        });
        res.json(contentItem);
    } else {
        const contentItem = await prisma.contentItem.update({
            where: { id: contentId },
            data: { ...req.body },
        });
        res.json(contentItem);
    }
}
