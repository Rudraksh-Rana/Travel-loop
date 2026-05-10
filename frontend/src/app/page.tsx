"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Users, ArrowRight, Star, 
  ChevronDown, ChevronRight, Menu, X, Search,
  Compass, Globe, Heart, Bell
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';

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

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-primary selection:text-white">
      {/* Premium Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-4 border-b border-divider shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1400px] mx-auto px-8 flex justify-between items-center">
          <Link href="/" className={`font-display text-2xl tracking-tighter transition-colors ${scrolled ? 'text-text' : 'text-white'}`}>
            Travel<span className="text-primary italic">oop</span>
          </Link>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-10 text-[13px] uppercase tracking-[0.2em] font-bold ${scrolled ? 'text-text' : 'text-white/90'}`}>
            <Link href="#explore" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">Explore</Link>
            <Link href="/search" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">Search</Link>
            <Link href="/trips" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">Trips</Link>
            <Link href="/profile" className="hover:text-primary transition-colors pb-1 border-b-2 border-transparent hover:border-primary">Profile</Link>
          </div>

          <div className={`hidden md:flex items-center gap-6 ${scrolled ? 'text-text' : 'text-white'}`}>
            <Heart className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Bell className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
            <Link href="/login" className="bg-terracotta hover:bg-terracotta-hover text-white px-7 py-3 rounded-full text-xs uppercase tracking-widest font-bold shadow-xl shadow-terracotta/20 transition-all hover:scale-105 active:scale-95">
              Plan Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className={`md:hidden ${scrolled ? 'text-text' : 'text-white'}`} onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Cinematic Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-black/30 z-10" />
            <SafeImage 
              src={heroImages[currentImage]} 
              category="hero"
              alt="Luxury India Travel" 
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl text-white mb-12 tracking-tight drop-shadow-2xl"
          >
            Unveil the <span className="italic">Majesty</span> of India
          </motion.h1>

          {/* Elegant Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-2xl rounded-2xl p-2 pl-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl border border-white/20"
          >
            <div className="flex-1 flex items-center gap-4 w-full">
              <div className="p-2 bg-primary/5 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-black mb-1">Destination</span>
                <input type="text" placeholder="Where to go?" className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-faint text-sm font-medium" />
              </div>
            </div>
            
            <div className="w-px h-10 bg-divider hidden md:block" />

            <div className="flex-1 flex items-center gap-4 w-full">
              <div className="p-2 bg-primary/5 rounded-lg">
                <Compass className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-text-muted uppercase tracking-widest font-black mb-1">Journey Type</span>
                <input type="text" placeholder="Cultural, Adventure..." className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-faint text-sm font-medium" />
              </div>
            </div>

            <button className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-10 py-5 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02]">
              <Search className="w-5 h-5" /> Discover
            </button>
          </motion.div>
        </div>
      </section>

      {/* Heritage Bento Grid - Popular Destinations */}
      <section className="py-32 bg-white" id="explore">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="flex items-center gap-3 text-primary uppercase tracking-[0.4em] text-[10px] font-black mb-4">
                <div className="w-8 h-[2px] bg-primary" />
                Featured Chronicles
              </div>
              <h2 className="font-display text-6xl text-text tracking-tighter">Popular <span className="italic">Destinations</span></h2>
              <p className="text-text-muted max-w-xl text-lg font-light leading-relaxed mt-6">
                Curated locales that blend ancient traditions with contemporary vibrancy.
              </p>
            </div>
            <Link href="/search" className="text-primary font-bold text-[10px] uppercase tracking-[0.3em] border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
              Explore All Destinations
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 grid-rows-2 gap-8 h-[1000px] md:h-[800px]">
            {/* Jaipur - Large Feature */}
            <div className="md:col-span-4 md:row-span-2 group relative rounded-[40px] overflow-hidden shadow-2xl">
              <SafeImage 
                src="https://images.unsplash.com/photo-1593693397690-362ae9666ec2?q=80&w=1200" 
                category="city"
                alt="Jaipur" 
                fill 
                unoptimized 
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-terracotta text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-white/20">
                    Royal Rajasthan
                  </span>
                  <span className="bg-white/10 backdrop-blur-xl text-white/80 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-white/10">
                    Trending Now
                  </span>
                </div>
                <h3 className="font-display text-5xl text-white mb-6 leading-tight">Jaipur: The <span className="italic">Pink</span> Majesty</h3>
                <p className="text-white/70 text-lg max-w-md font-light leading-relaxed mb-8">
                  Experience the grandeur of Rajputana palaces and vibrant bazaars under a desert sun.
                </p>
                <Link href="/trips/new?city=Jaipur" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
                  Build Your Plan <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Kerala */}
            <div className="md:col-span-2 md:row-span-1 group relative rounded-[40px] overflow-hidden shadow-xl">
              <SafeImage src="https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=800" category="city" alt="Kerala" fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h4 className="font-display text-2xl text-white uppercase tracking-tighter">Kerala Backwaters</h4>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">Wellness & Nature</p>
              </div>
            </div>

            {/* Varanasi */}
            <div className="md:col-span-2 md:row-span-1 group relative rounded-[40px] overflow-hidden shadow-xl">
              <SafeImage src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=800" category="city" alt="Varanasi" fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-8 left-8">
                <h4 className="font-display text-2xl text-white uppercase tracking-tighter">Varanasi Eternal</h4>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-2">Spiritual Heart</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Journeys Section */}
      <section className="py-32 bg-bg border-y border-divider">
        <div className="max-w-[1400px] mx-auto px-8 text-center mb-24">
          <h2 className="font-display text-5xl text-text mb-4 italic">Bespoke Journeys</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Expertly scoured journeys designed for the discerning explorer, blending luxury stays with authentic local experiences.
          </p>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          {expeditions.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="h-72 relative">
                <SafeImage src={item.img} category="activity" alt={item.title} fill unoptimized className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-accent-gold fill-accent-gold" /> 4.9
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display text-2xl text-text leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <span className="text-primary font-bold text-sm whitespace-nowrap">{item.duration}</span>
                </div>
                <p className="text-text-muted text-sm mb-6 leading-relaxed">
                  Exclusive wildlife safari through Ranthambore and Kanha national reserves.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-surface-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-divider">
                  <div>
                    <p className="text-[10px] text-text-faint uppercase font-bold tracking-widest mb-1">Starting From</p>
                    <p className="text-xl font-display text-text">{item.price}</p>
                  </div>
                  <button className="bg-terracotta hover:bg-terracotta-hover text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all">
                    Explore Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scout Circle Section */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="relative rounded-[40px] overflow-hidden p-16 md:p-32 text-center text-white shadow-2xl">
            <SafeImage src="https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2000" alt="Join Scout Circle" fill unoptimized className="object-cover" />
            <div className="absolute inset-0 bg-black/60 z-10" />
            
            <div className="relative z-20 max-w-2xl mx-auto">
              <h2 className="font-display text-5xl md:text-7xl mb-8">Join the Scout Circle</h2>
              <p className="text-white/70 text-lg mb-12 font-light leading-relaxed">
                Receive curated travel stories, exclusive heritage opening alerts, and member-only pricing delivered to your inbox.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-all"
                />
                <button className="bg-[#FF9F54] hover:bg-[#FF8F34] text-black px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-[#FF9F54]/20 active:scale-95">
                  Subscribe
                </button>
              </div>
              <p className="mt-6 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* High-Fidelity Footer */}
      <footer className="bg-[#1A1A1A] text-white pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-4xl tracking-tighter mb-8 block">
              Travel<span className="text-primary italic">oop</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-sm">
              Crafting bespoke journeys through the soul of India since 2012. Our mission is to reconnect discerning travelers with authentic heritage and hidden gems.
            </p>
            <div className="flex gap-6">
              <Globe className="w-5 h-5 text-white/20 hover:text-white cursor-pointer transition-colors" />
              <Search className="w-5 h-5 text-white/20 hover:text-white cursor-pointer transition-colors" />
              <Bell className="w-5 h-5 text-white/20 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/60">About Us</h5>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
              <li className="hover:text-white transition-colors cursor-pointer">Sustainability</li>
              <li className="hover:text-white transition-colors cursor-pointer">Travel Journal</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/60">Destinations</h5>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer">North India</li>
              <li className="hover:text-white transition-colors cursor-pointer">South India</li>
              <li className="hover:text-white transition-colors cursor-pointer">East India</li>
              <li className="hover:text-white transition-colors cursor-pointer">West India</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/60">Travel Guides</h5>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer">Cultural Etiquette</li>
              <li className="hover:text-white transition-colors cursor-pointer">Visa Info</li>
              <li className="hover:text-white transition-colors cursor-pointer">Weather Guide</li>
              <li className="hover:text-white transition-colors cursor-pointer">Packing List</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-white/60">Legal</h5>
            <ul className="space-y-4 text-sm font-medium text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-center items-center text-[10px] uppercase tracking-[0.3em] font-black text-white/20">
          <p>© 2026 Traveloop. Modern Heritage of India.</p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[100] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <div className="font-display text-2xl text-text tracking-tighter">Travel<span className="text-primary italic">oop</span></div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-10 font-display text-5xl">
              <Link href="#explore" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              <Link href="/search" onClick={() => setMobileMenuOpen(false)}>Search</Link>
              <Link href="/trips" onClick={() => setMobileMenuOpen(false)}>My Trips</Link>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>Identity</Link>
            </div>
            <div className="mt-auto flex flex-col gap-6">
              <Link href="/login" className="bg-primary text-white text-center py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20">
                Plan Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
