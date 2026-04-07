import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Play, 
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  ChevronRight,
  Music2,
  Disc3,
  Headphones,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { TRENDING_ARTISTS, FEATURED_PLAYLISTS, CATEGORIES, Track } from './data';

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Beatstream',
  '/about': 'About',
  '/careers': 'Careers',
  '/newsroom': 'Newsroom',
  '/contact': 'Contact',
  '/developer': 'Developer',
  '/web-player': 'Web Player',
  '/download-app': 'Download App',
  '/support': 'Support',
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-service': 'Terms of Service',
  '/cookie-policy': 'Cookie Policy',
  '/accessibility': 'Accessibility',
};

const EXPLORE_ITEMS = [
  { label: "Search", side: "right" as const, y: 18, targetX: 50, targetY: 18 },
  { label: "Settings", side: "right" as const, y: 10, targetX: 73, targetY: 18 },
  { label: "User Profile", side: "left" as const, y: 15, targetX: 27, targetY: 18 },
  { label: "Categories", side: "left" as const, y: 40, targetX: 28, targetY: 40 },
  { label: "Tracks", side: "right" as const, y: 40, targetX: 50, targetY: 45 },
  { label: "Mini player", side: "right" as const, y: 60, targetX: 68, targetY: 45 },
  { label: "Full Screen Player button", side: "right" as const, y: 25, targetX: 73, targetY: 25 },
  { label: "Import", side: "right" as const, y: 5, targetX: 71, targetY: 18 },
  { label: "Controls", side: "left" as const, y: 72, targetX: 50, targetY: 80 },
  { label: "Volume Control", side: "right" as const, y: 72, targetX: 71, targetY: 80 },
];

const ExploreFeatureLabel = ({ 
  label, 
  side, 
  y, 
  targetX, 
  targetY, 
  opacity 
}: { 
  label: string; 
  side: 'left' | 'right'; 
  y: number; 
  targetX: number; 
  targetY: number; 
  opacity: any;
  key?: any;
}) => {
  const isLeft = side === 'left';
  return (
    <motion.div 
      style={{ opacity }} 
      className="absolute inset-0 pointer-events-none z-30"
    >
      <div 
        className={`absolute flex items-center gap-2 md:gap-3 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
        style={{ 
          top: `${y}%`, 
          ...(isLeft ? { right: '100%', marginRight: '0.5rem' } : { left: '100%', marginLeft: '0.5rem' })
        }}
      >
        <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-[0.2em] whitespace-nowrap bg-black/60 px-1.5 py-0.5 rounded border border-white/5">
          {label}
        </span>
        <div className="w-3 md:w-6 h-[1px] bg-brand/80" />
      </div>
      
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <line 
          x1={isLeft ? "0%" : "100%"} 
          y1={`${y}%`} 
          x2={`${targetX}%`} 
          y2={`${targetY}%`} 
          stroke="#ff3131" 
          strokeWidth="1" 
          strokeOpacity="0.6"
        />
        <circle cx={`${targetX}%`} cy={`${targetY}%`} r="2.5" fill="#ff3131" />
      </svg>
    </motion.div>
  );
};

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '/');
  const [audio] = useState(new Audio());

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    const title = ROUTE_TITLES[currentPath] || 'Beatstream';
    document.title = title === 'Beatstream' ? 'Beatstream' : `${title} | Beatstream`;
  }, [currentPath]);

  const isHome = currentPath === '/' || currentPath === '';
  const isWebPlayer = currentPath === '/web-player' || isEntering;
  const exploreRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: exploreRef,
    offset: ["start start", "end end"]
  });

  const mock1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.25], [1, 1, 0]);
  const mock2Opacity = useTransform(scrollYProgress, [0.16, 0.25, 1], [0, 1, 1]);

  const itemOpacities = EXPLORE_ITEMS.map((_, i) => {
    const start = 0.35 + (i * 0.06);
    const end = start + 0.04;
    return useTransform(scrollYProgress, [start, end], [0, 1]);
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (currentTrack) {
      audio.src = currentTrack.audioUrl;
      if (isPlaying) {
        audio.play().catch(err => console.error("Playback failed:", err));
      }
    }
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(err => console.error("Playback failed:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handlePlayPlaylist = (playlistId: string) => {
    const playlist = FEATURED_PLAYLISTS.find(p => p.id === playlistId);
    if (playlist && playlist.tracks.length > 0) {
      setCurrentTrack(playlist.tracks[0]);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (currentTrack) {
      setIsPlaying(!isPlaying);
    } else {
      // Play first track of first playlist if nothing is selected
      handlePlayPlaylist(FEATURED_PLAYLISTS[0].id);
    }
  };

  if (isWebPlayer) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-12 max-w-2xl"
        >
          <img src="/beatstream.png" alt="Logo" className="h-24 mx-auto brightness-0 invert" />
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-none">
              WEB PLAYER <br />
              <span className="text-brand">IS LIVE</span>
            </h1>
            <p className="text-zinc-500 text-lg font-light tracking-wide">Experience the next generation of digital soundscapes.</p>
          </div>
          <a 
            href="/"
            onClick={(e) => {
              if (isEntering) {
                e.preventDefault();
                setIsEntering(false);
              }
            }}
            className="inline-block px-10 py-4 border border-white/10 text-zinc-400 hover:text-white hover:border-brand transition-all duration-300 text-xs uppercase tracking-[0.3em] font-bold"
          >
            Back to Home
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-700 ease-in-out will-change-[background-color,backdrop-filter] py-5 ${
          scrolled ? 'glass-nav' : 'bg-transparent'
        }`}
      >
        <div className="section-container flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/beatstream.png" alt="Beatstream Logo" className="h-16 w-auto" referrerPolicy="no-referrer" />
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink label="Discover" />
            <NavLink label="Download" />
            <NavLink label="Premium" />
            <NavLink label="Web Player" />
            <button className="px-6 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:bg-brand hover:text-white transition-all duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {isHome ? (
        <>
          {/* Hero Section */}
          <header className="relative min-h-[110vh] flex items-center pt-20 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
              <img 
                src="/michael.jpg" 
                alt="Hero Background" 
                className="w-full h-full object-cover object-top opacity-40 scale-110 animate-pulse"
                style={{ animationDuration: '10s' }}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="section-container relative z-20 w-full">
              <div className="max-w-3xl space-y-8">
                <div className="w-fit">
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] text-white"
                  >
                    Just <span className="text-brand">BEAT</span> It
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-zinc-400 leading-relaxed font-semibold text-right mt-2"
                  >
                    - Michael Jackson
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-brand' : 'bg-white/20'}`} 
                  />
                ))}
              </div>
            </div>
          </header>

          {/* Our Vision Section */}
          <section className="pt-32 pb-0 bg-black">
            <div className="section-container">
              <div className="flex flex-col gap-6">
                <div className="space-y-8">
                  <div className="inline-block">
                    <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight pb-2 border-b border-brand">Our Vision</h2>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed w-full">
                    Beatstream was created with one simple vision: to make music more powerful, personal, and meaningful. We believe that listening to music should be more than simply pressing play; it should feel refined, immersive, and unforgettable. Our vision is to create a platform where every song, every artist, and every moment comes together seamlessly. We want Beatstream to become a place where music is not only heard, but experienced in a smarter and more impactful way. We are building an app that is simple to use, elegant in design, and created for people who truly value music. From discovering new sounds to returning to the songs that matter most, Beatstream is designed to bring every listener closer to the music they love. We believe the future of music should feel cleaner, faster, and more sophisticated. That is why every detail within Beatstream is crafted with precision, purpose, and care. We want Beatstream to inspire discovery, creativity, and connection through every listening experience. Our goal is to create a world where finding the right song feels effortless, intuitive, and rewarding. We are constantly exploring new ways to make music more modern, beautiful, and deeply engaging. Every step we take is driven by our commitment to shaping the future of music for listeners everywhere.
                    <br /><br />
                    Our journey is only beginning, but our vision is clear: to redefine the way the world experiences music.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Playlists Section */}
          <section className="relative pt-[4.5cm] bg-black">
            <div className="section-container relative">
              <div className="mb-10 space-y-8">
                <div className="inline-block">
                  <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight pb-2 border-b border-brand">Explore</h2>
                </div>
              </div>
            </div>
            
            <div ref={exploreRef} className="relative h-[600vh]">
              <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="section-container w-full relative flex items-center justify-center">
                  <motion.div style={{ opacity: mock1Opacity }} className="relative group/mock w-full max-w-4xl">
                    <img 
                      src="/mock1.png" 
                      alt="Explore Content 1" 
                      className="w-full h-auto rounded-2xl" 
                      referrerPolicy="no-referrer" 
                    />
                    <div className="absolute top-[66%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 md:gap-8 w-full max-w-[60%]">
                      <button 
                        onClick={() => setIsEntering(true)}
                        className="px-6 py-1.5 md:px-10 md:py-3 border-2 border-white text-white font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm hover:border-brand transition-colors duration-300"
                      >
                        Enter
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    style={{ opacity: mock2Opacity }} 
                    className="absolute inset-0 flex items-center justify-center px-6 lg:px-12 pointer-events-none"
                  >
                    <div className="relative w-full h-auto max-w-4xl">
                      <img 
                        src="/mock2.png" 
                        alt="Explore Content 2" 
                        className="w-full h-auto rounded-2xl" 
                        referrerPolicy="no-referrer" 
                      />
                      {EXPLORE_ITEMS.map((item, i) => (
                        <ExploreFeatureLabel 
                          key={i} 
                          label={item.label}
                          side={item.side}
                          y={item.y}
                          targetX={item.targetX}
                          targetY={item.targetY}
                          opacity={itemOpacities[i]} 
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-32 bg-black">
            <div className="section-container">
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-4xl font-display font-bold tracking-tight">Genres</h2>
                <div className="flex gap-2">
                  <div className="w-12 h-[2px] bg-brand" />
                  <div className="w-6 h-[2px] bg-zinc-800" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {CATEGORIES.map((category) => (
                  <div 
                    key={category.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-6 opacity-40 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all" />
                    <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                      <span className="text-lg font-bold tracking-tight group-hover:scale-110 transition-transform">{category.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-32 bg-zinc-950 overflow-hidden">
            <div className="section-container">
              <div className="grid lg:grid-cols-2 gap-20 items-center">
                <div className="relative">
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-brand/10 rounded-full blur-3xl animate-pulse" />
                  <div className="relative z-10 space-y-8">
                    <h2 className="text-5xl lg:text-6xl font-display font-bold tracking-tighter leading-none">
                      THE NEW ERA OF <br />
                      <span className="text-brand">DIGITAL SOUND</span>
                    </h2>
                    <div className="space-y-6 text-zinc-400 font-light leading-relaxed text-lg">
                      <p>
                        Beatstream isn't just a platform; it's a movement. We believe that music is the ultimate 
                        expression of the human spirit, and it deserves to be experienced in its purest form.
                      </p>
                      <p>
                        From the deepest underground techno to the most ethereal ambient soundscapes, we curate 
                        the sounds that define the future. Our mission is to connect visionary artists with 
                        listeners who crave something more than the mainstream.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 pt-6">
                      <div>
                        <p className="text-4xl font-display font-bold text-white">50M+</p>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-2">Tracks</p>
                      </div>
                      <div>
                        <p className="text-4xl font-display font-bold text-white">120K</p>
                        <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold mt-2">Artists</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative lg:h-[600px] rounded-3xl overflow-hidden group">
                  <img 
                    src="https://picsum.photos/seed/about/800/1000" 
                    alt="About Beatstream" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                      <Disc3 size={40} className="text-white animate-spin-slow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <DedicatedPage path={currentPath} />
      )}

      {/* Footer */}
      <footer className="bg-black pt-32 pb-12 border-t border-white/5">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <img src="/beatstream.png" alt="Beatstream Logo" className="h-8 w-auto" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-center gap-4">
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Facebook size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><FooterLink label="About" href="/about" onNavigate={setCurrentPath} /></li>
                <li><FooterLink label="Careers" href="/careers" onNavigate={setCurrentPath} /></li>
                <li><FooterLink label="Newsroom" href="/newsroom" onNavigate={setCurrentPath} /></li>
                <li><FooterLink label="Contact" href="/contact" onNavigate={setCurrentPath} /></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Communities</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><FooterLink label="Developer" href="/developer" onNavigate={setCurrentPath} /></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Useful Links</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><FooterLink label="Web Player" href="/web-player" target="_blank" /></li>
                <li><FooterLink label="Download App" href="/download-app" onNavigate={setCurrentPath} /></li>
                <li><FooterLink label="Support" href="/support" onNavigate={setCurrentPath} /></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Newsletter</h4>
              <p className="text-sm text-zinc-500 mb-6">Stay updated with the latest releases and news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand transition-colors"
                />
                <button className="p-2.5 bg-brand text-white rounded-xl hover:bg-brand/90 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-zinc-600">© 2026 Beatstream. All rights reserved.</p>
            <div className="flex items-center gap-8 text-xs text-zinc-600">
              <FooterLink label="Privacy Policy" href="/privacy-policy" onNavigate={setCurrentPath} />
              <FooterLink label="Terms of Service" href="/terms-of-service" onNavigate={setCurrentPath} />
              <FooterLink label="Cookie Policy" href="/cookie-policy" onNavigate={setCurrentPath} />
              <FooterLink label="Accessibility" href="/accessibility" onNavigate={setCurrentPath} />
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden"
            />
            <motion.div 
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-zinc-950 z-[70] p-8 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-2">
                  <img src="/beatstream.png" alt="Beatstream Logo" className="h-18 w-auto" referrerPolicy="no-referrer" />
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white"
                >
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-8 items-center justify-center flex-1">
                <MobileNavLink label="Discover" />
                <MobileNavLink label="Download" />
                <MobileNavLink label="Premium" />
                <MobileNavLink label="Web Player" />
                <button className="mt-8 px-12 py-4 bg-brand text-white font-bold rounded-full text-lg">
                  Sign Up
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ label }: { label: string }) {
  return (
    <button className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors relative group">
      {label}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand transition-all duration-300 group-hover:w-full" />
    </button>
  );
}

function MobileNavLink({ label }: { label: string }) {
  return (
    <button className="text-4xl font-display font-bold text-white hover:text-brand transition-colors">
      {label}
    </button>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-brand hover:bg-brand/10 transition-all">
      {icon}
    </button>
  );
}

function FooterLink({ label, href = "#", target, onNavigate }: { label: string; href?: string; target?: string; onNavigate?: (path: string) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    if (target !== '_blank' && href.startsWith('/')) {
      e.preventDefault();
      window.history.pushState({}, '', href);
      onNavigate?.(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <a 
      href={href} 
      target={target} 
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className="hover:text-brand transition-colors cursor-pointer"
    >
      {label}
    </a>
  );
}

function DedicatedPage({ path }: { path: string }) {
  const pageName = ROUTE_TITLES[path] || 'Page';
  
  return (
    <div className="pt-48 pb-32 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl space-y-10"
      >
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white">
            {pageName}
          </h1>
          <div className="w-24 h-1 bg-brand mx-auto rounded-full" />
        </div>
        
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light">
          Experience the future of digital soundscapes. This dedicated <span className="text-white font-medium">{pageName}</span> section is currently being refined to provide you with an immersive Beatstream experience.
        </p>
        
        <div className="pt-10">
          <a 
            href="/"
            className="inline-block px-12 py-4 border border-white/10 text-zinc-400 hover:text-white hover:border-brand hover:bg-brand/5 transition-all duration-500 text-xs uppercase tracking-[0.4em] font-bold rounded-full"
          >
            Return to Home
          </a>
        </div>
      </motion.div>
      
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
