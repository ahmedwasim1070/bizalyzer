// Imports
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
// Provider
import { LocationProvider } from "./providers/LocationProvider";
// Components
import Header from "@/components/Header";

// Header
export const metadata: Metadata = {
	title: "BizRanker",
	description: "later .....",
};

// 
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	const cookieStore = await cookies();
	const locationRawCookie = cookieStore.get("user_location")?.value;

	let locationData = null;
	try {
		locationData = locationRawCookie ? JSON.parse(locationRawCookie) : null;
	} catch (error) {
		console.error("Error parsing location cookei", error);
		locationData = null;
	}

	return (
		<html lang="en">
			<body>
				<LocationProvider locationData={locationData} >
					<Header />
					{children}
				</LocationProvider>
			</body>
		</html>
	);
}
