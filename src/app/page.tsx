"use client";

// Imports
import { getUserLocation } from "./providers/LocationProvider";
// Components
import Hero from "@/components/Hero";

// 
function Home() {

	return (
		<>
			<section>
				<Hero />
			</section>
		</>
	)
}

export default Home;