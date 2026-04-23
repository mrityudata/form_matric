import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, ExternalLink } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';
import { cn } from '../lib/utils';

export function Section({ children, className, title }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <section className={cn("py-24 md:py-48", className)}>
      <div className="max-w-7xl mx-auto px-6">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.5em] font-bold opacity-30 mb-8"
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
    <Section className="min-h-[400px] flex items-center justify-start border-b border-studio-border pt-20">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-studio-text-s font-bold">Featured Case Study</p>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] md:text-[8vw] font-display font-light leading-[0.85] tracking-tighter"
          >
            KINETIC FORMS 02
          </motion.h1>
        </div>
        <div className="flex gap-4 text-[11px] uppercase tracking-wide text-studio-text-s font-medium">
          <span>Visual Identity</span>
          <span>/</span>
          <span>Motion Graphics</span>
          <span>/</span>
          <span>2024</span>
        </div>
      </div>
    </Section>
  );
}

export const MOCK_PROJECTS = [
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
];

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

      setProjects(docs.length > 0 ? docs : []);
      setLoading(false);
    }, (error) => {
      console.error("❌ Error fetching projects from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { projects, loading };
}

export function ProjectGrid() {
  const { projects } = useProjects();

  return (
    <Section title="Portfolio">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group block border border-studio-border p-6 bg-studio-surface hover:bg-studio-border transition-colors duration-500"
          >
            <Link to={`/project/${project.id}`} className="block">
              <div className="relative aspect-video overflow-hidden">
                <motion.img
                  referrerPolicy="no-referrer"
                  src={project.imageUrl}
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold border border-white px-6 py-2 rounded-full">View Story</span>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-studio-text-s mb-2">{project.category}</p>
                  <h3 className="text-3xl font-display font-medium tracking-tight mb-4">{project.title}</h3>
                </div>
                <div className="mb-4">
                  <ExternalLink size={16} className="text-studio-text-s group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="h-[1px] w-full bg-studio-border group-hover:bg-white/20 transition-colors" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
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
            <div className="border-l border-studio-border pl-4">
              <h4 className="text-xl font-display font-bold">{member.name}</h4>
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
    <Section className="border-t border-studio-border" title="Our Clients">
      <div className="flex flex-wrap items-center gap-12 md:gap-20 opacity-30 grayscale saturate-0 group-hover:grayscale-0 transition-all">
        {clients.map((client) => (
          <div key={client.id} className="text-xl font-bold tracking-tighter opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">
            {client.name}
          </div>
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
          <h3 className="text-4xl md:text-6xl font-display font-bold leading-tight tracking-tighter">
            PARTNER WITH US <br />
            <span className="text-studio-text-s italic">FOR THE FUTURE.</span>
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
                  className="w-full bg-studio-surface border border-studio-border p-5 text-lg outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-studio-surface border border-studio-border p-5 text-lg outline-none focus:border-white transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s">Message</label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-studio-surface border border-studio-border p-5 text-lg outline-none focus:border-white transition-colors min-h-[160px] resize-none"
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
          <div className="space-y-10 border-l border-studio-border pl-10">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Headquarters</p>
              <p className="text-xl font-light leading-relaxed">
                1280 Infinite Loop<br />
                Design District<br />
                New York, NY 10012
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Direct Line</p>
              <p className="text-xl font-light leading-relaxed hover:text-studio-text-s transition-colors cursor-pointer">
                +1 (555) 019-2837
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest font-bold text-studio-text-s mb-4">Electronic Mail</p>
              <p className="text-xl font-light leading-relaxed hover:text-studio-text-s transition-colors cursor-pointer">
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
        <div className="relative aspect-[3/4] overflow-hidden grayscale brightness-75">
          <img
            referrerPolicy="no-referrer"
            src="https://picsum.photos/seed/studio/800/1200"
            alt="Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-studio-dark/20 mix-blend-overlay" />
        </div>
        <div className="space-y-12">
          <h3 className="text-4xl md:text-5xl font-display font-medium leading-tight tracking-tight">
            WE ARE A COLLECTIVE OF DESIGNERS & DREAMERS REIMAGINING THE DIGITAL LANDSCAPE.
          </h3>
          <div className="space-y-6 text-lg opacity-60 leading-relaxed font-light">
            <p>
              Founded in 2026, ELEVATESTUDIO.COM was born from a desire to bring artistic integrity to the functional world of digital products. We don't just build websites; we craft digital sculptures that command attention.
            </p>
            <p>
              Our process is iterative, data-driven, and relentlessly aesthetic. We believe that true minimalism isn't the absence of elements, but the presence of perfection.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 pt-12 border-t border-current/10">
            <div>
              <p className="text-4xl font-display font-bold">150+</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Projects Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-display font-bold">12</p>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Design Awards</p>
            </div>
          </div>
        </div>
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
      className="pb-24"
    >
      {/* Header */}
      <div className="relative w-full h-[60vh] overflow-hidden bg-studio-surface">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover opacity-60"
            src={project.videoUrl}
          />
        ) : (
          <img
            src={project.imageUrl}
            className="w-full h-full object-cover opacity-40 grayscale"
            alt={project.title}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          {!videoError && (
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full border border-white flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </motion.button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold mb-12 hover:gap-4 transition-all"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-studio-text-s">{project.category}</p>
              <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter uppercase leading-none">{project.title}</h1>
            </div>

            <ProjectSection title="The Concept">
              <p className="text-xl md:text-2xl font-light opacity-80 leading-relaxed font-display">
                {project.description}
              </p>
            </ProjectSection>

            <div className="aspect-video border border-studio-border bg-studio-surface overflow-hidden">
              <img
                src={project.imageUrl + '?noise'}
                className="w-full h-full object-cover grayscale brightness-75"
                alt="Process"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12 pt-12">
            <div className="space-y-8 border-l border-studio-border pl-10 pt-4">
              <DetailItem label="Year" value={project.year} />
              <DetailItem label="Role" value={project.role} />
              <DetailItem label="Technology" value="Webgl, React, Motion" />
              <DetailItem label="Client" value="Internal / Confidential" />
            </div>

            <div className="p-8 border border-studio-border bg-studio-surface space-y-6">
              <h4 className="text-xs uppercase tracking-widest font-bold">Inquiry</h4>
              <p className="text-sm text-studio-text-s leading-relaxed">Interested in a project like this? Contact us for a detailed case study.</p>
              <button
                onClick={() => navigate('/contact')}
                className="w-full py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-studio-text-s transition-colors"
              >
                Start a project
              </button>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-studio-text-s">{title}</h3>
      {children}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-studio-text-s opacity-60">{label}</p>
      <p className="text-sm font-medium tracking-tight uppercase">{value}</p>
    </div>
  );
}
