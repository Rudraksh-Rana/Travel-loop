"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  MapPin, Calendar, Users, ArrowRight, Star, 
  ChevronDown, ChevronRight, Menu, X, Search,
  Compass, Globe, Heart, Bell, Sparkles, Navigation
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { DarkModeToggle } from '@/components/DarkModeToggle';

const heroImages = [
  'https://images.unsplash.com/photo-1524492459416-81446b1f315e?q=80&w=2000', // Taj Mahal
  'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000', // Varanasi
  'https://images.unsplash.com/photo-1593693397690-362ae9666ec2?q=80&w=2000', // Jaipur
];

const expeditions = [
  { 
    title: 'Tiger Kingdom Expedition', 
    duration: '8 Days', 
    price: '₹1,24,000', 
    category: 'Wildlife',
    tags: ['Wildlife', 'Luxury Safari'],
    img: 'https://images.unsplash.com/photo-1508189860359-750dc04f5c2f?q=80&w=800' 
  },
  { 
    title: 'Coastal Bliss & Yoga', 
    duration: '6 Days', 
    price: '₹86,500', 
    category: 'Wellness',
    tags: ['Wellness', 'Coastal'],
    img: 'https://images.unsplash.com/photo-1512100356956-c1227c3317bb?q=80&w=800' 
  },
  { 
    title: 'Ladakh: Sky Road Journey', 
    duration: '10 Days', 
    price: '₹1,45,000', 
    category: 'Adventure',
    tags: ['Adventure', 'Mountain'],
    img: 'https://images.unsplash.com/photo-1581791538302-03537b9c97bf?q=80&w=800' 
  },
];

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`${className} reveal ${isInView ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('tours');
  const [hoveredSearchSegment, setHoveredSearchSegment] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-2xl py-4 border-b border-divider shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <Link href="/" className={`font-display text-3xl tracking-tighter transition-all flex items-center gap-2 group ${scrolled ? 'text-text' : 'text-white'}`}>
            <Navigation className={`w-6 h-6 text-primary fill-primary transition-transform group-hover:rotate-12 ${!scrolled && 'animate-floatY'}`} />
            Travel<span className="text-primary italic">oop</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-black ${scrolled ? 'text-text' : 'text-white/90'}`}>
            {['Explore', 'Search', 'Trips', 'Profile'].map((item) => (
              <Link 
                key={item}
                href={item === 'Explore' ? '#explore' : `/${item.toLowerCase()}`} 
                className="hover:text-primary transition-all relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className={`hidden md:flex items-center gap-8 ${scrolled ? 'text-text' : 'text-white'}`}>
            <div className="flex items-center gap-6 pr-6 border-r border-white/10">
              <Heart className="w-5 h-5 cursor-pointer hover:text-primary hover:scale-110 transition-all" />
              <Bell className="w-5 h-5 cursor-pointer hover:text-primary hover:scale-110 transition-all" />
              <DarkModeToggle />
            </div>
            <Link href="/login" className="bg-terracotta hover:bg-terracotta-hover text-white px-8 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl shadow-terracotta/20 transition-all hover:scale-105 active:scale-95 animate-pulseGlowTerra">
              Plan Expedition
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-text hover:bg-black/5' : 'text-white hover:bg-white/10'}`} onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.15, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-10" />
            <SafeImage 
              src={heroImages[currentImage]} 
              category="hero"
              alt="Luxury India Travel" 
              fill
              unoptimized
              className="object-cover animate-slowZoom"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Floating Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-floatY" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-terracotta/10 rounded-full blur-[120px] animate-floatY" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-primary uppercase tracking-[0.6em] text-[10px] font-black mb-8"
          >
            <div className="w-12 h-[1px] bg-primary/50" />
            <Sparkles className="w-4 h-4" />
            Modern Heritage of India
            <div className="w-12 h-[1px] bg-primary/50" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="font-display text-7xl md:text-9xl text-white mb-16 tracking-tighter leading-[0.85] text-shadow-xl"
          >
            Unveil the <span className="italic text-primary">Majesty</span>
          </motion.h1>

          {/* Interactive Dribbble-inspired Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mx-auto w-full max-w-4xl"
          >
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-4 ml-8 relative z-10">
              {['tours', 'hotels', 'flights'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSearchTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeSearchTab === tab 
                      ? 'bg-white text-black shadow-lg' 
                      : 'bg-black/30 text-white backdrop-blur-md hover:bg-black/50 border border-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main Search Container */}
            <div className="bg-white dark:bg-surface-2 rounded-full p-2 flex flex-col md:flex-row items-center gap-1 shadow-2xl relative">
              {/* Location Segment */}
              <div 
                onMouseEnter={() => setHoveredSearchSegment('location')}
                onMouseLeave={() => setHoveredSearchSegment(null)}
                className={`flex-1 flex items-center gap-4 pl-8 py-4 rounded-full transition-all duration-300 cursor-text ${
                  hoveredSearchSegment === 'location' ? 'bg-black/5 dark:bg-white/5' : ''
                }`}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="text-[9px] text-text-faint uppercase tracking-[0.2em] font-black mb-1">Location</span>
                  <input type="text" placeholder="Where are you going?" className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-muted text-sm font-bold" />
                </div>
              </div>
              
              <div className="w-px h-10 bg-divider/40 hidden md:block" />

              {/* Date Segment */}
              <div 
                onMouseEnter={() => setHoveredSearchSegment('date')}
                onMouseLeave={() => setHoveredSearchSegment(null)}
                className={`flex-1 flex items-center gap-4 pl-6 py-4 rounded-full transition-all duration-300 cursor-pointer ${
                  hoveredSearchSegment === 'date' ? 'bg-black/5 dark:bg-white/5' : ''
                }`}
              >
                <div className="p-2 bg-terracotta/10 rounded-full">
                  <Calendar className="w-5 h-5 text-terracotta" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="text-[9px] text-text-faint uppercase tracking-[0.2em] font-black mb-1">Dates</span>
                  <span className="text-text text-sm font-bold truncate">Select dates</span>
                </div>
              </div>

              <div className="w-px h-10 bg-divider/40 hidden md:block" />

              {/* Guests Segment */}
              <div 
                onMouseEnter={() => setHoveredSearchSegment('guests')}
                onMouseLeave={() => setHoveredSearchSegment(null)}
                className={`flex-1 flex items-center gap-4 pl-6 py-4 pr-2 rounded-full transition-all duration-300 cursor-pointer ${
                  hoveredSearchSegment === 'guests' ? 'bg-black/5 dark:bg-white/5' : ''
                }`}
              >
                <div className="p-2 bg-accent-gold/10 rounded-full">
                  <Users className="w-5 h-5 text-accent-gold" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="text-[9px] text-text-faint uppercase tracking-[0.2em] font-black mb-1">Guests</span>
                  <span className="text-text text-sm font-bold truncate">Add guests</span>
                </div>
                
                {/* Search Button */}
                <button className="bg-primary hover:bg-primary-hover text-white p-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/30 flex-shrink-0 ml-2 group/search">
                  <Search className="w-5 h-5 group-hover/search:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40">Scroll to Explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-floatY" />
        </motion.div>
      </section>

      {/* Heritage Bento Grid */}
      <section className="py-40 bg-white dark:bg-black" id="explore">
        <div className="max-w-[1400px] mx-auto px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-primary uppercase tracking-[0.5em] text-[10px] font-black mb-6">
                <div className="w-12 h-[2px] bg-primary" />
                Curated Chronicles
              </div>
              <h2 className="font-display text-7xl md:text-8xl text-text tracking-tighter leading-[0.9]">Iconic <span className="italic text-primary">Sanctuaries</span></h2>
              <p className="text-text-muted text-xl font-light leading-relaxed mt-10">
                Peerless destinations that harmonize ancient architectural marvels with the pulse of modern India.
              </p>
            </div>
            <Link href="/discovery" className="group flex items-center gap-4 text-primary font-black text-[11px] uppercase tracking-[0.4em] border-b-2 border-primary/10 pb-4 hover:border-primary transition-all">
              Explore All Vistas <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-2 gap-10 h-[1200px] md:h-[900px] reveal-group">
            {/* Jaipur - Large Feature */}
            <div className="md:col-span-4 md:row-span-2 group relative rounded-[56px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] animate-fadeIn">
              <SafeImage 
                src="https://images.unsplash.com/photo-1593693397690-362ae9666ec2?q=80&w=1200" 
                category="city"
                alt="Jaipur" 
                fill 
                unoptimized 
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-[4000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-16 left-16 right-16">
                <div className="flex items-center gap-4 mb-8">
                  <span className="bg-terracotta text-white text-[10px] font-black px-6 py-2.5 rounded-full uppercase tracking-widest border border-white/20 shadow-xl shadow-terracotta/20">
                    Royal Rajasthan
                  </span>
                  <span className="bg-white/10 backdrop-blur-2xl text-white text-[10px] font-bold px-6 py-2.5 rounded-full uppercase tracking-widest border border-white/10">
                    <Star className="w-3.5 h-3.5 inline mr-2 text-primary fill-primary" /> Featured Vibe
                  </span>
                </div>
                <h3 className="font-display text-6xl md:text-7xl text-white mb-8 tracking-tighter leading-tight group-hover:-translate-y-2 transition-transform duration-500">Jaipur: The <span className="italic">Cerise</span> Kingdom</h3>
                <p className="text-white/70 text-xl max-w-xl font-light leading-relaxed mb-12 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                  Navigate the labyrinth of pink facades, hidden stepwells, and emerald bazaars in the city of kings.
                </p>
                <div className="overflow-hidden">
                  <Link href="/trips/new?city=Jaipur" className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-2xl group/btn translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 duration-500 delay-100">
                    Initiate Blueprint <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-3 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Kerala */}
            <div className="md:col-span-2 md:row-span-1 group relative rounded-[48px] overflow-hidden shadow-2xl animate-fadeIn" style={{ animationDelay: '100ms' }}>
              <SafeImage src="https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=800" category="city" alt="Kerala" fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-transparent transition-all duration-500" />
              <div className="absolute bottom-10 left-10">
                <h4 className="font-display text-3xl text-white tracking-tighter">Emerald <span className="italic">Waters</span></h4>
                <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Wellness & Serenity</p>
              </div>
            </div>

            {/* Varanasi */}
            <div className="md:col-span-2 md:row-span-1 group relative rounded-[48px] overflow-hidden shadow-2xl animate-fadeIn" style={{ animationDelay: '200ms' }}>
              <SafeImage src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800" category="city" alt="Varanasi" fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-transparent group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute bottom-10 left-10 right-10">
                <h4 className="font-display text-3xl text-white tracking-tighter group-hover:-translate-y-2 transition-transform duration-300">Eternal <span className="italic">Ghats</span></h4>
                <div className="flex justify-between items-center mt-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em]">Spiritual Heart</p>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Journeys Section */}
      <section className="py-40 bg-bg/50 border-y border-divider/5 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -mr-64 -mt-64" />
        
        <RevealSection className="max-w-[1400px] mx-auto px-8 text-center mb-32">
          <div className="inline-flex items-center gap-3 text-terracotta uppercase tracking-[0.5em] text-[10px] font-black mb-8 px-6 py-2.5 bg-terracotta/5 rounded-full border border-terracotta/10">
            <Sparkles className="w-3.5 h-3.5" /> Curated Expeditions
          </div>
          <h2 className="font-display text-7xl md:text-8xl text-text mb-10 tracking-tighter leading-none">Bespoke <span className="italic text-terracotta">Rituals</span></h2>
          <p className="text-text-muted text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Expertly scoured journeys designed for the discerning explorer, blending legacy stays with authentic local rituals.
          </p>
        </RevealSection>

        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 reveal-group">
          {expeditions.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-surface-2 rounded-[48px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-4 group">
              <div className="h-80 relative overflow-hidden">
                <SafeImage src={item.img} category="activity" alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                <div className="absolute top-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-2xl px-5 py-2.5 rounded-2xl text-[11px] font-black flex items-center gap-2 border border-white shadow-xl">
                  <Star className="w-4 h-4 text-primary fill-primary" /> 4.9
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-display text-3xl text-text leading-tight group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                </div>
                <div className="flex flex-wrap gap-3 mb-10">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-bg dark:bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-faint border border-divider/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-8 border-t border-divider/10">
                  <div>
                    <p className="text-[10px] text-text-faint uppercase font-black tracking-widest mb-2">Expedition Fee</p>
                    <p className="text-3xl font-display text-text italic">{item.price}</p>
                  </div>
                  <button className="bg-terracotta hover:bg-terracotta-hover text-white p-5 rounded-2xl transition-all shadow-xl shadow-terracotta/20 group/btn">
                    <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scout Circle Section */}
      <section className="py-40 bg-white dark:bg-black">
        <div className="max-w-[1400px] mx-auto px-8">
          <RevealSection className="relative rounded-[64px] overflow-hidden p-20 md:p-40 text-center text-white shadow-2xl animate-borderPulse">
            <SafeImage src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2000" alt="Join Scout Circle" fill unoptimized className="object-cover animate-slowZoom" />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 z-10" />
            
            <div className="relative z-20 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 text-primary uppercase tracking-[0.5em] text-[11px] font-black mb-10 px-8 py-3 bg-primary/10 backdrop-blur-2xl rounded-full border border-primary/20">
                Member Registry
              </div>
              <h2 className="font-display text-7xl md:text-9xl mb-12 tracking-tighter leading-[0.85]">Join the <span className="italic text-primary">Circle</span></h2>
              <p className="text-white/60 text-xl mb-16 font-light leading-relaxed max-w-2xl mx-auto italic">
                Secure early access to heritage openings, bespoke travel journals, and member-only pricing for the discerning soul.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Registry Email Address" 
                  className="flex-1 bg-white/10 backdrop-blur-3xl border border-white/10 rounded-[24px] px-10 py-6 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all text-lg font-medium"
                />
                <button className="bg-primary hover:bg-primary-hover text-white px-12 py-6 rounded-[24px] font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 active:scale-95">
                  Authorize
                </button>
              </div>
              <p className="mt-10 text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
                Bespoke Updates Only • No Ad-hoc Traffic
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* High-Fidelity Footer */}
      <footer className="bg-black text-white pt-32 pb-16">
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-20 mb-32">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-5xl tracking-tighter mb-12 block group">
              Travel<span className="text-primary italic transition-all group-hover:pl-2">oop</span>
            </Link>
            <p className="text-white/40 text-base leading-relaxed mb-12 max-w-sm font-light italic">
              Crafting bespoke chronicles through the soul of India since 2012. Reconnecting discerning explorers with authentic heritage.
            </p>
            <div className="flex gap-8">
              {[Globe, Search, Bell].map((Icon, idx) => (
                <Icon key={idx} className="w-6 h-6 text-white/20 hover:text-primary cursor-pointer transition-all hover:scale-120" />
              ))}
            </div>
          </div>

          {[
            { title: 'Philosophy', items: ['Our Story', 'Bespoke', 'Journal', 'Careers'] },
            { title: 'Sectors', items: ['North', 'South', 'East', 'West'] },
            { title: 'Protocols', items: ['Etiquette', 'Visa', 'Climate', 'Registry'] },
            { title: 'Legals', items: ['Privacy', 'Terms', 'Security'] }
          ].map((col, idx) => (
            <div key={idx} className="md:col-span-2">
              <h5 className="font-black text-[10px] uppercase tracking-[0.4em] mb-12 text-white/20">{col.title}</h5>
              <ul className="space-y-6 text-sm font-bold text-white/40 uppercase tracking-[0.1em]">
                {col.items.map(item => (
                  <li key={item} className="hover:text-primary transition-all cursor-pointer flex items-center gap-2 group">
                    <span className="w-0 h-px bg-primary transition-all group-hover:w-4" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-8 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.5em] font-black text-white/10">
          <p>© 2026 Traveloop. Digital Heritage Prototype.</p>
          <div className="flex gap-10 mt-8 md:mt-0">
            <span className="hover:text-white transition-colors cursor-pointer">Encryption Level: 256-bit</span>
            <span className="hover:text-white transition-colors cursor-pointer">Protocol: v4.2.0</span>
          </div>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-24">
              <div className="font-display text-3xl text-white tracking-tighter">Travel<span className="text-primary italic">oop</span></div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-2xl text-white hover:bg-white/10 transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-12 font-display text-6xl text-white">
              {['Explore', 'Search', 'Trips', 'Identity'].map((item, idx) => (
                <Link 
                  key={item}
                  href={item === 'Explore' ? '#explore' : `/${item.toLowerCase()}`} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-all hover:pl-6"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-8">
              <Link href="/login" className="bg-primary text-white text-center py-8 rounded-[28px] font-black text-sm uppercase tracking-[0.4em] shadow-2xl shadow-primary/30 active:scale-95">
                Initiate Plan
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

