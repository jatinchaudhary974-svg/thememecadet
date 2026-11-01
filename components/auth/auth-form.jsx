'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function AuthForm({ mode = 'login' }) {
  const isSignup = mode === 'signup'
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    setError('')

    try {
      const supabase = getSupabaseBrowserClient()

      if (isSignup) {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { display_name: displayName.trim() },
            emailRedirectTo: `${window.location.origin}/auth/login`,
          },
        })
        if (authError) throw authError

        if (data.session) {
          setMessage('Your account is ready. You are now signed in.')
        } else {
          setMessage('Account created. Check your email and confirm your address before signing in.')
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (authError) throw authError
        window.location.assign('/cadet-ai')
      }
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#050706] text-[#EDEAE0] relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(55% 45% at 50% 0%, rgba(45,65,43,.38), transparent 75%)' }} />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-7 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-[.28em] text-[#C9A961]">THEMEMECADET</Link>
          <span className="text-[10px] tracking-[.22em] text-[#8F9589]">VISION TO EXECUTION</span>
        </header>

        <section className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          <p className="mb-4 text-center text-[10px] tracking-[.32em] text-[#C9A961]">CADET AI ACCESS</p>
          <h1 className="text-center font-serif text-4xl sm:text-5xl">{isSignup ? 'Create your account.' : 'Welcome back.'}</h1>
          <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-6 text-[#A8AA9F]">
            {isSignup ? 'Build your Cadet AI workspace. Your conversations stay tied to your account.' : 'Sign in to continue to your Cadet AI workspace.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-5 border border-[#33392F] bg-[#0A0E0B]/90 p-6 sm:p-8">
            {isSignup && (
              <label className="block space-y-2">
                <span className="text-xs tracking-wide text-[#C7C8BD]">Display name</span>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} required maxLength={60} autoComplete="name" className="w-full border border-[#343B31] bg-[#050706] px-4 py-3 text-sm outline-none transition focus:border-[#C9A961]" placeholder="Your name" />
              </label>
            )}
            <label className="block space-y-2">
              <span className="text-xs tracking-wide text-[#C7C8BD]">Email address</span>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" className="w-full border border-[#343B31] bg-[#050706] px-4 py-3 text-sm outline-none transition focus:border-[#C9A961]" placeholder="you@example.com" />
            </label>
            <label className="block space-y-2">
              <span className="text-xs tracking-wide text-[#C7C8BD]">Password</span>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete={isSignup ? 'new-password' : 'current-password'} className="w-full border border-[#343B31] bg-[#050706] px-4 py-3 text-sm outline-none transition focus:border-[#C9A961]" placeholder="At least 8 characters" />
            </label>

            {error && <p role="alert" className="border border-red-900/70 bg-red-950/30 p-3 text-xs leading-5 text-red-200">{error}</p>}
            {message && <p role="status" className="border border-[#716039] bg-[#C9A961]/10 p-3 text-xs leading-5 text-[#E9D8AA]">{message}</p>}

            <button type="submit" disabled={busy} className="w-full border border-[#C9A961] bg-[#C9A961] px-5 py-3.5 text-xs font-bold tracking-[.18em] text-[#0B120D] transition hover:bg-[#D8BC7A] disabled:cursor-wait disabled:opacity-60">
              {busy ? 'PLEASE WAIT…' : isSignup ? 'CREATE ACCOUNT' : 'SIGN IN'}
            </button>
            <p className="text-center text-xs text-[#A8AA9F]">
              {isSignup ? 'Already have an account?' : 'New to Cadet AI?'}{' '}
              <Link className="text-[#D6BD83] underline underline-offset-4" href={isSignup ? '/auth/login' : '/auth/signup'}>
                {isSignup ? 'Sign in' : 'Create account'}
              </Link>
            </p>
          </form>

          <p className="mt-5 text-center text-[10px] leading-5 text-[#73796F]">
            By continuing, you agree to use Cadet AI responsibly. Account history is stored to provide your signed-in experience.
          </p>
        </section>

        <footer className="text-center text-[9px] tracking-[.24em] text-[#666D63]">VEER BHOGYA VASUNDHARA</footer>
      </div>
    </main>
  )
}
