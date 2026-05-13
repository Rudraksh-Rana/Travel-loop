export default function HomeTemplate() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      

<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm h-20">
<nav className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-full">
<div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
        BharatVenture
      </div>
<div className="hidden md:flex items-center gap-stack-md">
<a className="font-body-md text-body-md text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 font-semibold" href="#">Explore</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Search</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Trips</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Profile</a>
</div>
<div className="flex items-center gap-gutter">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all" data-icon="favorite">favorite</span>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all" data-icon="notifications">notifications</span>
</div>
<button className="bg-primary text-on-primary px-stack-md py-2 rounded-full font-headline-sm text-sm font-bold active:scale-95 transform transition-transform hover:bg-primary/90">
          Plan Now
        </button>
</div>
</nav>
</header>
<main>

<section className="relative h-[921px] flex items-center justify-center overflow-hidden pt-20">
<div className="absolute inset-0 z-0">
<img alt="Taj Mahal panorama" className="w-full h-full object-cover" data-alt="A wide, panoramic view of the Taj Mahal at dawn, with the rising sun casting a soft, golden glow over the white marble architecture. The atmosphere is serene and misty, reflecting the high-end, majestic soul of Indian heritage. The lighting is ethereal and warm, emphasizing the intricate details of the monument against a clear, pale morning sky, creating a sense of timeless luxury and travel inspiration." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf0H0Mv-Pbb-aeqzfDy_lgHCtXMEvGK9mWDWquN24Ff8bvPtBF4kp-suQK1hLsy5goFDi0ACgZA6BKqBo3fLHCB2KpmAvnPVvR13LSF0BKKsORWDtUbaaod8RI8lbnWWjKUZsN-sH4Ntn1gAMIohyuXnU1SsMDfa42V_YffscLigzSjW06d7oa8ub65vnNOwIp4iut0YCl_baZOP9crYjPA47s_L2BkpdyBPISiGAyGrJJaD6zf2WsCgCL8hJ7ythOFSVdA7BBWlBA"/>
<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90"></div>
</div>
<div className="relative z-10 w-full max-w-container-max px-margin-desktop text-center">
<h1 className="font-display-lg text-display-lg text-surface-container-lowest drop-shadow-lg mb-stack-md">
          Unveil the Majesty of India
        </h1>

<div className="max-w-4xl mx-auto glass-effect bg-white/70 p-4 rounded-xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
<div className="flex-1 w-full text-left px-4 border-r border-outline-variant/30">
<label className="block font-label-sm text-label-sm text-primary uppercase mb-1">Destination</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="location_on">location_on</span>
<input className="w-full bg-transparent border-none focus:ring-0 font-body-md p-0 placeholder-on-surface-variant/50" placeholder="Where to go?" type="text"/>
</div>
</div>
<div className="flex-1 w-full text-left px-4 border-r border-outline-variant/30">
<label className="block font-label-sm text-label-sm text-primary uppercase mb-1">Journey Type</label>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="hiking">hiking</span>
<input className="w-full bg-transparent border-none focus:ring-0 font-body-md p-0 placeholder-on-surface-variant/50" placeholder="Cultural, Adventure..." type="text"/>
</div>
</div>
<button className="w-full md:w-auto bg-secondary text-on-secondary px-8 py-4 rounded-lg font-headline-sm text-lg hover:bg-secondary/90 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="search">search</span>
            Discover
          </button>
</div>
</div>
</section>

<section className="py-stack-lg max-w-container-max mx-auto px-margin-desktop">
<div className="flex justify-between items-end mb-stack-md">
<div>
<h2 className="font-headline-md text-headline-md text-primary mb-2">Popular Destinations</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">Curated locales that blend ancient traditions with contemporary vibrance.</p>
</div>
<a className="font-label-md text-label-md text-secondary border-b border-secondary pb-1 hover:text-primary hover:border-primary transition-all" href="#">View All Destinations</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter h-[600px]">

<div className="md:col-span-8 group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
<img alt="Jaipur Heritage" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A cinematic shot of the Hawa Mahal in Jaipur during the golden hour. The intricate pink sandstone architecture is highlighted by the warm, directional sunlight, casting delicate shadows. The scene captures the high-energy vibrancy of Rajasthan, with a clean and organized composition that emphasizes the heritage of the 'Pink City'. The mood is majestic and professional." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJD89GoiAZJN1UJVtY5lEZZA_smvjz6AHw3Ykv8ghYeCDwu5RNr9nIGH4S_jeQtG3L-zqaQQ3aSp7aX8Ec41h1ivXMmxf3-t6Si6OKu4dZ9PhdcP8K99i0_cgkzUk13QY4QeWnmG-Vvx1RwbE0ZX3iKF3YFeskitfCheZrha5isOcEH04He9k43Dos_86klrSJ9cKJsJOyBTcytjS08CnmwrybvUtyor_kKcTBtVfColNlXYXQpv0IG34Qf3e0zZRVCsL8KyxXIqI5"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 left-0 p-stack-md text-surface-container-lowest">
<span className="font-label-sm text-label-sm bg-primary-container/20 glass-effect px-3 py-1 rounded-full mb-2 inline-block">Royal Heritage</span>
<h3 className="font-headline-sm text-headline-sm">Jaipur: The Pink City</h3>
<p className="font-body-md text-body-md text-surface-variant/90 max-w-md">Experience the grandeur of Rajputana palaces and vibrant bazaars.</p>
</div>
</div>

<div className="md:col-span-4 grid grid-rows-2 gap-gutter">
<div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
<img alt="Kerala Backwaters" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="A peaceful houseboat floating on the serene backwaters of Kerala at sunset. The water is glassy and reflects the tropical greenery and the vibrant orange and teal sky. The lighting is soft and ambient, creating a high-trust, professional travel feel. The composition is clean and focused on the luxurious, slow-paced lifestyle of the backwaters." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9--nVZTpT4qSDWx3DEyCs5qv2seTTFYowYY9WmzcskpwTxCIdpH6K_4Z_XmIvo2AGybiNtkiC2xVJhY3ly1Zq3qlgT7dRUfckQjx-gfklnn1lgrLkFTZe5f8VrhFqx-Y51ELYWeDDILRqpSyL9ebf_yllz3Lowkpb_ih8adEkHSzah4hMIVOUJy8zl29ycPGiYsJHO_FevHBQ0rsCiBeyu9jdweTW4fh_PJLjmcE1NWzMcE4aCkUL0Axs7knJ7H33AA8PYkB6uIgA"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent"></div>
<div className="absolute bottom-0 left-0 p-gutter text-surface-container-lowest">
<h3 className="font-headline-sm text-sm">Kerala Backwaters</h3>
</div>
</div>
<div className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer">
<img alt="Varanasi Spiritual" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="The spiritual sunrise at the Ganges Ghats in Varanasi. The scene is filled with a soft morning mist and the warm light of oil lamps. Pilgrims and ancient temples are seen in a respectful, immersive minimalist style. The color palette is composed of deep saffron, teal shadows, and earthy umber tones, evoking a sense of ancient mystery and spiritual peace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3QuNNE_ZtMx8laPia-6Am5UkCKkVMDe3gDey71_P5jPxvKoGW7UF6qDPfm3EZy-XmR6f9zmHl5Nz25KRQ4iqFgD6rfU8LHmZyV6VX6DXWibBbljWke2OwLxRUmaMW1FsJLud-qt_-q_oONGmb0Q3f8auC5NT5ZYmrg4xn3mZpkfaALTQsmcfPMYt2kZ3y9vUFPD7IcEEDdJ5q6UuhZg4lsbPns6_95QRn6iAmiLn7njRgfe2S9SkmZFsUPoq73fRXdvhK3drZ49kI"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/60 via-transparent to-transparent"></div>
<div className="absolute bottom-0 left-0 p-gutter text-surface-container-lowest">
<h3 className="font-headline-sm text-sm">Varanasi: Eternal Light</h3>
</div>
</div>
</div>
</div>
</section>

<section className="py-stack-lg bg-surface-container-low">
<div className="max-w-container-max mx-auto px-margin-desktop">
<div className="text-center mb-stack-lg">
<h2 className="font-headline-md text-headline-md text-primary mb-2">Trending Packages</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Expertly scouted journeys designed for the discerning explorer, blending luxury stays with authentic local experiences.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline-variant/10">
<div className="h-64 relative">
<img alt="Tiger Safari" className="w-full h-full object-cover" data-alt="A majestic Bengal tiger walking through the tall golden grasses of Ranthambore National Park. The lighting is high-contrast afternoon sun, casting sharp shadows and highlighting the tiger's vibrant orange coat. The scene is professional and high-definition, focusing on the raw beauty of Indian wildlife. The aesthetic is clean, immersive, and captures a moment of intense nature." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCLIEueW6hA94yCcVpcM6AQWNoZq0OayHaPNDXeFBODXveZWd1viyW7Mnin977qxKGjA7CKSZwedjd73BEMKbcmF6Su0Hga7TO977hJBOVvdJtxhJEzR46XfHfGX96qdVPmHZHTnTvWSE3cHZ6HK9NfN888eosJBd46EI6-Ca8xStAmcdDwv8Ju9NUkjrIxg08zw8Mf7038OjPcV8uhj2Kwx-qnge01-UuZUUzDSkDqc62SPd_y3dVxFEq41qMU7YESd5R--yUu7pk"/>
<div className="absolute top-4 right-4 glass-effect bg-white/80 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-primary text-sm" data-icon="star" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-sm text-label-sm text-on-surface">4.9</span>
</div>
</div>
<div className="p-gutter">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-sm text-xl text-on-background">Tiger Kingdom Expedition</h3>
<span className="font-label-md text-label-md text-secondary">8 Days</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-gutter">Exclusive wildlife safari through Ranthambore and Kanha national reserves.</p>
<div className="flex items-center gap-2 mb-stack-sm">
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Wildlife</div>
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Luxury Safari</div>
</div>
<div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
<span className="font-label-md text-label-md text-on-surface-variant">Starting from</span>
<span className="font-label-sm text-xl font-bold text-primary">₹1,24,000</span>
</div>
<button className="w-full mt-4 bg-primary text-on-primary py-3 rounded-lg font-headline-sm text-sm hover:bg-primary/90 transition-all active:scale-95">Explore Itinerary</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline-variant/10">
<div className="h-64 relative">
<img alt="Goa Luxury" className="w-full h-full object-cover" data-alt="The sun-drenched beaches of South Goa, featuring pristine white sand and leaning palm trees against a deep teal ocean. The scene is bright and airy with high-key lighting, emphasizing a high-trust luxury vacation atmosphere. The composition is minimalist and modern, focusing on the natural serenity of a premium coastal retreat. The colors are vibrant yet sophisticated." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcy2d_9E_UL6KDOPiDe2-5dRmdeHyM7jaRVVVojrDUWhVnjxNZknKDiQ3chRv_IJmVT1qaK8QONGWM4PAhbpUvVfYT5DgMkOw2-E2VQEB3376ip1EPDInZI3UJksyOe-uFF3uSB70njPFIU_1k2PycnYv5jX54aejE7fmhKCgzI-q_a7Rvdupjej5d448xEB5YRUwG3HcbWH0bAYaMMLiol4rbzSkGUidGYfBjoGrYxCwDsl7C5dNLbBOBYqSEX_gXVszoZbLYo2gn"/>
<div className="absolute top-4 right-4 glass-effect bg-white/80 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-primary text-sm" data-icon="star" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-sm text-label-sm text-on-surface">4.8</span>
</div>
</div>
<div className="p-gutter">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-sm text-xl text-on-background">Coastal Bliss &amp; Yoga</h3>
<span className="font-label-md text-label-md text-secondary">6 Days</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-gutter">A wellness-focused retreat on the secluded shores of South Goa.</p>
<div className="flex items-center gap-2 mb-stack-sm">
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Wellness</div>
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Coastal</div>
</div>
<div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
<span className="font-label-md text-label-md text-on-surface-variant">Starting from</span>
<span className="font-label-sm text-xl font-bold text-primary">₹86,500</span>
</div>
<button className="w-full mt-4 bg-primary text-on-primary py-3 rounded-lg font-headline-sm text-sm hover:bg-primary/90 transition-all active:scale-95">Explore Itinerary</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline-variant/10">
<div className="h-64 relative">
<img alt="Himalayan Heights" className="w-full h-full object-cover" data-alt="The majestic snow-capped peaks of the Himalayas in Ladakh, viewed from a high-altitude monastery. The sky is a deep, crisp blue and the lighting is harsh and brilliant, highlighting the textures of the mountain rock and pristine white snow. The scene captures the high-trust, adventurous essence of India's northern frontiers in a clean, professional, and expansive photographic style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3JtKJioTx-pRE6cKicIbPHqikLFm4w4BwBUYotqmrQDZhg0lMSPvjf8CR-5z_PbaluuvOXsyublHszWD96ABXADD7E4ScNfHCg7R5-9TtpRxWPc4VOZoK1A8-v2rHSbVg0KSpcD40pS4Mph94jCyKYPV-1ikPSo9MaACho0674uPJGfGSmOiBrbi017_3OPmfboIZPB9Do4Xt2XVlIcivZI1lUGGrd1AmOQjUE8h_R0YltmJ2YE9p-0PEeKc7ZRS8iZEAk4rkouG2"/>
<div className="absolute top-4 right-4 glass-effect bg-white/80 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-primary text-sm" data-icon="star" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-sm text-label-sm text-on-surface">5.0</span>
</div>
</div>
<div className="p-gutter">
<div className="flex justify-between items-start mb-2">
<h3 className="font-headline-sm text-xl text-on-background">Ladakh: Sky Road Journey</h3>
<span className="font-label-md text-label-md text-secondary">10 Days</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-gutter">Conquer high passes and discover ancient monasteries in the 'Little Tibet'.</p>
<div className="flex items-center gap-2 mb-stack-sm">
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Adventure</div>
<div className="bg-surface-container-high px-3 py-1 rounded-full text-xs font-label-md text-tertiary">Mountain</div>
</div>
<div className="flex justify-between items-center pt-4 border-t border-outline-variant/20">
<span className="font-label-md text-label-md text-on-surface-variant">Starting from</span>
<span className="font-label-sm text-xl font-bold text-primary">₹1,45,000</span>
</div>
<button className="w-full mt-4 bg-primary text-on-primary py-3 rounded-lg font-headline-sm text-sm hover:bg-primary/90 transition-all active:scale-95">Explore Itinerary</button>
</div>
</div>
</div>
</div>
</section>

<section className="py-stack-lg">
<div className="max-w-container-max mx-auto px-margin-desktop">
<div className="relative rounded-3xl overflow-hidden bg-on-background p-12 md:p-24 text-center">
<div className="absolute inset-0 opacity-20">
<img alt="Heritage Texture" className="w-full h-full object-cover" data-alt="A macro shot of a traditional Indian silk pattern with intricate gold zari work. The lighting is low-key, emphasizing the rich saffron and deep umber textures of the fabric. The scene represents the luxury and heritage of Indian craftsmanship in a modern, abstract way. The atmosphere is sophisticated and high-end, providing a majestic backdrop for travel communication." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbql-WYjbdXi0fCwAiyH2HKxa4-HiA_p7nuHALZPkR1JFBr9IpMpMjb-EPbsrsKaLeB0wNWzFqnOKcxDZSVHiDug4ltUYPHB7vLqXwzyJnGh5mJSOf4ahfPrDXbaIOaHtDCBqgrFF3UHv-zhLe0h4PFAMngB2RbA0QnT8nakwgYnmX0-iCCzvObPCrkEfsIyLx5VUtbht_-ps6xfAXbUGQnTSN7EW3l4nZLg16sF5IVbfGem4COrtc1QLt2uXdbOnBXNQHAEPVuOKY"/>
</div>
<div className="relative z-10 max-w-2xl mx-auto">
<h2 className="font-display-lg text-display-lg text-primary-fixed mb-4">Join the Scout Circle</h2>
<p className="font-body-lg text-body-lg text-surface-variant/80 mb-stack-lg">Receive curated travel stories, exclusive heritage opening alerts, and member-only pricing delivered to your inbox.</p>
<form className="flex flex-col md:flex-row gap-4">
<input className="flex-1 bg-surface-container-lowest/10 border border-surface-variant/20 rounded-lg px-6 py-4 text-surface-container-lowest font-body-md focus:ring-primary focus:border-primary placeholder-surface-variant/40" placeholder="Your email address" type="email"/>
<button className="bg-primary-container text-on-primary-container px-stack-lg py-4 rounded-lg font-headline-sm font-bold hover:brightness-110 transition-all" type="submit">
                Subscribe
              </button>
</form>
<p className="mt-4 font-label-sm text-label-sm text-surface-variant/60">We respect your privacy. Unsubscribe at any time.</p>
</div>
</div>
</div>
</section>
</main>

<footer className="bg-on-background dark:bg-surface-container-lowest w-full py-stack-lg">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-container-max mx-auto px-margin-desktop">

<div className="md:col-span-4">
<div className="font-headline-sm text-headline-sm text-surface-container-lowest dark:text-on-background mb-4">BharatVenture</div>
<p className="font-body-md text-body-md text-surface-variant/60 mb-stack-md">Crafting bespoke journeys through the soul of India since 2012. Our mission is to connect discerning travelers with authentic heritage and hidden gems.</p>
<div className="flex gap-4">
<span className="material-symbols-outlined text-surface-variant/80 cursor-pointer hover:text-primary-fixed" data-icon="public">public</span>
<span className="material-symbols-outlined text-surface-variant/80 cursor-pointer hover:text-primary-fixed" data-icon="share">share</span>
<span className="material-symbols-outlined text-surface-variant/80 cursor-pointer hover:text-primary-fixed" data-icon="mail">mail</span>
</div>
</div>

<div className="md:col-span-2">
<h4 className="font-label-md text-label-md text-primary-fixed mb-4">About Us</h4>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Our Story</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Sustainability</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Travel Scouts</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Careers</a></li>
</ul>
</div>
<div className="md:col-span-2">
<h4 className="font-label-md text-label-md text-primary-fixed mb-4">Destinations</h4>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">North India</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">South India</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">East India</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">West India</a></li>
</ul>
</div>
<div className="md:col-span-2">
<h4 className="font-label-md text-label-md text-primary-fixed mb-4">Travel Guides</h4>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Cultural Etiquette</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Visa Info</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Weather Guide</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Packing List</a></li>
</ul>
</div>
<div className="md:col-span-2">
<h4 className="font-label-md text-label-md text-primary-fixed mb-4">Legal</h4>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Privacy Policy</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Terms of Service</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant transition-colors hover:underline decoration-primary-fixed" href="#">Cookie Policy</a></li>
</ul>
</div>
</div>
<div className="max-w-container-max mx-auto px-margin-desktop mt-stack-lg pt-8 border-t border-surface-variant/10 text-center">
<p className="font-label-md text-label-md text-surface-variant/60">© 2024 BharatVenture. Modern Heritage of India.</p>
</div>
</footer>

    </div>
  );
}