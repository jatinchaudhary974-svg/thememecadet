'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowUpRight, BookOpen, Brain, ChevronDown, Compass, LogOut,
  Menu, MessageSquare, Plus, Shield, Sparkles, Target, X,
} from 'lucide-react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

const modules = [
  {
    id: 'defence',
    title: 'Defence Assistant',
    subtitle: 'NDA • CDS • AFCAT • SSB',
    description: 'Explore defence careers, exam information and preparation guidance.',
    icon: Shield,
    prompt: 'What would you like to know about your defence journey?',
  },
  {
    id: 'study',
    title: 'Study Assistant',
    subtitle: 'LEARN • PRACTISE • REVISE',
    description: 'Understand concepts, clear doubts and build a focused revision plan.',
    icon: BookOpen,
    prompt: 'Which subject or concept are we working on today?',
  },
  {
    id: 'knowledge',
    title: 'TMC Knowledge',
    subtitle: 'THE MEME CADET',
    description: 'Find your way around The Meme Cadet, its mission and resources.',
    icon: Brain,
    prompt: 'What would you like to explore about The Meme Cadet?',
  },
  {
    id: 'companion',
    title: 'Cadet Companion',
    subtitle: 'PLAN • REFLECT • EXECUTE',
    description: 'Organise your goals and turn the next step into clear action.',
    icon: Compass,
    prompt: 'What goal or challenge should we break into manageable steps?',
  },
]

export default function CadetAIDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeModule, setActiveModule] = useState('study')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const [chatMode, setChatMode] = useState(null)

  useEffect(() => {
    const requestedModule = new URLSearchParams(window.location.search).get('module')
    if (modules.some((item) => item.id === requestedModule)) setActiveModule(requestedModule)
  }, [])

  useEffect(() => {
    let alive = true
    let subscription

    try {
      const supabase = getSupabaseBrowserClient()
      supabase.auth.getSession().then(({ data, error }) => {
        if (!alive) return
        if (error || !data.session) {
          router.replace('/auth/login')
          return
        }
        setUser(data.session.user)
        setLoading(false)
      }).catch(() => {
        if (alive) router.replace('/auth/login')
      })

      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!alive) return
        if (!session) router.replace('/auth/login')
        else setUser(session.user)
      })
      subscription = data.subscription
    } catch {
      router.replace('/auth/login')
    }

    return () => {
      alive = false
      subscription?.unsubscribe()
    }
  }, [router])

  async function handleSignOut() {
    setSigningOut(true)
    try {
      const supabase = getSupabaseBrowserClient()
      await supabase.auth.signOut()
    } finally {
      router.replace('/auth/login')
    }
  }

  function startNewChat() {
    setChatMessages([])
    setDraft('')
    setChatError('')
    setChatMode(null)
  }

  async function sendMessage(event) {
    event.preventDefault()
    const message = draft.trim()
    if (!message || sending) return
    setChatError('')
    setChatMessages((current) => [...current, { role: 'user', content: message }])
    setDraft('')
    setSending(true)

    try {
      const supabase = getSupabaseBrowserClient()
      const { data, error } = await supabase.auth.getSession()
      if (error || !data.session?.access_token) throw new Error('Your session expired. Please sign in again.')

      const history = chatMessages.slice(-10).map(({ role, content }) => ({ role, content }))
      const response = await fetch('https://cadet-ai-api.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ module: activeModule, message, history }),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Cadet AI could not respond. Please try again.')
      setChatMode(result.mode || 'live')
      setChatMessages((current) => [...current, { role: 'assistant', content: result.answer }])
    } catch (error) {
      setChatError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const selected = modules.find((item) => item.id === activeModule) || modules[1]

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#050706] text-[#EDEAE0] grid place-items-center">
        <div className="text-center">
          <div className="mx-auto mb-5 h-8 w-8 animate-spin rounded-full border-2 border-[#C9A961] border-t-transparent" />
          <p className="text-[10px] tracking-[.3em] text-[#C9A961]">CADET AI</p>
          <p className="mt-2 text-sm text-[#8F9589]">Securing your workspace…</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#050706] text-[#EDEAE0]">
      <div className="pointer-events-none fixed inset-0 opacity-50" style={{ background: 'radial-gradient(55% 35% at 55% 0%, rgba(45,65,43,.34), transparent 75%)' }} />

      <div className="relative flex min-h-screen">
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[285px] flex-col border-r border-[#252D24] bg-[#080C09] transition-transform lg:static lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-[76px] items-center justify-between border-b border-[#252D24] px-6">
            <a href="/" className="text-[11px] font-bold tracking-[.25em] text-[#D4B66F]">THEMEMECADET</a>
            <button onClick={() => setMobileMenuOpen(false)} className="rounded p-2 text-[#92988D] lg:hidden" aria-label="Close menu"><X size={18} /></button>
          </div>

          <div className="p-4">
            <div className="mb-3 px-3 text-[9px] font-semibold tracking-[.25em] text-[#70796D]">YOUR WORKSPACE</div>
            <div className="flex items-center gap-3 border border-[#3A3829] bg-[#11150F] px-3 py-3">
              <div className="grid h-9 w-9 place-items-center bg-[#C9A961]/15 text-[#D7BD7E]"><Sparkles size={17} /></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Cadet AI</p>
                <p className="text-[10px] tracking-wide text-[#899083]">PERSONAL COMMAND CENTRE</p>
              </div>
              <ChevronDown size={15} className="text-[#858B80]" />
            </div>
            <button onClick={startNewChat} className="mt-3 flex w-full items-center gap-3 border border-[#51472F] px-3 py-3 text-left text-sm text-[#D8C18B] hover:bg-[#C9A961]/10">
              <Plus size={16} /> New conversation
            </button>
          </div>

          <div className="px-4 pt-5">
            <p className="mb-3 px-3 text-[9px] font-semibold tracking-[.25em] text-[#70796D]">AI MODULES</p>
            <nav className="space-y-1">
              {modules.map((item) => {
                const Icon = item.icon
                const active = activeModule === item.id
                return (
                  <button key={item.id} onClick={() => { setActiveModule(item.id); setMobileMenuOpen(false) }} className={`flex w-full items-center gap-3 px-3 py-3 text-left transition ${active ? 'border border-[#6E5B32]/70 bg-[#C9A961]/10 text-[#E5D09A]' : 'border border-transparent text-[#A2A89B] hover:bg-[#111710]'}`}>
                    <Icon size={17} />
                    <span className="text-[12px] font-medium">{item.title}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="mt-auto border-t border-[#252D24] p-4">
            <div className="mb-4 flex items-center gap-3 px-2">
              <div className="grid h-9 w-9 place-items-center rounded-full border border-[#716039] bg-[#C9A961]/10 text-xs font-semibold text-[#DCC58C]">
                {(user.user_metadata?.display_name || user.email || 'C').slice(0, 1).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{user.user_metadata?.display_name || 'Cadet'}</p>
                <p className="truncate text-[10px] text-[#7E877A]">{user.email}</p>
              </div>
            </div>
            <button onClick={handleSignOut} disabled={signingOut} className="flex w-full items-center gap-3 px-3 py-2 text-xs text-[#9CA294] hover:text-[#E5D09A] disabled:opacity-50">
              <LogOut size={15} /> {signingOut ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        </aside>

        {mobileMenuOpen && <button aria-label="Close navigation overlay" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-black/70 lg:hidden" />}

        <section className="relative flex min-w-0 flex-1 flex-col">
          <header className="flex h-[76px] items-center justify-between border-b border-[#252D24] px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="rounded p-2 text-[#AAB09F] lg:hidden" aria-label="Open menu"><Menu size={19} /></button>
              <div>
                <p className="text-[9px] tracking-[.25em] text-[#C9A961]">THE MEME CADET • INTELLIGENCE</p>
                <h1 className="mt-1 text-sm font-semibold tracking-wide">Cadet AI Workspace</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 border border-[#343B2D] px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A961]" />
              <span className="text-[9px] tracking-[.16em] text-[#A8AA9F]">BETA</span>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-10 sm:px-8 sm:py-14">
            <div className="mb-10">
              <p className="text-[10px] font-semibold tracking-[.32em] text-[#C9A961]">VISION TO EXECUTION</p>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Your next step starts <span className="text-[#C9A961]">here.</span></h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#A2A89B]">One workspace. Four capabilities. Practical guidance to help you learn, prepare and move forward with clarity.</p>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9px] font-semibold tracking-[.28em] text-[#7F887A]">CHOOSE YOUR MISSION</p>
              <span className="text-[10px] text-[#70796D]">01 — 04 MODULES</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((item, index) => {
                const Icon = item.icon
                const active = activeModule === item.id
                return (
                  <button key={item.id} onClick={() => setActiveModule(item.id)} className={`group min-h-[160px] border p-5 text-left transition sm:p-6 ${active ? 'border-[#927744] bg-[#11170F]' : 'border-[#293127] bg-[#090D0A]/80 hover:border-[#655532]'}`}>
                    <div className="flex items-start justify-between">
                      <div className={`grid h-10 w-10 place-items-center ${active ? 'bg-[#C9A961]/15 text-[#DCC58C]' : 'bg-[#151B14] text-[#929B8B]'}`}><Icon size={19} /></div>
                      <span className="font-mono text-[10px] text-[#687263]">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-[9px] tracking-[.16em] text-[#B99D63]">{item.subtitle}</p>
                    <p className="mt-3 text-xs leading-5 text-[#8F988A]">{item.description}</p>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 border border-[#3C392B] bg-[#0C110D] p-5 sm:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="border border-[#927744] bg-[#C9A961]/10 px-2.5 py-1 text-[9px] font-bold tracking-[.18em] text-[#E5D09A]">{chatMode === "live" ? "LIVE MODE" : chatMode === "mock" ? "MOCK MODE" : "MODE UNCONFIRMED"}</span>
                <span className="text-[10px] text-[#899184]">{chatMode === "live" ? "Responses from the configured AI provider" : chatMode === "mock" ? "Simulated demo replies • not a live AI service" : "Mode is confirmed after the first reply"}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center bg-[#C9A961]/15 text-[#D9C184]"><selected.icon size={17} /></div>
                  <div>
                    <p className="text-sm font-semibold">{selected.title}</p>
                    <p className="mt-1 text-[9px] tracking-[.17em] text-[#B99D63]">{selected.subtitle}</p>
                  </div>
                </div>
                <span className="border border-[#51472F] px-2.5 py-1 text-[9px] tracking-[.15em] text-[#C9B47D]">AI CHAT BETA</span>
              </div>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#A2A89B]">{selected.prompt}</p>

              <div aria-live="polite" className="mt-5 max-h-[440px] space-y-4 overflow-y-auto">
                {chatMessages.length === 0 && (
                  <div className="border border-[#30372B] bg-[#070A08] p-4 text-xs leading-6 text-[#899184]">
                    Ask your first question. This beta keeps the current conversation in this browser session only.
                  </div>
                )}
                {chatMessages.map((item, index) => (
                  <div key={index} className={`max-w-[92%] whitespace-pre-wrap border p-4 text-sm leading-6 ${item.role === 'user' ? 'ml-auto border-[#665633] bg-[#C9A961]/10 text-[#EDE4CC]' : 'mr-auto border-[#30372B] bg-[#070A08] text-[#D8DCD2]'}`}>
                    <p className="mb-2 text-[9px] font-semibold tracking-[.18em] text-[#B99D63]">{item.role === 'user' ? 'YOU' : 'CADET AI'}</p>
                    {item.content}
                  </div>
                ))}
                {sending && <p className="text-xs text-[#B99D63]">Cadet AI is thinking…</p>}
              </div>

              {chatError && <p role="alert" className="mt-4 border border-red-900/70 bg-red-950/30 p-3 text-xs leading-5 text-red-200">{chatError}</p>}

              <p className="mt-3 text-[10px] leading-5 text-[#B99D63]">{chatMode === "mock" ? "MOCK MODE: Replies are simulated demonstrations generated from local topic rules and templates, not live AI answers." : chatMode === "live" ? "LIVE MODE: Replies are generated by the configured AI provider." : "The response mode will be shown here after Cadet AI sends its first reply."}</p>
              <form onSubmit={sendMessage} className="mt-5 flex flex-col gap-3 border border-[#30372B] bg-[#070A08] p-3 sm:flex-row sm:items-center">
                <textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={4000} rows={2} aria-label="Chat message" placeholder="Message Cadet AI…" className="min-w-0 flex-1 resize-y bg-transparent px-2 py-2 text-sm text-[#EDEAE0] outline-none placeholder:text-[#5F695C]" />
                <button type="submit" disabled={sending || !draft.trim()} className="flex items-center justify-center gap-2 bg-[#C9A961] px-5 py-3 text-[10px] font-bold tracking-[.16em] text-[#0B120D] disabled:cursor-not-allowed disabled:opacity-40"><ArrowUpRight size={14} /> {sending ? 'SENDING…' : 'SEND'}</button>
              </form>
              <p className="mt-3 text-[10px] leading-5 text-[#6F786B]">Beta: chats are not saved to your account yet. Avoid entering sensitive personal information. Temporary rate limits are in place.</p>
            </div>

            <footer className="mt-auto pt-12 text-center text-[9px] tracking-[.24em] text-[#60695D]">VEER BHOGYA VASUNDHARA</footer>
          </div>
        </section>
      </div>
    </main>
  )
}
