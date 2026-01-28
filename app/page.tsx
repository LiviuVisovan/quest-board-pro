"use client";

import { mockQuests, type Quest, QuestPriority } from "@/lib/quests";
import { useState } from "react";

export default function Home() {
  const PRIORITY_XP = { low: 25, medium: 50, high: 100 };
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [isEditing, setIsEditing] = useState(false);

  function completeQuest(id) {
    setQuests((prev) =>
      prev.map((q) => {
        return q.id === id ? { ...q, status: "done" } : q;
      }),
    );
  }

  function editQuest(id, updates: Partial<Quest>) {
    setQuests((prev) =>
      prev.map((q) => {
        return q.id === id ? { ...q, ...updates } : q;
      }),
    );
  }

  function deleteQuest(id) {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  }

  function createQuest(payload: Quest) {
    setQuests((prev) => [...prev, payload]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") || "");
    const description = String(fd.get("description") || "");
    const priority = String(fd.get("priority") || "low") as QuestPriority;
    const dueDate = String(fd.get("dueDate") || "");
    const tags = String(fd.get("tags") || "");

    const now = new Date().toISOString();
    const payload: Quest = {
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      status: "backlog",
      priority,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      dueDate: dueDate || undefined,
      createdAt: now,
      updatedAt: now,
    };
    createQuest(payload);
    e.currentTarget.reset();
  }

  function handleEditSubmit(e, id) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") || "");
    const description = String(fd.get("description") || "");
    const priority = String(fd.get("priority") || "low") as QuestPriority;
    const dueDate = String(fd.get("dueDate") || "");
    const tags = String(fd.get("tags") || "");

    const now = new Date().toISOString();
    const payload: Partial<Quest> = {
      title,
      description: description || undefined,
      priority,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      dueDate: dueDate || undefined,
      updatedAt: now,
    };
    editQuest(id, payload);
    e.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Quest Board Pro
          </h1>
          <p className="text-slate-300">
            A full-stack quest & task manager built with Next.js, TypeScript,
            Tailwind, and a real database. This is the central board where all
            quests live.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-slate-100 mb-2">
            Current quests
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl flex flex-col items-start gap-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800"
          >
            {" "}
            <label>title</label>
            <input id="title" name="title" className="bg-slate-950"></input>
            <label>description</label>
            <input
              id="description"
              name="description"
              className="bg-slate-950"
            ></input>
            <label>priority</label>
            <select id="priority" name="priority">
              <option>low</option>
              <option>medium</option>
              <option>high</option>
            </select>
            <label>due date</label>
            <input id="dueDate" name="dueDate" className="bg-slate-950"></input>
            <label>tags</label>
            <input id="tags" name="tags" className="bg-slate-950"></input>
            <button type="submit">Submit</button>
          </form>

          <div className="grid gap-4 md:grid-cols-2">
            {quests.map((quest) => (
              <article
                key={quest.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-slate-50">
                      {quest.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${
                        quest.status === "done"
                          ? "border-emerald-500/60 text-emerald-300"
                          : quest.status === "in_progress"
                            ? "border-sky-500/60 text-sky-300"
                            : "border-slate-600 text-slate-300"
                      }`}
                    >
                      {quest.status.replace("_", " ")}
                    </span>
                    <button
                      onClick={() => deleteQuest(quest.id)}
                      className="text-xs px-2 py-1 rounded-full border border-red-500/60 text-red-300"
                    >
                      X
                    </button>
                    <button
                      onClick={() => completeQuest(quest.id)}
                      className="text-xs px-2 py-1 rounded-full border border-emerald-500/60 text-emerald-300"
                    >
                      ✓
                    </button>
                  </div>

                  {quest.description && (
                    <p className="text-sm text-slate-300 mb-2">
                      {quest.description}
                    </p>
                  )}

                  {quest.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {quest.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <span>
                    Priority:{" "}
                    <span className="capitalize text-slate-300">
                      {quest.priority}
                    </span>
                  </span>

                  <span>
                    XP:{" "}
                    <span className="capitalize text-slate-300">
                      {PRIORITY_XP[quest.priority]}
                    </span>
                  </span>
                  {quest.dueDate && (
                    <span>Due: {quest.dueDate.slice(0, 10)}</span>
                  )}
                </div>
                <button onClick={() => setIsEditing((prev) => !prev)}>
                  Edit
                </button>
                {isEditing && (
                  <form
                    onSubmit={() => handleEditSubmit(e, quests.id)}
                    className="max-w-2xl flex flex-col items-start gap-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800"
                  >
                    {" "}
                    <label>title</label>
                    <input
                      id="title"
                      name="title"
                      className="bg-slate-950"
                    ></input>
                    <label>description</label>
                    <input
                      id="description"
                      name="description"
                      className="bg-slate-950"
                    ></input>
                    <label>priority</label>
                    <select id="priority" name="priority">
                      <option>low</option>
                      <option>medium</option>
                      <option>high</option>
                    </select>
                    <label>due date</label>
                    <input
                      id="dueDate"
                      name="dueDate"
                      className="bg-slate-950"
                    ></input>
                    <label>tags</label>
                    <input
                      id="tags"
                      name="tags"
                      className="bg-slate-950"
                    ></input>
                    <button type="submit">Submit</button>
                  </form>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
