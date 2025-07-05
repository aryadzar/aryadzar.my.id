// components/PreserveLink.tsx
import { Link, LinkProps, useLocation } from 'react-router-dom'

interface PreserveLinkProps extends LinkProps {
  to: string
}

export default function PreserveLink({ to, children, className }: PreserveLinkProps) {
  const { search } = useLocation()

  return (
    <Link to={`${to}${search}`} className={className}>
      {children}
    </Link>
  )
}
