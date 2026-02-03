import { quests, setQuests } from "@/lib/questsStore";

export async function GET() {
  return new Response(JSON.stringify(quests), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const newQuest = await req.json();
  setQuests([...quests, newQuest]);
  return new Response(JSON.stringify(newQuest), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
