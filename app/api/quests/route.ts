import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const quests = await prisma.quest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return Response.json(quests);
}

export async function POST(req: Request) {
  const body = await req.json();

  const quest = await prisma.quest.create({
    data: {
      title: body.title,
      description: body.description ?? null,
      status: body.status,
      priority: body.priority,
    },
  });

  return Response.json(quest, { status: 201 });
}
