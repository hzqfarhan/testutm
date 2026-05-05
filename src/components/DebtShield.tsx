"use client"

import { useState } from "react"
import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, CheckCircle2, TrendingDown, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DebtShield() {
  const { safeDailySpend, debtRiskScore } = useStore()
  const [item, setItem] = useState("")
  const [price, setPrice] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  const simulateAffordability = () => {
    setIsSimulating(true)
    setTimeout(() => {
      const p = parseFloat(price)
      const impact = p / 14 // split over remaining days
      const newDailySpend = safeDailySpend - impact
      
      let recommendation = "Safe"
      if (newDailySpend < 5) recommendation = "Avoid"
      else if (newDailySpend < 12) recommendation = "Caution"

      setResult({
        impact: impact.toFixed(2),
        newDailySpend: Math.max(0, newDailySpend).toFixed(2),
        recommendation,
        debtRiskImpact: (p / 20).toFixed(0)
      })
      setIsSimulating(false)
    }, 1500)
  }

  return (
    <div className="p-4 space-y-6 pb-28 max-w-lg mx-auto">
      <header className="space-y-1 mt-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400 text-glow drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          <h1 className="text-2xl font-black">Debt Shield</h1>
        </div>
        <p className="text-white/60 text-sm">Predict impact before you commit</p>
      </header>

      {/* Simulator Input */}
      <Card className="glass-card overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full mix-blend-screen -z-10" />
        <CardHeader className="p-5">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-white/90">
            <Info className="w-4 h-4 text-primary" /> Affordability Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Item Name</label>
            <Input 
              placeholder="e.g. New Shoes" 
              value={item} 
              onChange={(e) => setItem(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus:border-primary/50 focus:ring-primary backdrop-blur-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Price (RM)</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 focus:border-primary/50 focus:ring-primary backdrop-blur-sm"
            />
          </div>
          <Button 
            className="w-full bg-white hover:bg-white/90 text-black font-black h-12 shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-full transition-all"
            onClick={simulateAffordability}
            disabled={!price || isSimulating}
          >
            {isSimulating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4 text-primary" />
              </motion.div>
            ) : "Simulate Impact"}
          </Button>
        </CardContent>
      </Card>

      {/* Result Area */}
      <AnimatePresence>
        {result && !isSimulating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className={cn(
              "glass-card overflow-hidden",
              result.recommendation === "Avoid" ? "border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.1)]" : 
              result.recommendation === "Caution" ? "border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.1)]" : "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
            )}>
              <div className={cn(
                "p-3 text-center text-xs font-black uppercase tracking-widest backdrop-blur-md border-b border-white/10",
                result.recommendation === "Avoid" ? "bg-rose-500/20 text-rose-400" : 
                result.recommendation === "Caution" ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
              )}>
                Recommendation: {result.recommendation}
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-around text-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">New Daily Spend</p>
                    <p className="text-2xl font-black text-white/90">RM {result.newDailySpend}</p>
                    <div className="flex items-center gap-1 text-[10px] text-rose-400 justify-center drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]">
                      <TrendingDown className="w-3 h-3" /> RM {result.impact}/day
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-white/50 uppercase font-bold tracking-wider">Debt Risk Score</p>
                    <p className="text-2xl font-black text-white/90">+{result.debtRiskImpact}</p>
                    <p className="text-[10px] text-white/40 font-medium">pts increase</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
                  <p className="text-[11px] text-white/70 leading-relaxed italic">
                    {result.recommendation === "Avoid" ? 
                      "This purchase will drop your daily budget below RM5, which is dangerous for survival. The Debt Shield agent strongly advises against this." :
                      result.recommendation === "Caution" ?
                      "You can afford this, but it will significantly tighten your daily budget. Consider waiting until your next allowance." :
                      "This purchase is well within your resilient range. It won't significantly impact your survival budget."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tracker */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold px-2 text-white/80">Active Commitments</h3>
        <div className="space-y-2">
          {[
            { name: "Shopee PayLater", amount: 45.00, icon: "🛍️", risk: "Low" },
            { name: "Netflix Subscription", amount: 35.00, icon: "📺", risk: "Low" },
            { name: "PTPTN Installment", amount: 150.00, icon: "🎓", risk: "Medium" },
          ].map((item) => (
            <Card key={item.name} className="glass-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/90">{item.name}</p>
                    <p className="text-[10px] text-white/50 font-medium">Monthly: RM {item.amount.toFixed(2)}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn(
                  "text-[9px] px-2 py-0.5 border backdrop-blur-sm",
                  item.risk === "Medium" ? "border-amber-500/30 text-amber-400 bg-amber-500/10 shadow-[0_0_10px_rgba(245,158,11,0.1)]" : "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                )}>
                  {item.risk} RISK
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
