'use client';

// Imports
import Link from "next/link"; import Image from "next/image";
import { getUserLocation } from "@/app/providers/LocationProvider";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Locate, LocateIcon, LocationEdit } from "lucide-react";

// 
function Header() {
    const pathname = usePathname();
    const { userLocation, setUserLocation, selectedCity, setSelectedCity } = getUserLocation();
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
    const [cities, setCities] = useState<string[]>([]);

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
    }
    const fetchCity = async () => {
        if (!userLocation && cities.length > 0) {
            setCityListingError("Error while fetching cities");
            return;
        };

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
        if (listCity && cities.length === 0) {
            fetchCity();
        }
    }, [listCity])

    return (
        <>
            <header id="header" role="banner" className="bg-background min-w-screen flex items-center justify-between 2xl:px-6 lg:px-4 2xl:py-6 md:py-4">
                {/*  */}
                <div id="logo" className="shrink-0">
                    <Link href="/" area-label="Bizelevn Buisness Directory Home">
                        <Image
                            src='/main-logo.svg'
                            alt="Bizeleven - Business Directory and Ranking Platform Logo"
                            width={150}
                            height={50}
                            priority
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>
                </div>

                {/*  */}
                <nav id="navbar" className="w-auto inline-flex space-x-6 font-semibold text-secondary" role="navigation" area-label="Main navigation">
                    {navigationItems.map((item, idx) => (
                        <li key={idx} className="list-none text-primary">
                            <Link className={`underline-animation translate-x-full hover:text-secondary duration-100 ${item.isActive && 'text-secondary'}`} href={item.href} title={item.label} aria-current={item.isActive ? 'page' : undefined}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <div
                            className="relative flex flex-row items-center gap-x-1 cursor-pointer group"
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
                            <LocationEdit className="size-5 group-hover:text-primary transition-colors"/>
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
                                {!isFetchingCity && !cityListingError && cities.map((city, idx) => (
                                    <button className={` cursor-pointer py-1 ${selectedCity === city ? 'bg-secondary text-white' : 'text-primary hover:bg-secondary'}`} onClick={() => handleCitySelect(city)} key={idx} role="option" aria-selected={city === selectedCity} tabIndex={listCity ? 0 : -1}>
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </li>
                </nav>

            </header>
        </>
    )
}

export default Header;