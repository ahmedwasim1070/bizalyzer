'use client';

// Imports
import { useState, useEffect } from "react";
import Header from "../components/header";


type LocationData = {
	city: string;
	country: string;
	countryCode: string;
	lat: number;
	lng: number;
	timestamp: number;
	source: "auto" | "manual";
}

const LOCATION_KEY = "user_location";
const EXPIRY_TIME = 30 * 60 * 1000;

// 
export default function Home() {
	// 
	const [location, setLocation] = useState<LocationData | null>(null);


	// 
	const checkLocation = async () => {
		const cached = localStorage.getItem(LOCATION_KEY);
		const now = Date.now();

		if (cached) {
			const data: LocationData = JSON.parse(cached);
			const isExpired = now - data.timestamp > EXPIRY_TIME;

			if (!isExpired && data.source === "auto") {
				setLocation(data);
				return;
			}
		}

		// Ask browser for coordinates
		navigator.geolocation.getCurrentPosition(async (position) => {
			try {
				const { latitude, longitude } = position.coords;

				// Send to OpenCage
				const res: any = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
				const data = await res.json();

				const newLocation: LocationData = {
					city: (data.city || data.town || data.village || "Unknown").split(" ")[0],
					country: data.country,
					countryCode: data.country_code,
					lat: latitude,
					lng: longitude,
					timestamp: now,
					source: "auto",
				};

				localStorage.setItem(LOCATION_KEY, JSON.stringify(newLocation));
				setLocation(newLocation);
			} catch (error) {
				console.error(error);
			}
		});
	};

	// 
	useEffect(() => {
		checkLocation();
	}, []);
	// 
	return (
		<>
			<Header location={location} />
			<div>
				{location?.country}
			</div>
		</>
	);
}