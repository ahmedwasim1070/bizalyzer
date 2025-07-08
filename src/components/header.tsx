'use client';

// Imports
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Types
type HeaderProps = {
	location?: any;
}

// 
export default function Header({ location }: HeaderProps) {
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
					</ul>
				</nav>

			</div>
		</>
	);
}
