import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== "string") {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  const number = Math.floor(Math.random() * 100) + 1;

  return NextResponse.json({ number, result: `${number} ai-generated` });
}
