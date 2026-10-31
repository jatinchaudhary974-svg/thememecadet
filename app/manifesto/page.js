import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Compass, Flame, ShieldCheck, Target } from 'lucide-react'
import { InnerPageFooter, InnerPageNav } from '@/components/cadet/InnerPageChrome'

export const metadata = {
  title: 'The Manifesto',
  description: 'What The Meme Cadet believes in: direction for dreams, discipline for ambition, and action that turns intention into execution.',
  alternates: { canonical: '/manifesto' },
  openGraph: {
    title: 'The Manifesto — THEMEMECADET',
    description: 'More than motivation. A belief in action, discipline and meaningful execution.',
    url: 'https://thememecadet.in/manifesto',
  },
}

const principles = [
  { number: '01', title: 'Direction before noise', text: 'A big goal deserves more than endless scrolling and passing inspiration. It deserves clarity about the next step.', icon: Compass },
  { number: '02', title: 'Discipline over mood', text: 'Motivation can start a moment. Consistent effort is what gives that moment somewhere to go.', icon: ShieldCheck },
  { number: '03', title: 'Action over appearance', text: 'Progress is not a performance. We value useful work, honest learning and practical steps over empty claims.', icon: Target },
  { number: '04', title: 'Creativity with purpose', text: 'Relatable content can make someone pause. Meaningful content should also leave them with something worth carrying forward.', icon: Flame },
]

export default function ManifestoPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-cadet-ink text-cadet-bone">
      <InnerPageNav />
      <section className="relative flex min-h-[82svh] items-end overflow-hidden border-b border-cadet-bone/10 pb-16 pt-36 sm:pb-24 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
        <div className="pointer-events-none absolute inset-0 radial-fade" />
        <div className="container relative z-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-cadet-khaki sm:text-xs">THE MEME CADET / FIELD DOCUMENT 001</div>
          <h1 className="mt-8 max-w-5xl font-display text-[clamp(3.4rem,10vw,8.5rem)] font-black uppercase leading-[0.88] tracking-tight">
            More than <span className="italic text-cadet-gold">motivation.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-cadet-bone/65 sm:text-xl">
            We believe in action. Dreams need direction. Ambitions need discipline. And intentions need execution.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-3 border border-cadet-gold/40 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cadet-gold">VISION <span className="text-cadet-bone/40">→</span> EXECUTION</span>
            <a href="#declaration" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cadet-bone/65 transition-colors hover:text-cadet-gold">Read our beliefs <ArrowDown className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-10 right-[-3%] select-none font-display text-[24vw] font-black leading-none tracking-tighter text-cadet-bone/[0.025]">TMC</div>
      </section>

      <section id="declaration" className="container py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">01 / THE DECLARATION</div>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">A belief worth building around.</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-3xl leading-tight text-cadet-bone sm:text-5xl">
              We are here to make the space between <span className="italic text-cadet-gold">wanting</span> and <span className="italic text-cadet-gold">doing</span> a little smaller.
            </p>
            <p className="mt-8 max-w-2xl text-sm leading-8 text-cadet-bone/60 sm:text-base">
              The Meme Cadet began as an idea in October 2025. We wanted to build a place where defence aspirants could find relatable storytelling, useful perspectives and content that respects the effort behind a goal. This is the direction we are choosing to grow towards.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-cadet-bone/10 bg-cadet-night/45 py-20 sm:py-28">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">02 / WHAT WE BELIEVE</div>
            <h2 className="mt-5 font-display text-4xl font-semibold sm:text-5xl">Principles, not promises.</h2>
            <p className="mt-5 text-sm leading-7 text-cadet-bone/55 sm:text-base">These are the standards we want our work to move towards — and the standards we must keep questioning as we learn.</p>
          </div>
          <div className="grid gap-px border border-cadet-bone/10 bg-cadet-bone/10 sm:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.number} className="bg-cadet-ink p-7 sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-cadet-gold">{item.number}</span>
                    <Icon className="h-5 w-5 text-cadet-gold/80" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold sm:text-3xl">{item.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-cadet-bone/55">{item.text}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">03 / BEYOND MOTIVATION</div>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">Inspiration should lead somewhere.</h2>
        </div>
        <div className="space-y-6 lg:col-span-7">
          <p className="text-base leading-8 text-cadet-bone/70 sm:text-lg">A quote can give you a spark. A clear plan helps you use it. We want our content to do more than sound good in a feed — it should encourage thought, offer perspective and, wherever possible, point towards a practical next step.</p>
          <div className="border-l border-cadet-gold/60 py-2 pl-6">
            <p className="font-display text-2xl italic leading-snug text-cadet-bone sm:text-3xl">“Motivation is a beginning. Execution gives it direction.”</p>
          </div>
          <p className="text-sm leading-7 text-cadet-bone/50">That means learning in public, improving what we create, and being honest about what we have and have not built yet.</p>
        </div>
      </section>

      <section className="border-y border-cadet-bone/10 bg-cadet-olive/35 py-20 sm:py-24">
        <div className="container grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="font-mono text-[10px] tracking-[0.28em] text-cadet-gold">04 / OUR COMMITMENT</div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">Respect the effort behind every ambition.</h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm leading-8 text-cadet-bone/65 sm:text-base">We are building towards a community where defence aspirants feel understood, where useful resources matter as much as relatable content, and where encouragement is supported by practical value. We are still learning. Our commitment is to keep showing up, listening and improving.</p>
          </div>
        </div>
      </section>

      <section className="container py-20 text-center sm:py-28">
        <div className="font-mono text-[10px] tracking-[0.3em] text-cadet-khaki">05 / THE VISION AHEAD</div>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-black uppercase leading-[0.98] sm:text-6xl">The vision is clear.<br /><span className="italic text-cadet-gold">The work continues.</span></h2>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-cadet-bone/55">One idea. A growing identity. A long way still to go. We intend to build with patience, purpose and the people this space is meant to serve.</p>
        <Link href="/founder" className="mt-10 inline-flex items-center gap-3 border border-cadet-gold/50 px-6 py-4 text-xs uppercase tracking-[0.18em] text-cadet-gold transition-colors hover:bg-cadet-gold hover:text-cadet-night">Meet the founder <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
      <InnerPageFooter />
    </main>
  )
}
