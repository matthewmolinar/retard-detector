import { Metadata } from "next";
import { redirect } from "next/navigation";

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
  const { score } = await params;
  const num = parseInt(score, 10);
  if (isNaN(num)) redirect("/");
  redirect(`/?shared=true`);
}
