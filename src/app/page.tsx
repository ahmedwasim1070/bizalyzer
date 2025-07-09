// Imports
import { cookies } from "next/headers";
// Components
import Header from "../components/header";

// Types
type Location = {
	capital: string;
	country: string;
	countryCode: string;
}

// 
export default async function Home() {
	// 
	const cookieStore = await cookies();
	const rawLocation = cookieStore.get('state_info')?.value;
	const location = rawLocation ? (JSON.parse(rawLocation) as Location) : null;

	// 
	return (
		<>
			<Header location={location} />
			<div>
				{JSON.stringify(location)}
			</div>
		</>
	);
}