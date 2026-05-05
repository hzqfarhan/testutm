"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, CreditCard, Shield, Settings, MessageSquare, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

import { QrCode } from "lucide-react"

const leftNavItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Zap, label: "Agents", href: "/agents" },
]

const rightNavItems = [
  { icon: Target, label: "Save", href: "/savings" },
  { icon: TrendingUp, label: "Reports", href: "/reports" },
]



export function Navbar() {
  const pathname = usePathname()

  if (pathname === '/') return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-slate-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {/* Left Items */}
        <div className="flex justify-around items-center w-2/5">
          {leftNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-glow")} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full neon-border" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Center QR Button */}
        <div className="w-1/5 flex justify-center -mt-8">
          <Link href="/scan" className="w-14 h-14 rounded-full bg-primary flex flex-col items-center justify-center text-white shadow-lg shadow-primary/30 border-4 border-background hover:scale-105 transition-transform">
            <QrCode className="w-6 h-6" />
            <span className="text-[8px] font-bold mt-0.5">PAY</span>
          </Link>
        </div>

        {/* Right Items */}
        <div className="flex justify-around items-center w-2/5">
          {rightNavItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 transition-all duration-300",
                  isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-glow")} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full neon-border" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
