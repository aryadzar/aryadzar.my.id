"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import axios from "axios"
import Loading from "./loading"

// const photos = [
//   { id: 1, src: "/placeholder.svg?height=400&width=600", alt: "Landscape Photo 1", title: "Beautiful Sunset" },
//   { id: 2, src: "/placeholder.svg?height=600&width=400", alt: "Portrait Photo 1", title: "City Architecture" },
//   { id: 3, src: "/placeholder.svg?height=400&width=400", alt: "Square Photo 1", title: "Nature Close-up" },
//   { id: 4, src: "/placeholder.svg?height=500&width=700", alt: "Landscape Photo 2", title: "Mountain View" },
//   { id: 5, src: "/placeholder.svg?height=600&width=400", alt: "Portrait Photo 2", title: "Street Photography" },
//   { id: 6, src: "/placeholder.svg?height=400&width=600", alt: "Landscape Photo 3", title: "Ocean Waves" },
//   { id: 7, src: "/placeholder.svg?height=400&width=400", alt: "Square Photo 2", title: "Urban Life" },
//   { id: 8, src: "/placeholder.svg?height=600&width=500", alt: "Portrait Photo 3", title: "Forest Path" },
//   { id: 9, src: "/placeholder.svg?height=400&width=600", alt: "Landscape Photo 4", title: "Desert Dunes" },
//   { id: 10, src: "/placeholder.svg?height=500&width=400", alt: "Portrait Photo 4", title: "Vintage Car" },
//   { id: 11, src: "/placeholder.svg?height=400&width=400", alt: "Square Photo 3", title: "Food Photography" },
//   { id: 12, src: "/placeholder.svg?height=400&width=600", alt: "Landscape Photo 5", title: "Northern Lights" },
// ]

type Photo = {
  id: number
  src: string
  alt: string
  title: string
  type : "photo" | "video"
}



export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const openModal = (photoId: number) => {
    setSelectedPhoto(photoId)
    setIsModalOpen(true)
  }
    const  fetchPhotos = async () => {
      try {
        const res = await axios.get("/photos.json");
        const items = res.data || [];

        console.log(items);
        setPhotos(items)
        
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setIsLoading(false)

      } finally {
        setIsLoading(false)
      }  
    }
  useEffect(()=> {

    fetchPhotos()
  }, [])

  const navigatePhoto = (direction: "prev" | "next") => {
    if (selectedPhoto === null) return

    const currentIndex = photos.findIndex((photo) => photo.id === selectedPhoto)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    } else {
      newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedPhoto(photos[newIndex].id)
  }

  const selectedPhotoData = photos.find((photo) => photo.id === selectedPhoto)
  if (isLoading ) {
    return <Loading />;
  }
  return (
        <div className="min-h-screen bg-background p-4">
                <div className="absolute inset-0 pointer-events-none  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto mt-40">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold  mb-4">Photo Gallery</h1>
          <p className="text-lg  max-w-2xl mx-auto">
            Koleksi foto-foto indah yang menampilkan keindahan alam, arsitektur, dan kehidupan sehari-hari
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`
                relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2
                ${index % 7 === 0 ? "md:col-span-2 md:row-span-2" : ""}
                ${index % 5 === 0 && index % 7 !== 0 ? "md:row-span-2" : ""}
                ${index % 3 === 0 && index % 5 !== 0 && index % 7 !== 0 ? "md:col-span-2" : ""}
              `}
              onClick={() => openModal(photo.id)}
            >
              {photo.type === "video" ? (
                <video
                  src={photo.src}
                  className="object-cover w-full h-full"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                />
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-lg">{photo.title}</h3>
              </div>
              <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/20 rounded-xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-black/95 border-none flex items-center justify-center">
            {selectedPhotoData && (
              <div className="relative w-full h-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigatePhoto("prev")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigatePhoto("next")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  {selectedPhotoData.type === "video" ? (
                    <video
                      src={selectedPhotoData.src}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="max-h-full max-w-full"
                    />
                  ) : (
                    <img
                      src={selectedPhotoData.src || "/placeholder.svg"}
                      alt={selectedPhotoData.alt}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center px-4">
                  <h2 className="text-2xl font-bold">{selectedPhotoData.title}</h2>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
