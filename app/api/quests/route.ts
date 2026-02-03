import { mockQuests } from "@/lib/quests";

let quests = [...mockQuests];

export async function GET() {
  return new Response(JSON.stringify(quests), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const newQuest = await req.json();

  quests.push(newQuest);

  return new Response(JSON.stringify(newQuest), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
