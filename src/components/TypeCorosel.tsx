import { ChevronLeft, ChevronRight } from "lucide-react";

function TypeCorosel() {
    return (
        <>
            <section className="min-w-screen h-10 flex flex-row items-center my-10 px-4">

                {/*  */}
                <button className="bg-background rounded-full p-2 border border-secondary/30 transition-colors hover:bg-white cursor-pointer">
                    <ChevronLeft className="text-secondary" />
                </button>

                {/*  */}
                <div className="w-full">

                </div>

                <button className="bg-background rounded-full p-2 border border-secondary/30 transition-colors hover:bg-white cursor-pointer">
                    <ChevronRight className="text-secondary" />
                </button>

            </section>
        </>
    )
}

export default TypeCorosel;