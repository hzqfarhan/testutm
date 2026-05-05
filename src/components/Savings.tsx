"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Plus, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export function Savings() {
  const { savingsPockets, user } = useStore()

  return (
    <div className="p-4 space-y-6 pb-24 max-w-lg mx-auto">
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary text-glow" />
            <h1 className="text-2xl font-bold">Savings</h1>
          </div>
          <p className="text-muted-foreground text-sm">Emergency Fund: RM {user.currentEmergencyFund}</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-slate-900">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      {/* Auto-Save Card */}
      <Card className="glass-card border-primary/20 bg-primary/5">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <p className="text-sm font-bold text-primary">Smart Auto-Save</p>
            </div>
            <p className="text-[10px] text-muted-foreground">Moving RM 2.00 daily to Emergency Fund</p>
          </div>
          <Button size="sm" className="bg-primary text-slate-900 text-[10px] h-7">Active</Button>
        </CardContent>
      </Card>

      {/* Savings Pockets */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold px-1">Active Pockets</h3>
        {savingsPockets.map((pocket, i) => (
          <motion.div
            key={pocket.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-xl">
                      {pocket.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold">{pocket.name}</p>
                      <p className="text-[10px] text-muted-foreground">RM {pocket.current} of RM {pocket.target}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-primary/20 text-primary">
                    {Math.round((pocket.current / pocket.target) * 100)}%
                  </Badge>
                </div>
                <div className="space-y-1">
                  <Progress value={(pocket.current / pocket.target) * 100} className="h-1.5" />
                </div>
                <div className="flex justify-end pt-1">
                  <button className="text-[10px] text-primary font-bold flex items-center gap-1">
                    ADD FUNDS <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
