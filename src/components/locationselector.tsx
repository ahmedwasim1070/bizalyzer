'use client';

// Imports
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, LocationEdit } from "lucide-react";

// 
function LocationSelector() {
  const [countries, setCountries] = useState<any[] | null>(null);
  const [listCountry, setListCountry] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cities, setCities] = useState<string[] | null>(null);
  const [listCity, setListCity] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const fetchCountries = async () => {
    try {
      const res = await fetch('/data/countries.json')
      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error("Error while fetching data", error);
    }
  }
  const handleCountrySelection = (country: string) => {
    setSelectedCountry(country);
  }

  useEffect(() => {
    if (listCountry && !countries) {
      fetchCountries();
    }
  }, [listCountry])
  return (
    <>
      <section id="location-selector" className="fixed z-50 min-w-screen min-h-screen flex flex-col items-center space-y-2 justify-center bg-background/80 overflow-hidden">
        <p className="text-2xl text-primary font-semibold">Failed to fetch location.</p>
        <p className="text-secondary text-lg font-semibold">Select Manually.</p>

        <div className="flex flex-row space-x-4 items-center justify-center">
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
            aria-label={`Current location: ${selectedCountry}`}
          >
            <span className="text-white group-hover:text-secondary">{selectedCountry || "Select Country"}</span>
            {!listCountry ? (
              <ChevronDown className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            ) : (
              <ChevronUp className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            )}
            {listCountry &&
              <div className="absolute min-w-full min-h-[20vh] flex flex-col items-center inset-0 border-x border-b rounded-b-lg top-10 border-secondary bg-background overflow-y-scroll" role="listbox" aria-label="Select Country">
                {countries && countries.map((country, idx) => (
                  <button onClick={() => handleCountrySelection(country.name)} className={`w-full py-2 cursor-pointer text-secondary hover:bg-secondary hover:text-white ${selectedCountry === country.name && 'bg-secondary text-white'} `} key={idx} role="option" aria-selected={country === selectedCountry} tabIndex={listCountry ? 0 : -1}>
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
            aria-label={`Current location: ${selectedCity}`}
          >
            <span className="text-white group-hover:text-secondary">{selectedCity || "Select City"}</span>
            {!listCity ? (
              <ChevronDown className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            ) : (
              <ChevronUp className="w-5 h-5 text-white group-hover:text-secondary transition-colors" />
            )}
            {listCity &&
              <div className="absolute min-w-full min-h-[20vh] flex flex-col items-center inset-0 border-x border-b rounded-b-lg top-10 border-secondary bg-background overflow-y-scroll" role="listbox" aria-label="Select Country">
                {!selectedCountry &&
                  <span className="text-red-500 text-center m-2 font-bold">Select country first !</span>
                }
                {cities && cities.map((city, idx) => (
                  <button className="w-full py-2 cursor-pointer text-secondary hover:bg-secondary hover:text-white" key={idx} role="option" aria-selected={city === city} tabIndex={listCity ? 0 : -1}>
                    {city}
                  </button>
                ))}
              </div>
            }
          </div>

        </div>
        <span className="text-primary">Cookies should be enabled for best experience.</span>
      </section>
    </>
  )
}

export default LocationSelector;