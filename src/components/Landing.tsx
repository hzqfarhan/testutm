"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, Zap, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-12 overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
          <Zap className="w-3 h-3" /> AI Financial Resilience
        </div>
        <h1 className="text-5xl font-black tracking-tighter leading-tight">
          Secure Your <span className="text-primary text-glow">Future</span> Today.
        </h1>
        <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
          The AI financial companion designed specifically for students and fresh graduates.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
        <Link href="/dashboard" className="w-full">
          <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-slate-900 font-black text-lg rounded-2xl group shadow-xl shadow-primary/20">
            Get Started <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl text-xs font-bold">
            Sign In
          </Button>
          <Button variant="outline" className="flex-1 h-12 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl text-xs font-bold">
            Demo Mode
          </Button>
        </div>
      </div>

      <div className="flex justify-around w-full max-w-sm pt-8">
        {[
          { icon: Shield, label: "Debt Shield" },
          { icon: Zap, label: "Agents" },
          { icon: TrendingUp, label: "Predict" },
        ].map((item, i) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="absolute bottom-8 text-[10px] text-muted-foreground/50 font-medium">
        Trusted by 10,000+ students in Malaysia
      </p>
    </div>
  )
}
