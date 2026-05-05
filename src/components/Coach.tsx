"use client"

import { useStore } from "@/store/useStore"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MessageSquare, Send, Sparkles, User } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { t } from "@/lib/translations"

export function Coach() {
  const { user, safeDailySpend, resilienceScore, language } = useStore()
  const strings = t[language]
  const [messages, setMessages] = useState([
    { role: 'assistant', content: language === 'ms' 
      ? `Hai ${user.name}! Saya Jurulatih Ketahanan anda. Had selamat semasa anda ialah RM ${safeDailySpend.toFixed(2)} sehari. Bagaimana saya boleh bantu anda kekal di landasan yang betul?`
      : `Hi ${user.name}! I'm your Resilience Coach. Your current safety limit is RM ${safeDailySpend.toFixed(2)} per day. How can I help you stay on track?` }
  ])
  const [input, setInput] = useState("")

  const sendMessage = (overrideText?: string) => {
    const textToSubmit = overrideText || input;
    if (!textToSubmit.trim()) return
    const newMessages = [...messages, { role: 'user', content: textToSubmit }]
    setMessages(newMessages)
    if (!overrideText) setInput("")

    // Mock response
    setTimeout(() => {
      let response = "I'm analyzing your cashflow... Based on your current balance of RM 420, I suggest keeping non-essential spending below RM 10 today."
      if (textToSubmit.toLowerCase().includes("shoes") || textToSubmit.toLowerCase().includes("buy") || textToSubmit.toLowerCase().includes("afford")) {
        response = `Buying that now would reduce your safe daily spending from RM ${safeDailySpend.toFixed(2)} to RM 12.40. It's better to wait 5 days until your resilience score improves.`
      } else if (textToSubmit.toLowerCase().includes("broke")) {
        response = "Based on your current spending pace, you are projected to hit RM 0 by May 18. Activating Budget Guard can push this to May 25."
      } else if (textToSubmit.toLowerCase().includes("score") || textToSubmit.toLowerCase().includes("improve")) {
        response = "To improve your score, try to consistently stay RM 5 below your safe daily limit and set up an Auto-Save rule of at least RM 2/day."
      } else if (textToSubmit.toLowerCase().includes("safe limit")) {
        response = `Your absolute safe limit for today is RM ${safeDailySpend.toFixed(2)}. This ensures you can cover your commitments until your next allowance.`
      }
      setMessages([...newMessages, { role: 'assistant', content: response }])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-lg mx-auto p-4 space-y-4">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary text-glow" />
          <h1 className="text-xl font-bold">{strings.coachHeader}</h1>
        </div>
        <Badge variant="outline" className="text-[10px] bg-primary/10 border-primary/20 text-primary">
          RESILIENCE: {resilienceScore}%
        </Badge>
      </header>

      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4 pb-4">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                m.role === 'user' ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                m.role === 'assistant' ? "bg-primary/20 border-primary/30 text-primary" : "bg-secondary border-slate-200 text-muted-foreground"
              )}>
                {m.role === 'assistant' ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={cn(
                "p-3 rounded-2xl text-xs leading-relaxed max-w-[80%]",
                m.role === 'assistant' ? "bg-card border border-slate-200" : "bg-primary text-slate-900"
              )}>
                {m.content}
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="relative mb-20 space-y-3">
        {/* Suggestion Chips */}
        <ScrollArea className="w-full whitespace-nowrap pb-2">
          <div className="flex gap-2 px-1">
            {[strings.coachChipLimit, strings.coachChipSafe, strings.coachChipSave].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1.5 text-[10px] font-medium text-primary hover:bg-primary hover:text-white transition-colors border border-primary/20 shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div className="relative">
          <Input 
            placeholder={strings.coachInputPlaceholder} 
            className="pr-12 bg-card border-slate-200 h-12 rounded-2xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button 
            size="icon" 
            className="absolute right-1 top-1 w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 text-white"
            onClick={() => sendMessage()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
