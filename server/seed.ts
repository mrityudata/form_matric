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
    title: 'THE CORE IDENTITY',
    category: 'Brand Experience',
    imageUrl: 'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P1/E6/E6_Frame242_01.jpg',
    videoUrl: 'https://drive.google.com/file/d/16diWoSti8hwvEysU-TyFJbp9-lVCP4TR/view?usp=sharing',
    description: 'A study in minimalist branding and digital narrative. We crafted a unique visual language that prioritizes clarity and emotional resonance.',
    year: '2026',
    role: 'Art Direction',
    aspectRatio: '16:9',
    galleryImages: [
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P1/E6/E6_Frame300_01.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P1/E6/E6_Frame380_01.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P1/E6/E6_Frame52_01.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P1/E6/E6_Frame681_01.jpg'
    ],
    order: 1
  },
  {
    title: 'NEON FRONTIER',
    category: 'Motion Design',
    imageUrl: 'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P2/E12/E12_01.jpg',
    videoUrl: 'https://pixabay.com/videos/download/video-353074_source.mp4',
    description: 'Kinetic typography and dynamic interface design for a futuristic gaming environment.',
    year: '2025',
    role: 'Motion Lead',
    aspectRatio: '4:3',
    galleryImages: [
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P2/E12/E12_03.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P2/E12/E12_04.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P2/E12/E12_05.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P2/E12/E12_06.jpg'
    ],
    order: 2
  },
  {
    title: 'CHRONOS ELITE',
    category: 'E-commerce',
    imageUrl: 'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P3/Headphone/MIX_Frame_01.jpg',
    videoUrl: 'https://pixabay.com/videos/download/video-353075_source.mp4',
    description: 'Luxury watch interface designed for seamless high-end commerce.',
    year: '2025',
    role: 'Creative Tech',
    aspectRatio: '1:1',
    galleryImages: [
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P3/Headphone/MIX_Frame_102.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P3/Headphone/MIX_Frame_317.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P3/Headphone/MIX_Lineup_001.jpg'
    ],
    order: 3
  },
  {
    title: 'AURA SENSORY',
    category: 'Digital Branding',
    imageUrl: 'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P4/TWS/IEM_4K_001.jpg',
    videoUrl: 'https://pixabay.com/videos/download/video-353077_source.mp4',
    description: 'An immersive digital identity for a luxury fragrance brand.',
    year: '2026',
    role: 'Lead Designer',
    aspectRatio: '9:16',
    galleryImages: [
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P4/TWS/IEM_4K_001.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P4/TWS/IEM_4K_002.jpg',
      'https://pub-f15bf555afca4089b788128c27f746ec.r2.dev/FM-P4/TWS/IEM_4K_003.jpg'
    ],
    order: 4
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
    console.log('🌱 Seeded 4 demo projects');

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
