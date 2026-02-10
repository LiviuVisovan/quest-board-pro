"use client";

import { mockQuests, type Quest, QuestPriority } from "@/lib/quests";
import { useEffect, useState } from "react";

export default function Home() {
  const PRIORITY_XP = { low: 25, medium: 50, high: 100 };
  const [quests, setQuests] = useState<Quest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState("");
  const [loadError, setLoadError] = useState<string | null>(null);
  const surface =
    "rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]";

  async function fetchQuests() {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/quests");
      if (!res.ok) throw new Error(`Failed to load quests (${res.status})`);
      const data = await res.json();
      setQuests(data);
    } catch (e: any) {
      setLoadError(e?.message ?? "Failed to load quests");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchQuests();
  }, []);

  function completeQuest(id: string) {
    setQuests((prev) =>
      prev.map((q) => {
        return q.id === id ? { ...q, status: "done" } : q;
      }),
    );
  }

  async function editQuest(id: string, updates: Partial<Quest>) {
    await fetch(`/api/quests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    await fetchQuests();
  }

  async function deleteQuest(id: string) {
    await fetch(`/api/quests/${id}`, { method: "DELETE" });
    await fetchQuests();
  }
  async function createQuest(newQuest: Quest) {
    const res = await fetch("/api/quests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuest),
    });

    if (!res.ok) throw new Error("Failed to create quest");

    const created = (await res.json()) as Quest;
    fetchQuests();
    return created;
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

  function handleEditSubmit(e, id: string) {
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
    setEditingId("");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex  justify-center">
      <div className="max-w-4xl w-full px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-2">
            Quest Board Pro
          </h1>
          <p className="text-slate-300">
            A full-stack quest board with next js
          </p>
        </header>
        <div className={`${surface} mx-auto max-w-5xl p-4`}>
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Create quest
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-3"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>

              <div className="w-full sm:w-40">
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                >
                  <option>low</option>
                  <option>medium</option>
                  <option>high</option>
                </select>
              </div>

              <button
                type="submit"
                className="h-[38px] rounded-xl bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-500"
              >
                Add
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Description
                </label>
                <input
                  id="description"
                  name="description"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Due date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Tags
                </label>
                <input
                  id="tags"
                  name="tags"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                />
              </div>
            </div>
          </form>
        </div>
        <section className="space-y-4 mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-3xl font-semibold tracking-tight  mb-2 mt-2">
            Quests
          </h2>

          <div className="grid gap-4 md:grid-cols-2 ">
            {isLoading ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                Loading quests…
              </div>
            ) : loadError ? (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">
                <p className="mb-3">⚠️ {loadError}</p>
                <button
                  className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15"
                  onClick={fetchQuests}
                >
                  Retry
                </button>
              </div>
            ) : quests.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
                No quests yet. Create your first one 👇
              </div>
            ) : (
              quests.map((quest) => (
                <article key={quest.id} className={`${surface} p-6`}>
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
                        {quest.status}
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

                    {(quest.tags ?? []).length > 0 && (
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
                  <button
                    className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                    onClick={() => setEditingId(quest.id)}
                  >
                    Edit
                  </button>
                  {editingId === quest.id && (
                    <form
                      onSubmit={(e) => handleEditSubmit(e, quest.id)}
                      className=" max-w-md space-y-4 flex flex-col items-start gap-2 bg-slate-900/60 p-4 rounded-2xl border border-slate-800"
                    >
                      {" "}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">
                          title
                        </label>
                        <input
                          id="title"
                          name="title"
                          defaultValue={quest.title}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                        ></input>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">
                          description
                        </label>
                        <input
                          id="description"
                          name="description"
                          defaultValue={quest.description}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                        ></input>
                      </div>
                      <label className="text-xs font-medium text-slate-300">
                        priority
                      </label>
                      <select id="priority" name="priority">
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                      </select>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">
                          due date
                        </label>
                        <input
                          id="dueDate"
                          name="dueDate"
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                        ></input>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-slate-300">
                          tags
                        </label>
                        <input
                          id="tags"
                          name="tags"
                          className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                        ></input>
                      </div>
                      <button
                        type="submit"
                        className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
