"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

type Props = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function SearchBar({ value, onChange, placeholder = "Cari…", className, autoFocus }: Props) {
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus()
  }, [autoFocus])

  return (
    <div className={["flex w-full items-center gap-2", className].filter(Boolean).join(" ")}>
      <Input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="bg-background text-foreground"
      />
      <Button
        type="button"
        variant="outline"
        className="border-border bg-transparent"
        onClick={() => onChange("")}
        aria-label="Clear search"
        disabled={!value}
      >
        Clear
      </Button>
    </div>
  )
}
