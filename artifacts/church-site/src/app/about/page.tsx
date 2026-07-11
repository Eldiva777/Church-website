import Image from 'next/image';
import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';
import WhoWeAreCarousel from '@/components/WhoWeAreCarousel';

export const metadata = {
  title: 'About — Ruach Dominion Embassy International',
};

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Page header */}
      <section className="pt-20 pb-10 px-6 text-center">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Our Leadership</p>
          <div className="h-px w-12 bg-accent-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary">
            Meet the Pastors
          </h1>
        </FadeUp>
      </section>

      {/* Pastor photos */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Pastor Isaac */}
          <FadeUp delay={0}>
            <div className="bg-surface rounded-sm overflow-hidden border border-white/5 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/pastor.jpg"
                  alt="Pastor Isaac David Patani"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* subtle gold line at bottom of photo */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold/60" />
              </div>
              <div className="px-6 py-5">
                <p className="font-playfair text-lg font-semibold text-text-primary">
                  Pastor Isaac David Patani
                </p>
                <p className="text-xs uppercase tracking-widest text-accent-gold mt-1">
                  Senior Pastor
                </p> 
                <p className="text-sm text-text-primary/70 leading-relaxed mt-4">
                  Pastor Isaac David Patani carries a burning mandate to raise a generation free from ancestral bondage and satanic manipulation — a generation bold enough to confront the battles standing between them and their God-given destiny. His teaching ministry is built on the conviction that spiritual awareness positions men and women for true greatness.
                </p>
                <p className="text-sm text-text-primary/70 leading-relaxed mt-3">
                  Through prophetic teaching, deliverance ministry, and the demonstration of signs and wonders, Pastor Isaac equips the Body of Christ to break evil decrees, dismantle generational curses, and walk in the financial and spiritual authority Heaven has assigned to them.
                </p> 
                <div className="mt-8 text-center">
  <a href="/quotes#isaac" className="nav-link inline-block border border-accent-gold text-accent-gold px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-accent-gold hover:text-background-base transition-colors duration-200">
    Quotes by Pastor Isaac
  </a>
</div>
              </div>
            </div>
          </FadeUp>

          {/* Pastor Gloria */}
          <FadeUp delay={80}>
            <div className="bg-surface rounded-sm overflow-hidden border border-white/5 group">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/images/wife.jpg"
                  alt="Pastor Gloria Isaac"
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold/60" />
              </div>
              <div className="px-6 py-5">
                <p className="font-playfair text-lg font-semibold text-text-primary">
                  Pastor Gloria Isaac
                </p>
                <p className="text-xs uppercase tracking-widest text-accent-gold mt-1">
                  Associate Pastor
                </p> 
                <p className="text-sm text-text-primary/70 leading-relaxed mt-4">
                  Pastor Gloria Isaac ministers with a heart for deliverance and restoration, calling believers to confront fear, break free from stagnation, and walk boldly into the plans God has prepared for them. Her teaching often centers on the glory of God as an inheritance every believer is meant to carry.
                </p>
                <p className="text-sm text-text-primary/70 leading-relaxed mt-3">
                  Alongside her husband, Pastor Gloria leads with a strong emphasis on preparation, prayer, and prophetic sensitivity — encouraging the Church to plan diligently for the future while trusting God to order their steps.
                </p> 
            <p className="text-sm text-text-primary/70 leading-relaxed mt-3">
              She also heads Deborah's Tribe, the church's women's ministry, where she raises and nurtures women into their God-given identity, purpose, and strength — building a sisterhood rooted in prayer, mentorship, and prophetic destiny.
            </p>
                <div className="mt-8 text-center">
                   <a href="/quotes#gloria" className="nav-link inline-block border border-accent-gold text-accent-gold px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-accent-gold hover:text-background-base transition-colors duration-200">
                    Quotes by Pastor Gloria Isaac 
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>
  <WhoWeAreCarousel />
    </PublicLayout>
  );
}
