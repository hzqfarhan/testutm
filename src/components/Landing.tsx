"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, Zap, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Landing() {
  return (
    <div className="min-h-screen bg-transparent text-foreground flex flex-col items-center justify-center p-6 space-y-12 overflow-hidden relative">
      {/* Background Holographic Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full -z-10 mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/20 blur-[120px] rounded-full -z-10 mix-blend-screen" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mt-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-bold tracking-widest uppercase mb-2 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
          <Zap className="w-3.5 h-3.5" /> AI Financial Resilience
        </div>
        <h1 className="text-5xl font-black tracking-tighter leading-tight">
          Make Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Finances</span> Move.
        </h1>
        <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
          Join the fastest and most intelligent financial companion ever built.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-sm mt-8">
        <Link href="/dashboard" className="w-full">
          <Button className="w-full h-14 bg-white hover:bg-white/90 text-black font-black text-lg rounded-full group shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
            Get started <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 h-12 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-full text-xs font-bold transition-colors">
            Sign In
          </Button>
          <Button variant="outline" className="flex-1 h-12 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white rounded-full text-xs font-bold transition-colors">
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
            className="flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex items-center justify-center text-primary shadow-[0_4px_20px_rgba(139,92,246,0.1)]">
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-white/50 font-medium tracking-wide">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <p className="absolute bottom-8 text-[10px] text-white/30 font-medium">
        Trusted by 10,000+ students in Malaysia
      </p>
    </div>
  )
}
