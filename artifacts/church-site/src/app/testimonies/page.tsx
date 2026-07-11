import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';
import { createClient } from '@/utils/supabase/server';

export const metadata = {
  title: 'Testimonies | Ruach Dominion Embassy International',
};

export default async function TestimoniesPage() {
  const supabase = createClient();

  const { data: testimonies } = await supabase
    .from('testimonies')
    .select('*')
    .eq('approved', true)
    .order('created_at', { ascending: false });

  return (
    <PublicLayout>
      <section className="pt-20 pb-24 px-6 text-center">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Testimonies</p>
          <div className="h-px w-12 bg-accent-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-6">
            What God Has Done
          </h1>
          <p className="text-text-primary/60 max-w-xl mx-auto mb-16">
            Real stories from real lives, transformed through the power of God.
          </p>
        </FadeUp>

            <div className="relative mb-20 pt-16 md:pt-24">
      <p className="absolute -top-10 md:-top-14 left-1/2 -translate-x-1/2 z-0 font-playfair text-[3.5rem] md:text-[6rem] text-accent-gold/15 tracking-widest select-none whitespace-nowrap pointer-events-none">OVERCOME</p>
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <div className="relative w-full h-[520px] md:h-[600px] rounded-[2rem] overflow-hidden border border-accent-gold/25 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]">
          <img src="/testimonies/testimony-1.jpg" alt="Testimony" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-accent-gold/60" />
    <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-accent-gold/60" />
    <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-accent-gold/60" />
    <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-accent-gold/60" />

    <span className="absolute top-6 left-7 font-playfair text-accent-gold/40 text-8xl md:text-9xl leading-none select-none">&ldquo;</span>
          <div className="absolute top-8 right-8 md:right-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-accent-gold/40 text-accent-gold text-[10px] tracking-[0.25em] uppercase font-medium">Real Stories</span>
          </div>

    <div className="absolute bottom-8 left-7 right-7 md:left-10 md:right-10">
      <p className="font-playfair italic text-white/85 text-lg md:text-xl tracking-wide">Breakthrough Begins With Belief</p>
    </div>
          
        </div>
      </div>

</div>
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
        {(!testimonies || testimonies.length === 0) && (
          <p className="text-text-primary/50">No testimonies yet.</p>
        )}

        {testimonies?.map((t, i) => (
            <FadeUp key={t.id} delay={i * 40}>
              <div className="bg-surface rounded-sm border border-white/5 px-7 py-7 text-left">
                <p className="text-text-primary/90 leading-relaxed">
                  {t.testimony}
                </p>
                <p className="mt-4 text-xs uppercase tracking-widest text-accent-gold">
                  {t.name}{t.country ? ` — ${t.country}` : ''}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="mt-16">
            <a
              href="/share-testimony"
              className="inline-block border border-accent-gold text-accent-gold px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-accent-gold hover:text-background-base transition-colors duration-200"
            >
              Share Your Testimony
            </a>
          </div>
        </FadeUp>
      </section>
    </PublicLayout>
  );
}