export default function Geoprompt() {
    return (
        <>
            <section className="w-[100vw] h-[100vh] bg-background fixed flex justify-center items-center z-50">
                {/*  */}
                <div className="w-1/2 text-center">
                    {/*  */}
                    <p className="text-primary font-semibold text-xl my-2">Allow location access to redirect to your city.</p>
                    <p className="text-secondary font-bold text-lg">OR</p>
                    <p className="text-primary font-semibold text-xl my-2">Enter it manually.</p>
                    {/*  */}
                    <div className="flex flex-row items-center justify-center gap-x-6 my-4">
                        <select className="border border-secondary"></select>
                        <select className="border border-secondary"></select>
                        <select className="border border-secondary"></select>
                    </div>
                </div>
            </section>
        </>
    );
}
