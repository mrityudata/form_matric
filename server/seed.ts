import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Client from './models/Client.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI is not defined in the environment variables');
}

const demoProjects = [
  {
    title: 'AETHER UI',
    category: 'Product Design',
    imageUrl: 'https://picsum.photos/seed/aether/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'A comprehensive design system for high-performance trading platforms. Focused on data density and minimalist cognitive load.',
    year: '2024',
    role: 'Lead Design',
    aspectRatio: '16:9',
    order: 1
  },
  {
    title: 'CYBERPUNK 2077',
    category: 'Motion Graphics',
    imageUrl: 'https://picsum.photos/seed/cyber/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Dynamic interface animations and kinetic typography for the definitive futuristic RPG experience.',
    year: '2023',
    role: 'Motion Art',
    aspectRatio: '4:3',
    order: 2
  },
  {
    title: 'ZENITH WATCHES',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/seed/zenith/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'A luxury e-commerce experience that bridges the gap between mechanical heritage and digital future.',
    year: '2024',
    role: 'Full Stack',
    aspectRatio: '1:1',
    order: 3
  },
  {
    title: 'NOVA FRAGRANCE',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/nova/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Visual identity and immersive landing page for a revolutionary scent-tech startup.',
    year: '2024',
    role: 'Creative Dir.',
    aspectRatio: '9:16',
    order: 4
  },
  {
    title: 'STELLAR DYNAMICS',
    category: 'Web Design',
    imageUrl: 'https://picsum.photos/seed/stellar/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Next-generation web experience for an aerospace engineering firm.',
    year: '2025',
    role: 'Lead Design',
    aspectRatio: '3:2',
    order: 5
  },
  {
    title: 'QUANTUM LEAP',
    category: '3D Animation',
    imageUrl: 'https://picsum.photos/seed/quantum/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Abstract 3D explorations representing quantum computing concepts.',
    year: '2025',
    role: '3D Artist',
    aspectRatio: '16:9',
    order: 6
  },
  {
    title: 'NEXUS APP',
    category: 'UI/UX',
    imageUrl: 'https://picsum.photos/seed/nexus/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'A decentralized finance application with a focus on accessibility.',
    year: '2024',
    role: 'Product Designer',
    aspectRatio: '4:3',
    order: 7
  },
  {
    title: 'LUMINA STUDIOS',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/lumina/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Brand identity refresh for a contemporary lighting design studio.',
    year: '2023',
    role: 'Art Director',
    aspectRatio: '1:1',
    order: 8
  },
  {
    title: 'ECHO SYSTEMS',
    category: 'Web Development',
    imageUrl: 'https://picsum.photos/seed/echo/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    description: 'Interactive data visualization dashboard for environmental analytics.',
    year: '2025',
    role: 'Frontend Dev',
    aspectRatio: '3:2',
    order: 9
  },
  {
    title: 'AURORA FASHION',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/seed/aurora/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    description: 'High-end fashion editorial platform with immersive scroll experiences.',
    year: '2024',
    role: 'Creative Lead',
    aspectRatio: '9:16',
    order: 10
  }
];

const demoClients = [
  { name: 'APPLE', order: 1 },
  { name: 'NIKE', order: 2 },
  { name: 'SONY', order: 3 },
  { name: 'ADIDAS', order: 4 },
  { name: 'BMW', order: 5 },
  { name: 'PRADA', order: 6 },
  { name: 'NETFLIX', order: 7 },
  { name: 'TESLA', order: 8 }
];

const seedDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');

    await Project.insertMany(demoProjects);
    console.log('🌱 Seeded 10 demo projects');

    await Client.deleteMany({});
    console.log('🗑️ Cleared existing clients');

    await Client.insertMany(demoClients);
    console.log('🌱 Seeded demo clients');

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();
