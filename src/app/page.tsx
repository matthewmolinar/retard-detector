"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    setNumber(data.number);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="flex w-full max-w-md flex-col items-center gap-8 px-6">
        <h1 className="text-4xl font-bold text-white">Retard Detector</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text to analyze..."
            rows={4}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Detect"}
          </button>
        </form>
        {number !== null && (
          <div className="w-full rounded-xl bg-zinc-800/80 p-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-zinc-400">
              Fully Retard Written
            </p>
            <div className="flex items-start justify-between">
              <p className="text-8xl font-black text-white leading-none">
                {number}
                <span className="text-3xl text-zinc-400">%</span>
              </p>
              <div className="mt-2 rounded-lg bg-zinc-700/60 px-4 py-2 flex items-center gap-3">
                <span className="inline-block h-3 w-3 rounded-sm bg-zinc-400" />
                <span className="text-sm text-zinc-400">Retard</span>
                <span className="text-sm text-zinc-400">{number} %</span>
              </div>
            </div>
            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-zinc-700">
              <div
                className="h-full rounded-full bg-zinc-300 transition-all duration-700"
                style={{ width: `${number}%` }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
