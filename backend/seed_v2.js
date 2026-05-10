const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traveloop_final';

const DestinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  rating: Number,
  image: String,
  famousSpots: [String],
  tags: [String]
});

const ActivitySchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  category: String,
  priceRange: String,
  rating: Number,
  image: String
});

const Destination = mongoose.model('Destination', DestinationSchema);
const Activity = mongoose.model('ExploreActivity', ActivitySchema);

const destinations = [
  {
    name: 'Jaipur',
    description: 'The Pink City of Rajasthan, known for its royal palaces, vibrant bazaars, and rich history.',
    category: 'Heritage',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800',
    famousSpots: ['Amer Fort', 'Hawa Mahal', 'City Palace', 'Jantar Mantar'],
    tags: ['Royal', 'History', 'Culture']
  },
  {
    name: 'Varanasi',
    description: 'The spiritual capital of India, one of the oldest continuously inhabited cities in the world.',
    category: 'Spiritual',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=800',
    famousSpots: ['Kashi Vishwanath Temple', 'Dashashwamedh Ghat', 'Sarnath'],
    tags: ['Soul', 'Ancient', 'Rivers']
  },
  {
    name: 'Munnar',
    description: 'A breathtaking hill station in Kerala, famous for its sprawling tea plantations and mist-covered hills.',
    category: 'Nature',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593693411515-c202e93dfec3?q=80&w=800',
    famousSpots: ['Eravikulam National Park', 'Mattupetty Dam', 'Tea Museum'],
    tags: ['Relax', 'Mountains', 'Greenery']
  },
  {
    name: 'Hampi',
    description: 'A UNESCO World Heritage site featuring the majestic ruins of the Vijayanagara Empire.',
    category: 'Heritage',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1590483734724-383b85ad0590?q=80&w=800',
    famousSpots: ['Virupaksha Temple', 'Vittala Temple', 'Lotus Mahal'],
    tags: ['Architecture', 'Boulders', 'Sacred']
  },
  {
    name: 'Udaipur',
    description: 'The City of Lakes, known for its romantic palaces and tranquil waters.',
    category: 'Romantic',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800',
    famousSpots: ['Lake Palace', 'City Palace', 'Jag Mandir'],
    tags: ['Luxury', 'Water', 'Palaces']
  }
];

const activities = [
  {
    name: 'Hot Air Ballooning',
    location: 'Jaipur',
    description: 'Fly over the royal forts and rural villages of the Pink City at sunrise.',
    category: 'Adventure',
    priceRange: '₹12,000 - ₹15,000',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1533633215324-4f057e930f3a?q=80&w=800'
  },
  {
    name: 'Ganga Aarti Ceremony',
    location: 'Varanasi',
    description: 'Experience the mesmerizing evening prayer ritual at Dashashwamedh Ghat.',
    category: 'Spiritual',
    priceRange: 'Free',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=800'
  }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  await Destination.deleteMany({});
  await Activity.deleteMany({});

  await Destination.insertMany(destinations);
  await Activity.insertMany(activities);

  console.log('Real-world data seeded successfully!');
  process.exit();
}

seed();
