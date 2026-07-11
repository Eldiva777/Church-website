import Image from 'next/image';
import HeroCarousel from "@/components/HeroCarousel";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getYoutubeEmbedUrl } from '@/lib/youtube';
import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';

export const metadata = {
  title: 'Ruach Dominion Embassy International',
};

export default async function HomePage() {
  const supabase = createClient();

  const { data: latestSermon } = await supabase
    .from('sermons')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single();

  const embedUrl = latestSermon ? getYoutubeEmbedUrl(latestSermon.youtube_url) : null;

  return (
    <PublicLayout>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Ruach Dominion Embassy congregation"
            fill
            sizes="100vw"
            className="object-cover object-center blur-sm"
            priority
          />
        </div>
        {/* Dark overlay — deep purple gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-base/80 via-background-base/70 to-background-base" />

        {/* Hero content */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto animate-hero-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-6">
            Welcome to
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary leading-tight mb-5">
            Ruach Dominion Embassy International
          </h1>
          <p className="font-playfair italic text-xl text-accent-gold mb-10">
            The Home Of The Supernatural
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sermons"
              className="nav-link inline-block border border-accent-gold text-accent-gold px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-accent-gold hover:text-background-base transition-colors duration-200"
            >
              Watch Sermons
            </Link>
            <Link
              href="/events"
              className="nav-link inline-block border border-text-primary/30 text-text-primary/70 px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:border-text-primary hover:text-text-primary transition-colors duration-200"
            >
              Upcoming Events
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-primary/30 text-xs tracking-widest">
          <span>↓</span>
        </div>
      </section>

      <HeroCarousel />

      {/* ── Welcome + Service Times ──────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <FadeUp>
            <div className="h-px w-12 bg-accent-gold mb-6" />
            <h2 className="font-playfair text-2xl font-semibold text-text-primary mb-4">Welcome</h2>
            <p className="text-text-primary/65 leading-relaxed text-base">
              Welcome to Ruach Dominion Embassy International — The Home of the Supernatural. We are a Spirit-filled house raised to pull down ancestral strongholds, break satanic agreements, and rescue souls through the power of the Gospel. Through prophetic ministry, deliverance, healing, and the teaching of the Word, we contend for a generation of end-time financial magnets and true sons of the Kingdom.
            </p>
          </FadeUp>
          <FadeUp>
            <div className="max-w-3xl mx-auto text-center py-10 px-6">
              <p className="font-playfair italic text-xl md:text-2xl text-text-primary/90 leading-relaxed">
                "Go rather to the lost sheep of the house of Israel. And as you go, preach, saying, 'The kingdom of heaven is at hand.' Heal the sick, cleanse the lepers, raise the dead, cast out demons."
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-accent-gold">
                Matthew 10:7-8
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="bg-surface rounded-sm px-7 py-7 border border-white/5">
              <p className="text-xs uppercase tracking-[0.25em] text-accent-gold mb-6">Join Us</p>
              <ul className="space-y-0 divide-y divide-white/10">
                {[
                  ['Sunday', '9:30 AM'],
    ["Monday — Deborah's Tribe", '10:00 AM'],
                  ['Wednesday', '5:30 PM'],
                  ['Friday', '5:30 PM'],
                ].map(([day, time]) => (
                  <li key={day} className="flex justify-between py-3 text-sm">
                    <span className="text-text-primary/70">{day}</span>
                    <span className="text-text-primary font-medium">{time}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-text-primary/40 leading-relaxed border-t border-white/10 pt-4">
                Megatrend Hotel, Behind Mobile Filling Station,<br />
                Jikwoyi Phase 1, Abuja
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Latest Sermon ────────────────────────────── */}
      <section className="pb-24 px-6">
        <FadeUp>
          <div className="max-w-5xl mx-auto">
            <div className="h-px w-12 bg-accent-gold mb-6" />
            <h2 className="font-playfair text-2xl font-semibold text-text-primary mb-8">
              Watch Latest Sermon
            </h2>

            {latestSermon ? (
              <div className="bg-surface rounded-sm overflow-hidden border border-white/5">
                <div className="px-6 py-5 border-b border-white/10">
                  <p className="font-playfair text-lg text-text-primary">{latestSermon.title}</p>
                  <p className="text-sm text-text-primary/50 mt-1">
                    {latestSermon.date} &middot; {latestSermon.speaker}
                    {latestSermon.tag && <> &middot; <span className="italic">{latestSermon.tag}</span></>}
                  </p>
                </div>
                {embedUrl ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={embedUrl}
                      title={latestSermon.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="px-6 py-4">
                    <a
                      href={latestSermon.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-sm text-accent-gold"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-text-primary/40 text-sm">No sermons available yet.</p>
            )}

            <div className="mt-6 text-right">
              <Link href="/sermons" className="nav-link text-sm text-accent-gold">
                View all sermons →
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    </PublicLayout>
  );
}
