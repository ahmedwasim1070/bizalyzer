'use client';

// Imports
import { createContext, ReactNode, useContext, useState } from "react";

// Types
type LocationDataContext = {
    country: string;
    countryCode: string;
    capital: string;
    liveCity: string;
};

// Interfaces
interface LocationContextType {
    userLocation: LocationDataContext | null;
    setUserLocation: (location: LocationDataContext | null) => void;
};
interface LocationProviderProps {
    children: ReactNode;
    locationData: LocationDataContext | null;
};

// Global vars
const LocationContext = createContext<LocationContextType | undefined>(undefined);

// 
export function LocationProvider({ children, locationData }: LocationProviderProps) {
    const [userLocation, setUserLocation] = useState<LocationDataContext | null>(locationData || null);

    // 
    return (
        <LocationContext.Provider value={{ userLocation, setUserLocation }}>
            {children}
        </LocationContext.Provider>
    );
}

// Location Fetcher hook
export const useLocation = (): LocationContextType => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('userLocation must be used with a locationProvider');
    }
    return context;
}

export type { LocationDataContext, LocationContextType };