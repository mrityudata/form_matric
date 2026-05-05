import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Moon, Sun, Menu, X, Instagram, Twitter, Linkedin, Github, Hexagon, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: 'WORKS', path: '/' },
    { name: 'PROCESS', path: '/process' },
    { name: 'CAPABILITIES', path: '/capabilities' },
    { name: 'LAB', path: '/lab' },
    { name: 'INFO', path: '/info' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 z-50 flex items-center justify-between text-white pointer-events-none">
      <Link
        to="/"
        className="pointer-events-auto hover:opacity-50 transition-opacity"
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt="Formatric Studio"
          className="h-6 w-6 object-contain brightness-0 invert"
        />
      </Link>

      <div className="flex items-center gap-8 md:gap-16 pointer-events-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-[11px] uppercase tracking-[0.2em] font-medium transition-opacity",
              location.pathname === item.path ? "opacity-100" : "opacity-60 hover:opacity-100"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="min-h-[100px] border-t border-studio-border flex flex-wrap items-center px-10 gap-x-12 gap-y-6 py-6 lg:py-0 whitespace-nowrap">
      <div className="flex-1" />
      <div className="flex flex-wrap items-center gap-6 text-sm font-medium">
        <Link to="/terms" target="_blank" className="hover:text-white text-studio-text-s transition-colors">Terms & Conditions</Link>
        <Link to="/privacy" target="_blank" className="hover:text-white text-studio-text-s transition-colors">Privacy Policy</Link>
      </div>
      <div className="text-sm text-studio-text-s w-full lg:w-auto text-center mt-4 lg:mt-0 lg:block">
        © 2026 FormMatricStudio
      </div>
    </footer>
  );
}

export function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
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
      className="fixed bottom-10 right-10 z-[60] bg-studio-surface text-white px-8 py-4 border border-studio-border flex items-center gap-6 shadow-2xl rounded-2xl"
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

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      whileHover={{ scale: 1.1 }}
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 z-[50] w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl cursor-pointer"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </motion.button>
  );
}
