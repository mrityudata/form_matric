import React from 'react';
import { motion } from 'motion/react';
import { Section, Team } from './Content';
import { ExternalLink, Zap, Monitor, Layout, PenTool, Figma, Video, Code, Palette } from 'lucide-react';

export function OurCorePage() {
  const MOCK_CORE_TEAM = [
    { name: 'Ameya Bhagwat', role: 'FOUNDER / DIRECTOR', experience: '12+ Years', photoUrl: 'https://picsum.photos/seed/eric/400/400' },
    { name: 'Ankit Chauahan', role: 'CREATIVE LEAD', experience: '10+ Years', photoUrl: 'https://picsum.photos/seed/sara/400/400' },
    { name: 'Amit Chauhan', role: 'TECH LEAD', experience: '8+ Years', photoUrl: 'https://picsum.photos/seed/liam/400/400' },
    { name: 'Priya Sharma', role: 'UI/UX DESIGNER', experience: '5+ Years', photoUrl: 'https://picsum.photos/seed/priya/400/400' },
    { name: 'Raj Patel', role: 'MOTION ARTIST', experience: '6+ Years', photoUrl: 'https://picsum.photos/seed/raj/400/400' },
    { name: 'Sophia Lee', role: 'STRATEGIST', experience: '9+ Years', photoUrl: 'https://picsum.photos/seed/sophia/400/400' },
    { name: 'David Kim', role: 'FULL STACK DEV', experience: '7+ Years', photoUrl: 'https://picsum.photos/seed/david/400/400' },
    { name: 'Elena Rostova', role: '3D GENERALIST', experience: '4+ Years', photoUrl: 'https://picsum.photos/seed/elena/400/400' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 pt-20"
    >
      <Section title="Our Core">
        <div className="space-y-12 mb-20">
          <h1 className="text-[22px] leading-relaxed font-light text-white tracking-tight uppercase">
            <strong className="font-bold">THE MINDS</strong> <br/>
            <span className="text-studio-text-s italic font-light">BEHIND THE CRAFT.</span>
          </h1>
          <p className="max-w-2xl text-[16px] font-extralight text-white/80 leading-relaxed font-display">
            A diverse collective of digital artists, engineers, and strategists united by a singular obsession: creating flawless digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {MOCK_CORE_TEAM.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group relative aspect-[3/4] overflow-hidden bg-studio-surface border border-studio-border"
            >
              <img
                referrerPolicy="no-referrer"
                src={member.photoUrl}
                alt={member.name}
                className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-studio-dark/90 via-studio-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <h4 className="text-xl font-display font-bold text-white">{member.name}</h4>
                <p className="text-[10px] uppercase tracking-widest text-studio-text-s font-bold mt-1 mb-2">{member.role}</p>
                <div className="h-[1px] w-full bg-white/20 mb-2"></div>
                <p className="text-[9px] uppercase tracking-widest text-white/70 font-medium">Exp: {member.experience}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}

export function ServicesPage() {
  const services = [
    { title: "Visual Identity", icon: <Palette size={32} />, description: "Crafting distinct, memorable brand languages that resonate across all digital touchpoints." },
    { title: "UI/UX Design", icon: <Layout size={32} />, description: "High-density, user-centric interfaces engineered for performance and aesthetic superiority." },
    { title: "Motion Graphics", icon: <Video size={32} />, description: "Kinetic typography and dynamic interactions that breathe life into static concepts." },
    { title: "Web Engineering", icon: <Code size={32} />, description: "Robust, scalable architectures built with modern frameworks and flawless execution." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 pt-20"
    >
      <Section title="Expertise">
        <div className="space-y-12 mb-20">
          <h1 className="text-[22px] leading-relaxed font-light text-white tracking-tight uppercase">
            <strong className="font-bold">WHAT WE</strong> <br/>
            <span className="text-studio-text-s italic font-light">BRING TO THE TABLE.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 border border-studio-border bg-studio-surface hover:bg-studio-border transition-colors group"
            >
              <div className="mb-8 text-studio-text-s group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-[22px] font-display font-bold mb-4">{service.title}</h3>
              <p className="text-[16px] font-extralight leading-relaxed text-studio-text-s group-hover:text-white/80 transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}

export function StackPage() {
  const stack = [
    { category: "Design", tools: ["Figma", "Adobe CC", "Cinema 4D", "Blender"] },
    { category: "Frontend", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Motion", tools: ["Framer Motion", "GSAP", "Three.js", "WebGL"] },
    { category: "Backend & Cloud", tools: ["Node.js", "Firebase", "Supabase", "AWS"] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 pt-20"
    >
      <Section title="Arsenal">
        <div className="space-y-12 mb-20">
          <h1 className="text-[22px] leading-relaxed font-light text-white tracking-tight uppercase">
            <strong className="font-bold">THE TOOLS</strong> <br/>
            <span className="text-studio-text-s italic font-light">WE FORGE WITH.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16">
          {stack.map((item, idx) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
              className="space-y-6"
            >
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-studio-text-s border-b border-studio-border pb-4">{item.category}</h3>
              <ul className="space-y-4">
                {item.tools.map(tool => (
                  <li key={tool} className="text-[16px] font-display font-extralight tracking-tight hover:translate-x-2 transition-transform cursor-default">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>
    </motion.div>
  );
}

export function TermsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 pt-20"
    >
      <Section title="Legal">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <h1 className="text-[22px] font-display font-bold tracking-tighter uppercase">Terms & Conditions</h1>
          <div className="space-y-6 text-[16px] font-extralight leading-relaxed text-studio-text-s">
            <p>Last updated: April 2026</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using ELEVATESTUDIO.COM, you accept and agree to be bound by the terms and provision of this agreement.</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">2. Intellectual Property</h2>
            <p>All content included on this site, such as text, graphics, logos, images, audio clips, digital downloads, and software, is the property of ELEVATESTUDIO or its content suppliers and protected by international copyright laws.</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Use License</h2>
            <p>Permission is granted to temporarily download one copy of the materials (information or software) on ELEVATESTUDIO's website for personal, non-commercial transitory viewing only.</p>
            {/* Add more placeholder content as needed */}
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
}

export function PrivacyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 pt-20"
    >
      <Section title="Legal">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl space-y-8"
        >
          <h1 className="text-[22px] font-display font-bold tracking-tighter uppercase">Privacy Policy</h1>
          <div className="space-y-6 text-[16px] font-extralight leading-relaxed text-studio-text-s">
            <p>Last updated: April 2026</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information to provide better services to all our users. We may collect personal information such as your name, email address, and company details when you fill out our contact form.</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">2. How We Use Information</h2>
            <p>We use the information we collect from all our services to provide, maintain, protect and improve them, to develop new ones, and to protect ELEVATESTUDIO and our users.</p>
            <h2 className="text-xl font-medium text-white mt-8 mb-4">3. Information Sharing</h2>
            <p>We do not share personal information with companies, organizations and individuals outside of ELEVATESTUDIO unless one of the following circumstances applies: with your consent, for legal reasons, or for external processing.</p>
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
}
