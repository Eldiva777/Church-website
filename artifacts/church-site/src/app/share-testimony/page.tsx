'use client';

import { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import FadeUp from '@/components/FadeUp';
import { createClient } from '@/utils/supabase/client';

export default function ShareTestimonyPage() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [testimony, setTestimony] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const supabase = createClient();
    const { error } = await supabase.from('testimonies').insert({
      name,
      country,
      testimony,
      approved: false,
    });

    if (error) {
      setStatus('error');
      alert(JSON.stringify(error));
    }else {
      setStatus('success');
      setName('');
      setCountry('');
      setTestimony('');
    }
  };

  return (
    <PublicLayout>
      <section className="pt-20 pb-24 px-6 text-center">
        <FadeUp>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-gold mb-4">Share Your Story</p>
          <div className="h-px w-12 bg-accent-gold mx-auto mb-6" />
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Testimony/Feedback
          </h1>
          <p className="text-text-primary/60 max-w-xl mx-auto mb-12">
            Has God done something in your life through this ministry? We'd love to hear it.
          </p>
        </FadeUp>

        <FadeUp>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-accent-gold">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 bg-surface border border-white/10 rounded-sm px-4 py-3 text-text-primary"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-accent-gold">Country of Residence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full mt-2 bg-surface border border-white/10 rounded-sm px-4 py-3 text-text-primary"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-widest text-accent-gold">Testimony/Feedback</label>
              <textarea
                required
                rows={6}
                value={testimony}
                onChange={(e) => setTestimony(e.target.value)}
                className="w-full mt-2 bg-surface border border-white/10 rounded-sm px-4 py-3 text-text-primary"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full border border-accent-gold text-accent-gold px-8 py-3 text-xs font-medium tracking-[0.2em] uppercase hover:bg-accent-gold hover:text-background-base transition-colors duration-200"
            >
              {status === 'loading' ? 'Sending...' : 'Send'}
            </button>

            {status === 'success' && (
              <p className="text-center text-accent-gold text-sm">Thank you! Your testimony has been received.</p>
            )}
            {status === 'error' && (
              <p className="text-center text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
          </form>
        </FadeUp>
      </section>
    </PublicLayout>
  );
}