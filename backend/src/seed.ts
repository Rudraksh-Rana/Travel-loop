import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Destination from './models/Destination';
import ExploreActivity from './models/ExploreActivity';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/traveloop';

const destinations = [
  {
    name: 'Jaipur',
    state: 'Rajasthan',
    description: 'The Pink City, known for its magnificent palaces, forts, and vibrant markets.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800',
    tags: ['Heritage', 'Culture', 'Shopping'],
    bestTimeToVisit: 'October to March',
    rating: 4.8
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    description: 'The City of Lakes, often called the Venice of the East, famous for its romantic setting.',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&q=80&w=800',
    tags: ['Romance', 'Lakes', 'Architecture'],
    bestTimeToVisit: 'September to March',
    rating: 4.9
  },
  {
    name: 'Munnar',
    state: 'Kerala',
    description: 'A breath-taking hill station in the Western Ghats, famous for its tea plantations.',
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=800',
    tags: ['Nature', 'Hill Station', 'Tea'],
    bestTimeToVisit: 'September to May',
    rating: 4.7
  },
  {
    name: 'Hampi',
    state: 'Karnataka',
    description: 'A UNESCO World Heritage Site with stunning ruins of the Vijayanagara Empire.',
    image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=800',
    tags: ['History', 'Ruins', 'Spirituality'],
    bestTimeToVisit: 'October to February',
    rating: 4.8
  },
  {
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    description: 'One of the oldest continuously inhabited cities in the world, the spiritual heart of India.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    tags: ['Spirituality', 'Culture', 'Ganges'],
    bestTimeToVisit: 'November to February',
    rating: 4.6
  }
];

const activities = [
  {
    title: 'Hot Air Balloon Ride over Jaipur',
    location: 'Jaipur, Rajasthan',
    category: 'Adventure',
    description: 'Experience the majestic forts and palaces of Jaipur from the sky at sunrise.',
    image: 'https://images.unsplash.com/photo-1566838313791-722a4c7c88cd?auto=format&fit=crop&q=80&w=800',
    priceRange: '₹₹₹',
    duration: '1 hour',
    rating: 4.9
  },
  {
    title: 'Ganga Aarti Ceremony',
    location: 'Varanasi, UP',
    category: 'Culture',
    description: 'Witness the spiritual fire ritual performed every evening on the banks of the Ganges.',
    image: 'https://images.unsplash.com/photo-1598977123418-45205553f198?auto=format&fit=crop&q=80&w=800',
    priceRange: 'Free',
    duration: '45 mins',
    rating: 5.0
  },
  {
    title: 'Houseboat Cruise in Backwaters',
    location: 'Alleppey, Kerala',
    category: 'Relaxation',
    description: 'Spend a night on a traditional Kettuvallam cruising through the serene backwaters.',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800',
    priceRange: '₹₹₹',
    duration: 'Overnight',
    rating: 4.8
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await Destination.deleteMany({});
    await ExploreActivity.deleteMany({});

    await Destination.insertMany(destinations);
    await ExploreActivity.insertMany(activities);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
