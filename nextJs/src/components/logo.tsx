import type React from "react"

interface LogoProps {
  className?: string
  size?: number
}

export const SoftHubLogo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background rounded rectangle */}
      <rect width="32" height="32" rx="6" fill="url(#logoGradient)" />

      {/* Code brackets */}
      <path d="M8 12L6 16L8 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 12L26 16L24 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Center element - shield for security */}
      <path d="M16 10L19 12V17C19 18.5 17.5 20 16 20C14.5 20 13 18.5 13 17V12L16 10Z" fill="white" />
    </svg>
  )
}
