// Imports
import { cookies } from "next/headers";
// Components
import Header from "../components/header";

// 
export default async function Home() {
	// 
	const cookieStore = await cookies();
	const rawLocation =  cookieStore.get('state_info')?.value;
	const location = rawLocation ? JSON.parse(rawLocation) : null;

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