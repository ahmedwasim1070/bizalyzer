'use client';

// Imports
import Link from "next/link";
import Image from "next/image";
import { getUserLocation } from "@/app/providers/LocationProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, LocationEdit, AlignJustify } from "lucide-react";

// 
function Header() {
    const pathname = usePathname();
    const { userLocation, selectedCity, setSelectedCity } = getUserLocation();
    const navigationItems = [
        {
            href: '/top/world/profiles',
            label: 'Top World Profiles',
            isActive: pathname === '/top/world/profiles',
        },
        {
            href: '/top/country/profiles',
            label: 'Top Country Profiles',
            isActive: pathname === '/top/country/profiles',
        }
    ]
    const [isFetchingCity, setIsFetchingCity] = useState<boolean>(false);
    const [cityListingError, setCityListingError] = useState<string | null>(null);
    const [listCity, setListCity] = useState<boolean>(false);
    const [cities, setCities] = useState<string[] | null>(null);
    const [expandNav, setExnapadNav] = useState<boolean>(false);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
    }
    const fetchCity = async () => {
        if (!userLocation) {
            setCityListingError("Error while fetching cities");
            return;
        };
        if (cities) return;

        setIsFetchingCity(true);
        setCityListingError(null);
        try {
            const response = await fetch(`/api/geonames/?countryCode=${userLocation?.countryCode}`)
            if (!response.ok) {
                setCityListingError("Error while fetching cities");
                throw new Error(`Failed to fetch cities ${response.status}`);
            }

            const data = await response.json();
            setCities(data);
        } catch (error) {
            setCityListingError("Error while fetching cities");
            console.error("Error while fetching cities", error);
        } finally {
            setIsFetchingCity(false);
        }
    }

    useEffect(() => {
        if (listCity && !cities) {
            fetchCity();
        }
    }, [listCity])

    return (
        <>
            <header id="header" role="banner" className={`bg-background min-w-screen md:h-auto ${expandNav ? 'xxs:h-50' : 'xxs:h-22'}  grid items-center justify-between md:grid-flow-col xxs:grid-flex-row grid-row-1 md:px-6 xxs:px-0 py-6 duration-200`}>
                {/*  */}
                <div className="md:min-w-auto xxs:min-w-screen md:px-0 xxs:px-4 flex items-center justify-between">
                    {/*  */}
                    <div id="logo" className="shrink-0">
                        <Link href="/" area-label="Bizranker Buisness Directory Home">
                            <Image
                                src='/main-logo.svg'
                                alt="BizRanker - Business Directory and Ranking Platform Logo"
                                width={150}
                                height={50}
                                className="hover:opacity-80 transition-opacity"
                            />
                        </Link>
                    </div>

                    {/*  */}
                    <button onClick={() => setExnapadNav(!expandNav)} className="md:hidden xxs:block p-2 bg-primary rounded-xl border border-secondary/50 hover:bg-transparent transition-colors cursor-pointer">
                        <AlignJustify className="w-6 h-6 text-secondary" />
                    </button>

                </div>

                {/*  */}
                <nav id="navbar" role="navigation" area-label="Main navigation" className={`md:block ${expandNav ? "xxs:block" : "xxs:hidden"}`}>
                    <ul className="w-auto flex md:flex-row xxs:flex-col space-x-6 md:space-y-0 xxs:space-y-4 md:py-0 xxs:py-4 font-semibold text-secondary">
                        {navigationItems.map((item, idx) => (
                            <li key={idx} className="list-none text-center">
                                <Link className={`underline-animation translate-x-full hover:text-secondary duration-100 ${item.isActive ? 'text-secondary' : 'text-primary'}`} href={item.href} title={item.label} aria-current={item.isActive ? 'page' : undefined}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <div
                                className="relative flex flex-row items-center justify-center gap-x-1 cursor-pointer group"
                                onClick={() => setListCity(!listCity)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        setListCity(!listCity);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-expanded={listCity}
                                aria-haspopup="listbox"
                                aria-label={`Current location: ${selectedCity || userLocation?.defaultCity || userLocation?.capital}`}
                            >
                                <LocationEdit className="size-5 group-hover:text-primary transition-colors" />
                                <span className="text-secondary transition-colors">
                                    {selectedCity || userLocation?.defaultCity || userLocation?.capital}
                                </span>
                                {!listCity ? (
                                    <ChevronDown className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                                ) : (
                                    <ChevronUp className="w-5 h-5 text-secondary group-hover:text-primary transition-colors" />
                                )}
                                <div className={`absolute flex flex-col gap-y-1 min-w-full ${listCity ? 'max-h-[70vh] border-x border-b bg-background py-2 shadow-lg' : 'h-0 bg-transparent'} right-0 top-6 z-10 rounded-b-xl border-secondary/20 overflow-x-hidden overflow-y-auto duration-300 transition-all`} role="listbox" aria-label="Select city">
                                    {isFetchingCity &&
                                        <div className="flex items-center justify-center h-10 space-x-1">
                                            <span
                                                className={`block w-3 h-3 rounded-full animate-bounce bg-primary`}
                                                style={{ animationDelay: '0s' }}
                                            />
                                            <span
                                                className={`block w-3 h-3 rounded-full animate-bounce bg-secondary`}
                                                style={{ animationDelay: '0.2s' }}
                                            />
                                            <span
                                                className={`block w-3 h-3 rounded-full animate-bounce bg-primary`}
                                                style={{ animationDelay: '0.4s' }}
                                            />
                                        </div>
                                    }
                                    {cityListingError &&
                                        <div className="p-4 text-red-500 text-sm" role="alert">
                                            {cityListingError}
                                        </div>
                                    }
                                    {!isFetchingCity && !cityListingError && cities && cities.map((city, idx) => (
                                        <button className={` cursor-pointer py-1 ${selectedCity === city ? 'bg-secondary text-white' : 'text-primary hover:bg-secondary'}`} onClick={() => handleCitySelect(city)} key={idx} role="option" aria-selected={city === selectedCity} tabIndex={listCity ? 0 : -1}>
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header;