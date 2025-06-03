// components/NavItem.tsx
import { Link } from "react-router-dom"

interface NavItemProps {
  name: string
  href: string
  type: "route" | "scroll"
  onClick?: () => void
  className?: string
}

export default function NavItem({ name, href, type, onClick, className }: NavItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === "scroll") {
      e.preventDefault()
      onClick?.()

      setTimeout(() => {
        const el = document.getElementById(href)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    } else {
      onClick?.()
    }
  }

  return type === "route" ? (
    <Link to={href} onClick={onClick} className={className}>
      {name}
    </Link>
  ) : (
    <a href={`#${href}`} onClick={handleClick} className={className}>
      {name}
    </a>
  )
}
