export default function ProfileTemplate() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      

<header className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-20">
<div className="flex items-center gap-gutter">
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BharatVenture</span>
<nav className="hidden md:flex items-center gap-8 ml-8">
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md" href="#">Explore</a>
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md" href="#">Search</a>
<a className="text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors font-body-md" href="#">Trips</a>
<a className="text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 font-semibold font-body-md" href="#">Profile</a>
</nav>
</div>
<div className="flex items-center gap-stack-sm">
<div className="flex items-center gap-4 mr-4">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all" data-icon="favorite">favorite</span>
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all" data-icon="notifications">notifications</span>
</div>
<button className="hidden md:flex items-center bg-primary text-on-primary px-6 py-2 rounded-full font-headline-sm text-sm active:scale-95 transform transition-transform">
                    Plan Now
                </button>
</div>
</div>
</header>
<main className="pt-24 pb-stack-lg max-w-container-max mx-auto px-margin-desktop">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">

<aside className="md:col-span-3 sticky top-28 space-y-stack-md">
<div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/10">
<div className="flex flex-col items-center text-center">
<div className="relative mb-stack-sm">
<img className="w-32 h-32 rounded-full object-cover border-4 border-primary-fixed shadow-md" data-alt="A professional portrait of a male Indian traveler with a friendly smile, photographed in soft, natural daylight. He has a neatly groomed beard and is wearing high-quality, modern travel apparel. The background is a slightly out-of-focus heritage courtyard with warm sandstone textures and subtle greenery, emphasizing a high-end, adventure-focused lifestyle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpIIV9eVtVgLmhZzm2V3wGHYgjLA0hMKBtdiNrnq4e-CwS63C7ix6iiM0MgNPLPUevLLUSNGRKVGMPXET2KU_7UtfdUbEm09zVPUhv_v1w6uBn_cp85Q5xlONRpxvmCQztvSWqtmKcHjYGU5PBLiCYwkhVPt102aAyeNADk4rQB45LAYki-1xs5UuAXCYszQYkzZYgTTrzfhRrWvz94hCa6ycej24z1n8zZhKmLSdQCPl3dUnNm6GsVGBzhbEjdBOb2fRiB37ASns-"/>
<div className="absolute bottom-1 right-1 bg-primary text-on-primary p-1 rounded-full border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-base" data-icon="verified" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
</div>
</div>
<h1 className="font-headline-sm text-headline-sm text-on-surface">Arjun Malhotra</h1>
<p className="font-label-md text-label-md text-outline mb-stack-md">HERITAGE EXPLORER</p>
<div className="grid grid-cols-3 gap-2 w-full pt-stack-md border-t border-outline-variant/20">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Trips</span>
<span className="font-headline-sm text-primary">14</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">States</span>
<span className="font-headline-sm text-primary">08</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Saves</span>
<span className="font-headline-sm text-primary">42</span>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-sm border border-outline-variant/10">
<h3 className="font-label-md text-label-md text-outline uppercase tracking-widest mb-stack-sm">Quick Access</h3>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all text-on-surface-variant font-body-md group" href="#">
<span className="material-symbols-outlined text-primary" data-icon="settings">settings</span>
<span>Account Settings</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all text-on-surface-variant font-body-md" href="#">
<span className="material-symbols-outlined text-primary" data-icon="credit_card">credit_card</span>
<span>Payment Methods</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all text-on-surface-variant font-body-md" href="#">
<span className="material-symbols-outlined text-primary" data-icon="share">share</span>
<span>Travel Preferences</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-high transition-all text-on-surface-variant font-body-md" href="#">
<span className="material-symbols-outlined text-primary" data-icon="contact_support">contact_support</span>
<span>Help &amp; Support</span>
</a>
</nav>
</div>
</aside>

<div className="md:col-span-9 space-y-stack-lg">

<section>
<div className="flex justify-between items-end mb-stack-md">
<div>
<h2 className="font-display-lg text-display-lg text-on-background">Upcoming Trips</h2>
<p className="text-on-surface-variant font-body-lg">Your next chapters of discovery await.</p>
</div>
<button className="text-primary font-label-md hover:underline flex items-center gap-1">
                            View All <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">

<div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/10 transition-all hover:shadow-lg">
<div className="aspect-[16/9] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A breathtaking sunset view of the Taj Mahal in Agra, India. The white marble monument glows with a soft golden hue under a warm, saffron-tinted sky. In the foreground, the reflective water of the Yamuna River mirrors the silhouette of the architecture. The image captures a serene, high-luxury travel aesthetic with deep, rich tones and sharp architectural details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBW4Pf_yO3B5JwByYkUj5P9JAZRK_xaMjYG3JMC5a3oZMltA0htPJab5AwvMcUMmGtLBGaofxzNssgr8LXGOKZc3LdeXq7Bju3fdNFqSSvU0HjlZsWlcXmSO-VXOHQLkL_szr0y-7aWJScOReNqd30u1jvhZRL420e6UPi11Ngk_k-MtkQ8CFlExgvILVsScCIPOx9zLJo4b0697APkjJB3wzJJQmnrjJfCp-qGuhxTbgVdpdlfKZq5Y5ApCmsApbpEVqY0me91jtJ"/>
</div>
<div className="p-stack-md">
<div className="flex justify-between items-start mb-2">
<span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-xs">Cultural Heritage</span>
<span className="font-label-sm text-label-sm text-primary">OCT 12-18</span>
</div>
<h3 className="font-headline-sm text-headline-sm mb-4">Golden Triangle Expedition</h3>
<div className="flex items-center justify-between">
<div className="flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" data-alt="Avatar of a traveler." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlJLemWo26rPRbay2rx3i_L-_47yKcC_FMU73DyJm_5c42cCiJNlM2z94SV19B4BgVkay3-ZGZIrVZG-BkuInGqf0-6hTvA9GqiVcGTSSBdQ0IGdWe0CdIMqnHnvu-1ixH8qvUxo3-IjJ6aNySINTEEcicT9ab8qwh4cBZckAjX56e1qgQcNbmaQclgzYoKs0xbN-t9CwJ9XA6XLPuZGOfcvY6gaMyCUANJaK8frqOXCV7UCdeXMh-L70WvOdSsYMabbozUkUxKOyN"/>
<img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" data-alt="Avatar of a traveler." src="https://lh3.googleusercontent.com/aida-public/AB6AXuACrxxLrPk6RcLTiL4wtuv3fj8Wi-ltrRBOu2DsA_FZmKeRAElCjilU8kYhPKQ3IvZMD8t-egFJLoL7KpUmrMrM2aP_NNRNC49TuW82_KYtWYD8va48NfsSeyNJJPpLT8zgs4NpEioscRzB_qh5HZ3uc4XHiPD92PCxsLXWSwqQMPKL7Gz1UPmE1-oriHQbC_kai6pv49g33bHMyQ7u3n7pXplck5TtplPZZgUdkYrZHtrF60B3l9PCbfE2NwW1ThVYfW2KBwFwnSni"/>
<div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold">+2</div>
</div>
<span className="text-outline font-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="pin_drop">pin_drop</span> Agra, Jaipur, Delhi
                                    </span>
</div>
</div>
</div>

<div className="group relative overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/10 transition-all hover:shadow-lg">
<div className="aspect-[16/9] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A serene scene in Goa, India, featuring a quiet beach at twilight. Tall palm trees sway gently in the breeze against a purple and deep blue evening sky. A high-end wooden eco-resort villa is partially visible, lit with warm lanterns that create a welcoming, luxury coastal vibe. The overall atmosphere is tranquil and sophisticated, perfectly capturing a modern Indian getaway." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXYpIBUbFZGu-kErI71l33EChwIBOcbD9EEwSkFvaNCcmHUtq-Z_STb8qonDdiOjhi3IiTihggAFwYm9u_zdrsJN1Ds8Fq00xFMRXXhYQX5TQo9jz5ZdU1kq3VMzWBoWaNo1cNdE4Kl117Z_fWrNRtMdOTV4O6rKNWoHBt6UFVtxUOUr3X-IwUTXZB5BZYZQNu2F4oujcouCDReU7OS3j1blwgxfxwFx_HM1tJS12AHwNCuh0P8ashFgTJHtO5ew1gkP27cwlne4Ql"/>
</div>
<div className="p-stack-md">
<div className="flex justify-between items-start mb-2">
<span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full font-label-sm text-xs">Wellness &amp; Coastal</span>
<span className="font-label-sm text-label-sm text-primary">NOV 04-10</span>
</div>
<h3 className="font-headline-sm text-headline-sm mb-4">Quietude of Goa Shores</h3>
<div className="flex items-center justify-between">
<div className="flex -space-x-2">
<img className="w-8 h-8 rounded-full border-2 border-surface-container-lowest" data-alt="Avatar of a traveler." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwtxF3J58C-lgBUZIBPII-ouYFAMBJFCkhex09-UmD_qRTV7Uxv50oUj64e3-sbAEhh7P7fagKIvo8YoKv1or-n0QUztwyEA8Y5nLV_QKsszLR380dAOVCkn2UWf6ffPMF9v0pwMcacthbo-bO-fc9ovtmkEmycxm8rfIPPC6gDaFqTXGT7J7l7n0xTQtAd9TSjA-3ZWcIqP4OHgQ6Opj2-O7fixZjXZxwBLC6DEMKxsfMl1RGvkJ2SiZRVz6vI9l96VAv01VUCA2u"/>
<div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold">ME</div>
</div>
<span className="text-outline font-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="pin_drop">pin_drop</span> South Goa
                                    </span>
</div>
</div>
</div>
</div>
</section>

<section>
<div className="flex justify-between items-end mb-stack-md">
<div>
<h2 className="font-headline-md text-headline-md text-on-background">Saved Guides</h2>
<p className="text-on-surface-variant font-body-md">Hand-curated resources for your inspirations.</p>
</div>
</div>
<div className="space-y-stack-sm">

<div className="flex items-center gap-gutter p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-pointer">
<div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" data-alt="Detailed close-up of intricate stone carvings on a temple wall in Hampi, India. The warm morning sun highlights the deep textures and craftsmanship of the ancient ruins. The image uses a palette of ochre and burnt sienna, conveying a sense of timelessness and historical depth." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN6QalJbLRJrDfac7wTpWiVCJ5QY3vhGxaug6xBMdwgf9gH-UvB_evP7Rl_SUz8e4VST1-RUyJJDUvxgm7XoHgVjoi_22mp7Co2NopdV6iRUwCyOfh71P476pWWHszbIOsDLAtldlLB0s7t58BIA6zCM6jz_BSMwCvdZonDCziAlKL5_F4CK8HU0N042ELKhARI1vEfRZKVKH_Q4R4YjFo_SXRNOUv9fUT7-E7-LDCAlVQ5-o-ApMz8UTWvFdLlTXUjXRsLTHC5OOJ"/>
</div>
<div className="flex-grow">
<h4 className="font-headline-sm text-lg mb-1 group-hover:text-primary transition-colors">The Lost City of Hampi: A 3-Day Trek</h4>
<p className="text-on-surface-variant text-sm line-clamp-1 mb-2">Expert tips on navigating the boulder-strewn landscape and hidden shrines.</p>
<div className="flex gap-4">
<span className="flex items-center gap-1 font-label-sm text-xs text-outline">
<span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span> 15 min read
                                    </span>
<span className="flex items-center gap-1 font-label-sm text-xs text-outline">
<span className="material-symbols-outlined text-sm" data-icon="star" style={{fontVariationSettings: '"FILL" 1'}}>star</span> 4.9 (1.2k)
                                    </span>
</div>
</div>
<button className="p-2 rounded-full hover:bg-surface-container-high text-primary">
<span className="material-symbols-outlined" data-icon="bookmark" style={{fontVariationSettings: '"FILL" 1'}}>bookmark</span>
</button>
</div>

<div className="flex items-center gap-gutter p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-pointer">
<div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" data-alt="Vibrant Indian street food scene in Mumbai, featuring a steaming pan of local delicacies. The lighting is high-contrast and atmospheric, emphasizing the rich colors of spices and fresh herbs. The photo is taken with a professional macro lens, capturing steam and fine details of the food, set against the busy, blurred background of a traditional market." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDbv_U_C33-T6yNdixLjTtlA-0dW1FZCo9LjSzrExsPEA1SvsYGM8KXIDZ2ItUfCsX4OCqY4CkoqSH0ddxXRp7B3xQevYLx9mq6bvSmrrn8CeiDNh_7VyUhEmIUc942Vj4YTjfOAM_uwjTim-YA0y_-xj8eLJOQ_nyjQS8hDVY6x8w22vsQjnYYhlBFxxKfNvA34QkH5mR1_860elwDXKVZFWjMOH9T_-ScIXOsFerXPSJHXRw61MkJAkEcCoWkSwrk5cQJrblTIOc"/>
</div>
<div className="flex-grow">
<h4 className="font-headline-sm text-lg mb-1 group-hover:text-primary transition-colors">Mumbai’s Culinary Secrets: Beyond Vada Pav</h4>
<p className="text-on-surface-variant text-sm line-clamp-1 mb-2">A gastronomic journey through the coastal flavors and Parsi cafes of South Bombay.</p>
<div className="flex gap-4">
<span className="flex items-center gap-1 font-label-sm text-xs text-outline">
<span className="material-symbols-outlined text-sm" data-icon="schedule">schedule</span> 22 min read
                                    </span>
<span className="flex items-center gap-1 font-label-sm text-xs text-outline">
<span className="material-symbols-outlined text-sm" data-icon="star" style={{fontVariationSettings: '"FILL" 1'}}>star</span> 4.8 (850)
                                    </span>
</div>
</div>
<button className="p-2 rounded-full hover:bg-surface-container-high text-primary">
<span className="material-symbols-outlined" data-icon="bookmark" style={{fontVariationSettings: '"FILL" 1'}}>bookmark</span>
</button>
</div>
</div>
</section>
</div>
</div>
</main>

<footer className="w-full py-stack-lg bg-on-background dark:bg-surface-container-lowest">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-container-max mx-auto px-margin-desktop">
<div className="md:col-span-4">
<span className="font-headline-sm text-headline-sm text-surface-container-lowest dark:text-on-background mb-stack-sm block">BharatVenture</span>
<p className="text-surface-variant/80 font-body-md mb-stack-md">We curate soul-stirring journeys that honor India’s timeless legacy and vibrant future. Join us in preserving heritage through travel.</p>
</div>
<div className="md:col-span-2 md:col-start-6">
<h4 className="text-primary-fixed dark:text-primary font-label-md mb-stack-sm">EXPLORE</h4>
<nav className="flex flex-col gap-2">
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Destinations</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Travel Guides</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Luxury Stays</a>
</nav>
</div>
<div className="md:col-span-2">
<h4 className="text-primary-fixed dark:text-primary font-label-md mb-stack-sm">COMPANY</h4>
<nav className="flex flex-col gap-2">
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">About Us</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Sustainability</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Impact</a>
</nav>
</div>
<div className="md:col-span-2">
<h4 className="text-primary-fixed dark:text-primary font-label-md mb-stack-sm">LEGAL</h4>
<nav className="flex flex-col gap-2">
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Privacy Policy</a>
<a className="text-surface-variant/80 hover:text-surface-variant transition-colors font-label-md hover:underline decoration-primary-fixed" href="#">Terms of Service</a>
</nav>
</div>
<div className="md:col-span-12 pt-stack-lg border-t border-surface-variant/10 text-center">
<p className="text-surface-variant/60 font-label-sm">© 2024 BharatVenture. Modern Heritage of India.</p>
</div>
</div>
</footer>

    </div>
  );
}