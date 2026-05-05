"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Plus, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { t } from "@/lib/translations"

export function Savings() {
  const { savingsPockets, user, language } = useStore()
  const strings = t[language]

  return (
    <div className="p-4 space-y-6 pb-28 max-w-lg mx-auto">
      <header className="flex justify-between items-end mt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary text-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <h1 className="text-2xl font-black">{strings.saveHeader}</h1>
          </div>
          <p className="text-white/60 text-sm">{strings.saveSubheader}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:bg-primary/90 transition-colors border border-white/20">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Auto-Save Card */}
      <Card className="glass-card-premium border-primary/30 relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-[30px] rounded-full mix-blend-screen -z-10" />
        <CardContent className="p-4 flex justify-between items-center z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-sm font-bold text-primary text-glow">{strings.saveSmartAuto}</p>
            </div>
            <p className="text-[10px] text-white/60">{strings.saveSmartDesc}</p>
          </div>
          <Button size="sm" className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 text-[10px] h-7 shadow-[0_0_15px_rgba(139,92,246,0.2)]">Active</Button>
        </CardContent>
      </Card>

      {/* Savings Pockets */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold px-2 text-white/80">{strings.saveActiveGoals}</h3>
        {savingsPockets.map((pocket, i) => {
          const pocketNameMap: Record<string, string> = {
            '1': strings.savePocketEmerg,
            '2': strings.savePocketLaptop,
            '3': strings.savePocketRent,
          };
          const displayName = pocketNameMap[pocket.id] || pocket.name;

          return (
          <motion.div
            key={pocket.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner">
                      {pocket.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white/90">{displayName}</p>
                      <p className="text-[10px] text-white/50 font-medium tracking-wide">RM {pocket.current} <span className="text-white/30">/</span> RM {pocket.target}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary bg-primary/10 shadow-[0_0_10px_rgba(139,92,246,0.1)]">
                    {Math.round((pocket.current / pocket.target) * 100)}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Progress value={(pocket.current / pocket.target) * 100} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
                </div>
                <div className="flex justify-end pt-1">
                  <button className="text-[10px] text-primary hover:text-white font-bold flex items-center gap-1 transition-colors">
                    {strings.saveAddFunds} <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          )
        })}
      </div>
    </div>
  )
}
