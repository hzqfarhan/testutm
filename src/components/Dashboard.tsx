"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, ShieldCheck, Wallet, Settings as SettingsIcon, QrCode, Send, History } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { BudgetGuardModal } from "./BudgetGuardModal"
import { ResilienceModal } from "./ResilienceModal"
import Link from "next/link"
import { t } from "@/lib/translations"

export function Dashboard() {
  const { user, resilienceScore, safeDailySpend, cashflowRisk, debtRiskScore, language } = useStore()
  const [showGuardModal, setShowGuardModal] = useState(false)
  const [showResilienceModal, setShowResilienceModal] = useState(false)
  const strings = t[language]

  return (
    <div className="p-4 space-y-6 pb-28 max-w-lg mx-auto">
      <header className="flex justify-between items-center mt-2">
        <div>
          <p className="text-white/60 text-xs tracking-wider uppercase mb-1">{strings.dashGreeting}</p>
          <h1 className="text-2xl font-black tracking-tight">{user.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/settings" className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <SettingsIcon className="w-5 h-5" />
          </Link>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowResilienceModal(true)}
            className="w-11 h-11 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-black text-sm relative overflow-hidden group shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-primary/30 transition-all"
          >
            <span className="absolute inset-0 bg-white/20 blur-sm translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            {resilienceScore}%
          </motion.button>
        </div>
      </header>

      {/* Main Balance Card - Liquid Glass Holographic */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="glass-card-premium border-white/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/30 blur-[60px] rounded-full mix-blend-screen -z-10 pointer-events-none" />
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/70 text-xs font-medium mb-1">{strings.dashBalance}</p>
                <h2 className="text-4xl font-black tracking-tighter text-glow">
                  <span className="text-xl align-top mr-1 font-bold text-white/50">RM</span>
                  {user.currentBalance.toFixed(2)}
                </h2>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-white/50 mb-1">{strings.dashSafeDaily}</p>
                <p className="text-base font-bold text-primary">RM {safeDailySpend.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-[10px] text-white/50 mb-1">{strings.dashNextIn}</p>
                <p className="text-base font-bold">14 {strings.dashDays}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions - iOS Style circular pills */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: History, label: strings.actionTransaction, href: "/transactions", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
          { icon: Send, label: strings.actionTransfer, href: "/transfer", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { icon: QrCode, label: strings.actionBills, href: "#", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
          { icon: ShieldCheck, label: strings.actionShield, href: "/debt-shield", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        ].map((action) => (
          <Link key={action.label} href={action.href} className="flex flex-col items-center gap-2 group">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${action.bg} ${action.color} border ${action.border} backdrop-blur-xl group-hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)]`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-medium text-white/70">{action.label}</span>
          </Link>
        ))}
      </div>


      {/* Risk Indicators */}
      <Card className="glass-card">
        <CardHeader className="p-5 pb-3">
          <CardTitle className="text-sm font-semibold text-white/80">{strings.sectionHealthCheck}</CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">{strings.riskCashflow}</span>
              <span className={cn(
                "font-bold uppercase tracking-wider",
                cashflowRisk === 'high' ? "text-rose-400" : cashflowRisk === 'medium' ? "text-amber-400" : "text-emerald-400"
              )}>
                {cashflowRisk}
              </span>
            </div>
            <Progress value={cashflowRisk === 'high' ? 85 : cashflowRisk === 'medium' ? 60 : 20} className="h-2 bg-white/10" indicatorClassName={cn(
              cashflowRisk === 'high' ? "bg-rose-500" : cashflowRisk === 'medium' ? "bg-amber-500" : "bg-emerald-500"
            )} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60">{strings.riskDebtShield}</span>
              <span className="text-emerald-400 font-bold uppercase tracking-wider">HEALTHY ({debtRiskScore})</span>
            </div>
            <Progress value={debtRiskScore} className="h-2 bg-white/10" indicatorClassName="bg-emerald-500" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold px-2 text-white/80">{strings.sectionInsights}</h3>
        <motion.div 
          className="p-4 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex gap-3 items-start cursor-pointer backdrop-blur-md"
          whileHover={{ scale: 1.02 }}
          onClick={() => setShowGuardModal(true)}
        >
          <div className="p-2.5 rounded-full bg-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-amber-400">{strings.insightBrokeDate}</p>
            <p className="text-[11px] text-white/60 leading-relaxed">{strings.insightBrokeDesc}</p>
          </div>
        </motion.div>

        <motion.div 
          className="p-4 rounded-3xl bg-primary/5 border border-primary/20 flex gap-3 items-start backdrop-blur-md"
          whileHover={{ scale: 1.02 }}
        >
          <div className="p-2.5 rounded-full bg-primary/20 text-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">{strings.insightSavings}</p>
            <p className="text-[11px] text-white/60 leading-relaxed">{strings.insightSavingsDesc}</p>
          </div>
        </motion.div>
      </div>
      
      {/* Mini Transactions */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-2">
          <h3 className="text-sm font-semibold text-white/80">{strings.sectionRecent}</h3>
          <Link href="/transactions" className="text-[10px] text-primary uppercase font-bold tracking-wider hover:text-white transition-colors">{strings.viewAll}</Link>
        </div>
        <Card className="glass-card">
          <CardContent className="p-0">
            {useStore.getState().transactions.slice(0, 3).map((t, i) => (
              <div key={t.id} className={cn(
                "p-4 flex justify-between items-center",
                i !== 2 && "border-b border-white/5"
              )}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg shadow-inner">
                    {t.category === 'Food' ? '🍱' : t.category === 'Transport' ? '🚗' : '🛍️'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white/90">{t.title}</p>
                    <p className="text-[10px] text-white/50">{t.category}</p>
                  </div>
                </div>
                <p className="text-xs font-bold text-white">-RM {t.amount.toFixed(2)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <BudgetGuardModal 
        isOpen={showGuardModal} 
        onClose={() => setShowGuardModal(false)} 
      />

      <ResilienceModal
        isOpen={showResilienceModal}
        onClose={() => setShowResilienceModal(false)}
        score={resilienceScore}
      />
    </div>
  )
}

