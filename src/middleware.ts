import { NextResponse } from "next/server";

export async function middleware() {
  try {
    // Append IP to your API call
    const geoRes = await fetch(`${process.env.IP_GEO_LOCATION}`);
    const geoData = await geoRes.json();

    // Construct location object
    const location = {
      capital: geoData.country_capital,
      country: geoData.country_name || "unknown",
      countryCode: geoData.country_code2 || "unknown",
    };

    // Create response and attach cookie
    const res = NextResponse.next();

    res.cookies.set("state_info", JSON.stringify(location), {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
    });

    return res;
  } catch (error) {
    console.error("GeoIP fetch failed:", error);
    return NextResponse.next();
  }
}
