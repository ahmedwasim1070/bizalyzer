'use client'

// Imports
import { useEffect, useState } from "react";
// Components
import Header from "../components/header";
import Hero from "../components/hero";
import { parse } from "path";

// Types
type Location = {
	capital: string;
	country: string;
	countryCode: string;
}
type AbsoluteLocation = {
	city: string;
	country: string;
	timeStamps: number;
}

export default function Home() {
	const [absoluteLocation, setAbsoluteLocation] = useState<AbsoluteLocation | null>(null);
	const [location, setLocation] = useState<Location | null>(null);
	const [selectedCity, setSelectedCity] = useState<string>("Select-city");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const getCookie = (name: string): string | null => {
			const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
			return match ? decodeURIComponent(match[2]) : null;
		};

		const rawLocation = getCookie('state_info');
		let parsedLocation: Location | null = null;
		if (rawLocation) {
			try {
				parsedLocation = JSON.parse(rawLocation) as Location;
				setLocation(parsedLocation);

				if (selectedCity === "Select-city") {
					setSelectedCity(parsedLocation.capital);
				}
			} catch (e) {
				console.error("Invalid JSON in state_info cookie:", e);
			}
		}

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
			let isExpired = Date.now() - storedAbsoluteLocation.timeStamps > twentyFourHours;
			if (parsedLocation?.country.toLowerCase() !== storedAbsoluteLocation?.country.toLowerCase()) {
				isExpired = true;
			}

			return isExpired;
		};

		if (shouldFetchLocation()) {
			setIsLoading(true);

			navigator.geolocation.getCurrentPosition(
				async (position) => {
					console.log("called");
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
					} finally {
						setIsLoading(false);
					}
				},
				(error) => {
					console.error("Geolocation error:", error);
					setIsLoading(false);
				},
				{
					enableHighAccuracy: false,
					timeout: 10000,
					maximumAge: 300000 // 5 minutes
				}
			);
		}
	}, []);

	return (
		<>
			<Header
				location={location}
				selectedCity={selectedCity}
				setSelectedCity={setSelectedCity}
			/>

			<Hero selectedCity={selectedCity} selectedCountryCode={location?.countryCode} />

			{isLoading && (
				<div className="p-4 text-center">
					<p>Getting your location...</p>
				</div>
			)}
		</>
	);
}