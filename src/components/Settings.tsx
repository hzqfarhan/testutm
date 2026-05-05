"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Bell, Shield, Wallet, CircleHelp, LogOut, ChevronRight, AlertTriangle, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { t } from "@/lib/translations"

export function Settings() {
  const { user, language, setLanguage } = useStore()
  const router = useRouter()
  const strings = t[language]
  const [showLogout, setShowLogout] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = () => {
    setIsLoggingOut(true)
    setTimeout(() => {
      // Simulation of secure logout clearing state
      router.push("/")
    }, 1500)
  }

  return (
    <div className="p-4 space-y-6 pb-28 max-w-lg mx-auto">
      <header className="flex flex-col items-center space-y-3 pt-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-4 border-white/5 p-1 bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/20 text-primary text-3xl font-black">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-4 border-[#030014] flex items-center justify-center text-white shadow-lg">
            <User className="w-4 h-4" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-white">{user.name}</h2>
          <p className="text-xs text-white/50">{user.type} • {user.spendingPersonality}</p>
        </div>
      </header>

      {/* Menu Sections */}
      <div className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-[10px] uppercase font-bold text-white/40 px-3 tracking-widest">{strings.settingsPreferences}</h3>
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{strings.settingsLanguage}</span>
                </div>
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:text-white/80'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('ms')}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all ${language === 'ms' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'text-white/50 hover:text-white/80'}`}
                  >
                    BM
                  </button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{strings.settingsSmartNotif}</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-white/90">{strings.settingsDebtAuto}</span>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h3 className="text-[10px] uppercase font-bold text-white/40 px-3 tracking-widest">{strings.settingsAccount}</h3>
          <Card className="glass-card">
            <CardContent className="p-0">
              {[
                { icon: Wallet, label: strings.settingsPaymentMethods, color: "text-blue-400", bg: "bg-blue-500/10" },
                { icon: User, label: strings.settingsProfile, color: "text-primary", bg: "bg-primary/10" },
                { icon: CircleHelp, label: strings.settingsHelp, color: "text-amber-400", bg: "bg-amber-500/10" },
              ].map((item, i) => (
                <div key={item.label} className={`p-4 flex items-center justify-between ${i !== 2 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors cursor-pointer`}>
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white/30" />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2 mt-8">
          <h3 className="text-[10px] uppercase font-bold text-rose-500/70 px-3 tracking-widest">{strings.settingsSecureSession}</h3>
          <Card className="border-rose-500/20 bg-rose-500/5 shadow-[0_0_15px_rgba(244,63,94,0.05)] backdrop-blur-md">
            <CardContent className="p-2">
              <button 
                onClick={() => setShowLogout(true)}
                className="w-full flex items-center justify-center text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 gap-2 font-black text-sm py-4 rounded-xl transition-all active:scale-95"
              >
                <LogOut className="w-4 h-4" /> {strings.settingsSignOut}
              </button>
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="text-center pt-8">
        <p className="text-[10px] text-white/30 font-medium tracking-wide">Resilience Agent System v1.0.4-alpha</p>
        <p className="text-[10px] text-white/20 mt-1 tracking-widest uppercase">Made with 🧬 in Malaysia</p>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLoggingOut && setShowLogout(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[70]"
            >
              <Card className="glass-card-premium border-rose-500/20 shadow-[0_20px_50px_rgba(244,63,94,0.15)] max-w-sm mx-auto overflow-hidden">
                <CardContent className="p-6 text-center space-y-6">
                  <div className="w-16 h-16 bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-2 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                    <LogOut className="w-8 h-8 ml-1" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-xl text-white">{strings.logoutReady}</h3>
                    <p className="text-xs text-white/60 leading-relaxed px-4">
                      {strings.logoutDesc}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <button 
                      disabled={isLoggingOut}
                      onClick={() => setShowLogout(false)}
                      className="py-4 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-bold hover:bg-white/10 hover:text-white transition-all text-sm"
                    >
                      {strings.logoutCancel}
                    </button>
                    <button 
                      disabled={isLoggingOut}
                      onClick={handleLogout}
                      className="py-4 rounded-2xl bg-rose-500 text-white font-black hover:bg-rose-600 text-sm shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all"
                    >
                      {isLoggingOut ? strings.logoutSecuring : strings.logoutConfirm}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
