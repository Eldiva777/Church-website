import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';

export const metadata = {
  title: 'Quotes by Pastor | Ruach Dominion Embassy International',
};

const isaacQuotes = [
  { text: "Your resolution or your wishes don't provoke miracles — it is the battle you are ready to confront.", speaker: "Pastor Isaac David Patani" },
  { text: "Every throne is taken after a battle, either spiritual or physical.", speaker: "Pastor Isaac David Patani" },
  { text: "Don't run away from battles when they come — confront them, they make you stronger.", speaker: "Pastor Isaac David Patani" },
  { text: "The glory of God is the beauty of God.", speaker: "Pastor Isaac David Patani" },
  { text: "Faith is the spiritual cord by which you pull your dream, vision, or expectations from the spirit realm.", speaker: "Pastor Isaac David Patani" },
  { text: "Delay is not denial.", speaker: "Pastor Isaac David Patani" },
  { text: "Life doesn't happen — it's demanded for.", speaker: "Pastor Isaac David Patani" },
  { text: "Fight for your destiny.", speaker: "Pastor Isaac David Patani" },
  { text: "Humility is the first character of greatness.", speaker: "Pastor Isaac David Patani" },
  { text: "Help is the ability to accomplish.", speaker: "Pastor Isaac David Patani" },
  { text: "The covenant of your father's house is responsible for the help you get.", speaker: "Pastor Isaac David Patani" },
  { text: "Covenants don't break—you separate yourself from them.", speaker: "Pastor Isaac David Patani" },
  { text: "Anytime you break God's covenant, you open another door for a demon.", speaker: "Pastor Isaac David Patani" },
  { text: "If you can't make sacrifices for your destiny, you will become the sacrifice.", speaker: "Pastor Isaac David Patani" },
  { text: "Adoption means taking an alien thing and converting it into the original so it can enjoy the benefits of the original.", speaker: "Pastor Isaac David Patani" },
  { text: "Adoption qualifies us for kingdom blessings.", speaker: "Pastor Isaac David Patani" },
  { text: "The first responsibility of a father is protection.", speaker: "Pastor Isaac David Patani" },
  { text: "Adoption changes your identity.", speaker: "Pastor Isaac David Patani" },
  { text: "One of the signs of adoption is speaking in tongues.", speaker: "Pastor Isaac David Patani" },
  { text: "Studying the Word of God transforms the mind.", speaker: "Pastor Isaac David Patani" },
];

const gloriaQuotes = [
  { text: "Trust God even when it doesn't make sense.", speaker: "Pastor Gloria Isaac" },
  { text: "Proper planning omits pain.", speaker: "Pastor Gloria Isaac" },
  { text: "Procrastination is the killer of destiny.", speaker: "Pastor Gloria Isaac" },
  { text: "One of the key weapons the devil uses against a man is the spirit of fear.", speaker: "Pastor Gloria Isaac David Patani" },
  { text: "When the devil wants to strike fear, he uses pictures.", speaker: "Pastor Gloria Isaac David Patani" },
  { text: "One of the things the devil uses to separate a person from God is fear.", speaker: "Pastor Gloria Isaac David Patani" },
  { text: "Fear can bring disunity.", speaker: "Pastor Gloria Isaac David Patani" },
  { text: "To overcome fear, your relationship with God must be strong.", speaker: "Pastor Gloria Isaac David Patani" },
];

function QuoteSection({ title, quotes }: { title: string; quotes: { text: string; speaker: string }[] }) {
  return (
    <div className="mb-16">
      <FadeUp>
        <h2 className="font-playfair text-2xl md:text-3xl font-bold text-text-primary mb-8 text-center">
          {title}
        </h2>
      </FadeUp>
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-8">
        {quotes.map((q, i) => (
          <FadeUp key={i} delay={i * 40}>
            <div className="bg-surface rounded-sm border border-white/5 px-7 py-7 text-left">
              <p className="font-playfair italic text-lg md:text-xl text-text-primary/90 leading-relaxed">
                "{q.text}"
              </p>
              <p className="mt-4 text-xs uppercase tracking-widest text-accent-gold">
                {q.speaker}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

export default function QuotesPage() {
  return (
    <PublicLayout>
      <section className="pt-20 pb-24 px-6 text-center">
        <FadeUp>
          <div className="w-12 h-px bg-accent-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-16">
            Quotes by Pastor
          </h1>
        </FadeUp>

        <div id="isaac">
  <QuoteSection title="Pastor Isaac David Patani" quotes={isaacQuotes} />
</div>
<div id="gloria">
  <QuoteSection title="Pastor Gloria Isaac" quotes={gloriaQuotes} />
</div>
      </section>
    </PublicLayout>
  );
}