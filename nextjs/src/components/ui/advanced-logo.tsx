import type React from "react"

interface AdvancedLogoProps {
  className?: string
  size?: number
}

export const SoftHubAdvancedLogo: React.FC<AdvancedLogoProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#06b6d4", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#e5e7eb", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Background with modern rounded corners */}
      <rect width="40" height="40" rx="8" fill="url(#bgGradient)" />

      {/* Outer glow effect */}
      <rect width="38" height="38" x="1" y="1" rx="7" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      {/* Main shield shape (cybersecurity) */}
      <path d="M20 8L26 11V19C26 22 23 25 20 25C17 25 14 22 14 19V11L20 8Z" fill="url(#shieldGradient)" />

      {/* Code brackets inside shield */}
      <path d="M17 15L16 17L17 19" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M23 15L24 17L23 19" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />

      {/* Center dot representing connection/hub */}
      <circle cx="20" cy="17" r="1.5" fill="#8b5cf6" />

      {/* Subtle geometric pattern */}
      <path d="M20 12L22 14L20 16L18 14L20 12Z" fill="rgba(59, 130, 246, 0.3)" />
    </svg>
  )
}
