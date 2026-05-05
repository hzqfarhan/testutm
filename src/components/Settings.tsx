"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Wallet, CircleHelp, LogOut, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function Settings() {
  const { user } = useStore()

  return (
    <div className="p-4 space-y-6 pb-24 max-w-lg mx-auto">
      <header className="flex flex-col items-center space-y-3 pt-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-primary/20 p-1">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-3xl font-bold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center text-slate-900">
            <User className="w-4 h-4" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-xs text-muted-foreground">{user.type} • {user.spendingPersonality}</p>
        </div>
      </header>

      {/* Menu Sections */}
      <div className="space-y-4">
        <section className="space-y-2">
          <h3 className="text-[10px] uppercase font-bold text-muted-foreground px-2 tracking-widest">Preferences</h3>
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">Smart Notifications</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-medium">Debt Shield Auto-Analyze</span>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h3 className="text-[10px] uppercase font-bold text-muted-foreground px-2 tracking-widest">Account</h3>
          <Card className="glass-card">
            <CardContent className="p-0">
              {[
                { icon: Wallet, label: "Payment Methods", color: "text-blue-500" },
                { icon: User, label: "Profile Information", color: "text-primary" },
                { icon: CircleHelp, label: "Help & Support", color: "text-amber-500" },
              ].map((item, i) => (
                <div key={item.label} className={`p-4 flex items-center justify-between ${i !== 2 ? 'border-b border-slate-200' : ''}`}>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <Button variant="ghost" className="w-full text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-2 font-bold text-xs py-6 rounded-2xl border border-rose-500/20 mt-4">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] text-muted-foreground">Resilience Agent System v1.0.4-alpha</p>
        <p className="text-[10px] text-muted-foreground">Made with 🧬 in Malaysia</p>
      </div>
    </div>
  )
}

function Button({ children, className, variant, ...props }: any) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  )
}
