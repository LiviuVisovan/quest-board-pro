import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const body = await req.json();

  const data: any = {};
  if (typeof body.title === "string") data.title = body.title;
  if (typeof body.description === "string") data.description = body.description;
  if (body.description === null) data.description = null;
  if (typeof body.status === "string") data.status = body.status;
  if (typeof body.priority === "string") data.priority = body.priority;

  const quest = await prisma.quest.update({
    where: { id },
    data,
  });

  return Response.json(quest);
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  await prisma.quest.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
