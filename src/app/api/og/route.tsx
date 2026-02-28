import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

function getVerdict(n: number) {
  if (n >= 90) return "MAXIMUM RETARD DETECTED";
  if (n >= 70) return "HIGHLY RETARDED";
  if (n >= 50) return "MODERATELY RETARDED";
  if (n >= 30) return "SLIGHT RETARD TENDENCIES";
  return "BARELY RETARDED";
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const handle = searchParams.get("handle") || "someone";
  const score = parseInt(searchParams.get("score") || "50", 10);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#18181b",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div
            style={{
              fontSize: "24px",
              color: "#71717a",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            {getVerdict(score)}
          </div>
          <div style={{ fontSize: "32px", color: "#a1a1aa" }}>
            {handle}
          </div>
        </div>

        {/* Big number */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginTop: "20px",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "260px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
            }}
          >
            {score}
          </div>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 900,
              color: "#71717a",
              lineHeight: 1,
            }}
          >
            %
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "24px",
            backgroundColor: "#3f3f46",
            borderRadius: "12px",
            marginTop: "auto",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${score}%`,
              height: "100%",
              backgroundColor: "#d4d4d8",
              borderRadius: "12px",
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "22px", color: "#52525b" }}>
            retard-detector.vercel.app
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "#27272a",
              padding: "10px 20px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: "#a1a1aa",
                borderRadius: "3px",
              }}
            />
            <div style={{ fontSize: "20px", color: "#a1a1aa" }}>Retard</div>
            <div style={{ fontSize: "20px", color: "#d4d4d8", fontWeight: 600 }}>
              {score}%
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
