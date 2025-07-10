'use client'

// Imports
import { useEffect, useState } from "react";
import Header from "../components/header";

// Types
type Location = {
	capital: string;
	country: string;
	countryCode: string;
};
type AbsoluteLocation = {
	city: string;
	country: string;
	timeStamps: number;
}

export default function Home() {
	const [absoluteLocation, setAbsoluteLocation] = useState<AbsoluteLocation | null>(null);
	const [locationDenied, setLocationDenied] = useState<boolean>(false);
	const [location, setLocation] = useState<Location | null>(null);
	const [selectedCity, setSelectedCity] = useState<string>("Select-city");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getCookie = (name: string): string | null => {
			const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
			return match ? decodeURIComponent(match[2]) : null;
		};

		// Initialize from cookie first
		const rawLocation = getCookie('state_info');
		if (rawLocation) {
			try {
				const parsed = JSON.parse(rawLocation) as Location;
				setLocation(parsed);
				// Fixed: Use proper conditional logic
				if (selectedCity === "Select-city") {
					setSelectedCity(parsed.capital);
				}
			} catch (e) {
				console.error("Invalid JSON in state_info cookie:", e);
			}
		}

		// Initialize absolute location from localStorage
		let storedAbsoluteLocation: AbsoluteLocation | null = null;
		try {
			const stored = localStorage.getItem('absolute_location');
			if (stored) {
				storedAbsoluteLocation = JSON.parse(stored) as AbsoluteLocation;
				setAbsoluteLocation(storedAbsoluteLocation);
				setSelectedCity(storedAbsoluteLocation.city);
			}
		} catch (e) {
			console.error("Invalid JSON in absolute_location localStorage:", e);
			localStorage.removeItem('absolute_location');
		}

		// Fetch for absolute location if not available or outdated (24 hours)
		const shouldFetchLocation = () => {
			if (!storedAbsoluteLocation) return true;

			const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
			const isExpired = Date.now() - storedAbsoluteLocation.timeStamps > twentyFourHours;

			return isExpired;
		};

		if (shouldFetchLocation()) {
			setIsLoading(true);

			navigator.geolocation.getCurrentPosition(
				async (position) => {
					try {
						const { latitude, longitude } = position.coords;
						const response = await fetch(`/api/opencage/?lat=${latitude}&lng=${longitude}`);
						if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
						}

						const data = await response.json();

						const newAbsoluteLocation: AbsoluteLocation = {
							city: (data.city || data.village || data.town || "unknown").split(" ")[0],
							country: data.country || "unknown",
							timeStamps: Date.now(),
						};

						localStorage.setItem('absolute_location', JSON.stringify(newAbsoluteLocation));
						setAbsoluteLocation(newAbsoluteLocation);
						setSelectedCity(newAbsoluteLocation.city);
					} catch (error) {
						console.error("Error in absoluteLocation api:", error);
						setLocationDenied(true);
					} finally {
						setIsLoading(false);
					}
				},
				(error) => {
					console.error("Geolocation error:", error);
					setLocationDenied(true);
					setIsLoading(false);
				},
				{
					enableHighAccuracy: true,
					timeout: 10000,
					maximumAge: 300000 // 5 minutes
				}
			);
		}
	}, []); // Empty dependency array to run only once

	return (
		<>
			<Header
				location={location}
				selectedCity={selectedCity}
				setSelectedCity={setSelectedCity}
			/>

			{/* Optional: Display location status */}
			{isLoading && (
				<div className="p-4 text-center">
					<p>Getting your location...</p>
				</div>
			)}
		</>
	);
}