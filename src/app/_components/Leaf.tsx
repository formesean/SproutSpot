import * as React from "react"
import { cn } from "../../lib/utils"

interface LeafProps extends React.SVGProps<SVGSVGElement> {
  size?: number
}

export const Leaf = React.forwardRef<SVGSVGElement, LeafProps>(({ className, size = 24, ...props }, ref) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-leaf", className)}
    ref={ref}
    {...props}
  >
    <path d="M6 2v6c0 1.6 1.3 3 3 3h6c1.7 0 3-1.4 3-3V2l-6-2-6 2z" />
    <path d="M18 13a3 3 0 1 0-6 0v7a2 2 0 0 1-2 2H5" />
  </svg>
))
Leaf.displayName = "Leaf"