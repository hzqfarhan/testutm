"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Zap, CreditCard, Shield, Settings, MessageSquare, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

import { QrCode } from "lucide-react"
import { useStore } from "@/store/useStore"
import { t } from "@/lib/translations"

export function Navbar() {
  const pathname = usePathname()
  const { language } = useStore()
  const strings = t[language]

  if (pathname === '/') return null

  const leftNavItems = [
    { icon: Home, label: strings.navHome, href: "/dashboard" },
    { icon: Zap, label: strings.navAgents, href: "/agents" },
  ]

  const rightNavItems = [
    { icon: Target, label: strings.navSave, href: "/savings" },
    { icon: TrendingUp, label: strings.navReports, href: "/reports" },
  ]

  return (
    <nav className="fixed bottom-6 left-4 right-4 z-50 glass rounded-full px-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] pb-safe-offset-0">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto relative">
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
                  isActive ? "text-primary scale-110" : "text-white/40 hover:text-white/80"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]")} />
                <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full neon-border" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Center QR Button */}
        <div className="w-1/5 flex justify-center relative -top-6">
          <Link href="/scan" className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center text-white shadow-[0_8px_25px_rgba(139,92,246,0.5)] border-4 border-[#030014] hover:scale-105 transition-transform z-10">
            <QrCode className="w-6 h-6" />
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
                  isActive ? "text-primary scale-110" : "text-white/40 hover:text-white/80"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]")} />
                <span className="text-[9px] font-bold tracking-wide">{item.label}</span>
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
