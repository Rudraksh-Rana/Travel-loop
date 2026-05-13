export default function SearchTemplate() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      

<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-20">
<div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
                BharatVenture
            </div>
<nav className="hidden md:flex items-center gap-stack-md">
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Explore</a>
<a className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 font-semibold font-body-md text-body-md" href="#">Search</a>
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Trips</a>
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="#">Profile</a>
</nav>
<div className="flex items-center gap-gutter">
<div className="hidden lg:flex items-center gap-4 text-on-surface-variant">
<span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all">notifications</span>
<span className="material-symbols-outlined cursor-pointer hover:text-primary transition-all">favorite</span>
</div>
<button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-headline-sm text-sm font-bold active:scale-95 transform transition-transform hover:bg-primary-container hover:text-on-primary-container">
                    Plan Now
                </button>
</div>
</div>
</header>
<main className="mt-20 min-h-screen">

<section className="relative h-[300px] overflow-hidden">
<img alt="Heritage Search Context" className="w-full h-full object-cover" data-alt="A cinematic, wide-angle shot of the Taj Mahal at dawn, with soft golden light hitting the white marble architecture. The atmosphere is serene and misty, reflecting India's majestic heritage. The color palette is dominated by warm golds, soft whites, and deep teals, consistent with a high-end travel experience and immersive minimalism style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6CIGvs1hwJx0u-C6xukW1so8HlYYYQmyvm0DWKXuZUosKO2MhMF7-tNZX9Brm5tcD74mCSXvU2DcsGQAmfqsxBhPR0HMcYNY705ZpkDuh3pxhD3tNeNv3wKZ5dDmaLXYZIwv1bPDsjNh4oTXA59mXKXLg1u964XmJbzyPIUYDS36lj7OFnYQ9j3sal2vReuDytOFMgkxqXJPH2EomQmbMBkFfhhq0IV1e009DJ2KodzSrj9rQjyT9W5RHENmPKVX9xiTozuUsYK0k"/>
<div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
<div className="absolute inset-0 flex flex-col justify-end pb-stack-lg max-w-container-max mx-auto px-margin-desktop">
<span className="font-label-md text-label-md text-primary font-bold uppercase tracking-widest mb-2">Discovery Hub</span>
<h1 className="font-display-lg text-display-lg text-on-background">Explore the Soul of India</h1>
</div>
</section>

<section className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<aside className="lg:col-span-3 space-y-stack-md">
<div className="bg-surface-container-lowest p-gutter rounded-xl filter-shadow sticky top-24 border border-outline-variant/10">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-sm text-headline-sm text-on-background">Filters</h3>
<button className="font-label-sm text-label-sm text-secondary hover:underline">Clear all</button>
</div>

<div className="mb-8">
<label className="font-label-md text-label-md text-outline block mb-4">PRICE RANGE (INR)</label>
<input className="w-full h-1 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary" max="500000" min="5000" step="5000" type="range"/>
<div className="flex justify-between mt-2 font-label-sm text-label-sm text-on-surface-variant">
<span>₹5,000</span>
<span>₹5,00,000</span>
</div>
</div>

<div className="mb-8">
<label className="font-label-md text-label-md text-outline block mb-4">DURATION</label>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 border-outline-variant text-secondary rounded focus:ring-secondary transition-all" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary">1-3 Days</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 border-outline-variant text-secondary rounded focus:ring-secondary transition-all" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary">4-7 Days</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input defaultChecked className="w-5 h-5 border-outline-variant text-secondary rounded focus:ring-secondary transition-all" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary">8-14 Days</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 border-outline-variant text-secondary rounded focus:ring-secondary transition-all" type="checkbox"/>
<span className="font-body-md text-body-md text-on-surface-variant group-hover:text-primary">15+ Days</span>
</label>
</div>
</div>

<div>
<label className="font-label-md text-label-md text-outline block mb-4">TRAVEL THEME</label>
<div className="flex flex-wrap gap-2">
<span className="bg-tertiary-container/30 text-on-tertiary-container px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer hover:bg-tertiary-container/50 transition-colors">Heritage</span>
<span className="bg-secondary-container/30 text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer hover:bg-secondary-container/50 transition-colors">Wellness</span>
<span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer hover:bg-surface-container-highest transition-colors">Adventure</span>
<span className="bg-surface-variant text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm cursor-pointer hover:bg-surface-container-highest transition-colors">Wildlife</span>
</div>
</div>
</div>
</aside>

<div className="lg:col-span-9 space-y-gutter">
<div className="flex justify-between items-center mb-4">
<p className="font-body-lg text-body-lg text-on-surface-variant">Showing <span className="font-bold text-on-background">12</span> heritage experiences</p>
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-outline">Sort by:</span>
<select className="bg-transparent border-none font-bold text-on-background focus:ring-0 cursor-pointer">
<option>Curated Popularity</option>
<option>Price: Low to High</option>
<option>Newest Arrivals</option>
</select>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow flex flex-col md:flex-row group transition-all duration-500 hover:-translate-y-1">
<div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
<img alt="Golden Triangle Tour" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Detailed view of the intricate architecture of the Amber Fort in Jaipur. Warm orange and yellow stone carvings against a clear blue sky. Professional photography style with high contrast and sharp details, reflecting India's architectural heritage. Soft shadows provide depth to the stone textures." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNCl4-Yo7A_WBmQkAiDnVT9JDPCnQVwW170q0oBdUA_mKk9wjAQ7FLjm342_C9s2PAlG0o0K3zhF3AQe2DUasMvdv4ZrsBoRBBems7FveduC5-9qQVLxu8NryJfyqtcqYdqU2QofsnWn4G7GUGE09y96Cqe-QPrH07agIeXFD_pzJPtH6lBPksAprj-iB5AnjLkU1kBBEOYyti_I5RnPy09fl05tuBLJVC02VY2och-uLzAg5JG6CmCSZDlyfYb3yAaKIqYC3VvdrY"/>
<div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm">Bestseller</div>
</div>
<div className="md:w-3/5 p-gutter flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-2">
<h2 className="font-headline-md text-headline-md text-on-background">Golden Triangle Tour</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-md text-label-md font-bold">4.9</span>
</div>
</div>
<p className="text-on-surface-variant mb-6 font-body-md">A royal journey through Delhi, Agra, and Jaipur. Witness the Taj Mahal at sunrise and explore the pink city's palaces.</p>
<div className="flex flex-wrap gap-4 mb-6">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">schedule</span>
<span className="font-label-sm text-label-sm">6 Days / 5 Nights</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">explore</span>
<span className="font-label-sm text-label-sm">Heritage &amp; History</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">hotel</span>
<span className="font-label-sm text-label-sm">5-Star Stays</span>
</div>
</div>
<div className="flex items-center gap-2 mb-6">
<span className="font-label-sm text-label-sm text-outline">Inclusions:</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">FLIGHTS</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">GUIDE</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">MEALS</span>
</div>
</div>
<div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
<div>
<span className="font-label-sm text-label-sm text-outline block">Starting From</span>
<span className="font-headline-sm text-headline-sm text-primary">₹42,500 <span className="font-body-md text-sm text-outline font-normal">/ person</span></span>
</div>
<button className="bg-on-background text-surface-container-lowest px-8 py-3 rounded-full font-label-md hover:bg-primary transition-all active:scale-95">View Details</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden card-shadow flex flex-col md:flex-row group transition-all duration-500 hover:-translate-y-1">
<div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
<img alt="Kerala Serenity Escape" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A tranquil scene of a traditional Kerala houseboat cruising through the lush green backwaters of Alleppey. The lighting is soft and late-afternoon, casting long shadows of palm trees on the calm water surface. The color palette emphasizes deep emerald greens, rich wood browns, and vibrant sky blues, creating a peaceful and luxurious travel atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP6ghukZunxeY4XB4ZkXp3i2xzUYzWQVVGG2DYpkJBN9w5h02Icq0LB6i2lRTFtAXl5D8mPPwmXoLlGeYqTv3bj0UoyyBQLmdLXZzTY4t5QLAgyY6D0NosLCrV_UDbuZVho2gxws-v1sJmmSAOlrlc1gfKP6Ry92-ikUZ-uR4eoirJ3fVCzD7K8o8GJMgBNdAr7A8sL656WY1GXnWtThYSDiCuGkDD6ATLVSkzF-ovinJLax9Z4ufQKWgOGEtSfXjmQnbsSQjx3_UQ"/>
<div className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-label-sm">Trending</div>
</div>
<div className="md:w-3/5 p-gutter flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-2">
<h2 className="font-headline-md text-headline-md text-on-background">Kerala Serenity Escape</h2>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-md text-label-md font-bold">4.8</span>
</div>
</div>
<p className="text-on-surface-variant mb-6 font-body-md">Unwind in God's own country. Experience private houseboats in Alleppey and the mist-covered tea gardens of Munnar.</p>
<div className="flex flex-wrap gap-4 mb-6">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">schedule</span>
<span className="font-label-sm text-label-sm">8 Days / 7 Nights</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">spa</span>
<span className="font-label-sm text-label-sm">Wellness &amp; Nature</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">directions_boat</span>
<span className="font-label-sm text-label-sm">Premium Houseboat</span>
</div>
</div>
<div className="flex items-center gap-2 mb-6">
<span className="font-label-sm text-label-sm text-outline">Inclusions:</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">SPA</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">ALL MEALS</span>
<span className="bg-surface-variant/50 text-on-surface-variant px-2 py-0.5 rounded font-label-sm text-[10px]">TRANSFER</span>
</div>
</div>
<div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
<div>
<span className="font-label-sm text-label-sm text-outline block">Starting From</span>
<span className="font-headline-sm text-headline-sm text-primary">₹58,900 <span className="font-body-md text-sm text-outline font-normal">/ person</span></span>
</div>
<button className="bg-on-background text-surface-container-lowest px-8 py-3 rounded-full font-label-md hover:bg-primary transition-all active:scale-95">View Details</button>
</div>
</div>
</div>
</div>
</div>
</section>
</main>

<footer className="bg-on-background dark:bg-surface-container-lowest w-full py-stack-lg">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-container-max mx-auto px-margin-desktop">
<div className="md:col-span-4">
<div className="font-headline-sm text-headline-sm text-surface-container-lowest dark:text-on-background mb-4">
                    BharatVenture
                </div>
<p className="text-surface-variant/80 font-body-md mb-8 max-w-xs">
                    Curating timeless journeys through the vibrant landscapes and rich heritage of the Indian subcontinent.
                </p>
<div className="text-surface-variant/60 font-label-md text-label-md">
                    © 2024 BharatVenture. Modern Heritage of India.
                </div>
</div>
<div className="md:col-span-2">
<h4 className="text-primary-fixed dark:text-primary font-bold mb-6 font-label-md">COMPANY</h4>
<nav className="flex flex-col gap-4">
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">About Us</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">Sustainability</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">Travel Guides</a>
</nav>
</div>
<div className="md:col-span-2">
<h4 className="text-primary-fixed dark:text-primary font-bold mb-6 font-label-md">EXPLORE</h4>
<nav className="flex flex-col gap-4">
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">Destinations</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">Luxury Stays</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed font-label-md text-label-md" href="#">Experiences</a>
</nav>
</div>
<div className="md:col-span-4">
<h4 className="text-primary-fixed dark:text-primary font-bold mb-6 font-label-md">NEWSLETTER</h4>
<p className="text-surface-variant/80 font-body-md mb-4">Join our journey and receive curated Indian heritage travel inspiration.</p>
<div className="flex gap-2">
<input className="bg-surface-container-highest/10 border border-outline-variant/30 rounded-lg px-4 py-2 w-full text-surface-container-lowest focus:ring-primary-fixed focus:border-primary-fixed" placeholder="Your email" type="email"/>
<button className="bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-lg font-bold hover:bg-primary-container transition-all">Join</button>
</div>
</div>
</div>
</footer>

    </div>
  );
}