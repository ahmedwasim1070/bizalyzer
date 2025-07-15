// Imports
import type { Metadata } from "next";
import "./globals.css";
import { cookies } from "next/headers";
// Provider
import { LocationProvider } from "./providers/LocationProvider";
// Components
import Header from "@/components/header";

// Header
export const metadata: Metadata = {
	title: "BizElevn",
	description: "later .....",
};

// 
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	const cookieStore = cookies();
	const rawCookie = cookieStore.get("user_location")?.value;

	let locationData = null;
	try {
		locationData = rawCookie ? JSON.parse(rawCookie) : null;
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
