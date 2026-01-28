import { mockQuests } from "@/lib/quests";

export default function Home() {
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

          <div className="grid gap-4 md:grid-cols-2">
            {mockQuests.map((quest) => (
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
                  {quest.dueDate && (
                    <span>Due: {quest.dueDate.slice(0, 10)}</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
