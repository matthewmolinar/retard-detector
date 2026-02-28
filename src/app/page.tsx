"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
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
    setResult(data.result);
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
        {result && (
          <div className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-6 text-center">
            <p className="text-3xl font-bold text-white">{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}
