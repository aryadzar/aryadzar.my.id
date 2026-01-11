import { useState } from "react";

export default function LegacyNotice() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="sticky top-0 z-50 text-black bg-yellow-500">
      <div className="flex items-center justify-between px-4 py-2 mx-auto text-sm max-w-7xl">
        <p>
          ⚠️ This is a legacy portfolio.
          <a
            href="https://aryadzar.my.id"
            className="ml-2 font-semibold underline"
          >
            Visit the new site →
          </a>
        </p>
        <button onClick={() => setOpen(false)} className="ml-4">
          ✕
        </button>
      </div>
    </div>
  );
}
