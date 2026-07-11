"use client";

import { useState, useEffect } from "react";

const slides = [
  { src: "/hero/hero-1.jpg", caption: "Word With Power" },
  { src: "/hero/hero-2.jpg", caption: "Our Community" },
  { src: "/hero/hero-3.jpg", caption: "Prophetic Ministry" },
  { src: "/hero/hero-4.jpg", caption: "Deliverance & Healing" },
  { src: "/hero/hero-5.jpg", caption: "Worship In Spirit" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => setIndex((i + slides.length) % slides.length);

  return (
    <div className="px-4 md:px-6 py-8">
      <div className="relative w-full h-[420px] md:h-[560px] overflow-hidden rounded-3xl border border-accent-gold/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className={`w-full h-full object-cover transition-transform duration-[4500ms] ease-out ${
                i === index ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          </div>
        ))}

        {/* Top-right slide counter */}
        <div className="absolute top-5 right-6 z-20 text-white/70 text-xs font-medium tracking-[0.2em]">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>

        {/* Bottom-left caption */}
        <div className="absolute bottom-8 left-6 z-20">
          <div className="h-px w-10 bg-accent-gold mb-3" />
          <p className="font-playfair text-white text-xl md:text-2xl font-semibold tracking-wide">
            {slides[index].caption}
          </p>
        </div>

        {/* Arrow nav */}
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

        {/* Dots */}
        <div className="absolute bottom-8 right-6 z-20 flex gap-2">
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
  );
}
