import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
      <div className="max-w-2xl w-full px-6 py-10 rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          Quest Board Pro
        </h1>
        <p className="text-slate-300 mb-6">
          A full-stack task & quest manager built with Next.js, TypeScript,
          Tailwind CSS, and a real database. Designed to showcase my skills as a
          modern frontend & backend developer.
        </p>

        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span>Next.js App Router · React · TypeScript</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-sky-400" />
            <span>Tailwind CSS UI · Responsive layout</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-violet-400" />
            <span>Planned: Auth, database, API routes, full CRUD</span>
          </div>
        </div>

        <div className="mt-8 text-xs text-slate-500">
          <p>
            Status:{" "}
            <span className="text-emerald-400">Project just started</span>. Core
            layout and architecture coming next.
          </p>
        </div>
      </div>
    </main>
  );
}
