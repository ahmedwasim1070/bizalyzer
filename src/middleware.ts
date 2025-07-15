// Imports
import { NextResponse } from "next/server";

// Types
type LocationDataContext = {
  country: string;
  countryCode: string;
  capital: string;
  selectedCity: string | undefined;
};

// 
export async function middleware() {
  try {
    const geoRes = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEO_KEY}`
    );
    if (!geoRes.ok) {
      console.error("Bad response from GeoIP", geoRes.status);
      return NextResponse.next();
    }
    const geoData = await geoRes.json();

    const userLocation: LocationDataContext = {
      country: geoData.country_name || "unknown",
      countryCode: geoData.country_code2 || "unknown",
      capital: geoData.country_capital || "unknown",
      selectedCity: undefined,
    };

    NextResponse.next().cookies.set(
      "user_location",
      JSON.stringify(userLocation),
      {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV !== "development",
      }
    );
    return NextResponse.next();
  } catch (error) {
    console.error("GeoIP fetch failed:", error);
    return NextResponse.next();
  }
}

export type { LocationDataContext };
