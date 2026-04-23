import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ThemeProvider';
import { Navbar, Footer, CookieBanner } from './components/Common';
import { Hero, ProjectGrid, Clients, ContactForm, AboutUs, ProjectDetail } from './components/Content';
import { OurCorePage, ServicesPage, StackPage, TermsPage, PrivacyPage } from './components/Pages';
import { cn } from './lib/utils';

function AppContent() {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      theme === 'dark' ? "bg-studio-dark text-white" : "bg-studio-light text-studio-dark"
    )}>
      <Navbar />

      <div className="flex-1 flex flex-col pt-[60px]">
        <main className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hero />
                  <ProjectGrid />
                  <Clients />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AboutUs />
                  <Clients />
                </motion.div>
              } />
              <Route path="/our-core" element={<OurCorePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/stack" element={<StackPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/contact" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ContactForm />
                </motion.div>
              } />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
      <CookieBanner />

      {/* Custom Cursor / Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat shadow-inner" />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
