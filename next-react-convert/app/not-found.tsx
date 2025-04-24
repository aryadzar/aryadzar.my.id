import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col md:flex-row py-10 items-center container mx-auto justify-center min-h-screen text-white">
      {/* Bagian Teks */}
      <div className="text-center md:text-left px-6">
        <h1 className="text-6xl font-bold mb-4">OOPS</h1>
        <h2 className="text-2xl font-medium">404 - That's Error</h2>
        <p className="mt-4 text-gray-300">The requested URL was not found on this server. That's all we know.</p>

        {/* Tombol Back to Home */}
        <div className="mt-6">
          <Link
            href="/"
            className="px-6 py-3 inline-block rounded-lg bg-gradient-to-t from-[#2C1250] to-[#6429B6] hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Bagian Gambar */}
      <div className="flex justify-center mt-8 md:mt-0">
        <img src="/icons/404-scarameow.svg" alt="404 Image" className="w-64 h-64 object-contain" />
      </div>
    </div>
  )
}
