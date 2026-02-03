import { prisma } from "@/lib/prisma";

export async function GET() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(quests);
}
