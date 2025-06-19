import { useGoogleSheetData } from "@/hooks/useGoogleSheets"
import Loading from "./loading";
import useImagesLoaded from "@/hooks/useImageLoaded";
export default function ToolsShowcase() {
    const { data: laptopDevice, loading: loadingLD } = useGoogleSheetData("Laptop")
    const { data: accessories, loading: loadingAcc } = useGoogleSheetData("Accessories")
    const { data: gamingHardware, loading: loadingHW } = useGoogleSheetData("GamingPC")
    const { data: coding, loading: loadingC } = useGoogleSheetData("Coding")
    const { data: software, loading: loadings } = useGoogleSheetData("Software")
    
    const allImagesLoaded = useImagesLoaded([laptopDevice, accessories, gamingHardware, coding, software ]);

    if(loadingLD || loadingAcc || loadingHW || loadingC || loadings || !allImagesLoaded){
        return <Loading/>
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-6">
            <div className="max-w-6xl mt-16 mx-auto">
                <h1 className="text-4xl font-bold my-4 md:text-5xl">Uses</h1>
                <h2 className="text-muted-foreground mb-8">This is the equipment I currently use for gaming, programming, making videos, and every day.</h2>
            </div>
            <hr />
            <div className="max-w-6xl mt-16 mx-auto space-y-16">
                {/* Laptop Section */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-12 transition-all duration-300 hover:text-gray-300">
                        Laptop
                    </h2>
                    <div className="flex justify-center">
                        {laptopDevice.map((laptop, index) => (
                            <div key={index} className="bg-white/5 backdrop-blur-md rounded-3xl p-12 max-w-5xl w-full transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer group border border-white/10">
                                <div className="relative aspect-[3/2] mb-8 overflow-hidden rounded-2xl">
                                    <div className="absolute inset-0 z-10 rounded-2xl"></div>
                                    <img
                                        src={laptop.image || "/placeholder.svg"}
                                        alt={laptop.name}
                                        className="object-contain rounded-2xl transition-all duration-500 group-hover:scale-110 z-0"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold text-center transition-all duration-300 group-hover:text-blue-400">
                                    {laptop.name}
                                </h3>
                                {laptop.specs && (
                                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">
                                        {laptop.specs}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Accessories Section */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-8 transition-all duration-300 hover:text-gray-300">
                        Accessories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {accessories.map((device, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-green-500/10 cursor-pointer group hover:-translate-y-2 border border-white/10"
                            >
                                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 z-10 rounded-lg"></div>
                                    <img
                                        src={device.image || "/placeholder.svg"}
                                        alt={device.name}
                                        className="object-contain rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 z-0"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold mb-1 transition-all duration-300 group-hover:text-green-400">
                                    {device.name}
                                </h3>
                                {device.specs && (
                                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">
                                        {device.specs}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Gaming PC Hardware Section */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-8 transition-all duration-300 hover:text-gray-300">
                        Gaming PC - Hardware
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gamingHardware.map((device, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-red-500/10 cursor-pointer group hover:-translate-y-3 border border-white/10"
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                }}
                            >
                                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 z-10 rounded-lg"></div>
                                    <img
                                        src={device.image || "/placeholder.svg"}
                                        alt={device.name}
                                        className="object-contain rounded-lg transition-all duration-500 group-hover:scale-110 z-0"
                                    />
                                </div>
                                <h3 className="text-base font-semibold mb-1 leading-tight transition-all duration-300 group-hover:text-red-500">
                                    {device.name}
                                </h3>
                                {device.specs && (
                                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">
                                        {device.specs}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                {/* Coding */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-8 transition-all duration-300 hover:text-gray-300">
                        Coding
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coding.map((device, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer group hover:-translate-y-3 border border-white/10"
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                }}
                            >
                                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 z-10 rounded-lg"></div>
                                    <img
                                        src={device.image || "/placeholder.svg"}
                                        alt={device.name}
                                        className="object-contain rounded-lg transition-all duration-500 group-hover:scale-110 z-0"
                                    />
                                </div>
                                <h3 className="text-base font-semibold mb-1 leading-tight transition-all duration-300 group-hover:text-blue-500">
                                    {device.name}
                                </h3>
                                {device.specs && (
                                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">
                                        {device.specs}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
                {/* Software */}
                <section>
                    <h2 className="text-2xl font-bold text-center mb-8 transition-all duration-300 hover:text-gray-300">
                        Software
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {software.map((device, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 cursor-pointer group hover:-translate-y-3 border border-white/10"
                                style={{
                                    transitionDelay: `${index * 50}ms`,
                                }}
                            >
                                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                                    <div className="absolute inset-0 z-10 rounded-lg"></div>
                                    <img
                                        src={device.image || "/placeholder.svg"}
                                        alt={device.name}
                                        className="object-contain rounded-lg transition-all duration-500 group-hover:scale-110 z-0"
                                    />
                                </div>
                                <h3 className="text-base font-semibold mb-1 leading-tight transition-all duration-300 group-hover:text-yellow-500">
                                    {device.name}
                                </h3>
                                {device.specs && (
                                    <p className="text-gray-400 text-sm transition-all duration-300 group-hover:text-gray-300">
                                        {device.specs}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
