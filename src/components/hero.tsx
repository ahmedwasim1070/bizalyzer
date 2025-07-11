// Imports
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { Search } from "lucide-react";

// Types
type HeroProps = {
    selectedCity: string;
    selectedCountryCode: string | undefined;
}

// 
function Hero({ selectedCity, selectedCountryCode }: HeroProps) {
    return (
        <>
            <main className="min-w-screen bg-gradient-to-b from-background to-white flex items-center justify-center border-b border-primary/10">
                <div className="min-w-1/4 text-center space-y-2 my-30">
                    <Image src='/main-logo.svg' className="mx-auto my-4" alt="bizelevn Logo" width={200} height={100} priority />
                    <p className="text-primary font-semibold text-xl">
                        Ranking
                        <Typewriter
                            words={[' Buisneses.', ' Stores.', ' Resturants.']}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={1500}
                        />
                    </p>

                    {/*  */}
                    <div className="min-w-full inline-flex items-center gap-x-2 mt-6">
                        <input type="text" className="w-2/2 h-12 border rounded-2xl outline-none border-primary p-2 placeholder:text-secondary" placeholder=" / Buisness , Store or Resturants" />
                        <button className="p-3 bg-secondary rounded-full border border-primary/20 cursor-pointer duration-100 hover:bg-secondary/0 hover:border-primary/100">
                            <Search className="w-5 h-5 text-primary" strokeWidth={3} />
                        </button>
                    </div>
                    {/*  */}

                    <p className="text-secondary my-2 space-x-1"> 
                        <span>Searching in</span>
                        <strong className="text-primary">{selectedCity}</strong>,
                        <strong> {selectedCountryCode}</strong>
                    </p>
                </div>
            </main>
        </>
    )
}

export default Hero;