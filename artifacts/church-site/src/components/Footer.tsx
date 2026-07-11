export default function Footer() {
  return (
    <footer className="bg-black-frame border-t border-white/5 text-text-primary/60 text-sm">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <p className="font-playfair text-text-primary font-semibold text-base mb-2">
            Ruach Dominion Embassy International
          </p>
          <p className="italic text-text-primary/50">The Home Of The Supernatural</p>
        </div>

        {/* Service times */}
        <div>
          <p className="text-xs uppercase tracking-widest text-accent-gold mb-4">Service Times</p>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Sunday</span><span className="text-text-primary/80">9:30 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Monday - Deborah's Tribe</span><span className="text-text-primary/80">10:00 AM</span>
            </li>
            <li className="flex justify-between">
              <span>Wednesday</span><span className="text-text-primary/80">5:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Friday</span><span className="text-text-primary/80">5:30 PM</span>
            </li>
          </ul>
        </div>

        {/* Location */}
        <div>
          <p className="text-xs uppercase tracking-widest text-accent-gold mb-4">Location</p>
          <address className="not-italic leading-relaxed text-text-primary/60">
            Megatrend Hotel,<br />
            Behind Mobile Filling Station,<br />
            Jikwoyi Phase 1, Abuja
          </address>
        </div>
      </div> {/* Social Links */}
<div className="max-w-6xl mx-auto px-6 pb-10 text-center">
  <p className="text-xs uppercase tracking-widest text-accent-gold mb-4">Social Links</p>
  <div className="flex justify-center gap-8 flex-wrap">
  <div className="flex flex-col items-center gap-2">  
    <a
      href="https://www.facebook.com/prophetic.isaac.833253"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pastor Isaac on Facebook"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group"
    >
      <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
      </svg>
        </a>
        <a
          href="https://www.tiktok.com/@prophetisaac12?_r=1&_t=ZS-97u1WGBfxHM"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pastor Isaac on TikTok"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group mt-2"
        >
          <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
    <p className="text-xs text-gray-400 mt-2">
  Pastor Isaac
</p>

</div>
   <div className="flex flex-col items-center gap-2"> 
     <a
      href="https://www.facebook.com/pastor2gloria"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pastor Gloria on Facebook"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group"
    >
      <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
      </svg>
        </a>
        <a
          href="https://www.instagram.com/pastor2gloria?igsh=YzljYTk1ODg3Zg=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pastor Gloria on Instagram"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group mt-2"
        >
          <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.67-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zm0 5.4a4.44 4.44 0 100 8.88 4.44 4.44 0 000-8.88zm5.63-.25a1.04 1.04 0 10-2.07 0 1.04 1.04 0 002.07 0zM12 9.4a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2z" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/@pastor2gloria?_r=1&_t=ZS-97u1Ww2wVnU"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pastor Gloria on TikTok"
          className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group mt-2"
        >
          <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
    <p className="text-xs text-gray-400 mt-2">
  Pastor Gloria
</p>

</div>
   <div className="flex flex-col items-center gap-2"> 
     <a
      href="https://youtube.com/@ruachdominionembassy?si=7K5TQvlcdKDFiCug"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Ruach Dominion Embassy on YouTube"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-gold hover:border-accent-gold transition-colors duration-200 group"
    >
      <svg className="w-4 h-4 fill-text-primary/70 group-hover:fill-background-base" viewBox="0 0 24 24">
        <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.391.569A2.994 2.994 0 0 0 .502 6.186 31.26 31.26 0 0 0 0 12a31.26 31.26 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.107 2.117C4.495 20.5 12 20.5 12 20.5s7.505 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117A31.26 31.26 0 0 0 24 12a31.26 31.26 0 0 0-.502-5.814ZM9.75 15.5v-7l6.5 3.5-6.5 3.5Z" />
      </svg>
    </a> 
     <p className="text-xs text-gray-400 mt-2">
  YouTube
</p>

</div>
  </div>
</div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-text-primary/30">
        © {new Date().getFullYear()} Ruach Dominion Embassy International. All rights reserved.
      </div>
    </footer>
  );
}
