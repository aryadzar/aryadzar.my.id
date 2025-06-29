"use client"

import type React from "react"
import {Link} from "react-router-dom"

interface NavItemProps {
  name: string
  href: string
  type: "route" | "scroll"
  className?: string
  onClick?: () => void
  renderContent?: () => React.ReactNode
}

export function NavItem({ name, href, type, className = "", onClick, renderContent }: NavItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (type === "scroll") {
      e.preventDefault()
      const element = document.getElementById(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
    onClick?.()
  }

  const content = renderContent ? renderContent() : name

  if (type === "route") {
    return (
      <Link to={href} className={`group ${className}`} onClick={onClick}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={handleClick} className={`group ${className}`}>
      {content}
    </button>
  )
}
