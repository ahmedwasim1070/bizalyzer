function LocationSelector() {
    return (
        <>
            <section id="location-selector" className="fixed z-50 min-w-screen min-h-screen flex flex-col items-center space-y-2 justify-center bg-background/80 overflow-hidden">
              <p className="text-2xl text-primary font-semibold">Failed to fetch location.</p>
              <p className="text-secondary text-lg font-semibold">Select Manually.</p>
              <div className="flex flex-row gap-y-4">

              </div>
              <span className="text-primary">Cookies should be enabled for best results.</span>
            </section>
        </>
    )
}

export default LocationSelector;