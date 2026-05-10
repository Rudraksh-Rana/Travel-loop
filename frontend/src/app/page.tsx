"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowRight, Star, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const heroImages = [
  'https://picsum.photos/seed/himalaya/1920/1080',
  'https://picsum.photos/seed/backwaters/1920/1080',
  'https://picsum.photos/seed/varanasi/1920/1080',
];

const trendingDestinations = [
  { name: 'Rajasthan', rating: 4.8, days: '7 Days', price: '₹24,999', img: 'https://picsum.photos/seed/rajasthan-fort/400/530' },
  { name: 'Spiti Valley', rating: 4.9, days: '8 Days', price: '₹28,500', img: 'https://picsum.photos/seed/himachal-mountains/400/530' },
  { name: 'Andaman', rating: 4.7, days: '5 Days', price: '₹32,000', img: 'https://picsum.photos/seed/tropical-beach/400/530' },
  { name: 'Hampi', rating: 4.8, days: '4 Days', price: '₹14,500', img: 'https://picsum.photos/seed/ancient-ruins/400/530' },
];

const categories = [
  { name: 'Mountains', icon: '🏔', img: 'https://picsum.photos/seed/mountains-india/300/400' },
  { name: 'Beaches', icon: '🌊', img: 'https://picsum.photos/seed/beach-india/300/400' },
  { name: 'Heritage', icon: '🏛', img: 'https://picsum.photos/seed/heritage-monument/300/400' },
  { name: 'Wildlife', icon: '🐅', img: 'https://picsum.photos/seed/wildlife-tiger/300/400' },
  { name: 'Spiritual', icon: '🪷', img: 'https://picsum.photos/seed/temple-spiritual/300/400' },
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
    
    // Crossfade loop
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg/90 backdrop-blur-md py-4 border-b border-divider' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center">
          <Link href="/" className={`font-display text-2xl tracking-wide ${scrolled ? 'text-text' : 'text-white'}`}>
            Trip-Smart
          </Link>
          
          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${scrolled ? 'text-text' : 'text-white/90'}`}>
            <Link href="#destinations" className="hover:text-primary transition-colors">Destinations</Link>
            <Link href="#packages" className="hover:text-primary transition-colors">Packages</Link>
            <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="#about" className="hover:text-primary transition-colors">About</Link>
            <div className="flex items-center gap-4 ml-4">
              <button className="hover:text-primary transition-colors">Sign In</button>
              <Link href="/build" className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full transition-colors font-medium">
                Plan Trip &rarr;
              </Link>
            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button className={`md:hidden ${scrolled ? 'text-text' : 'text-white'}`} onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <div className="font-display text-2xl text-text">Trip-Smart</div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-text">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-6 font-display text-3xl">
              <Link href="#destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
              <Link href="#packages" onClick={() => setMobileMenuOpen(false)}>Packages</Link>
              <Link href="#blog" onClick={() => setMobileMenuOpen(false)}>Journal</Link>
            </div>
            <div className="mt-auto pb-8 flex flex-col gap-4">
              <Link href="/build" className="bg-primary text-white text-center py-4 rounded-full font-medium text-lg">
                Plan Your Trip
              </Link>
              <button className="text-text-muted py-2">Sign In to Account</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[600px] w-full flex flex-col justify-between overflow-hidden">
        {/* Background Images */}
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ 
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.05
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.1_0.02_40_/_0.2)] to-[oklch(0.1_0.02_40_/_0.7)] z-10" />
            <Image 
              src={src} 
              alt="Indian Landscape" 
              fill
              unoptimized
              className="object-cover"
            />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 flex-1 max-w-[1280px] w-full mx-auto px-6 flex flex-col justify-end pb-32 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-white/80 uppercase tracking-widest text-xs font-semibold mb-6">
              <span>🌏</span> DISCOVER INDIA
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[80px] leading-[1.1] text-white mb-6">
              Where Will You <br/><span className="italic text-primary/90">Wander</span> Next?
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg font-light">
              Hand-picked journeys for the restless soul. Experience the authentic magic of India.
            </p>
          </motion.div>
        </div>

        {/* Search Bar - Floating Bottom Center */}
        <div className="absolute bottom-8 left-0 right-0 z-30 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl mx-auto glass-panel rounded-full p-2 pl-6 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-divider/20 pb-3 md:pb-0 pt-2 md:pt-0">
              <MapPin className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Destination</span>
                <input type="text" placeholder="Where to?" className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-faint text-sm md:text-base font-medium" />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 w-full border-b md:border-b-0 md:border-r border-divider/20 pb-3 md:pb-0 pt-2 md:pt-0">
              <Calendar className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Dates</span>
                <input type="text" placeholder="Add dates" className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-faint text-sm md:text-base font-medium" />
              </div>
            </div>
            <div className="flex-1 flex items-center gap-3 w-full pb-3 md:pb-0 pt-2 md:pt-0">
              <Users className="w-5 h-5 text-primary" />
              <div className="flex flex-col">
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Travellers</span>
                <input type="text" placeholder="2 Guests" className="bg-transparent border-none text-text outline-none w-full placeholder:text-text-faint text-sm md:text-base font-medium" />
              </div>
            </div>
            <button className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center justify-center">
              Search
            </button>
          </motion.div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-[clamp(4rem,8vw,8rem)] bg-bg overflow-hidden" id="destinations">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-primary text-xs tracking-widest uppercase font-semibold mb-3">MOST LOVED IN 2025</div>
              <h2 className="font-display text-4xl md:text-[56px] leading-tight text-text">Trending Destinations</h2>
            </div>
            <Link href="/destinations" className="text-text hover:text-primary transition-colors flex items-center gap-2 mt-4 md:mt-0 font-medium pb-2 border-b border-transparent hover:border-primary">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 no-scrollbar snap-x snap-mandatory">
            {trendingDestinations.map((dest, i) => (
              <div key={i} className="min-w-[280px] md:min-w-0 md:flex-1 shrink-0 snap-center group cursor-pointer">
                <div className="rounded-[16px] overflow-hidden bg-surface shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-medium px-3 py-1 rounded-full tracking-widest uppercase z-10">
                    Bestseller
                  </div>
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <Image 
                      src={dest.img} 
                      alt={dest.name} 
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-2xl text-text mb-2 transition-colors group-hover:text-primary">{dest.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center text-text"><Star className="w-3 h-3 text-accent-gold fill-accent-gold mr-1" /> {dest.rating}</span>
                      <span>•</span>
                      <span>{dest.days}</span>
                    </div>
                    <div className="mt-4 font-medium text-sm text-primary">
                      From {dest.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Feature */}
      <section className="py-[clamp(2rem,4vw,4rem)] bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row rounded-[24px] overflow-hidden bg-surface shadow-sm">
            <div className="lg:w-[60%] h-[400px] lg:h-[600px] relative overflow-hidden">
              <Image 
                src="https://picsum.photos/seed/varanasi-dawn/1200/800" 
                alt="Varanasi Ghats" 
                fill
                unoptimized
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            <div className="lg:w-[40%] p-10 lg:p-16 flex flex-col justify-center">
              <div className="text-primary text-xs tracking-widest uppercase font-semibold mb-4">FEATURED JOURNEY</div>
              <h2 className="font-display text-4xl lg:text-[48px] italic text-text mb-6 leading-tight">
                "The Ganges <br/>at First Light"
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Experience the spiritual awakening of the world's oldest living city. A guided journey through hidden alleys, ancient rituals, and sunset boat rides that you will remember for a lifetime.
              </p>
              <div className="flex gap-4 text-sm font-medium text-text-muted mb-8 pb-8 border-b border-divider">
                <span>8 Days · 7 Nights</span>
                <span>•</span>
                <span className="text-primary">From ₹42,000</span>
              </div>
              <button className="bg-transparent border border-text text-text hover:bg-text hover:text-bg px-8 py-3 rounded-full font-medium transition-all w-max">
                Explore Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-[clamp(4rem,8vw,8rem)] bg-bg">
        <div className="max-w-[960px] mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-text mb-12">Find Your Element</h2>
          <div className="flex overflow-x-auto gap-4 md:justify-center pb-4 no-scrollbar">
            {categories.map((cat, i) => (
              <div key={i} className="group cursor-pointer shrink-0 text-center">
                <div className="w-[160px] md:w-[140px] h-[200px] rounded-[100px] overflow-hidden relative mb-4 shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1 border-2 border-transparent group-hover:border-primary/20">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors z-10 mix-blend-multiply" />
                  <Image src={cat.img} alt={cat.name} fill unoptimized className="object-cover" />
                </div>
                <div className="flex items-center justify-center gap-2 font-medium text-text group-hover:text-primary transition-colors">
                  <span>{cat.icon}</span> {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-[clamp(6rem,10vw,12rem)] bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 space-y-24">
          
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden shadow-lg shadow-text/5">
                <Image src="https://picsum.photos/seed/tour-guide-india/500/400" alt="Expert local tour guide in India" fill unoptimized className="object-cover" />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="text-primary text-xs tracking-widest uppercase font-semibold mb-4">THE TRIP-SMART DIFFERENCE</div>
              <h3 className="font-display text-3xl md:text-4xl text-text mb-6">Expert Local Guides</h3>
              <p className="text-text-muted leading-relaxed mb-6">
                We partner with storytellers who know every hidden gem and local legend. Experience the destination not as a tourist, but as a welcomed guest.
              </p>
              <Link href="/about" className="text-primary font-medium flex items-center gap-2 hover:underline">
                Meet our experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            <div className="md:w-1/2">
              <div className="text-primary text-xs tracking-widest uppercase font-semibold mb-4">CURATED ACCOMMODATION</div>
              <h3 className="font-display text-3xl md:text-4xl text-text mb-6">Handpicked Stays</h3>
              <p className="text-text-muted leading-relaxed mb-6">
                From heritage havelis to boutique eco-resorts, every stay is personally vetted for warmth, authenticity, and responsible tourism practices.
              </p>
              <Link href="/stays" className="text-primary font-medium flex items-center gap-2 hover:underline">
                Explore our stays <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden shadow-lg shadow-text/5">
                <Image src="https://picsum.photos/seed/mountain-hotel-luxury/500/400" alt="Handpicked luxury mountain stay" fill unoptimized className="object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[clamp(4rem,8vw,8rem)] bg-bg">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-text">Notes from the Road</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-surface-2 p-8 rounded-[16px] border border-divider shadow-sm">
                <div className="flex gap-1 text-accent-gold mb-6">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-text leading-relaxed mb-8 italic">
                  "The Spiti Valley trip was unlike anything I've experienced. Every detail was perfect, from the homestays to the breathtaking drives."
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full bg-divider overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Avatar" fill unoptimized className="object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-text text-sm">Priya Sharma</div>
                    <div className="text-text-faint text-xs mt-1">Mumbai · March 2025</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative py-32 bg-text text-bg overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-text/80 z-10 mix-blend-multiply" />
          <Image src="https://picsum.photos/seed/night-stars-landscape/1920/500" alt="Night sky over Indian landscape" fill unoptimized className="object-cover" />
        </div>
        
        <div className="relative z-20 max-w-[640px] mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6 text-white">Your Next Adventure <br/><span className="italic text-primary">Starts Here</span></h2>
          <p className="text-bg/80 mb-10 text-lg">
            Get curated trip ideas, exclusive deals, and insider travel tips delivered to your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input type="email" placeholder="Email address" className="bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 px-6 py-4 rounded-full outline-none focus:border-primary flex-1 max-w-[320px]" />
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-medium transition-colors">
              Get Inspired &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg py-16 border-t border-divider">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-wide text-text mb-4 block">
              Trip-Smart
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              A cinematic window to India's most extraordinary destinations — as personal as a handwritten travel journal.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-6 text-sm uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link href="#" className="hover:text-primary transition-colors">Rajasthan</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Kerala</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Himachal Pradesh</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">North East</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Travel Journal</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text mb-6 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link href="#" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Pinterest</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 mt-16 pt-8 border-t border-divider text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-text-faint">
          <p>© 2026 Trip-Smart. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0 justify-center">
            <Link href="#" className="hover:text-text-muted transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-text-muted transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
