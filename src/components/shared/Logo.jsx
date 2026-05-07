export default function Logo({ className, style }) {
  return (
    <svg 
      className={className} 
      style={style}
      viewBox="0 0 160 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>

      {/* First 'a' (Orange) */}
      <path 
        d="M 50 20 C 25 20 10 35 10 55 C 10 75 25 90 50 90 C 65 90 75 80 80 70 L 80 90 L 100 90 L 100 55 C 100 30 85 20 50 20 Z M 50 70 C 35 70 30 65 30 55 C 30 45 35 40 50 40 C 65 40 70 45 70 55 C 70 65 65 70 50 70 Z" 
        fill="url(#gradOrange)" 
      />
      
      {/* Second 'a' (Blue) */}
      <path 
        d="M 110 20 C 85 20 70 35 70 55 C 70 75 85 90 110 90 C 125 90 135 80 140 70 L 140 90 L 160 90 L 160 55 C 160 30 145 20 110 20 Z M 110 70 C 95 70 90 65 90 55 C 90 45 95 40 110 40 C 125 40 130 45 130 55 C 130 65 125 70 110 70 Z" 
        fill="url(#gradBlue)" 
        opacity="0.9" 
      />
    </svg>
  )
}
