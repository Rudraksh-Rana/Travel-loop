import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination';
import ExploreActivity from './models/ExploreActivity';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traveloop';

const destinations = [
  { name: 'Jaipur', state: 'Rajasthan', description: 'The Pink City — magnificent palaces, forts, and vibrant bazaars.', image: 'https://picsum.photos/seed/jaipur/800/600', tags: ['Heritage', 'Culture', 'Shopping'], bestTimeToVisit: 'Oct–Mar', rating: 4.8 },
  { name: 'Udaipur', state: 'Rajasthan', description: 'City of Lakes — Venice of the East with romantic palaces on water.', image: 'https://picsum.photos/seed/udaipur/800/600', tags: ['Romance', 'Lakes', 'Architecture'], bestTimeToVisit: 'Sep–Mar', rating: 4.9 },
  { name: 'Jodhpur', state: 'Rajasthan', description: 'The Blue City — Mehrangarh Fort towers over a sea of indigo houses.', image: 'https://picsum.photos/seed/jodhpur/800/600', tags: ['Heritage', 'Forts', 'Desert'], bestTimeToVisit: 'Oct–Feb', rating: 4.7 },
  { name: 'Jaisalmer', state: 'Rajasthan', description: 'The Golden City — a sandstone fort rising from the Thar Desert.', image: 'https://picsum.photos/seed/jaisalmer/800/600', tags: ['Desert', 'Heritage', 'Adventure'], bestTimeToVisit: 'Nov–Feb', rating: 4.8 },
  { name: 'Varanasi', state: 'Uttar Pradesh', description: 'Oldest living city — the spiritual heart of India on the sacred Ganges.', image: 'https://picsum.photos/seed/varanasi/800/600', tags: ['Spirituality', 'Culture', 'Ganges'], bestTimeToVisit: 'Nov–Feb', rating: 4.6 },
  { name: 'Agra', state: 'Uttar Pradesh', description: 'Home of the Taj Mahal — a UNESCO wonder and symbol of eternal love.', image: 'https://picsum.photos/seed/agra/800/600', tags: ['Heritage', 'UNESCO', 'Architecture'], bestTimeToVisit: 'Oct–Mar', rating: 4.7 },
  { name: 'Munnar', state: 'Kerala', description: 'Lush hill station in the Western Ghats with endless tea plantations.', image: 'https://picsum.photos/seed/munnar/800/600', tags: ['Nature', 'Hill Station', 'Tea'], bestTimeToVisit: 'Sep–May', rating: 4.7 },
  { name: 'Alleppey', state: 'Kerala', description: 'Backwater capital — houseboat cruises through a labyrinth of canals.', image: 'https://picsum.photos/seed/alleppey/800/600', tags: ['Backwaters', 'Relaxation', 'Nature'], bestTimeToVisit: 'Nov–Feb', rating: 4.8 },
  { name: 'Fort Kochi', state: 'Kerala', description: 'Coastal heritage town blending Portuguese, Dutch, and British history.', image: 'https://picsum.photos/seed/kochi/800/600', tags: ['Heritage', 'Coast', 'Culture'], bestTimeToVisit: 'Oct–Mar', rating: 4.6 },
  { name: 'Hampi', state: 'Karnataka', description: 'UNESCO World Heritage Site — ruins of the mighty Vijayanagara Empire.', image: 'https://picsum.photos/seed/hampi/800/600', tags: ['History', 'Ruins', 'UNESCO'], bestTimeToVisit: 'Oct–Feb', rating: 4.8 },
  { name: 'Coorg', state: 'Karnataka', description: 'Scotland of India — misty hills, coffee estates, and wildlife sanctuaries.', image: 'https://picsum.photos/seed/coorg/800/600', tags: ['Nature', 'Coffee', 'Hill Station'], bestTimeToVisit: 'Oct–May', rating: 4.7 },
  { name: 'Mysuru', state: 'Karnataka', description: 'City of Palaces — the grand Mysore Palace illuminated during Dasara.', image: 'https://picsum.photos/seed/mysuru/800/600', tags: ['Heritage', 'Palaces', 'Culture'], bestTimeToVisit: 'Oct–Feb', rating: 4.6 },
  { name: 'Goa', state: 'Goa', description: 'India\'s beach paradise — golden sands, Portuguese forts, and vibrant nightlife.', image: 'https://picsum.photos/seed/goa/800/600', tags: ['Beach', 'Nightlife', 'Heritage'], bestTimeToVisit: 'Nov–Mar', rating: 4.8 },
  { name: 'Mumbai', state: 'Maharashtra', description: 'City of Dreams — Bollywood, colonial architecture, and coastal grandeur.', image: 'https://picsum.photos/seed/mumbai/800/600', tags: ['City', 'Culture', 'Food'], bestTimeToVisit: 'Nov–Feb', rating: 4.5 },
  { name: 'Pune', state: 'Maharashtra', description: 'Oxford of the East — vibrant student city with Maratha heritage.', image: 'https://picsum.photos/seed/pune/800/600', tags: ['City', 'Heritage', 'Culture'], bestTimeToVisit: 'Oct–Mar', rating: 4.4 },
  { name: 'Manali', state: 'Himachal Pradesh', description: 'Gateway to the Himalayas — adventure sports, snow peaks, and pine forests.', image: 'https://picsum.photos/seed/manali/800/600', tags: ['Adventure', 'Mountains', 'Snow'], bestTimeToVisit: 'Mar–Jun & Dec–Feb', rating: 4.7 },
  { name: 'Shimla', state: 'Himachal Pradesh', description: 'Former summer capital of British India — charming colonial hill town.', image: 'https://picsum.photos/seed/shimla/800/600', tags: ['Hill Station', 'Heritage', 'Snow'], bestTimeToVisit: 'Mar–Jun & Dec–Jan', rating: 4.5 },
  { name: 'Leh', state: 'Ladakh', description: 'Land of High Passes — monasteries, moonscapes, and high-altitude lakes.', image: 'https://picsum.photos/seed/leh/800/600', tags: ['Adventure', 'Mountains', 'Spirituality'], bestTimeToVisit: 'May–Sep', rating: 4.9 },
  { name: 'Rishikesh', state: 'Uttarakhand', description: 'Yoga capital of the world — Ganges rafting, ashrams, and spiritual bliss.', image: 'https://picsum.photos/seed/rishikesh/800/600', tags: ['Spirituality', 'Adventure', 'Yoga'], bestTimeToVisit: 'Feb–May & Sep–Nov', rating: 4.7 },
  { name: 'Darjeeling', state: 'West Bengal', description: 'Queen of Hills — toy train rides through mist-wrapped tea gardens.', image: 'https://picsum.photos/seed/darjeeling/800/600', tags: ['Hill Station', 'Tea', 'Nature'], bestTimeToVisit: 'Mar–May & Sep–Nov', rating: 4.7 },
  { name: 'Amritsar', state: 'Punjab', description: 'Holy city of the Sikhs — the Golden Temple glows at the heart of India.', image: 'https://picsum.photos/seed/amritsar/800/600', tags: ['Spirituality', 'Culture', 'Heritage'], bestTimeToVisit: 'Oct–Mar', rating: 4.9 },
  { name: 'Andaman Islands', state: 'Andaman & Nicobar', description: 'Tropical paradise — pristine beaches, coral reefs, and turquoise waters.', image: 'https://picsum.photos/seed/andaman/800/600', tags: ['Beach', 'Diving', 'Nature'], bestTimeToVisit: 'Nov–Apr', rating: 4.8 },
  { name: 'Ooty', state: 'Tamil Nadu', description: 'Nilgiri queen — rolling grasslands, botanical gardens, and toy train charm.', image: 'https://picsum.photos/seed/ooty/800/600', tags: ['Hill Station', 'Nature', 'Gardens'], bestTimeToVisit: 'Apr–Jun & Sep–Nov', rating: 4.5 },
  { name: 'Mahabalipuram', state: 'Tamil Nadu', description: 'UNESCO shore temples carved by the Pallava dynasty by the Bay of Bengal.', image: 'https://picsum.photos/seed/mahabalipuram/800/600', tags: ['Heritage', 'UNESCO', 'Beach'], bestTimeToVisit: 'Nov–Mar', rating: 4.6 },
  { name: 'Kaziranga', state: 'Assam', description: 'Home of the one-horned rhino — a UNESCO Natural World Heritage Site.', image: 'https://picsum.photos/seed/kaziranga/800/600', tags: ['Wildlife', 'Nature', 'UNESCO'], bestTimeToVisit: 'Nov–Apr', rating: 4.8 },
];

const activities = [
  { title: 'Hot Air Balloon over Jaipur', location: 'Jaipur, Rajasthan', category: 'Adventure', description: 'Watch the Pink City\'s forts and palaces from above at sunrise.', image: 'https://picsum.photos/seed/balloon-jaipur/800/600', priceRange: '₹₹₹', duration: '1 hour', rating: 4.9 },
  { title: 'Ganga Aarti Ceremony', location: 'Varanasi, UP', category: 'Culture', description: 'A mesmerising fire ritual on the banks of the Ganges every evening.', image: 'https://picsum.photos/seed/aarti/800/600', priceRange: 'Free', duration: '45 mins', rating: 5.0 },
  { title: 'Houseboat Cruise in Backwaters', location: 'Alleppey, Kerala', category: 'Relaxation', description: 'Overnight on a traditional Kettuvallam through serene canals.', image: 'https://picsum.photos/seed/houseboat/800/600', priceRange: '₹₹₹', duration: 'Overnight', rating: 4.8 },
  { title: 'Taj Mahal Sunrise Visit', location: 'Agra, UP', category: 'Heritage', description: 'Witness the Taj Mahal glow gold as the sun rises over the Yamuna.', image: 'https://picsum.photos/seed/taj-sunrise/800/600', priceRange: '₹₹', duration: '3 hours', rating: 5.0 },
  { title: 'Desert Safari in Thar', location: 'Jaisalmer, Rajasthan', category: 'Adventure', description: 'Camel ride through golden sand dunes, ending with a folk performance.', image: 'https://picsum.photos/seed/desert-safari/800/600', priceRange: '₹₹', duration: 'Half day', rating: 4.8 },
  { title: 'White Water Rafting', location: 'Rishikesh, Uttarakhand', category: 'Adventure', description: 'Battle Grade III–IV rapids on the holy Ganges river.', image: 'https://picsum.photos/seed/rafting/800/600', priceRange: '₹₹', duration: '3 hours', rating: 4.7 },
  { title: 'Golden Temple Visit & Langar', location: 'Amritsar, Punjab', category: 'Spirituality', description: 'Tour the marble sanctuary and share a free meal cooked for thousands.', image: 'https://picsum.photos/seed/golden-temple/800/600', priceRange: 'Free', duration: '2 hours', rating: 5.0 },
  { title: 'Scuba Diving at Havelock', location: 'Andaman Islands', category: 'Adventure', description: 'Explore coral gardens teeming with marine life in crystal waters.', image: 'https://picsum.photos/seed/scuba-andaman/800/600', priceRange: '₹₹₹', duration: '3 hours', rating: 4.9 },
  { title: 'Toy Train Ride to Darjeeling', location: 'Darjeeling, West Bengal', category: 'Scenic', description: 'Steam through misty tea gardens on a UNESCO heritage narrow-gauge railway.', image: 'https://picsum.photos/seed/toy-train/800/600', priceRange: '₹', duration: '7 hours', rating: 4.8 },
  { title: 'Pangong Lake Drive', location: 'Leh, Ladakh', category: 'Scenic', description: 'Journey to the stunning high-altitude lake on the Indo-China border.', image: 'https://picsum.photos/seed/pangong/800/600', priceRange: '₹₹', duration: 'Full day', rating: 5.0 },
  { title: 'Sunrise at Tiger Hill', location: 'Darjeeling, West Bengal', category: 'Scenic', description: 'Watch Kanchenjunga blush pink at first light from 2,590 m.', image: 'https://picsum.photos/seed/tiger-hill/800/600', priceRange: '₹', duration: '3 hours', rating: 4.8 },
  { title: 'Mehrangarh Fort Tour', location: 'Jodhpur, Rajasthan', category: 'Heritage', description: 'Explore one of India\'s largest forts with panoramic Blue City views.', image: 'https://picsum.photos/seed/mehrangarh/800/600', priceRange: '₹₹', duration: '3 hours', rating: 4.8 },
  { title: 'Kathakali Performance', location: 'Fort Kochi, Kerala', category: 'Culture', description: 'Watch Kerala\'s classical dance-drama with intricate costumes and make-up.', image: 'https://picsum.photos/seed/kathakali/800/600', priceRange: '₹₹', duration: '2 hours', rating: 4.7 },
  { title: 'Tea Estate Walk in Coorg', location: 'Coorg, Karnataka', category: 'Nature', description: 'Walk through aromatic coffee and tea plantations in the Western Ghats.', image: 'https://picsum.photos/seed/coorg-tea/800/600', priceRange: '₹', duration: '2 hours', rating: 4.6 },
  { title: 'Jeep Safari in Kaziranga', location: 'Kaziranga, Assam', category: 'Wildlife', description: 'Spot one-horned rhinos, elephants, and tigers in their natural habitat.', image: 'https://picsum.photos/seed/kaziranga-safari/800/600', priceRange: '₹₹', duration: '3 hours', rating: 4.9 },
  { title: 'Bioluminescent Beach Night', location: 'Goa', category: 'Nature', description: 'Witness the rare blue glow of bioluminescent plankton at Betalbatim beach.', image: 'https://picsum.photos/seed/bioluminescent/800/600', priceRange: 'Free', duration: '2 hours', rating: 4.9 },
  { title: 'Hampi Coracle Ride', location: 'Hampi, Karnataka', category: 'Adventure', description: 'Float across the Tungabhadra river in a traditional circular wicker boat.', image: 'https://picsum.photos/seed/hampi-coracle/800/600', priceRange: '₹', duration: '30 mins', rating: 4.5 },
  { title: 'Snow Trek to Rohtang Pass', location: 'Manali, HP', category: 'Adventure', description: 'Trek through snow-laden Himalayan passes at 3,978 metres altitude.', image: 'https://picsum.photos/seed/rohtang/800/600', priceRange: '₹₹', duration: 'Full day', rating: 4.7 },
  { title: 'Mysore Palace Light Show', location: 'Mysuru, Karnataka', category: 'Culture', description: 'Watch the Mysore Palace illuminate with 97,000 bulbs on Sunday evenings.', image: 'https://picsum.photos/seed/mysore-lights/800/600', priceRange: 'Free', duration: '1 hour', rating: 4.8 },
  { title: 'Dolphin Watching Cruise', location: 'Goa', category: 'Nature', description: 'Spot spinner dolphins leaping in the Arabian Sea at sunrise.', image: 'https://picsum.photos/seed/dolphins-goa/800/600', priceRange: '₹₹', duration: '2 hours', rating: 4.6 },
  { title: 'Cooking Class in Mumbai', location: 'Mumbai, Maharashtra', category: 'Culinary', description: 'Learn to cook authentic Maharashtrian street food with a local family.', image: 'https://picsum.photos/seed/mumbai-cooking/800/600', priceRange: '₹₹', duration: '3 hours', rating: 4.7 },
  { title: 'Paragliding in Bir Billing', location: 'Bir, Himachal Pradesh', category: 'Adventure', description: 'Tandem paragliding from the world\'s second-highest paragliding site.', image: 'https://picsum.photos/seed/paragliding/800/600', priceRange: '₹₹₹', duration: '30 mins', rating: 4.9 },
  { title: 'Heritage Walk in Old Delhi', location: 'Delhi', category: 'Heritage', description: 'Cycle rickshaw tour through Chandni Chowk\'s spice markets and havelis.', image: 'https://picsum.photos/seed/old-delhi/800/600', priceRange: '₹₹', duration: '3 hours', rating: 4.6 },
  { title: 'Vipassana Meditation Retreat', location: 'Igatpuri, Maharashtra', category: 'Spirituality', description: 'A 10-day silent meditation course following the ancient Vipassana technique.', image: 'https://picsum.photos/seed/vipassana/800/600', priceRange: 'Free (donation)', duration: '10 days', rating: 4.9 },
  { title: 'Elephant Sanctuary Experience', location: 'Jaipur, Rajasthan', category: 'Wildlife', description: 'Feed and bathe rescued elephants at an ethical elephant care centre.', image: 'https://picsum.photos/seed/elephant/800/600', priceRange: '₹₹₹', duration: '3 hours', rating: 4.8 },
  { title: 'Bhutan Border Day Trip', location: 'Phuentsholing, West Bengal', category: 'Adventure', description: 'Cross into the Kingdom of Bhutan from the Jaigaon border crossing.', image: 'https://picsum.photos/seed/bhutan/800/600', priceRange: '₹₹', duration: 'Full day', rating: 4.5 },
  { title: 'Shore Temple Sunrise Walk', location: 'Mahabalipuram, Tamil Nadu', category: 'Heritage', description: 'Walk among 7th-century Pallava stone temples at the Bay of Bengal.', image: 'https://picsum.photos/seed/shore-temple/800/600', priceRange: '₹', duration: '2 hours', rating: 4.7 },
  { title: 'Zip-lining in Munnar', location: 'Munnar, Kerala', category: 'Adventure', description: 'Zip across lush tea plantations and misty valleys in the Ghats.', image: 'https://picsum.photos/seed/zipline-munnar/800/600', priceRange: '₹₹', duration: '2 hours', rating: 4.6 },
  { title: 'Rajasthani Folk Dinner Show', location: 'Udaipur, Rajasthan', category: 'Culture', description: 'Thali dinner with live Kalbeliya dance and puppet show at a haveli.', image: 'https://picsum.photos/seed/folk-dinner/800/600', priceRange: '₹₹', duration: '2 hours', rating: 4.7 },
  { title: 'Night Camping at Spiti Valley', location: 'Spiti, Himachal Pradesh', category: 'Adventure', description: 'Camp under a Milky Way sky in one of India\'s most remote valleys.', image: 'https://picsum.photos/seed/spiti-camp/800/600', priceRange: '₹₹', duration: 'Overnight', rating: 4.9 },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Destination.deleteMany({});
    await ExploreActivity.deleteMany({});
    console.log('🗑  Cleared old data');

    await Destination.insertMany(destinations);
    console.log(`🌍  Inserted ${destinations.length} destinations`);

    await ExploreActivity.insertMany(activities);
    console.log(`🎯  Inserted ${activities.length} activities`);

    console.log('🎉  Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
