export default function DetailsTemplate() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      

<nav className="fixed top-0 w-full z-50 bg-surface/80 dark:bg-surface-container-low/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-center max-w-container-max mx-auto px-margin-desktop h-20">
<div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">BharatVenture</div>
<div className="hidden md:flex gap-gutter items-center">
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Explore</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Search</a>
<a className="font-body-md text-body-md text-primary dark:text-primary-fixed border-b-2 border-primary dark:border-primary-fixed pb-1 font-semibold" href="#">Trips</a>
<a className="font-body-md text-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary transition-colors" href="#">Profile</a>
</div>
<div className="flex items-center gap-gutter">
<span className="material-symbols-outlined text-primary cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all">notifications</span>
<span className="material-symbols-outlined text-primary cursor-pointer hover:bg-surface-container-high/50 p-2 rounded-full transition-all">favorite</span>
<button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold active:scale-95 transform transition-transform">Plan Now</button>
</div>
</div>
</nav>

<main className="pt-20">

<section className="relative h-[716px] w-full overflow-hidden">
<img alt="Rajasthan Heritage" className="w-full h-full object-cover" data-alt="A majestic wide-angle shot of the Hawa Mahal in Jaipur during the golden hour. The intricate honeycomb architecture is bathed in warm, glowing sunlight, highlighting the pink sandstone details. The sky is a soft gradient of orange and teal, creating a high-end, editorial travel aesthetic. The scene captures the regal and historic essence of Rajasthan's heritage." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP4Ye4qW_gbFM1D89_6WglzEJIig87u3liQuKcJJlPAVrRgOK8HnAKfhBKOVetFuKnlb-ycBoboHpS8s0vCvSMWRSk8bOwCNNGNCHhcyQjevj0E-cnYxRAlZDRSSiefr4ZKd4K97rso51eV1X-yCd3MGdbvvgkP70Znj7Xc6-AA7wKSc6PP0vTpR_SL9bZ71M3A-BIdvscVFzqtwJ9GIcc0DWfHO7QMBFh6oIloIHmXQZJg78yQO6-apekkci2oLO7dX7yIFJjGvIr"/>
<div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
<div className="absolute bottom-0 left-0 w-full px-margin-desktop pb-stack-lg">
<div className="max-w-container-max mx-auto">
<span className="inline-block bg-primary-container text-on-primary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm mb-4">EXCLUSIVE HERITAGE</span>
<h1 className="font-display-lg text-display-lg text-surface-container-lowest mb-2">Rajasthan Heritage Tour</h1>
<p className="font-body-lg text-body-lg text-surface-variant max-w-2xl">A 12-day immersive journey through the Land of Kings, exploring grand forts, opulent palaces, and the vibrant soul of the Thar Desert.</p>
</div>
</div>
</section>

<div className="sticky top-20 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/20 shadow-sm">
<div className="max-w-container-max mx-auto px-margin-desktop h-20 flex justify-between items-center">
<div className="flex gap-gutter items-center">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Starts from</p>
<p className="font-headline-sm text-headline-sm text-primary">₹84,999 <span className="font-body-md text-body-md text-on-surface-variant font-normal">/ person</span></p>
</div>
<div className="h-8 w-px bg-outline-variant/30"></div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
<span className="font-label-md text-label-md">4.9 (128 Reviews)</span>
</div>
</div>
<div className="flex items-center gap-stack-md">
<div className="hidden lg:flex flex-col items-end">
<span className="font-label-sm text-label-sm text-on-surface-variant">Available Dates</span>
<span className="font-body-md text-body-md font-semibold">Oct 12 - Mar 20</span>
</div>
<button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold shadow-lg hover:bg-surface-tint active:scale-95 transition-all">Book This Journey</button>
</div>
</div>
</div>

<div className="max-w-container-max mx-auto px-margin-desktop py-stack-lg grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-8">

<div className="flex border-b border-outline-variant/20 mb-stack-md">
<button className="px-8 py-4 font-headline-sm text-headline-sm border-b-2 border-primary text-primary">Itinerary</button>
<button className="px-8 py-4 font-headline-sm text-headline-sm text-on-surface-variant hover:text-primary transition-colors">Inclusions</button>
<button className="px-8 py-4 font-headline-sm text-headline-sm text-on-surface-variant hover:text-primary transition-colors">Reviews</button>
</div>

<div className="space-y-gutter relative itinerary-line">

<div className="relative pl-12">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-surface-container-lowest z-10"></div>
<div className="bg-surface-container-low p-gutter rounded-xl shadow-sm">
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Day 01</span>
<h3 className="font-headline-sm text-headline-sm mb-4">Arrival in the Pink City</h3>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Welcome to Jaipur. Transfer to your heritage hotel and spend the evening at Chokhi Dhani for an authentic Rajasthani cultural experience and dinner.</p>
<img alt="Heritage Hotel" className="w-full h-64 object-cover rounded-lg" data-alt="A luxurious heritage hotel courtyard in Jaipur at twilight. The architecture features delicate stone carvings, arched doorways, and warm amber lanterns. Traditional musicians in colorful turbans sit on hand-woven rugs, creating a soulful and welcoming atmosphere for arriving travelers. The lighting is soft and ambient, emphasizing the majestic heritage feel." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPahKIUghmXE_Y9G9DeWlHSI7ghayQBiKdahwsIUdxB2wIOhBA2H1mzzCgx65GeDZZIYUniwsEK4Rk9_LBvlYDmJ9crPuJZ_I07SAZ6R2e62iaIQxBCsI5kmsgsnI8BrqkYeslTkItXx1aUFFFrkETbNG00rpG81o64TRS7sBvwbSUaYDTjt_dUkE1lO61jOmTuW7_XYUGIsYtNqrMnBjYksQsHGXbK2j7OsHNhu6av5O95vRubW2D1neWeMk-LxVAQMN3y-hrlCrp"/>
</div>
</div>

<div className="relative pl-12">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary border-4 border-surface-container-lowest z-10"></div>
<div className="bg-surface-container-low p-gutter rounded-xl shadow-sm">
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Day 02</span>
<h3 className="font-headline-sm text-headline-sm mb-4">Amber Fort &amp; Royal Palaces</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Explore the grand Amber Fort, followed by visits to the City Palace, Jantar Mantar, and the iconic Hawa Mahal for a sunset photography session.</p>
<div className="mt-4 flex gap-2">
<span className="bg-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm">Breakfast</span>
<span className="bg-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm">Guided Tour</span>
</div>
</div>
</div>

<div className="relative pl-12">
<div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary border-4 border-surface-container-lowest z-10"></div>
<div className="bg-surface-container-low p-gutter rounded-xl shadow-sm">
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Day 03</span>
<h3 className="font-headline-sm text-headline-sm mb-4">The Blue Mystery of Jodhpur</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Travel to the Blue City. Ascend the Mehrangarh Fort for panoramic views and wander through the indigo-hued streets of the old city.</p>
</div>
</div>
</div>

<section className="mt-stack-lg">
<h2 className="font-headline-md text-headline-md mb-stack-sm">Travel Route</h2>
<div className="bg-surface-container-high h-[400px] rounded-xl overflow-hidden relative">
<img alt="Route Map" className="w-full h-full object-cover opacity-50" data-alt="An artistic cartographic representation of the Rajasthan travel route. The map is styled with a vintage aesthetic, using soft parchment tones and elegant teal lines to mark the path between Jaipur, Jodhpur, Udaipur, and Jaisalmer. Hand-drawn icons of forts and camels punctuate the route, conveying a sense of adventure and luxury exploration." data-location="Rajasthan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqo9RwRhjZslspu3IttU6fH7HI7gN2MIZzjZDrqqj8bdpkVxMJqsPyaemPSIwzdFhn9zaC9OLgGx3P9XXIVwrfunbSjvlou77iBPTY6Q6ltZGBcdOwDP1D9U9uFxZvJkFJvp5nCAO5oG4aw8gQjgoXCxoUqoK2aLwann7UL0I8jIdDD5UGjlq0Eof2v8TnXedgrqKCbTdTxXWysWLxxPsrbvxg2jIEAXKAt5oQfcIz_aaJRBtSfrN2z7JE7yDNCVCiI39MQYRktVWx"/>
<div className="absolute inset-0 flex items-center justify-center">
<div className="bg-surface/90 backdrop-blur-md p-gutter rounded-lg shadow-xl text-center border border-primary/20">
<span className="material-symbols-outlined text-primary text-4xl mb-2">map</span>
<p className="font-headline-sm text-headline-sm">Interactive Route Map</p>
<p className="font-body-md text-body-md text-on-surface-variant mb-4">Jaipur → Jodhpur → Jaisalmer → Udaipur</p>
<button className="text-primary font-bold hover:underline">View Detailed Map</button>
</div>
</div>
</div>
</section>
</div>

<div className="md:col-span-4 space-y-gutter">

<div className="bg-surface-container p-stack-md rounded-xl shadow-sm border border-outline-variant/10">
<h4 className="font-headline-sm text-headline-sm mb-gutter">Tour Highlights</h4>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md text-body-md">Luxury Heritage Hotel stays in all cities</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md text-body-md">Private sunset dinner in the Thar Desert</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md text-body-md">Exclusive boat ride on Lake Pichola</span>
</li>
<li className="flex items-start gap-3">
<span className="material-symbols-outlined text-primary mt-1">check_circle</span>
<span className="font-body-md text-body-md">Professional historian guides throughout</span>
</li>
</ul>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20">
<span className="material-symbols-outlined text-primary mb-2">calendar_today</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">Duration</p>
<p className="font-body-lg text-body-lg font-bold">12 Days</p>
</div>
<div className="bg-secondary-container/10 p-4 rounded-xl border border-secondary-container/20">
<span className="material-symbols-outlined text-secondary mb-2">group</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">Group Size</p>
<p className="font-body-lg text-body-lg font-bold">Max 8</p>
</div>
</div>

<div className="bg-on-background p-stack-md rounded-xl text-surface-container-lowest">
<h4 className="font-headline-sm text-headline-sm mb-4">Have Questions?</h4>
<p className="font-body-md text-body-md text-surface-variant mb-6">Talk to our Rajasthan travel expert for a customized itinerary.</p>
<div className="space-y-4">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-fixed">call</span>
<span className="font-label-md text-label-md">+91 1800 200 900</span>
</div>
<button className="w-full py-3 rounded-lg border border-primary-fixed text-primary-fixed font-bold hover:bg-primary-fixed hover:text-on-primary-fixed transition-all">Request Callback</button>
</div>
</div>
</div>
</div>
</main>

<footer className="bg-on-background dark:bg-surface-container-lowest w-full py-stack-lg">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter max-w-container-max mx-auto px-margin-desktop">
<div className="md:col-span-4">
<div className="font-headline-sm text-headline-sm text-surface-container-lowest dark:text-on-background mb-4">BharatVenture</div>
<p className="font-body-md text-body-md text-surface-variant/80 mb-6">Curating extraordinary journeys through the heart of India's heritage. Join us for an authentic exploration of the majestic subcontinent.</p>
<div className="flex gap-4">
<span className="material-symbols-outlined text-surface-variant">public</span>
<span className="material-symbols-outlined text-surface-variant">camera_indoor</span>
<span className="material-symbols-outlined text-surface-variant">flight</span>
</div>
</div>
<div className="md:col-span-2">
<h5 className="font-label-md text-label-md text-primary-fixed mb-4">Explore</h5>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant hover:underline decoration-primary-fixed transition-colors" href="#">Destinations</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant hover:underline decoration-primary-fixed transition-colors" href="#">Travel Guides</a></li>
</ul>
</div>
<div className="md:col-span-2">
<h5 className="font-label-md text-label-md text-primary-fixed mb-4">Company</h5>
<ul className="space-y-2">
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant hover:underline decoration-primary-fixed transition-colors" href="#">About Us</a></li>
<li><a className="font-body-md text-body-md text-surface-variant/80 hover:text-surface-variant hover:underline decoration-primary-fixed transition-colors" href="#">Sustainability</a></li>
</ul>
</div>
<div className="md:col-span-4">
<h5 className="font-label-md text-label-md text-primary-fixed mb-4">Newsletter</h5>
<p className="font-body-md text-body-md text-surface-variant/80 mb-4">Get the latest heritage travel inspiration.</p>
<div className="flex border-b border-outline/30 pb-2">
<input className="bg-transparent border-none focus:ring-0 text-surface-container-lowest placeholder:text-surface-variant/50 w-full font-label-md" placeholder="Email Address" type="email"/>
<button className="text-primary-fixed font-bold">JOIN</button>
</div>
</div>
<div className="md:col-span-12 pt-stack-md border-t border-outline/10 mt-stack-md">
<div className="flex flex-col md:flex-row justify-between items-center gap-4">
<p className="font-label-md text-label-md text-surface-variant/80">© 2024 BharatVenture. Modern Heritage of India.</p>
<div className="flex gap-gutter">
<a className="font-label-md text-label-md text-surface-variant/80 hover:text-surface-variant" href="#">Privacy Policy</a>
<a className="font-label-md text-label-md text-surface-variant/80 hover:text-surface-variant" href="#">Terms of Service</a>
</div>
</div>
</div>
</div>
</footer>

    </div>
  );
}