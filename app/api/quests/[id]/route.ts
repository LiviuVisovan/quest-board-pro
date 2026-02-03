import { quests, setQuests } from "@/lib/questsStore";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const next = quests.filter((q) => q.id !== params.id);
  setQuests(next);
  return new Response(null, { status: 204 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const payload = await req.json();
  const next = quests.map((q) => {
    if (q.id === params.id) {
      return { ...q, ...payload };
    }
    return q;
  });
  setQuests(next);
  return new Response(null, { status: 204 });
}
