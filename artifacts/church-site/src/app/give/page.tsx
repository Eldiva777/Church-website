import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';

export const metadata = {
  title: 'Give — Ruach Dominion Embassy International',
};

export default function GivePage() {
  return (
    <PublicLayout>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Partner With Us</p>
          <div className="h-px w-12 bg-accent-gold mb-6" />
          <h1 className="font-playfair text-4xl font-bold text-text-primary mb-8">Give</h1>
        </FadeUp>

        <FadeUp delay={60}>
          <p className="text-text-primary/65 leading-relaxed mb-10 text-base">
            Your generous giving supports the work of God at Ruach Dominion Embassy International.
            Every seed sown is an act of faith and partnership in advancing the Kingdom.
          </p>

          <div className="bg-surface border border-white/5 rounded-sm px-7 py-7">
            <p className="text-xs uppercase tracking-[0.25em] text-accent-gold mb-6">
              Bank Transfer
            </p>

            <dl className="divide-y divide-white/10">
              {[
                ['Bank', 'Fidelity Bank'],
                ['Account Name', 'Ruach Dominion Embassy'],
                ['Account Number', '4110106190'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-4 text-sm">
                  <dt className="text-text-primary/50">{label}</dt>
                  <dd
                    className={`text-text-primary font-medium ${
                      label === 'Account Number' ? 'font-mono text-base tracking-wider' : ''
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-xs text-text-primary/35 mt-6 leading-relaxed text-center">
            For enquiries about giving, please contact us at 08036565292 or 08030775311.
          </p>
        </FadeUp>
      </div>
    </PublicLayout>
  );
}
