export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <img src="/scaramouche.gif" alt="Loading" className="w-20 h-20 mb-4" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  );
}
