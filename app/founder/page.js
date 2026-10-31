import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Flag, Lightbulb, Compass } from 'lucide-react'
import { InnerPageFooter, InnerPageNav } from '@/components/cadet/InnerPageChrome'

export const metadata = {
  title: 'About the Founder',
  description: 'Meet Jatin Kumar, the founder of The Meme Cadet — a project that began with an idea in October 2025 and continues to grow through learning and execution.',
  alternates: { canonical: '/founder' },
  openGraph: {
    title: 'About the Founder — THEMEMECADET',
    description: 'The person, the idea and the responsibility behind The Meme Cadet.',
    url: 'https://thememecadet.in/founder',
  },
}

const milestones = [
  { date: '29 OCTOBER 2025', title: 'The idea takes shape', text: 'The Meme Cadet begins — a small starting point for a larger ambition.' },
  { date: 'THE FIRST YEAR', title: 'Learning by building', text: 'Creating, experimenting, shaping an identity and learning what this brand can become.' },
  { date: 'YEAR TWO', title: 'Building with intention', text: 'A renewed focus on useful resources, purposeful content and a stronger connection with the defence aspirant community.' },
]

export default function FounderPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-cadet-ink text-cadet-bone">
      <InnerPageNav />
      <section className="relative overflow-hidden border-b border-cadet-bone/10 pb-20 pt-36 sm:pb-28 sm:pt-48">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
        <div className="pointer-events-none absolute inset-0 radial-fade" />
        <div className="container relative z-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-cadet-khaki sm:text-xs">THE PERSON BEHIND THE PROJECT</div>
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-[clamp(3.8rem,11vw,9rem)] font-black uppercase leading-[0.82] tracking-tight">Jatin<br /><span className="italic text-cadet-gold">Kumar.</span></h1>
              <p className="mt-9 max-w-2xl text-base leading-relaxed text-cadet-bone/65 sm:text-xl">Founder, The Meme Cadet. Building an idea into an identity — one lesson, one experiment and one deliberate step at a time.</p>
            </div>
            <div className="border-l border-cadet-gold/50 py-2 pl-6 lg:col-span-4">
              <div className="font-mono text-[10px] tracking-[0.22em] text-cadet-khaki">FOUNDED</div>
              <div className="mt-2 font-display text-3xl text-cadet-bone">October 2025</div>
              <div className="mt-2 text-xs tracking-[0.12em] text-cadet-khaki">INDEPENDENT CREATOR PROJECT</div>
            </div>
          </div>
          <div className="mt-16 max-w-3xl border-y border-cadet-bone/10 py-8 sm:py-10">
            <p className="font-display text-2xl leading-snug sm:text-4xl">“I didn't start with everything figured out. I started with an idea, a willingness to learn, and the decision to keep building.”</p>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-12 right-[-4%] select-none font-display text-[25vw] font-black leading-none tracking-tighter text-cadet-bone/[0.025]">JK</div>
      </section>

      <section className="container grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">01 / WHERE IT STARTED</div>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">An idea, given time and attention.</h2>
        </div>
        <div className="space-y-6 lg:col-span-8">
          <p className="text-base leading-8 text-cadet-bone/70">The Meme Cadet started on 29 October 2025. It began with a simple belief: a brand for defence aspirants could be relatable and entertaining while also sharing useful perspectives and resources.</p>
          <p className="text-sm leading-8 text-cadet-bone/55 sm:text-base">There was no finished blueprint for everything it could become. The early work was about starting, trying things, learning from the process and gradually giving the idea a recognisable identity.</p>
        </div>
      </section>

      <section className="border-y border-cadet-bone/10 bg-cadet-night/45 py-20 sm:py-28">
        <div className="container">
          <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">02 / THE JOURNEY</div>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold sm:text-5xl">A work in progress — by choice.</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {milestones.map((item, index) => (
              <article key={item.date} className="relative border-t border-cadet-gold/50 pt-6">
                <div className="font-mono text-[9px] tracking-[0.2em] text-cadet-khaki">{item.date}</div>
                <h3 className="mt-5 font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-cadet-bone/55">{item.text}</p>
                <span className="absolute -top-[5px] left-0 h-2 w-2 rounded-full bg-cadet-gold" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">03 / THE RESPONSIBILITY</div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">A title is easy. The work is the responsibility.</h2>
        </div>
        <div className="space-y-6 lg:col-span-7">
          <p className="text-base leading-8 text-cadet-bone/70">Adding “Founder” to a profile takes a moment. Living up to the responsibility behind it takes time. I don't want the title itself to be the achievement. I want the work, the learning and the value created for the community to give it meaning.</p>
          <p className="text-sm leading-8 text-cadet-bone/55 sm:text-base">For me, building means staying curious, being honest about what is still unfinished, listening to the people this brand hopes to serve and improving through consistent effort.</p>
        </div>
      </section>

      <section className="border-y border-cadet-bone/10 bg-cadet-olive/35 py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">04 / THE ROAD AHEAD</div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">Build patiently. Make the work matter.</h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm leading-8 text-cadet-bone/65 sm:text-base">I want The Meme Cadet to become more than a page that posts content. The direction is to build a thoughtful defence aspirant community — with relatable storytelling, practical resources and content that helps turn intention into action. There is a lot left to learn and build. That is part of the journey.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.linkedin.com/company/the-meme-cadet/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-cadet-gold px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-cadet-night transition-colors hover:bg-cadet-bone">The Meme Cadet on LinkedIn <ArrowUpRight className="h-4 w-4" /></a>
              <Link href="/manifesto" className="inline-flex items-center gap-2 border border-cadet-bone/25 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-cadet-bone transition-colors hover:border-cadet-gold hover:text-cadet-gold">Read the manifesto <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
      <InnerPageFooter />
    </main>
  )
}
