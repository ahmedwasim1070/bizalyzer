'use client';

// Imports
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Types
type City = {
	name: string;
	city: string;
}

// 
export default function Header() {
	const [cities, setCities] = useState<City[]>([]);
	const url = usePathname();

	useEffect(() => {
		fetch("/city.json")
			.then((res) => res.json())
			.then((data) => { setCities(data); console.log(data); })
			.catch((error) => console.error("Failed to fetch cities:", error));
	}, []);

	// 
	return (
		<>
			<div id="header" className="sticky top-0 flex flex-row items-center justify-between h-auto 2xl:py-6 md:py-4 2xl:px-6 md:px-6 bg-background backdrop:blur-sm">

				{/* Left (logo) */}
				<div id="logo" className="w-auto">
					<Image src='/main-logo.svg' alt="bizelevn Logo" width={150} height={50} priority />
				</div>

{/* Right (navbar) */}
				<nav id="navbar" className="w-auto">
					<ul className="flex flex-row justify-center items-center 2xl:gap-x-8 md:gap-x-6 text-primary font-bold">
						<li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/for-buisness' && 'text-secondary'}`}><Link href='/for-buisness'>For Buisness</Link></li>
						<li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/about-us' && 'text-secondary'}`}><Link href='/about-us'>About us</Link></li>
						<select className="cursor-pointer text-center text-secondary w-22" name="cities">
							{cities.map((item, idx) => (
								<option className="text-primary bg-white h-10" key={idx} value={item.name}>{item.city}</option>
							))}
						</select>
					</ul>
				</nav>

			</div>
		</>
	);
}
