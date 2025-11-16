import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section
      aria-label="Hero loading..."
      className="relative isolate min-h-[80vh] overflow-hidden bg-background"
    >
      {/* Background video skeleton */}
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full rounded-none" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Content Skeleton */}
      <div className="relative z-10">
        <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            {/* Title */}
            <Skeleton className="w-2/3 h-12" />

            {/* Subtitle */}
            <Skeleton className="w-1/2 h-6" />

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Skeleton className="w-32 h-12 rounded-lg" />
              <Skeleton className="w-32 h-12 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
