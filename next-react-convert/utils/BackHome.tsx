"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackHome() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push("/")}
      className="inline-flex items-center mt-10 gap-2 text-gray-400 hover:text-white transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      <span>Back to Home</span>
    </button>
  )
}
