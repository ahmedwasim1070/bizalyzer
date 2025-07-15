"use client";

// Imports
import { getUserLocation } from "./providers/LocationProvider";

// 
function Home() {
	const { userLocation, setUserLocation } = getUserLocation();
	return (
		<>
			<section>{JSON.stringify(userLocation)}</section>
		</>
	)
}

export default Home;