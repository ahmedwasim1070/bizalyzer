// Imports
import { cookies } from "next/headers";
// Components
import Header from "../components/header";

type LocationData = {
	city: string;
	country: string;
	countryCode: string;
	timestamp: number;
}

// 
export default function Home() {
	// 
	const cookieStore = cookies(); // ✅ call the function
	const rawLocation = cookieStore.get('location')?.value;


	// 
	return (
		<>
			<Header />
			<div>
			</div>
		</>
	);
}