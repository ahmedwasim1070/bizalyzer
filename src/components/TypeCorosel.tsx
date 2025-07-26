// Imports
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buisnessTypeIcons } from "@/utils/buisnessTypeIcon";

// 
function TypeCorosel() {
    const sliderRef = useRef(null);
    const [buisnessType, setBuisnessType] = useState<any[] | null>(null);

    const fetchBuisnessType = async () => {
        try {
            const res = await fetch('/data/buisnessTypes.json');
            if (!res.ok) {
                throw new Error("Failed to fetch buisness types.");
            }

            const data = await res.json();
            setBuisnessType(data);
        } catch (error) {
            console.error('Error fetching business types:', error);
        }
    }

    const renderIcon = (iconName: string, className: string) => {
        const IconComponent = buisnessTypeIcons[iconName];
        return IconComponent ? <IconComponent className={className} /> : null;
    }
    const handleScroll = (direction: string) => {
        const slider = sliderRef.current as HTMLElement | null;
        if (!slider) return;

        const scrollVal = slider.scrollLeft;
        const scrollMax = slider.scrollWidth - slider.clientWidth;
        const scrollAmount = scrollMax;

        if (direction === "next") {
            slider.scrollLeft = scrollVal + scrollAmount >= scrollMax ? 0 : scrollVal + scrollAmount;
        } else {
            slider.scrollLeft = scrollVal - scrollAmount <= 0 ? scrollMax : scrollVal - scrollAmount;
        }
    };



    // 
    useEffect(() => {
        if (!buisnessType) {
            fetchBuisnessType();
        }
    }, [])

    // 
    return (
        <>
            <section className="min-w-screen h-10 flex flex-row items-center my-10 px-4">

                {/*  */}
                <button onClick={() => handleScroll("prev")} className="bg-secondary rounded-full p-2 border border-secondary transition-colors hover:bg-white cursor-pointer">
                    <ChevronLeft className="w-8 h-8 text-primary" />
                </button>

                {/*  */}
                <div ref={sliderRef} className="w-full flex flex-row gap-x-2 overflow-x-scroll mx-2 rounded-xl scrollbar-hidden">
                    {buisnessType && buisnessType.map((buisness, idx) => (
                        <div key={idx} className="flex flex-row items-center gap-x-2  border border-secondary bg-background rounded-full px-2 py-2 text-nowrap cursor-pointer group transition-colors hover:bg-transparent" >
                            <span className="p-2 rounded-full border border-secondary bg-primary group-hover:bg-secondary">
                                {renderIcon(buisness.icon, `w-5 h-5 text-secondary group-hover:text-primary`)}
                            </span>
                            <p className="text-secondary font-semibold">{buisness.type}</p>
                        </div>
                    ))}
                </div>

                <button onClick={() => handleScroll("next")} className="bg-secondary rounded-full p-2 border border-secondary transition-colors hover:bg-white cursor-pointer">
                    <ChevronRight className="w-8 h-8 text-primary" />
                </button>

            </section>
        </>
    )
}

export default TypeCorosel;