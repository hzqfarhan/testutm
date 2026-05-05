"use client"

import { useStore } from "@/store/useStore"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, BrainCircuit, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Transfer() {
  const router = useRouter()
  const { user, addTransaction, safeDailySpend } = useStore()
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const numAmount = parseFloat(amount)
  const prediction = !isNaN(numAmount) && numAmount > 0
    ? numAmount > safeDailySpend * 3
      ? `Sending RM${numAmount} will move your Broke Date 4 days earlier. Are you sure this is necessary?`
      : numAmount > safeDailySpend
        ? `This exceeds your safe daily limit of RM${safeDailySpend.toFixed(2)}.`
        : null
    : null

  const handleTransfer = () => {

    if (!amount || isNaN(parseFloat(amount))) return
    
    setIsProcessing(true)
    setTimeout(() => {
      addTransaction({
        id: Date.now().toString(),
        title: "Ahmad Ali (Maybank)",
        amount: parseFloat(amount),
        date: new Date().toISOString(),
        category: "Transfer",
        type: 'expense',
        confidence: 0.80
      })
      router.push("/dashboard")
    }, 1500)

  }

  return (
    <div className="min-h-screen bg-transparent flex flex-col max-w-lg mx-auto">
      <header className="px-4 pt-safe pb-4 sticky top-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-3 pt-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white/70 rounded-full hover:bg-white/10 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold text-white">Transfer</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6 pb-28">
        
        {/* Recipient Mock */}
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 shrink-0 shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-white/90">Ahmad Ali</p>
              <p className="text-xs text-white/50">Maybank • 1622 **** 8899</p>
            </div>
          </CardContent>
        </Card>

        {/* Amount Input */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider px-2">Amount</p>
          <div className="relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-white/40">RM</span>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-16 h-24 text-5xl font-black text-white bg-white/5 border border-white/10 rounded-[2rem] placeholder:text-white/20 focus-visible:ring-primary focus-visible:border-primary/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] backdrop-blur-md"
            />
          </div>
        </div>

        {/* AI Interception */}
        <AnimatePresence>
          {prediction && (
            <motion.div 
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <BrainCircuit className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-amber-400">Cashflow Prediction</p>
                  <p className="text-xs text-white/70 leading-relaxed">{prediction}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ref Input */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider px-2">Reference</p>
          <Input 
            placeholder="e.g. Dinner yesterday" 
            className="h-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus-visible:ring-primary focus-visible:border-primary/50 backdrop-blur-md px-4"
          />
        </div>

      </main>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe-offset-4 bg-background/80 backdrop-blur-xl border-t border-white/5 z-40 max-w-lg mx-auto">
        <Button 
          onClick={handleTransfer}
          disabled={!amount || isProcessing}
          className="w-full h-14 bg-white hover:bg-white/90 text-black font-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] flex gap-2 transition-all"
        >
          {isProcessing ? "Processing..." : "Transfer Now"} <Send className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
