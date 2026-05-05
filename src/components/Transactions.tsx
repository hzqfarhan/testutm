"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, Filter, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export function Transactions() {
  const { transactions, user } = useStore()

  return (
    <div className="p-4 space-y-6 pb-28 max-w-lg mx-auto">
      <header className="flex justify-between items-end mt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary text-glow drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
            <h1 className="text-2xl font-black">Transactions</h1>
          </div>
          <p className="text-white/60 text-sm">Monthly balance: <span className="text-white font-bold">RM {user.currentBalance.toFixed(2)}</span></p>
        </div>
        <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:bg-primary/90 transition-colors border border-white/20">
          <Plus className="w-6 h-6" />
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/40" />
        <input 
          placeholder="Search transactions..." 
          className="w-full bg-white/5 border border-white/10 rounded-full h-11 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md"
        />
        <Filter className="absolute right-4 top-3.5 w-4 h-4 text-white/40" />
      </div>

      <ScrollArea className="h-[calc(100vh-250px)] pr-3">
        <div className="space-y-3">
          {transactions.map((t) => (
            <Card key={t.id} className="glass-card overflow-hidden">
              <CardContent className="p-4 flex justify-between items-center relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-[30px] rounded-full -z-10 mix-blend-screen" />
                <div className="flex items-center gap-4 z-10">
                  <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner">
                    {t.category === 'Food' ? '🍱' : t.category === 'Transport' ? '🚗' : t.category === 'Subscription' ? '📺' : '🛍️'}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white/90">{t.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-white/50 font-medium tracking-wide uppercase">{t.category}</p>
                      <Badge variant="outline" className="text-[8px] h-3.5 px-1.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 backdrop-blur-sm">
                        {Math.round((t.confidence || 0) * 100)}% MATCH
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right z-10">
                  <p className={cn(
                    "text-sm font-black tracking-tight",
                    t.type === 'expense' ? "text-white" : "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  )}>
                    {t.type === 'expense' ? '-' : '+'}RM {t.amount.toFixed(2)}
                  </p>
                  <p className="text-[9px] text-white/40 mt-1 font-medium">{new Date(t.date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
