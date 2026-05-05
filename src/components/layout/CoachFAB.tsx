"use client"

import { MessageSquare } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function CoachFAB() {
  const pathname = usePathname()

  if (pathname === '/' || pathname === '/coach') return null

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <Link 
        href="/coach"
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform relative group"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Animated dot indicator */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border-2 border-primary"></span>
        </span>
      </Link>
    </div>
  )
}
