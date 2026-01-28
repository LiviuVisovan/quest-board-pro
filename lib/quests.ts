export type QuestStatus =
  | "backlog"
  | "todo"
  | "in_progress"
  | "done"
  | "archived";

export type QuestPriority = "low" | "medium" | "high";

export type Quest = {
  id: string;
  title: string;
  description?: string;
  status: QuestStatus;
  priority: QuestPriority;
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Set up Next.js project structure",
    description:
      "Clean base layout, configure Tailwind, prepare for auth & DB.",
    status: "done",
    priority: "medium",
    tags: ["setup", "frontend"],
    dueDate: undefined,
    createdAt: "2026-01-28T10:00:00.000Z",
    updatedAt: "2026-01-28T11:00:00.000Z",
  },
  {
    id: "2",
    title: "Design Quest data model",
    description: "Define Quest types, status, priority, tags and timestamps.",
    status: "in_progress",
    priority: "high",
    tags: ["design", "backend"],
    dueDate: "2026-01-30T00:00:00.000Z",
    createdAt: "2026-01-28T11:30:00.000Z",
    updatedAt: "2026-01-28T11:35:00.000Z",
  },
  {
    id: "3",
    title: "Build basic quest list UI",
    description: "Render mock quests on the homepage to validate layout.",
    status: "backlog",
    priority: "medium",
    tags: ["frontend", "ui"],
    dueDate: undefined,
    createdAt: "2026-01-28T11:40:00.000Z",
    updatedAt: "2026-01-28T11:40:00.000Z",
  },
];
