"use client";

import { useState, useEffect, useRef } from "react";

const SCAN_STEPS = [
  "Fetching tweet data...",
  "Analyzing linguistic patterns...",
  "Running neural sentiment model...",
  "Cross-referencing IQ database...",
  "Calculating retard coefficient...",
  "Finalizing results...",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [number, setNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function getHandle(tweetUrl: string) {
    const match = tweetUrl.match(
      /(?:twitter\.com|x\.com)\/(@?\w+)/i
    );
    return match ? `@${match[1].replace("@", "")}` : "this tweet";
  }

  function getTweetId(tweetUrl: string) {
    const match = tweetUrl.match(/status\/(\d+)/);
    return match ? match[1] : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setShowResult(false);
    setNumber(null);
    setAnimatedNumber(0);
    setLoading(true);
    setScanStep(0);

    // Fake scanning animation
    for (let i = 0; i < SCAN_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 400));
      setScanStep(i + 1);
    }

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: url }),
    });
    const data = await res.json();
    setNumber(data.number);
    setLoading(false);
    setShowResult(true);
  }

  // Animate the number counting up
  useEffect(() => {
    if (!showResult || number === null) return;
    let current = 0;
    const increment = Math.max(1, Math.floor(number / 30));
    const interval = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(interval);
      }
      setAnimatedNumber(current);
    }, 30);
    return () => clearInterval(interval);
  }, [showResult, number]);

  function getVerdict(n: number) {
    if (n >= 90) return "MAXIMUM RETARD DETECTED";
    if (n >= 70) return "HIGHLY RETARDED";
    if (n >= 50) return "MODERATELY RETARDED";
    if (n >= 30) return "SLIGHT RETARD TENDENCIES";
    return "BARELY RETARDED";
  }

  function shareOnTwitter() {
    if (number === null) return;
    const handle = getHandle(url);
    const resultUrl = `https://retard-detector.vercel.app/r/${encodeURIComponent(handle)}/${number}`;
    const text = `${handle} scored ${number}% on the Retard Detector 💀`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(resultUrl)}`;
    window.open(shareUrl, "_blank");
  }

  function reset() {
    setUrl("");
    setNumber(null);
    setShowResult(false);
    setAnimatedNumber(0);
    setScanStep(0);
    inputRef.current?.focus();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <main className="flex w-full max-w-lg flex-col items-center gap-8 px-6 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight">
            Retard Detector
          </h1>
          <p className="mt-2 text-zinc-500">
            AI-powered tweet analysis
          </p>
        </div>

        {!showResult ? (
          <>
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
              <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste tweet link..."
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 text-lg text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="rounded-xl bg-white px-6 py-4 text-lg font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? "Scanning..." : "Analyze Tweet"}
              </button>
            </form>

            {loading && (
              <div className="w-full space-y-3">
                {SCAN_STEPS.map((step, i) => (
                  <div
                    key={step}
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      i < scanStep
                        ? "opacity-100"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span className="text-green-400">
                      {i < scanStep ? "✓" : ""}
                    </span>
                    <span
                      className={`text-sm ${
                        i < scanStep ? "text-zinc-400" : "text-zinc-600"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full space-y-6 animate-in fade-in duration-500">
            {/* Result card */}
            <div className="w-full rounded-2xl bg-zinc-800/80 p-8">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {number !== null && getVerdict(number)}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-9xl font-black text-white leading-none">
                  {animatedNumber}
                  <span className="text-4xl text-zinc-500">%</span>
                </p>
                <div className="mb-3 rounded-lg bg-zinc-700/50 px-4 py-2.5 flex items-center gap-3">
                  <span className="inline-block h-3 w-3 rounded-sm bg-zinc-400" />
                  <span className="text-sm text-zinc-400">Retard</span>
                  <span className="text-sm font-medium text-zinc-300">
                    {animatedNumber}%
                  </span>
                </div>
              </div>
              <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-zinc-700">
                <div
                  className="h-full rounded-full bg-zinc-300 transition-all duration-1000 ease-out"
                  style={{ width: `${animatedNumber}%` }}
                />
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={shareOnTwitter}
              className="w-full rounded-xl bg-white px-6 py-4 text-lg font-bold text-black transition-all hover:bg-zinc-200 active:scale-[0.98]"
            >
              Reply with Score on 𝕏
            </button>

            {/* Try another */}
            <button
              onClick={reset}
              className="w-full rounded-xl border border-zinc-800 px-6 py-4 text-lg font-medium text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
            >
              Try another tweet
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
