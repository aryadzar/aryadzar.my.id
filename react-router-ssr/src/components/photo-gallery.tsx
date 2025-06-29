import {  useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Loading from "./loading"
import { useGoogleSheetData } from "@/hooks/useGoogleSheets"
import useImagesLoaded from "@/hooks/useImageLoaded"

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: photos, loading: loading } = useGoogleSheetData("Gallery")
  const allImagesLoaded = useImagesLoaded([photos ]);


  const openModal = (photoId: number) => {
    setSelectedPhoto(photoId)
    setIsModalOpen(true)
  }

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
  if (loading || !allImagesLoaded) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="absolute inset-0 pointer-events-none  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto mt-40">
        {/* Header */}
            <div className="max-w-7xl mt-16 mx-auto">
                <h1 className="text-4xl font-bold my-4 md:text-5xl">Gallery</h1>
                <h2 className="text-muted-foreground mb-8">A collection of beautiful photographs showcasing the beauty of nature, architecture and everyday life.</h2>
            </div>
            <hr />
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] mt-10">
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
