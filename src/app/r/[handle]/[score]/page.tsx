import { Metadata } from "next";

type Props = {
  params: Promise<{ handle: string; score: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, score } = await params;
  const decodedHandle = decodeURIComponent(handle);
  const num = parseInt(score, 10);

  let verdict = "BARELY RETARDED";
  if (num >= 90) verdict = "MAXIMUM RETARD DETECTED";
  else if (num >= 70) verdict = "HIGHLY RETARDED";
  else if (num >= 50) verdict = "MODERATELY RETARDED";
  else if (num >= 30) verdict = "SLIGHT RETARD TENDENCIES";

  const ogUrl = `https://retard-detector.vercel.app/api/og?handle=${encodeURIComponent(decodedHandle)}&score=${num}`;

  return {
    title: `${decodedHandle} scored ${num}% — Retard Detector`,
    description: `${verdict}. Test any tweet at retard-detector.vercel.app`,
    openGraph: {
      title: `${decodedHandle} scored ${num}%`,
      description: verdict,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${decodedHandle} scored ${num}%`,
      description: verdict,
      images: [ogUrl],
    },
  };
}

export default async function ResultPage({ params }: Props) {
  const { handle, score } = await params;
  const decodedHandle = decodeURIComponent(handle);
  const num = parseInt(score, 10) || 0;

  let verdict = "BARELY RETARDED";
  if (num >= 90) verdict = "MAXIMUM RETARD DETECTED";
  else if (num >= 70) verdict = "HIGHLY RETARDED";
  else if (num >= 50) verdict = "MODERATELY RETARDED";
  else if (num >= 30) verdict = "SLIGHT RETARD TENDENCIES";

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <main className="flex w-full max-w-lg flex-col items-center gap-8 px-6 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-black text-white tracking-tight">
            Retard Detector
          </h1>
          <p className="mt-2 text-zinc-500">AI-powered tweet analysis</p>
        </div>

        <div className="w-full rounded-2xl bg-zinc-800/80 p-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {verdict}
          </p>
          <p className="mb-1 text-lg text-zinc-400">{decodedHandle}</p>
          <div className="flex items-end justify-between">
            <p className="text-9xl font-black text-white leading-none">
              {num}
              <span className="text-4xl text-zinc-500">%</span>
            </p>
            <div className="mb-3 rounded-lg bg-zinc-700/50 px-4 py-2.5 flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-sm bg-zinc-400" />
              <span className="text-sm text-zinc-400">Retard</span>
              <span className="text-sm font-medium text-zinc-300">{num}%</span>
            </div>
          </div>
          <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-zinc-700">
            <div
              className="h-full rounded-full bg-zinc-300"
              style={{ width: `${num}%` }}
            />
          </div>
        </div>

        <a
          href="/"
          className="w-full rounded-xl bg-white px-6 py-4 text-center text-lg font-bold text-black transition-all hover:bg-zinc-200"
        >
          Test a Tweet
        </a>
      </main>
    </div>
  );
}
