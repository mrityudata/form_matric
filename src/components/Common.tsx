import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Menu, X, Instagram, Twitter, Linkedin, Github } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { cn } from '../lib/utils';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Work', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Core', path: '/our-core' },
    { name: 'Services', path: '/services' },
    { name: 'Stack', path: '/stack' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-studio-dark border-b border-studio-border">
      <div className="max-w-full mx-auto px-10 h-[60px] flex items-center justify-between text-white">
        <Link
          to="/"
          className="text-lg font-sans font-bold tracking-[0.3em] uppercase"
        >
          ELEVATESTUDIO.COM
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-[11px] uppercase tracking-widest font-medium transition-colors",
                location.pathname === item.path ? "text-white" : "text-studio-text-s hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-4 w-[1px] bg-studio-border" />
          <button
            onClick={toggleTheme}
            className="w-10 h-5 bg-studio-surface border border-studio-border rounded-full relative cursor-pointer"
          >
            <motion.div
              animate={{ x: theme === 'dark' ? 20 : 0 }}
              className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full"
            />
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-studio-text-s hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-[60px] left-0 w-full bg-studio-dark border-b border-studio-border p-6 flex flex-col gap-6 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium text-left text-white"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="min-h-[100px] border-t border-studio-border flex flex-wrap items-center px-10 gap-x-12 gap-y-6 py-6 lg:py-0 whitespace-nowrap">
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-studio-text-s shrink-0">Selected Clients</span>
      <div className="flex items-center gap-8 md:gap-12 text-sm font-bold opacity-40 uppercase tracking-tighter overflow-x-auto">
        <span>Panasonic</span>
        <span>Nike</span>
        <span>Apple Inc.</span>
        <span>Sony Music</span>
        <span>Tesla</span>
      </div>
      <div className="flex-1" />
      <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
        <Link to="/terms" target="_blank" className="hover:text-white text-studio-text-s transition-colors underline underline-offset-4">Terms & Conditions</Link>
        <Link to="/privacy" target="_blank" className="hover:text-white text-studio-text-s transition-colors underline underline-offset-4">Privacy Policy</Link>
      </div>
      <div className="flex items-center gap-6">
        <SocialIcon icon={<Instagram size={14} />} href="#" />
        <SocialIcon icon={<Twitter size={14} />} href="#" />
        <SocialIcon icon={<Linkedin size={14} />} href="#" />
        <SocialIcon icon={<Github size={14} />} href="#" />
      </div>
      <div className="text-[10px] uppercase tracking-widest text-studio-text-s w-full lg:w-auto text-center mt-4 lg:mt-0 lg:block">
        © 2026 ELEVATESTUDIO.COM / Pushing Potential
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-studio-text-s hover:text-white transition-colors border border-studio-border p-2 rounded-full hover:bg-studio-surface"
    >
      {icon}
    </a>
  );
}

export function CookieBanner() {
  const [show, setShow] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('cookies-accepted');
    }
    return false;
  });

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-10 right-10 z-[60] bg-studio-surface text-white px-8 py-4 border border-studio-border flex items-center gap-6 shadow-2xl"
    >
      <span className="text-[11px] text-studio-text-s whitespace-nowrap">
        We use cookies to enhance your experience on our site.
      </span>
      <button
        onClick={accept}
        className="text-[10px] font-bold uppercase tracking-widest border-b border-white hover:opacity-50 transition-all"
      >
        Accept
      </button>
    </motion.div>
  );
}
