import React, { useState, useEffect } from 'react';
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
  Youtube,
  Github,
  Globe,
  ChevronRight,
  Music2,
  Disc3,
  Headphones,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRENDING_ARTISTS, FEATURED_PLAYLISTS, CATEGORIES, Track } from './data';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

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

  return (
    <div className="min-h-screen bg-black text-white selection:bg-brand selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
        <div className="section-container flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <Music2 size={24} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">BEATSTREAM</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink label="Discover" />
            <NavLink label="Artists" />
            <NavLink label="Playlists" />
            <NavLink label="About" />
            <button className="px-6 py-2.5 bg-white text-black font-bold rounded-full text-sm hover:bg-brand hover:text-white transition-all duration-300">
              Get Started
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

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black z-10" />
          <img 
            src="https://picsum.photos/seed/hero-bg/1920/1080?blur=2" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 scale-110 animate-pulse"
            style={{ animationDuration: '10s' }}
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="section-container relative z-20 w-full">
          <div className="max-w-3xl space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
            >
              <Sparkles size={16} className="text-brand" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-300">The Future of Sound</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] text-gradient"
            >
              ELEVATE YOUR <br />
              <span className="text-brand">AUDITORY</span> WORLD
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-zinc-400 max-w-xl leading-relaxed font-light"
            >
              Beatstream is a premium music experience designed for the modern listener. 
              Discover high-fidelity soundscapes curated by artists from around the globe.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <button 
                onClick={togglePlay}
                className="px-10 py-4 bg-brand hover:bg-brand/90 text-white font-bold rounded-full flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-brand/20"
              >
                {isPlaying ? 'Pause Music' : 'Start Listening'}
                {isPlaying ? <Pause size={20} /> : <ChevronRight size={20} />}
              </button>
              <button className="px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white font-bold rounded-full transition-all">
                Explore Artists
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
        </div>
      </header>

      {/* Featured Artists Section */}
      <section className="py-32 bg-black">
        <div className="section-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Featured Artists</h2>
              <p className="text-zinc-500 max-w-md">Meet the visionaries pushing the boundaries of contemporary sound.</p>
            </div>
            <button className="group flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors">
              View All Artists
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {TRENDING_ARTISTS.slice(0, 4).map((artist, idx) => (
              <motion.div 
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-zinc-900">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm">
                      View Profile
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-brand transition-colors">{artist.name}</h3>
                <p className="text-sm text-zinc-500 tracking-wide uppercase">{artist.genre}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Playlists Section */}
      <section className="py-32 bg-zinc-950">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">Curated Playlists</h2>
            <p className="text-zinc-500">Hand-picked selections for every mood, moment, and atmosphere.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_PLAYLISTS.map((playlist, idx) => (
              <motion.div 
                key={playlist.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative h-[300px] rounded-3xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={playlist.cover} 
                  alt={playlist.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                <div className="relative h-full p-10 flex flex-col justify-center max-w-xs space-y-4">
                  <h3 className="text-3xl font-display font-bold leading-tight">{playlist.title}</h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">{playlist.description}</p>
                  <div className="pt-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPlaylist(playlist.id);
                      }}
                      className="w-12 h-12 bg-brand rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    >
                      {currentTrack?.id === playlist.tracks[0]?.id && isPlaying ? (
                        <Pause size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" className="ml-1" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
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

      {/* Footer */}
      <footer className="bg-black pt-32 pb-12 border-t border-white/5">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                  <Music2 size={20} className="text-white" />
                </div>
                <span className="text-xl font-display font-bold tracking-tighter">BEATSTREAM</span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Redefining the digital music experience through curation, quality, and community.
              </p>
              <div className="flex items-center gap-4">
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Youtube size={18} />} />
                <SocialIcon icon={<Github size={18} />} />
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Platform</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><FooterLink label="Discover" /></li>
                <li><FooterLink label="Artists" /></li>
                <li><FooterLink label="Playlists" /></li>
                <li><FooterLink label="Live Stream" /></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-8">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><FooterLink label="About Us" /></li>
                <li><FooterLink label="Careers" /></li>
                <li><FooterLink label="Press" /></li>
                <li><FooterLink label="Contact" /></li>
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
            <p className="text-xs text-zinc-600">© 2026 Beatstream Music. All rights reserved.</p>
            <div className="flex items-center gap-8 text-xs text-zinc-600">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Cookie Policy</button>
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
                  <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                    <Music2 size={20} className="text-white" />
                  </div>
                  <span className="text-2xl font-display font-bold tracking-tighter">BEATSTREAM</span>
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
                <MobileNavLink label="Artists" />
                <MobileNavLink label="Playlists" />
                <MobileNavLink label="About" />
                <button className="mt-8 px-12 py-4 bg-brand text-white font-bold rounded-full text-lg">
                  Get Started
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Music Player Bar */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-zinc-900/90 backdrop-blur-xl border-t border-white/10 px-6 py-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              {/* Track Info */}
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={`https://picsum.photos/seed/${currentTrack.id}/100/100`} 
                    alt={currentTrack.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate">{currentTrack.title}</h4>
                  <p className="text-xs text-zinc-500 truncate">{currentTrack.artist}</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="flex items-center gap-6">
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <SkipBack size={20} fill="currentColor" />
                  </button>
                  <button 
                    onClick={togglePlay}
                    className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="text-zinc-500 hover:text-white transition-colors">
                    <SkipForward size={20} fill="currentColor" />
                  </button>
                </div>
                <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand"
                    initial={{ width: 0 }}
                    animate={{ width: isPlaying ? '100%' : '30%' }}
                    transition={{ duration: isPlaying ? 300 : 0.5 }}
                  />
                </div>
              </div>

              {/* Volume */}
              <div className="flex items-center justify-end gap-3 w-1/3">
                <Volume2 size={18} className="text-zinc-500" />
                <div className="w-24 h-1 bg-white/10 rounded-full">
                  <div className="w-2/3 h-full bg-white/40 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
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

function FooterLink({ label }: { label: string }) {
  return (
    <button className="hover:text-brand transition-colors">{label}</button>
  );
}
