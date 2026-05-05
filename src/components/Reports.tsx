"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts'
import { motion } from "framer-motion"
import { TrendingUp, Award, Calendar, ChevronRight } from "lucide-react"

const spendingData = [
  { name: 'Mon', amount: 45 },
  { name: 'Tue', amount: 52 },
  { name: 'Wed', amount: 38 },
  { name: 'Thu', amount: 65 },
  { name: 'Fri', amount: 48 },
  { name: 'Sat', amount: 70 },
  { name: 'Sun', amount: 42 },
]

const categoryData = [
  { name: 'Food', value: 450, color: '#6366f1' },
  { name: 'Transport', value: 120, color: '#818cf8' },
  { name: 'Shopping', value: 300, color: '#fbbf24' },
  { name: 'Sub', value: 80, color: '#f87171' },
]

export function Reports() {
  const { resilienceScore } = useStore()

  return (
    <div className="p-4 space-y-6 pb-24 max-w-lg mx-auto">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Weekly Report</h1>
        <p className="text-muted-foreground text-sm">May 1 - May 7, 2026</p>
      </header>

      {/* Resilience Trend */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Resilience Trend
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111114', border: '1px solid #ffffff10', borderRadius: '12px', fontSize: '10px' }}
                itemStyle={{ color: '#818cf8' }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#6366f1" 
                strokeWidth={3} 
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Achievements / Nudge History */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold px-1">Resilience Milestones</h3>
        <Card className="glass-card">
          <CardContent className="p-4 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">Streak: 5 Days Safe</p>
                <p className="text-[10px] text-muted-foreground">You've stayed within your safe daily limit for 5 days!</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">+12 Pts</Badge>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">Accepted: Weekend Guard</p>
                <p className="text-[10px] text-muted-foreground">Saved RM 45.00 by activating guard on Saturday.</p>
              </div>
              <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30">RM 45 Saved</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold px-1">Spending Breakdown</h3>
        <div className="grid grid-cols-1 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-bold">RM {cat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Projected Balance */}
      <Card className="glass-card bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Projected Month-End</p>
            <p className="text-xl font-bold">RM 124.50</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] text-emerald-500 font-bold uppercase">+ RM 20.00</p>
            <p className="text-[9px] text-muted-foreground italic">Compared to last month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
