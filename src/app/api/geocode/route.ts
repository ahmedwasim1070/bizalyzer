// Imports
import { NextRequest, NextResponse } from "next/server";

//
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { error: "Missing lat or lng parameters" },
      { status: 400 }
    );
  }

  try {
    const url = `${process.env.OPEN_CAGE_URL}?q=${lat},${lng}&key=${process.env.OPEN_CAGE_KEY}&no_annotations=1&limit=1&language=en`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`OpenCage API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data.result?.[0]?.components);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}
