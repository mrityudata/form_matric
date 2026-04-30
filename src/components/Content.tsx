import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, ExternalLink, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';
import { SocialIcon } from './Common';

export function Section({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <section className={cn("py-24 md:py-48", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-studio-text-s mb-6"
          >
            {title}
          </motion.h2>
        )}
        {children}
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <div className="w-full">
      {/* Top Media Full Width */}
      <div className="w-full h-[calc(50vh+40px)] relative overflow-hidden bg-[#050505]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 saturate-150"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      </div>

      {/* Statement text */}
      <div className="px-6 md:px-12 pt-6 pb-16 md:pt-14 md:pb-24 max-w-2xl">
        <h1 className="text-[22px] leading-relaxed font-light text-white tracking-tight">
          <strong className="font-bold">We are a dynamic</strong> and forward-thinking creative team dedicated to transforming ideas into captivating visual experiences.
        </h1>
      </div>
    </div>
  );
}

const BASE_MOCK_PROJECTS = [
  {
    id: 'aether-ui',
    title: 'AETHER UI',
    category: 'Product Design',
    imageUrl: 'https://picsum.photos/seed/aether/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'A comprehensive design system for high-performance trading platforms. Focused on data density and minimalist cognitive load.',
    year: '2024',
    role: 'Lead Design'
  },
  {
    id: 'cyberpunk-2077',
    title: 'CYBERPUNK 2077',
    category: 'Motion Graphics',
    imageUrl: 'https://picsum.photos/seed/cyber/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: 'Dynamic interface animations and kinetic typography for the definitive futuristic RPG experience.',
    year: '2023',
    role: 'Motion Art'
  },
  {
    id: 'zenith-watches',
    title: 'ZENITH WATCHES',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/seed/zenith/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: 'A luxury e-commerce experience that bridges the gap between mechanical heritage and digital future.',
    year: '2024',
    role: 'Full Stack'
  },
  {
    id: 'nova-fragrance',
    title: 'NOVA FRAGRANCE',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/nova/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    description: 'Visual identity and immersive landing page for a revolutionary scent-tech startup.',
    year: '2024',
    role: 'Creative Dir.'
  },
  {
    id: 'stellar-dynamics',
    title: 'STELLAR DYNAMICS',
    category: 'Web Design',
    imageUrl: 'https://picsum.photos/seed/stellar/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    description: 'Next-generation web experience for an aerospace engineering firm.',
    year: '2025',
    role: 'Lead Design'
  },
  {
    id: 'quantum-leap',
    title: 'QUANTUM LEAP',
    category: '3D Animation',
    imageUrl: 'https://picsum.photos/seed/quantum/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    description: 'Abstract 3D explorations representing quantum computing concepts.',
    year: '2025',
    role: '3D Artist'
  },
  {
    id: 'nexus-app',
    title: 'NEXUS APP',
    category: 'UI/UX',
    imageUrl: 'https://picsum.photos/seed/nexus/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    description: 'A decentralized finance application with a focus on accessibility.',
    year: '2024',
    role: 'Product Designer'
  },
  {
    id: 'lumina-studios',
    title: 'LUMINA STUDIOS',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/seed/lumina/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    description: 'Brand identity refresh for a contemporary lighting design studio.',
    year: '2023',
    role: 'Art Director'
  },
  {
    id: 'echo-systems',
    title: 'ECHO SYSTEMS',
    category: 'Web Development',
    imageUrl: 'https://picsum.photos/seed/echo/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    description: 'Interactive data visualization dashboard for environmental analytics.',
    year: '2025',
    role: 'Frontend Dev'
  },
  {
    id: 'aurora-fashion',
    title: 'AURORA FASHION',
    category: 'E-commerce',
    imageUrl: 'https://picsum.photos/seed/aurora/1200/800',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    description: 'High-end fashion editorial platform with immersive scroll experiences.',
    year: '2024',
    role: 'Creative Lead'
  },
];

export const MOCK_PROJECTS = Array.from({ length: 50 }).map((_, i) => {
  if (i < BASE_MOCK_PROJECTS.length) return BASE_MOCK_PROJECTS[i];

  const widths = [800, 1200, 1600, 600, 1000];
  const heights = [600, 800, 900, 1200, 1500];
  const w = widths[i % widths.length];
  const h = heights[i % heights.length];

  return {
    id: `dummy-project-${i}`,
    title: `DUMMY PROJECT ${i}`,
    category: ['Web Design', '3D Animation', 'UI/UX', 'Branding', 'E-commerce', 'Motion Graphics'][i % 6],
    imageUrl: `https://picsum.photos/seed/dummy${i}/${w}/${h}`,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: `This is a generated dummy project for testing scrolling and lazy loading. Project number ${i}.`,
    year: '2026',
    role: 'Test Role'
  };
});

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
  year: string;
  role: string;
  order?: number;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS as Project[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Disabled Firebase temporarily as requested
    /*
    console.log("🔥 Attempting to connect to Firestore and fetch 'projects' collection...");
    const q = collection(db, 'projects');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`✅ Successfully connected to Firestore!`);
      console.log(`📊 Found ${snapshot.size} documents in the 'projects' collection.`);

      const docs = snapshot.docs.map(docRef => {
        const data = docRef.data();
        console.log(`📄 Document [${docRef.id}]:`, data);
        return { id: docRef.id, ...data } as Project;
      });

      // Sort client-side to avoid requiring an 'order' field existence.
      docs.sort((a, b) => ((a.order || 0) - (b.order || 0)));

      setProjects(docs.length > 0 ? docs : MOCK_PROJECTS as Project[]);
      setLoading(false);
    }, (error) => {
      console.error("❌ Error fetching projects from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
    */
  }, []);

  return { projects, loading };
}

export function Info() {
  return (
    <div className="w-full min-h-screen pt-40 pb-32 px-6 md:px-12 flex items-center bg-studio-dark">
      <div className="w-full max-w-5xl space-y-16 md:space-y-24">
        <h2 className="text-[22px] font-light text-white leading-relaxed">
          <strong className="font-bold">We are a dynamic and forward-thinking creative team</strong> dedicated to transforming ideas into captivating visual experiences. With a passion for design and a commitment to excellence, we craft unique and impactful solutions that resonate with our clients and their audiences.
        </h2>

        <div className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            <div className="md:col-span-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 pt-1">
              Clients
            </div>
            <div className="md:col-span-9 text-[16px] font-extralight text-white/80 leading-relaxed">
              Huawei, Nike, Maxon, Louis Vuitton, Torry Burch, Vollebak, Adidas, Samsung, Oppo, Tiffany, Adobe
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            <div className="md:col-span-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 pt-1">
              Contact
            </div>
            <div className="md:col-span-9 text-[16px] font-extralight text-white/80 leading-relaxed space-y-8">
              <p className="hover:text-white transition-colors cursor-pointer w-fit border-b border-transparent hover:border-white">
                hello@elevatestudio.com
              </p>
              <p>
                Ground Floor, Building: 08<br />
                Dubai Media City<br />
                Dubai, UAE
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            <div className="md:col-span-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 pt-1">
              Social
            </div>
            <div className="md:col-span-9 flex items-center gap-6">
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Linkedin size={20} />} href="#" />
              <SocialIcon icon={<Github size={20} />} href="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Lab() {
  const { projects } = useProjects();
  // Use a subset of projects for the Lab grid to simulate experiments
  const labProjects = projects.slice(0, 4);

  return (
    <div className="w-full min-h-screen pt-48 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mb-32 md:ml-24">
        <h2 className="text-[22px] font-light text-white/80 leading-relaxed">
          <span className="opacity-50 mr-2">→</span>
          <strong className="font-bold text-white">We believe</strong> that great design and animation are born from a deep understanding of both the artistic and technical aspects of the craft. Here is our lab of research and development. We delve deep into the nuances of design and animation, exploring new techniques, technologies, and trends to create groundbreaking work.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {labProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={cn("relative overflow-hidden bg-studio-surface", idx % 2 === 0 ? "aspect-[4/5]" : "aspect-[4/3]")}
          >
            <img src={project.imageUrl + '?lab'} className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110" alt="Lab Experiment" />
          </motion.div>
        ))}
      </div>

      <div className="mt-24 flex justify-end">
        <Link to="/" className="text-sm font-medium tracking-widest uppercase text-white hover:opacity-50 transition-opacity flex items-center gap-2">
          BACK
        </Link>
      </div>
    </div>
  );
}

export function ProjectGrid() {
  const { projects } = useProjects();

  return (
    <div className="w-full px-6 md:px-12 pb-24">
      <div className="columns-1 md:columns-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="break-inside-avoid mb-8"
          >
            <Link
              to={`/project/${project.id}`}
              className="relative block group overflow-hidden bg-studio-surface w-full"
            >
              <div className={cn("w-full relative",
                idx % 5 === 0 ? "aspect-square" :
                  idx % 4 === 0 ? "aspect-[3/4]" :
                    idx % 3 === 0 ? "aspect-[16/9]" :
                      idx % 2 === 0 ? "aspect-[4/3]" :
                        "aspect-[4/5]"
              )}>
                <img
                  src={project.imageUrl}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  alt={project.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute bottom-6 right-6 text-right z-10 mix-blend-difference text-white">
                  <p className="text-sm font-medium tracking-widest uppercase">{project.title}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const MOCK_TEAM = [
  { name: 'Ameya Bhagwat', role: 'FOUNDER / DIRECTOR', photoUrl: 'https://picsum.photos/seed/eric/400/400' },
  { name: 'Ankit Chauahan', role: 'CREATIVE LEAD', photoUrl: 'https://picsum.photos/seed/sara/400/400' },
  { name: 'Amit Chauhan', role: 'TECH LEAD', photoUrl: 'https://picsum.photos/seed/liam/400/400' },
];

export function Team({ mini }: { mini?: boolean }) {
  if (mini) {
    return (
      <div className="space-y-4">
        {MOCK_TEAM.map((member) => (
          <div key={member.name} className="flex items-center gap-4">
            <div className="w-10 h-10 bg-studio-surface border border-studio-border rounded-full overflow-hidden">
              <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover grayscale" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white">{member.name}</p>
              <p className="text-[9px] uppercase tracking-widest text-studio-text-s">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section title="The Collective">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_TEAM.map((member, idx) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            className="space-y-6 group"
          >
            <div className="aspect-[3/4] overflow-hidden grayscale border border-studio-border group-hover:grayscale-0 transition-all duration-700">
              <img
                referrerPolicy="no-referrer"
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pl-4">
              <h4 className="text-[22px] font-display font-bold">{member.name}</h4>
              <p className="text-[10px] uppercase tracking-widest text-studio-text-s font-bold">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

const MOCK_CLIENTS = [
  'APPLE', 'NIKE', 'SONY', 'ADIDAS', 'BMW', 'PRADA', 'NETFLIX', 'TESLA'
];

export interface Client {
  id: string;
  name: string;
  order?: number;
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS.map(name => ({ id: name, name })));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔥 Attempting to connect to Firestore and fetch 'clients' collection...");
    const q = collection(db, 'clients');

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log(`✅ Successfully connected to Firestore!`);
      console.log(`📊 Found ${snapshot.size} documents in the 'clients' collection.`);

      const docs = snapshot.docs.map(docRef => {
        const data = docRef.data();
        console.log(`📄 Client Document [${docRef.id}]:`, data);
        return { id: docRef.id, ...data } as Client;
      });

      docs.sort((a, b) => ((a.order || 0) - (b.order || 0)));

      setClients(docs.length > 0 ? docs : MOCK_CLIENTS.map(name => ({ id: name, name })));
      setLoading(false);
    }, (error) => {
      console.error("❌ Error fetching clients from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { clients, loading };
}

export function Clients() {
  const { clients } = useClients();

  return (
    <Section title="Our Clients">
      <div className="flex flex-wrap items-center gap-12 md:gap-20 opacity-30 grayscale saturate-0 hover:grayscale-0 transition-all">
        {clients.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
            whileHover={{ opacity: 1 }}
            className="text-[22px] font-bold tracking-tighter transition-opacity whitespace-nowrap cursor-default"
          >
            {client.name}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export function ContactForm({ mini }: { mini?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'contact_messages'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (mini) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-studio-surface border border-studio-border p-3 text-[11px] text-white outline-none focus:border-white transition-colors"
        />
        <input
          required
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-studio-surface border border-studio-border p-3 text-[11px] text-white outline-none focus:border-white transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-white text-black py-3 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-studio-text-s transition-colors"
        >
          {status === 'loading' ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    );
  }

  return (
    <Section title="Direct Inquiry">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        <div className="lg:col-span-8 space-y-12">
          <h3 className="text-[22px] font-display font-light leading-relaxed tracking-tighter uppercase">
            <strong className="font-bold">PARTNER WITH US</strong> <br />
            <span className="text-studio-text-s italic font-light">FOR THE FUTURE.</span>
          </h3>
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s">Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-studio-surface border border-studio-border p-5 text-[16px] font-extralight outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-studio-surface border border-studio-border p-5 text-[16px] font-extralight outline-none focus:border-white transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-studio-surface border border-studio-border p-5 text-[16px] font-extralight outline-none focus:border-white transition-colors min-h-[160px] resize-none"
                placeholder="Case study details..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-12 py-5 bg-white text-black text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-studio-text-s transition-all"
            >
              {status === 'loading' ? 'Encrypting...' : 'Initiate Brief'}
            </button>
          </form>
        </div>
        <div className="lg:col-span-4 space-y-12 pt-4">
          <div className="space-y-10 pl-6 border-l border-white/5">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Headquarters</p>
              <p className="text-[16px] font-extralight leading-relaxed">
                1280 Infinite Loop<br />
                Design District<br />
                New York, NY 10012
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Direct Line</p>
              <p className="text-[16px] font-extralight leading-relaxed hover:text-white transition-colors cursor-pointer">
                +1 (555) 019-2837
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Electronic Mail</p>
              <p className="text-[16px] font-extralight leading-relaxed hover:text-white transition-colors cursor-pointer">
                hello@elevatestudio.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function AboutUs() {
  return (
    <Section title="The Story">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[3/4] rounded-[32px] overflow-hidden grayscale brightness-75 border border-white/5 shadow-2xl"
        >
          <img
            referrerPolicy="no-referrer"
            src="https://picsum.photos/seed/studio/800/1200"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-studio-dark/20 mix-blend-overlay" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          <h3 className="text-[22px] font-sans font-light leading-relaxed tracking-tight text-white">
            <strong className="font-bold">We are a collective</strong> of designers & dreamers reimagining the digital landscape.
          </h3>
          <div className="space-y-6 text-[16px] text-studio-text-s leading-relaxed font-sans">
            <p>
              Founded in 2026, ElevateStudio was born from a desire to bring artistic integrity to the functional world of digital products. We don't just build websites; we craft digital sculptures that command attention.
            </p>
            <p>
              Our process is iterative, data-driven, and relentlessly aesthetic. We believe that true minimalism isn't the absence of elements, but the presence of perfection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 pt-12">
            <div>
              <p className="text-[22px] font-sans font-bold text-white mb-2">150+</p>
              <p className="text-[16px] font-extralight text-studio-text-s">Projects Delivered</p>
            </div>
            <div>
              <p className="text-[22px] font-sans font-bold text-white mb-2">12</p>
              <p className="text-[16px] font-extralight text-studio-text-s">Design Awards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(MOCK_PROJECTS.find(p => p.id === id) as Project || null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const docRef = doc(db, 'projects', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() } as Project);
      }
    });
    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return <div>Project not found</div>;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-studio-dark"
    >
      {/* Hero Media Full Bleed */}
      <div className="relative w-full h-[85vh] overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
            src={project.videoUrl}
          />
        ) : (
          <img
            src={project.imageUrl}
            className="w-full h-full object-cover"
            alt={project.title}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!videoError && (
            <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-auto cursor-pointer" onClick={togglePlay}>
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </div>
          )}
        </div>
      </div>

      {/* Narrative Header */}
      <div className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center text-center space-y-2">
        <h1 className="text-[22px] font-sans font-medium tracking-tight text-white">{project.title}</h1>
        <p className="text-sm tracking-widest text-studio-text-s uppercase">{project.category} — {project.year}</p>

        <div className="w-full max-w-3xl pt-8">
          <p className="text-[16px] text-white/80 leading-relaxed font-extralight">
            {project.description}
          </p>
        </div>
      </div>

      {/* Additional Media Layout */}
      <div className="w-full px-6 md:px-12 space-y-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full aspect-[21/9] bg-studio-surface relative overflow-hidden"
        >
          <img src={project.imageUrl + '?1'} className="w-full h-full object-cover" alt="Process 1" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="w-full aspect-[4/5] bg-studio-surface relative overflow-hidden"
          >
            <img src={project.imageUrl + '?2'} className="w-full h-full object-cover" alt="Process 2" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full aspect-[4/5] bg-studio-surface relative overflow-hidden"
          >
            <img src={project.imageUrl + '?3'} className="w-full h-full object-cover" alt="Process 3" />
          </motion.div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="w-full px-6 md:px-12 py-12 flex justify-between items-center border-t border-white/10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-medium tracking-widest uppercase text-white hover:opacity-50 transition-opacity flex items-center gap-2"
        >
          <span className="opacity-50">↑</span> TOP
        </button>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/');
          }}
          className="text-sm font-medium tracking-widest uppercase text-white hover:opacity-50 transition-opacity flex items-center gap-2"
        >
          BACK TO WORKS
        </button>
      </div>
    </motion.div>
  );
}
