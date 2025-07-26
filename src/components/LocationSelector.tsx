'use client';

// Imports
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getUserLocation } from "@/app/providers/LocationProvider";
import { LocationDataContext } from "@/middleware";

// 
function LocationSelector() {
  const { setUserLocation } = getUserLocation();
  const [loactionPayload, setLocationPayload] = useState<LocationDataContext | null>(null);
  const [countries, setCountries] = useState<any[] | null>(null);
  const [listCountry, setListCountry] = useState<boolean>(false);
  const [cities, setCities] = useState<string[] | null>(null);
  const [listCity, setListCity] = useState<boolean>(false);
  const [isFetchingCity, setIsFetchingCity] = useState<boolean>(false);
  const [cityListingError, setCityListingError] = useState<string | null>(null);
  const navigationItems = [
    {
      href: '/top/world/profiles',
      label: 'Top World Profiles',
    },
    {
      href: '/top/country/profiles',
      label: 'Top Country Profiles',
    }
  ]

  const fetchCountries = async () => {
    try {
      const res = await fetch('/data/countries.json');
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  }
  const handleCountrySelection = async (country: string, countryCode: string) => {
    if (loactionPayload?.country !== country) {
      setLocationPayload({ ...loactionPayload, country, countryCode })
      setIsFetchingCity(true);
      setCityListingError(null);
      try {
        const response = await fetch(`/api/geonames/?countryCode=${countryCode}`)
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
  }
  const handleCitySelect = (city: string) => {
    if (loactionPayload?.country && loactionPayload.countryCode) {
      setLocationPayload({ ...loactionPayload, defaultCity: city });
      setUserLocation({ ...loactionPayload, defaultCity: city });
    }
  }

  useEffect(() => {
    if (listCountry && !countries) {
      fetchCountries();
    }
  }, [listCountry])
  return (
    <>
      <dialog role="dialog" aria-labelledby="location-title" aria-modal="true" className="fixed z-50 min-w-screen min-h-screen flex flex-col items-center space-y-2 justify-center bg-background/60 overflow-hidden backdrop-blur-sm">
        <h2 className="text-3xl text-primary font-semibold">Failed to fetch location.</h2>

        <p className="text-secondary text-lg font-semibold">Select Manually.</p>

        <form className="flex flex-row space-x-4 items-center justify-center">
          {/*  */}
          <div
            className="relative flex flex-row items-center gap-x-2 cursor-pointer group my-2 bg-secondary rounded-lg p-2 hover:bg-background border border-white hover:border-secondary"
            onClick={() => setListCountry(!listCountry)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setListCountry(!listCountry);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={listCountry}
            aria-haspopup="listbox"
            aria-label={`Current location: ${loactionPayload?.country}`}
          >
            <span className="text-white group-hover:text-secondary">{loactionPayload?.country || "Select Country"}</span>
            {!listCountry ? (
              <ChevronDown className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            ) : (
              <ChevronUp className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            )}
            {listCountry &&
              <div className="absolute min-w-full min-h-[20vh] flex flex-col items-center inset-0 border-x border-b rounded-b-lg top-10 border-secondary bg-background overflow-y-scroll" role="listbox" aria-label="Select Country">
                {countries && countries.map((country, idx) => (
                  <button onClick={() => handleCountrySelection(country.name, country.code)} className={`w-full py-2 cursor-pointer text-secondary hover:bg-secondary hover:text-white ${loactionPayload?.country === country.name && 'bg-secondary text-white'} `} key={idx} role="option" aria-selected={country === loactionPayload?.country} tabIndex={listCountry ? 0 : -1}>
                    {country.name}
                  </button>
                ))}
              </div>
            }
          </div>


          {/*  */}
          <div
            className="relative flex flex-row items-center gap-x-2 cursor-pointer group my-2 bg-secondary rounded-lg p-2 hover:bg-background border border-white hover:border-secondary"
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
            aria-label={`Current location: ${loactionPayload?.defaultCity}`}
          >
            <span className="text-white group-hover:text-secondary">{loactionPayload?.defaultCity || "Select City"}</span>
            {!listCity ? (
              <ChevronDown className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            ) : (
              <ChevronUp className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            )}
            {listCity &&
              <div className="absolute min-w-full min-h-[20vh] flex flex-col items-center inset-0 border-x border-b rounded-b-lg top-10 border-secondary bg-background overflow-y-scroll" role="listbox" aria-label="Select Country">
                {/*  */}
                {!loactionPayload?.country &&
                  <span className="text-red-500 text-center m-2 font-bold">Select country first !</span>
                }
                {/* Loader */}
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
                {/* Error */}
                {cityListingError &&
                  <div className="p-4 text-red-500 text-sm" role="alert">
                    {cityListingError}
                  </div>
                }
                {/* Cities */}
                {cities && cities.map((city, idx) => (
                  <button onClick={() => handleCitySelect(city)} className={`w-full py-2 cursor-pointer text-secondary hover:bg-secondary hover:text-white ${loactionPayload?.defaultCity === city && 'bg-secondary text-white'} `} key={idx} role="option" aria-selected={city === loactionPayload?.defaultCity} tabIndex={listCity ? 0 : -1}>
                    {city}
                  </button>
                ))}
              </div>
            }
          </div>
        </form>

        <h3 className="text-secondary font-bold">Or</h3>

        <h4 className="text-primary font-bold">Continue to</h4>

        <nav>
          <ul className="inline-flex space-x-2">
            {navigationItems.map((item, idx) => (
              <li key={idx} className="list-none text-secondary">
                <Link className="translate-x-full hover:text-primary hover:decoration-secondary duration-100 underline decoration-primary group" href={item.href} title={item.label} >
                  <span className="text-primary group-hover:text-secondary">|</span> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span className="text-primary">Cookies should be enabled for best experience.</span>

      </dialog>
    </>
  )
}

export default LocationSelector;