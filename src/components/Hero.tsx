// Imports
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { getUserLocation } from "@/app/providers/LocationProvider";

// 
function Hero() {
    const { userLocation, selectedCity } = getUserLocation();
    const navigationItems = [
        {
            href: '/about-us',
            label: 'About us',
        },
        {
            href: '/terms-of-usage',
            label: 'Terms Of Usage',
        },
        {
            href: '/privacy-policy',
            label: 'Privacy Policy',
        }
    ]

    // 
    return (
        <>
            <main className="min-w-screen py-22 bg-gradient-to-b from-background to-white flex items-center justify-center">
                <article className="w-1/2 flex flex-col items-center justify-center gap-y-6">
                    <header className="w-full text-center flex flex-col items-center justify-center gap-y-4">
                        <h1>
                            <Image src='/main-logo.svg' width={250} height={100} alt="Bizraker - Buisness Directory and Ranking Platform logo" />
                            <span className="sr-only">Bizranker</span>
                        </h1>

                        <h2 className="text-primary text-2xl font-semibold">
                            Top Buisness
                            <Typewriter
                                words={[" in City.", " in Country.", " in World."]}
                                loop={false}
                                typeSpeed={50}
                            />
                        </h2>
                    </header>

                    <section className="w-full flex flex-col items-center justify-center">

                        {/*  */}
                        <div className="w-full flex flex-row items-center justify-center gap-x-2 my-2">
                            <input type="search" placeholder="Search resturants , cafe or other buisnesses." className="w-2/4 border border-primary rounded-xl px-2 py-3 placeholder:text-secondary outline-none text-secondary" aria-label="Search box" />
                            <button type="button" className="bg-secondary p-2 rounded-full border border-secondary hover:bg-transparent transition-colors cursor-pointer group" aria-label="Search">
                                <Search className="w-7 h-7 text-primary group-hover:text-secondary" />
                            </button>
                        </div>

                        <p className="text-secondary my-2">Searching in <strong className="text-primary">{selectedCity || userLocation?.defaultCity || userLocation?.capital}</strong> , <strong>{userLocation?.countryCode}</strong></p>

                        <nav className="my-2">
                            <ul className="flex gap-x-4">
                                {navigationItems.map((item, idx) => (
                                    <li key={idx} className="text-primary transition-colors decoration-secondary hover:text-secondary hover:decoration-primary group ">
                                        <span className="text-secondary group-hover:text-primary">| </span><Link href={item.href} className="underline">{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <button className="border border-primary text-primary rounded-xl px-4 py-2 my-3 cursor-pointer hover:bg-secondary transition-colors">
                            <p>Add your Buisness.</p>
                        </button>

                    </section>
                </article>
            </main>
        </>
    )
}

export default Hero;