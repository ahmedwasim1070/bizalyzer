import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = searchParams.get("countryCode");

  if (!countryCode) {
    return NextResponse.json(
      { error: "Country code is required" },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(
        `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&orderby=population&maxRows=100&username=${process.env.GEONAME_USERNAME}`
    );
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from GEONAMES api" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const geoData = data?.geonames;
    if (!geoData || geoData.length === 0) {
      return NextResponse.json(
        { message: "No Geodata found ." },
        { status: 500 }
      );
    }

    const cityNames: string[] = geoData.map((cityInfo: any) => cityInfo.name);

    return NextResponse.json(cityNames);
  } catch (error) {
    console.error("Error in GEONAMES API , ", error);
    return NextResponse.json(
      { message: "Internel server error !" },
      { status: 500 }
    );
  }
}
