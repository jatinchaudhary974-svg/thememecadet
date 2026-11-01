'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bot, X, Minus, ArrowLeft, Shield, BookOpen, Brain, Compass, Lock, ArrowUpRight } from 'lucide-react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const modules = [
  { id: 'defence', title: 'Defence Assistant', subtitle: 'NDA • CDS • AFCAT • SSB', description: 'Defence careers, exams and preparation.', icon: Shield },
  { id: 'study', title: 'Study Assistant', subtitle: 'LEARN • PRACTISE • REVISE', description: 'Concepts, doubts and revision planning.', icon: BookOpen },
  { id: 'knowledge', title: 'TMC Knowledge', subtitle: 'THE MEME CADET', description: 'Explore The Meme Cadet and its resources.', icon: Brain },
  { id: 'companion', title: 'Cadet Companion', subtitle: 'PLAN • REFLECT • EXECUTE', description: 'Organise goals and plan your next step.', icon: Compass },
]

export default function FloatingWidget() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [moduleId, setModuleId] = useState(null)

  useEffect(() => {
    let alive = true
    try {
      const supabase = getSupabaseBrowserClient()
      supabase.auth.getSession().then(({ data }) => { if (alive) setSession(data.session || null) }).catch(() => {})
      const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (alive) setSession(nextSession || null)
      })
      return () => { alive = false; data.subscription.unsubscribe() }
    } catch { return () => { alive = false } }
  }, [])

  if (pathname?.startsWith('/cadet-ai') || pathname?.startsWith('/auth/')) return null

  const selected = modules.find((item) => item.id === moduleId)
  const goToWorkspace = () => {
    window.location.href = moduleId ? '/cadet-ai?module=' + moduleId : '/cadet-ai'
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] font-sans">
      {open && (
        <section role="dialog" aria-label="Cadet AI assistant" className="mb-3 flex h-[min(470px,calc(100dvh-110px))] w-[min(350px,calc(100vw-24px))] flex-col overflow-hidden border border-[#78643A]/70 bg-[#080D09] text-[#EDEAE0] shadow-[0_18px_70px_rgba(0,0,0,.55)]">
          <header className="flex items-center justify-between border-b border-[#2B3328] bg-[#101710] px-4 py-3">
            <div>
              <p className="text-[11px] font-bold tracking-[.22em] text-[#D7BD7E]">CADET AI</p>
              <p className="mt-1 text-[9px] tracking-[.16em] text-[#879080]">BY THE MEME CADET · MOCK BETA</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setOpen(false)} aria-label="Minimize Cadet AI" className="p-2 text-[#B5B9AC] hover:text-[#D7BD7E]"><Minus size={17}/></button>
              <button onClick={() => { setOpen(false); setModuleId(null) }} aria-label="Close Cadet AI" className="p-2 text-[#B5B9AC] hover:text-[#D7BD7E]"><X size={17}/></button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto p-4">
            {selected ? (
              <>
                <button onClick={() => setModuleId(null)} className="mb-4 inline-flex items-center gap-2 text-[10px] tracking-[.15em] text-[#B7A16C] hover:text-[#E4D09A]"><ArrowLeft size={14}/> ALL MODULES</button>
                <div className="mb-4 border border-[#4B432E] bg-[#111810] p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <selected.icon size={20} className="text-[#D7BD7E]"/>
                    <p className="text-sm font-semibold">{selected.title}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-[#A8AE9F]">{selected.description}</p>
                </div>
                {session ? (
                  <div className="space-y-3">
                    <p className="text-xs leading-relaxed text-[#C3C8B9]">Your selected module is ready in the full Cadet AI workspace. Continue there to start your conversation.</p>
                    <button onClick={goToWorkspace} className="flex w-full items-center justify-center gap-2 bg-[#C9A961] px-4 py-3 text-[10px] font-semibold tracking-[.16em] text-[#10140F] hover:bg-[#E1C77F]">OPEN WORKSPACE <ArrowUpRight size={15}/></button>
                  </div>
                ) : (
                  <div className="border border-[#4B432E] bg-[#111810] p-4">
                    <div className="mb-2 flex items-center gap-2 text-[#D7BD7E]"><Lock size={15}/><span className="text-xs font-semibold">Sign in to start chatting</span></div>
                    <p className="mb-4 text-xs leading-relaxed text-[#A8AE9F]">Choose your module now, then sign in to continue in the secure Cadet AI workspace.</p>
                    <a href="/auth/login" className="block bg-[#C9A961] px-3 py-3 text-center text-[10px] font-semibold tracking-[.16em] text-[#10140F]">SIGN IN</a>
                    <a href="/auth/signup" className="mt-3 block text-center text-[10px] tracking-[.14em] text-[#D7BD7E] hover:text-[#F0DFAE]">CREATE AN ACCOUNT</a>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className="mb-1 text-sm font-semibold">Your next step starts here.</p>
                <p className="mb-4 text-xs leading-relaxed text-[#9DA596]">Choose a module to explore the Cadet AI experience.</p>
                <div className="space-y-2">
                  {modules.map((item) => {
                    const Icon = item.icon
                    return <button key={item.id} onClick={() => setModuleId(item.id)} className="flex w-full items-center gap-3 border border-[#30392D] bg-[#0D130E] p-3 text-left hover:border-[#9A8048] hover:bg-[#151D14]">
                      <span className="grid h-9 w-9 shrink-0 place-items-center bg-[#C9A961]/10 text-[#D7BD7E]"><Icon size={17}/></span>
                      <span className="min-w-0 flex-1"><span className="block text-xs font-semibold">{item.title}</span><span className="mt-1 block text-[9px] tracking-[.12em] text-[#8F988A]">{item.subtitle}</span></span>
                      <ArrowUpRight size={14} className="text-[#A68D55]"/>
                    </button>
                  })}
                </div>
              </>
            )}
          </div>
          <footer className="border-t border-[#2B3328] px-4 py-2.5 text-center text-[9px] leading-relaxed text-[#788173]">Mock Beta · Responses are simulated, not live AI.</footer>
        </section>
      )}
      <button onClick={() => setOpen((value) => !value)} aria-label={open ? 'Minimize Cadet AI' : 'Open Cadet AI'} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#E0C47D] bg-[#C9A961] text-[#10140F] shadow-[0_8px_30px_rgba(0,0,0,.4)] transition hover:scale-105 hover:bg-[#E0C47D]">
        {open ? <X size={23}/> : <Bot size={25}/>}
      </button>
    </div>
  )
}
