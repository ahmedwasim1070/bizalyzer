'use client';

// Imports
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ThreeDotLoader } from "./loader";

// Types
type Location = {
	capital: string;
	country: string;
	countryCode: string;
}
type HeaderProps = {
	location: Location | null;
	selectedCity?: string;
	setSelectedCity?: React.Dispatch<React.SetStateAction<string>>;
}

// 
export default function Header({ location, selectedCity, setSelectedCity }: HeaderProps) {
	// 
	const url = usePathname();
	// 
	const [listCity, setListCity] = useState<boolean>(false);
	let [cities, setCities] = useState<string[]>([]);

	// 
	const fetchCity = async () => {
		try {
			if (!location) {
				throw new Error("No country found !");
			}

			const response = await fetch(`/api/geonames/?countryCode=${location.countryCode}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();

			setCities(data);
		} catch (error) {
			console.error("Error in cityFetcher api,", error);
		}
	}

	// 
	useEffect(() => {
		if (listCity && cities.length === 0) {
			fetchCity();
		}
	}, [listCity])
	// 
	return (
		<>
			<div id="header" className="sticky top-0 flex flex-row items-center justify-between h-auto 2xl:py-6 md:py-4 2xl:px-6 md:px-6 bg-background backdrop:blur-sm inset-0">

				{/* Left (logo) */}
				<div id="logo">
					<Image src='/main-logo.svg' alt="bizelevn Logo" width={150} height={50} priority />
				</div>

				{/* Right (navbar) */}
				<nav id="navbar" className="w-auto">
					<ul className="flex flex-row justify-center items-center 2xl:gap-x-8 md:gap-x-6 text-primary font-bold">
						<li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/for-buisness' && 'text-secondary'}`}><Link href='/for-buisness'>For Buisness</Link></li> <li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/about-us' && 'text-secondary'}`}><Link href='/about-us'>About us</Link></li>
						<div onClick={() => setListCity(!listCity)} className="relative flex flex-row items-end gap-x-1 cursor-pointer">
							<p className="not-italic text-secondary">{selectedCity ? selectedCity : "Select-city"}</p>
							{!listCity ?
								<ChevronDown className="w-5 h-5 text-secondary" />
								:
								<ChevronUp className="w-5 h-5 text-secondary" />
							}
							<div className={`absolute flex flex-col justify-start items-center gap-y-1 w-full min-w-20 ${listCity ? 'max-h-[70vh] border-x border-b bg-background py-2' : 'h-0 bg-transparent'} top-6 -z-10 rounded-b-xl border-secondary/20 overflow-x-hidden overflow-y-auto duration-300`}>
								{/* Loader */}
								{listCity && cities.length === 0 &&
									< ThreeDotLoader size={'3'} />
								}

								{/* City list */}
								{cities.map((cityName, idx) => (
									<p onClick={() => setSelectedCity && setSelectedCity(cityName)} className={`w-full px-2 py-1 ${cityName === selectedCity && 'bg-secondary text-white hover:text-white '} hover:text-secondary text-wrap  cursor-pointer`} key={idx}>{cityName}</p>
								))}
							</div>
						</div>
					</ul>
				</nav>

			</div>
		</>
	);
}
