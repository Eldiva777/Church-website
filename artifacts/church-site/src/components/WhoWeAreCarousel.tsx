"use client";
import { useState, useEffect } from "react";
import { Wind, Telescope, Globe, BookOpen, Flame } from "lucide-react";

const slides = [
  {
    icon: Wind,
    title: "RUACH",
    body: "RUACH means the spirit of God, the wind of God and the breath of God, or a life force that sustains all living things, human beings included and all that exist.",
    ref: "Job 33:4, Genesis 1:2, Numbers 27:16",
  },
  {
    icon: Telescope,
    title: "Vision",
    body: "Raising up end-time financial magnets and generals. Pulling down ancestral evil altars, breaking down satanic agreements, rescuing souls from the pit of hell and satanic strongholds.",
    ref: "Matthew 10:7-8, Luke 4:18",
  },
  {
    icon: Globe,
    title: "The Mission",
    body: "Reaching the extreme parts of the earth with the gospel of Christ, with the benefit of salvation.",
    ref: "",
  },
  {
    icon: BookOpen,
    title: "The Logos",
    body: "Dove: The Holy Spirit. The Flaming Sword: The power of the Holy Spirit for deliverance and prophecy. The Bible: The word of God. The Globe: The earth.",
    ref: "",
  },
  {
    icon: Flame,
    title: "Tools of Operation",
    body: "Prophetic utterance (Matt 10:20, 1 Cor 2:6-7). Deliverance by the Holy Spirit (Luke 4:18). Move of the Holy Spirit — signs, wonders, creative miracles (Mark 16:17-18). Teaching the Word (John 1:1-3). Prayer and fasting (Mark 9:29).",
    ref: "",
  },
];

export default function WhoWeAreCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <section className="py-16 px-6 bg-background-base">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">
          Who We Are
        </h2>

        <div className="relative w-full min-h-[360px] rounded-3xl border border-accent-gold/20 bg-surface shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
          {slides.map((slide, i) => {
            const Icon = slide.icon;
            return (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center text-center px-8 py-10 transition-opacity duration-[1400ms] ease-in-out ${
                  i === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-accent-gold/10 border border-accent-gold/30 mb-5">
                  <Icon className="w-7 h-7 text-accent-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-accent-gold">
                  {slide.title}
                </h3>
                <p className="text-text-primary/80 leading-relaxed max-w-xl">
                  {slide.body}
                </p>
                {slide.ref && (
                  <p className="text-sm text-text-primary/50 italic mt-3">
                    {slide.ref}
                  </p>
                )}
              </div>
            );
          })}

          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/20 text-white/80 hover:bg-black/50 hover:text-accent-gold transition-colors duration-200"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 border border-white/20 text-white/80 hover:bg-black/50 hover:text-accent-gold transition-colors duration-200"
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent-gold" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
