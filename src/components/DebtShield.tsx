"use client"

import { useState } from "react"
import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
    <div className="p-4 space-y-6 pb-24 max-w-lg mx-auto">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500 text-glow" />
          <h1 className="text-2xl font-bold">Debt Shield</h1>
        </div>
        <p className="text-muted-foreground text-sm">Predict impact before you commit</p>
      </header>

      {/* Simulator Input */}
      <Card className="glass-card">
        <CardHeader className="p-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> Affordability Simulator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Item Name</label>
            <Input 
              placeholder="e.g. New Shoes" 
              value={item} 
              onChange={(e) => setItem(e.target.value)}
              className="bg-slate-100/50 border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Price (RM)</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}
              className="bg-slate-100/50 border-slate-200"
            />
          </div>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-slate-900 font-bold"
            onClick={simulateAffordability}
            disabled={!price || isSimulating}
          >
            {isSimulating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-4 h-4" />
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
              result.recommendation === "Avoid" ? "border-rose-500/50" : 
              result.recommendation === "Caution" ? "border-amber-500/50" : "border-emerald-500/50"
            )}>
              <div className={cn(
                "p-3 text-center text-xs font-bold uppercase tracking-widest",
                result.recommendation === "Avoid" ? "bg-rose-500 text-slate-900" : 
                result.recommendation === "Caution" ? "bg-amber-500 text-black" : "bg-emerald-500 text-slate-900"
              )}>
                Recommendation: {result.recommendation}
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-around text-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">New Daily Spend</p>
                    <p className="text-xl font-bold">RM {result.newDailySpend}</p>
                    <div className="flex items-center gap-1 text-[10px] text-rose-500 justify-center">
                      <TrendingDown className="w-2.5 h-2.5" /> RM {result.impact}/day
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Debt Risk Score</p>
                    <p className="text-xl font-bold">+{result.debtRiskImpact}</p>
                    <p className="text-[10px] text-muted-foreground">pts increase</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/50 border border-slate-200 space-y-2">
                  <p className="text-[11px] text-muted-foreground italic">
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
        <h3 className="text-sm font-semibold px-1">Active Commitments</h3>
        <div className="space-y-2">
          {[
            { name: "Shopee PayLater", amount: 45.00, icon: "🛍️", risk: "Low" },
            { name: "Netflix Subscription", amount: 35.00, icon: "📺", risk: "Low" },
            { name: "PTPTN Installment", amount: 150.00, icon: "🎓", risk: "Medium" },
          ].map((item) => (
            <Card key={item.name} className="glass-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">Monthly: RM {item.amount.toFixed(2)}</p>
                  </div>
                </div>
                <Badge variant="outline" className={cn(
                  "text-[9px] px-1.5 py-0",
                  item.risk === "Medium" ? "border-amber-500/50 text-amber-500" : "border-emerald-500/50 text-emerald-500"
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
