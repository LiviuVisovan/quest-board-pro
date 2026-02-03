import { mockQuests } from "@/lib/quests";
import type { Quest } from "@/lib/quests";

export let quests: Quest[] = [...mockQuests];

export function getQuest(id: string) {
  return quests.find((q) => q.id === id) ?? null;
}

export function setQuests(next: Quest[]) {
  quests = next;
}
