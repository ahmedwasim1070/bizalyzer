import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json(
      { message: "Latitude and longitude are required." },
      { status: 400 }
    );
  }

  // Validate lat/lng are valid numbers
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lng);

  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json(
      { message: "Invalid latitude or longitude format." },
      { status: 400 }
    );
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return NextResponse.json(
      {
        message:
          "Latitude must be between -90 and 90, longitude between -180 and 180.",
      },
      { status: 400 }
    );
  }

  if (!process.env.OPENCAGE_KEY) {
    console.error("OPENCAGE_KEY environment variable is not set");
    return NextResponse.json(
      { message: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${process.env.OPENCAGE_KEY}&no_annotations=1&limit=1&language=en`
    );

    if (!response.ok) {
      console.error(
        `OpenCage API error: ${response.status} ${response.statusText}`
      );
      return NextResponse.json(
        { message: "Error fetching data from OpenCage API" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check if we got results
    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { message: "No location data found for the provided coordinates." },
        { status: 404 }
      );
    }

    const selectedData = data.results[0].components;

    // Return the response using NextResponse.json
    return NextResponse.json({
      city: selectedData?.city || null,
      town: selectedData?.town || null,
      village: selectedData?.village || null,
      country: selectedData?.country || null,
    });
  } catch (error) {
    console.error("Error in OpenCage API:", error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
