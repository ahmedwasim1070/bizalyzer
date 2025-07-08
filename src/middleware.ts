import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || '0.0.0.0';

  try {
    // Append IP to your API call
    const geoRes = await fetch(`${process.env.GEO_FINDER_URI}&ip=${ip}`);
    const geoData = await geoRes.json();

    // Construct location object
    const location = {
      city: geoData.city || 'unknown',
      country: geoData.country_name || 'unknown',
      countryCode: geoData.country_code2 || 'unknown',
      lat: geoData.latitude || 0,
      lng: geoData.longitude || 0,
      timestamp: Date.now(),
    };

    // Create response and attach cookie
    const res = NextResponse.next();

    res.cookies.set('location', JSON.stringify(location), {
      path: '/',
      httpOnly: false, // Set to true if you don't want JS access
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    console.error('GeoIP fetch failed:', error);
    return NextResponse.next();
  }
}