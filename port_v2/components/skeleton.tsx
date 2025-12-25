import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "./ui/card";

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

export function AboutSkeleton() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-12 md:py-16"
    >
      <div className="max-w-5xl px-4 mx-auto md:px-6 animate-pulse">
        {/* Title */}
        <div className="w-40 h-6 mb-6 rounded bg-muted md:mb-8" />

        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">
          {/* Photo skeleton */}
          <Skeleton className="w-56 h-56 rounded-xl bg-muted" />

          {/* Text skeleton */}
          <div className="flex-1 space-y-3">
            <Skeleton className="w-56 h-5 rounded bg-muted" />
            <Skeleton className="w-40 h-4 rounded bg-muted" />

            <div className="mt-4 space-y-2">
              <Skeleton className="w-full h-4 rounded bg-muted" />
              <Skeleton className="w-5/6 h-4 rounded bg-muted" />
              <Skeleton className="w-4/6 h-4 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CertificationSkeleton() {
  return (
    <section className="py-10 md:py-12">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Heading Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="w-40 h-6" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="p-5 border shadow-sm rounded-xl border-border bg-card"
            >
              <div className="flex items-start gap-4">
                {/* Logo Skeleton */}
                <Skeleton className="w-12 h-12 rounded-md" />

                <div className="flex-1 space-y-3">
                  {/* Title */}
                  <Skeleton className="w-48 h-5" />
                  {/* Issuer */}
                  <Skeleton className="w-32 h-4" />

                  {/* Date + Badge */}
                  <div className="flex items-center gap-3 pt-2">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="h-4 rounded-full w-14" />
                  </div>

                  {/* Link */}
                  <Skeleton className="w-32 h-4 mt-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsShowcaseSkeleton() {
  return (
    <div className="container grid grid-cols-1 gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="h-full overflow-hidden">
          <Skeleton className="relative aspect-[16/9] w-full rounded-t-lg" />
          <div className="p-6 space-y-3">
            <Skeleton className="w-3/4 h-6" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-1/4 h-5" />
              <Skeleton className="w-1/5 h-5" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-1/3 h-10 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function ExEdSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={idx}
          className="relative p-5 overflow-hidden rounded-xl border-border bg-card"
        >
          <div className="flex items-start gap-4">
            {/* Logo */}
            <Skeleton className="w-12 h-12 rounded-md" />

            <div className="flex-1 min-w-0 space-y-2">
              {/* Title */}
              <Skeleton className="w-40 h-4" />

              {/* Company */}
              <Skeleton className="w-24 h-3" />

              {/* Duration */}
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="w-4 h-4 rounded-sm" />
                <Skeleton className="w-20 h-3" />
              </div>

              {/* Description */}
              <Skeleton className="w-full h-3 mt-2" />
              <Skeleton className="w-5/6 h-3" />

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Skeleton className="w-16 h-5 rounded-full" />
                <Skeleton className="h-5 rounded-full w-14" />
                <Skeleton className="w-20 h-5 rounded-full" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function BlogSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
    <Card key={i}>
      <Skeleton className="aspect-[16/9] w-full" />
      <CardHeader>
        <Skeleton className="w-3/4 h-6" />
        <div className="flex flex-wrap gap-2 pt-2">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-5/6 h-4 mt-2" />
        <Skeleton className="w-32 h-10 mt-6" />
      </CardContent>
    </Card>
  ));
}
