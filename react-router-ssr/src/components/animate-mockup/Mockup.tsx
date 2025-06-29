export default function HeroWithPortfolioBg() {
  return (
    <>
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,_var(--tw-gradient-stops))] from-violet-600/40 via-purple-600/30  to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_40%,_var(--tw-gradient-stops))] from-transparent via-violet-500/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-purple-500/15 to-transparent blur-3xl" />
      </div>

      {/* Portfolio Project Mockups with Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* E-commerce Website Mockup */}
        <div className="absolute top-16 left-8 w-80 h-48 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl animate-float-slow opacity-40 hover:opacity-60 transition-opacity duration-300">
          <div className="p-6 h-full flex flex-col">
            {/* Browser Header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              <div className="ml-4 w-32 h-2 bg-white/20 rounded-full"></div>
            </div>
            {/* Website Content */}
            <div className="flex-1 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-lg p-4">
              <div className="w-full h-6 bg-white/30 rounded mb-3"></div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 bg-white/20 rounded"></div>
                <div className="h-12 bg-white/20 rounded"></div>
                <div className="h-12 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard App Mockup */}
        <div className="absolute top-24 right-12 w-96 h-56 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl animate-float-medium opacity-35 hover:opacity-55 transition-opacity duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              <div className="ml-4 w-40 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-violet-500/30 to-pink-500/30 rounded-lg p-4">
              <div className="flex gap-4 mb-3">
                <div className="w-16 h-4 bg-white/30 rounded"></div>
                <div className="w-20 h-4 bg-white/25 rounded"></div>
                <div className="w-12 h-4 bg-white/20 rounded"></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-white/20 rounded-lg"></div>
                <div className="h-16 bg-white/15 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Mockup */}
        <div className="absolute bottom-32 left-16 w-48 h-80 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl animate-float-fast opacity-30 hover:opacity-50 transition-opacity duration-300">
          <div className="p-4 h-full flex flex-col">
            {/* Phone Header */}
            <div className="w-full h-6 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-t-2xl mb-4 flex items-center justify-center">
              <div className="w-8 h-1 bg-white/40 rounded-full"></div>
            </div>
            {/* App Content */}
            <div className="flex-1 space-y-4">
              <div className="w-full h-8 bg-white/25 rounded-lg"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-20 bg-white/20 rounded-lg"></div>
                <div className="h-20 bg-white/20 rounded-lg"></div>
              </div>
              <div className="w-full h-12 bg-white/15 rounded-lg"></div>
              <div className="w-full h-16 bg-white/10 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Portfolio Website Mockup */}
        <div className="absolute bottom-16 right-20 w-88 h-52 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl animate-float-slow opacity-45 hover:opacity-65 transition-opacity duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              <div className="ml-4 w-36 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-lg p-4">
              <div className="text-center mb-3">
                <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-2"></div>
                <div className="w-24 h-2 bg-white/40 rounded mx-auto"></div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 bg-white/20 rounded"></div>
                <div className="h-8 bg-white/20 rounded"></div>
                <div className="h-8 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SaaS Landing Page Mockup */}
        <div className="absolute top-1/2 left-2 w-72 h-44 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl animate-float-medium opacity-25 hover:opacity-45 transition-opacity duration-300">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              <div className="ml-4 w-28 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-lg p-3">
              <div className="text-center mb-2">
                <div className="w-full h-3 bg-white/40 rounded mb-2"></div>
                <div className="w-3/4 h-2 bg-white/30 rounded mx-auto mb-3"></div>
              </div>
              <div className="w-20 h-6 bg-white/35 rounded mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Blog Website Mockup */}
        <div className="absolute top-1/3 right-4 w-84 h-48 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl animate-float-fast opacity-35 hover:opacity-55 transition-opacity duration-300">
          <div className="p-5 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-red-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400/60 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400/60 rounded-full"></div>
              <div className="ml-4 w-32 h-2 bg-white/20 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-lg p-4">
              <div className="space-y-2">
                <div className="w-full h-3 bg-white/40 rounded"></div>
                <div className="w-4/5 h-2 bg-white/30 rounded"></div>
                <div className="w-3/5 h-2 bg-white/25 rounded"></div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="h-8 bg-white/20 rounded"></div>
                  <div className="h-8 bg-white/15 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Custom CSS Animations */}
      <style >{`
        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(1deg); 
          }
        }
        @keyframes float-medium {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(-1deg); 
          }
        }
        @keyframes float-fast {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotate(0.5deg); 
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
      `}</style>

    </>
  )
}
