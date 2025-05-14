
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center text-white">
    <img
      src="https://media.tenor.com/EGaqu3rgp3cAAAAi/wanderer-genshin-wanderer.gif"
      alt="Loading..."
      className=" mb-4 animate-pulse"
    />
    <p className="text-lg text-gray-400">Loading post...</p>
  </div>
  )
}
