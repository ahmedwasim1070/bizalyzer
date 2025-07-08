'use client';

// Imports
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Types
type HeaderProps = {
	location?: any;
}

// 
export default function Header({ location }: HeaderProps) {
	// 
	const [listCity, setListCity] = useState<boolean>(false);
	// 
	const url = usePathname();


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
						<li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/for-buisness' && 'text-secondary'}`}><Link href='/for-buisness'>For Buisness</Link></li>
						<li className={`relative cursor-pointer hover:text-secondary duration-100 ${url === '/about-us' && 'text-secondary'}`}><Link href='/about-us'>About us</Link></li>
						<div onClick={() => setListCity(!listCity)} className="relative flex flex-row items-end gap-x-1 cursor-pointer">
							<p className="not-italic text-secondary">{location.capital}</p>
							{!listCity ?
								<ChevronDown className="w-5 h-5 text-secondary" />
								:
								<ChevronUp className="w-5 h-5 text-secondary" />
							}
							{listCity &&
								<div className={`bg-background absolute flex flex-col justify-center items-center w-full h-50 top-6 -z-10 rounded-b-xl border-x border-b border-primary/50 overflow-y-scroll`}>
								</div>
							}
						</div>
					</ul>
				</nav>

			</div>
		</>
	);
}
