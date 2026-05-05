import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, ExternalLink, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { cn } from '../lib/utils';
import { SocialIcon } from './Common';
import * as api from '../lib/api';

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
          src="https://res.cloudinary.com/drvwdc4j8/video/upload/v1777998153/jacrawgnobkeonhlciqo.mp4"
        />
        <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
      </div>

      {/* Statement text */}
      <div className="px-6 md:px-12 pt-6 pb-16 md:pt-14 md:pb-24 max-w-2xl">
        <h1 className="text-[22px] leading-relaxed font-light text-white tracking-tight">
          <strong className="font-bold">WE ARE A COLLECTIVE</strong> OF DESIGNERS & DREAMERS REIMAGINING THE DIGITAL LANDSCAPE.
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
  _id?: string; // MongoDB ID
  title: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  description: string;
  year: string;
  role: string;
  aspectRatio: string;
  order?: number;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS as unknown as Project[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await api.fetchProjects();
        // Map MongoDB _id to id for compatibility
        const formattedData = data.map((p: any) => ({ ...p, id: p._id }));
        setProjects(formattedData.length > 0 ? formattedData : MOCK_PROJECTS as unknown as Project[]);
      } catch (err) {
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  return { projects, loading };
}

export function Info() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const allClients = [
    { name: 'Huawei', domain: 'huawei.com' },
    { name: 'Nike', domain: 'nike.com' },
    { name: 'Maxon', domain: 'maxon.net' },
    { name: 'Louis Vuitton', domain: 'louisvuitton.com' },
    { name: 'Tory Burch', domain: 'toryburch.com' },
    { name: 'Vollebak', domain: 'vollebak.com' },
    { name: 'Adidas', domain: 'adidas.com' },
    { name: 'Samsung', domain: 'samsung.com' },
    { name: 'Oppo', domain: 'oppo.com' },
    { name: 'Tiffany', domain: 'tiffany.com' },
    { name: 'Adobe', domain: 'adobe.com' },
    { name: 'Apple', domain: 'apple.com' },
    { name: 'Sony', domain: 'sony.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Google', domain: 'google.com' },
    { name: 'Meta', domain: 'meta.com' },
  ];

  const visibleClients = isExpanded ? allClients : allClients.slice(0, 8);

  return (
    <div className="w-full min-h-screen pt-40 pb-32 px-6 md:px-12 flex items-center bg-studio-dark">
      <div className="w-full max-w-5xl space-y-16 md:space-y-24">
        <h2 className="text-[22px] font-light text-white leading-relaxed">
          <strong className="font-bold">WE ARE A COLLECTIVE OF DESIGNERS & DREAMERS REIMAGINING THE DIGITAL LANDSCAPE.</strong><br /> Formatric is a quality and creativity-driven studio delivering exceptional strategies, designs, and campaigns to businesses like yours.
        </h2>

        <div className="space-y-8 md:space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            <div className="md:col-span-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 pt-1">
              Clients
            </div>
            <div className="md:col-span-9 space-y-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10">
                {visibleClients.map((client) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={client.name}
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-white/5 border border-white/10 rounded-full overflow-hidden p-2 group-hover:bg-white group-hover:border-white transition-all duration-500">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${client.domain}&sz=128`}
                        alt={client.name}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.style.display = 'none';
                        }}
                      />
                    </div>
                    <span className="text-[13px] uppercase tracking-widest font-light text-white/60 group-hover:text-white transition-colors">
                      {client.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {allClients.length > 8 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-colors" />
                  {isExpanded ? 'VIEW LESS' : `VIEW ALL (${allClients.length})`}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 border-t border-white/10 pt-8 md:pt-12">
            <div className="md:col-span-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 pt-1">
              Contact
            </div>
            <div className="md:col-span-9 text-[16px] font-extralight text-white/80 leading-relaxed space-y-8">
              <p className="hover:text-white transition-colors cursor-pointer w-fit border-b border-transparent hover:border-white">
                hello@formmatricstudios.com
              </p>
              <p>
                Ground Floor, Building: 01<br />
                Mohali Sebiz, Square<br />
                Mohali, Punjab
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
          <strong className="font-bold text-white">We believe</strong> that great design and animation are born from a deep understanding of both the artistic and technical aspects of the craft. Here is our lab of research and development. We delve deep into the nuances of design and animation, exploring new techniques, technologies, and trends to create groundbreaking work.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

  const getAspectClass = (ratio: string) => {
    switch (ratio) {
      case '16:9': return 'aspect-[16/9]';
      case '4:3': return 'aspect-[4/3]';
      case '1:1': return 'aspect-square';
      case '9:16': return 'aspect-[9/16]';
      case '3:2': return 'aspect-[3/2]';
      default: return 'aspect-[16/9]';
    }
  };

  return (
    <div className="w-full px-6 md:px-12 pb-24">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
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
              <div className={cn("w-full relative overflow-hidden", getAspectClass(project.aspectRatio))}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100 z-10"
                  src={project.videoUrl}
                />
                <img
                  src={project.imageUrl}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 z-0"
                  alt={project.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20" />
                <div className="absolute bottom-6 right-6 text-right z-30 mix-blend-difference text-white">
                  <p className="text-sm font-medium tracking-widest uppercase">{project.title}</p>
                  <p className="text-[10px] opacity-60 tracking-widest uppercase mt-1">{project.category}</p>
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
    const loadClients = async () => {
      try {
        const data = await api.fetchClients();
        const formattedData = data.map((c: any) => ({ ...c, id: c._id }));
        setClients(formattedData.length > 0 ? formattedData : MOCK_CLIENTS.map(name => ({ id: name, name })));
      } catch (err) {
        console.error('Error loading clients:', err);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
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
      await api.submitContactForm(formData);
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

  const [project, setProject] = useState<Project | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadProject = async () => {
      try {
        const data = await api.fetchProjectById(id);
        setProject({ ...data, id: data._id });
      } catch (err) {
        console.error('Error loading project:', err);
        // Fallback to mock if not found in API
        const mock = MOCK_PROJECTS.find(p => p.id === id);
        if (mock) setProject(mock as unknown as Project);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
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

export function Capabilities() {
  const capabilities = [
    { title: "Product CGI & Visualisation", description: "High-end product visuals built for advertising and digital use. Used when the product needs to look precise, refined, and consistent across formats. Ideal for launch campaigns, product pages, and performance ads where the visual carries the message." },
    { title: "Brand Assets & Campaign Visuals", description: "Films that show the product in context. Built for campaigns where movement, usage, and storytelling matter. Outputs designed for TV, digital ads, and social platforms." },
    { title: "Motion Design", description: "Motion that makes the work easier to understand and harder to ignore. Used to guide attention, highlight features, and keep the visual engaging across short-form and campaign content." },
    { title: "Full Asset Sets", description: "Campaigns need more than a single visual to work. We create the full set. Adaptations, variations, and supporting assets built to run across ads, websites, and social while keeping the look and message consistent." },
    { title: "Content & Films", description: "Content built for how it’s actually consumed. Short-form visuals, product-led content, and campaign films designed to hold attention and communicate quickly, whether it’s a reel, an ad, or a longer format piece." },
  ];

  return (
    <div className="w-full min-h-screen pt-48 pb-32 px-6 md:px-12 flex items-center bg-studio-dark">
      <div className="w-full max-w-6xl mx-auto space-y-12 md:space-y-18">
        {/* Intro Statement */}
        <div className="max-w-3xl space-y-8">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-studio-text-s mb-8">Expertise</h2>
          <h1 className="text-[22px] md:text-[32px] leading-tight font-display font-light text-white tracking-tighter uppercase">
            <strong className="font-bold">HOW A PRODUCT IS PRESENTED</strong> <br />
            DECIDES HOW IT’S PERCEIVED.
          </h1>
          <p className="text-[18px] md:text-[22px] font-extralight text-white/80 leading-relaxed font-sans">
            We create visuals that give products a premium feel, hold attention, and are ready to be used across campaigns, ads, and digital platforms.
          </p>
          <p className="text-[14px] font-extralight text-studio-text-s leading-relaxed max-w-2xl">
            In 10+ years, our work has spanned categories like beauty, electronics, FMCG, and lifestyle, with outputs built for everything from TV commercials and launch campaigns to e-commerce and social.
          </p>
        </div>

        <div className="w-full">
          {/* Top Media Full Width */}
          <div className="w-full h-[calc(50vh+40px)] relative overflow-hidden bg-[#050505]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80 saturate-150"
              src="https://res.cloudinary.com/drvwdc4j8/video/upload/v1777998153/jacrawgnobkeonhlciqo.mp4"
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 border-t border-white/5 pt-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className="space-y-4"
            >
              <h3 className="text-[18px] md:text-[22px] font-sans font-bold text-white tracking-tighter uppercase">{cap.title}</h3>
              <p className="text-[15px] md:text-[16px] font-extralight text-studio-text-s leading-relaxed max-w-md">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const steps = [
    {
      no: "01",
      title: "Exploration",
      subtitle: "RESEARCH & DIRECTION",
      description: "We explore multiple directions before settling on one. References, quick studies, and early visuals to test how different approaches hold up. You review the options, we discuss what works, and a direction is chosen with clarity."
    },
    {
      no: "02",
      title: "Development",
      subtitle: "REFINEMENT & PRODUCTION",
      description: "The chosen direction is built out in detail. Layouts are defined, motion is tested where needed, and assets are developed across formats. Feedback is handled in rounds, with each pass tightening the work and keeping it consistent."
    },
    {
      no: "03",
      title: "Delivery",
      subtitle: "HAND-OFF & SUPPORT",
      description: "Assets are produced, refined, and delivered ready to use. Final assets are refined, checked across formats, and delivered in the required outputs. Supporting files are included so the work can be used and extended without dependency."
    }
  ];

  return (
    <div className="w-full min-h-screen pt-48 pb-32 px-6 md:px-12 flex flex-col items-center bg-studio-dark">
      <div className="w-full max-w-6xl mx-auto space-y-32 md:space-y-48">

        {/* Intro Section */}
        <div className="max-w-3xl space-y-8">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-studio-text-s mb-8">Methodology</h2>
          <h1 className="text-[22px] md:text-[32px] leading-tight font-display font-light text-white tracking-tighter uppercase">
            <strong className="font-bold">STARTING A PROJECT</strong> <br />
            WITH US.
          </h1>
          <p className="text-[18px] md:text-[22px] font-extralight text-white/80 leading-relaxed font-sans italic">
            Projects come in at different stages. Some are just ideas, some are already mapped out.
          </p>
          <div className="space-y-6 text-[15px] md:text-[16px] font-extralight text-studio-text-s leading-relaxed max-w-2xl">
            <p>
              Either way, it usually starts with a conversation. We’ll talk through what you’re trying to do, share how we’d approach it, and figure out what makes sense within your time.
            </p>
            <p>
              From there, we help shape the brief, define a clear direction, and map out how the work will move forward.
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <div className="space-y-32 md:space-y-48">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={cn(
                "flex flex-col md:flex-row gap-8 md:gap-24 items-start",
                idx % 2 !== 0 && "md:flex-row-reverse md:text-right"
              )}
            >
              <div className="text-[80px] md:text-[120px] font-display font-bold leading-none text-white/5 tracking-tighter">
                {step.no}
              </div>
              <div className="space-y-6 pt-4">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-studio-text-s">{step.subtitle}</p>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tighter">{step.title}</h3>
                <p className="text-[18px] md:text-[22px] font-extralight text-white/80 leading-relaxed max-w-xl">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

