import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AIDesigner from './components/AIDesigner';
import Projects from './components/Projects';
import ProjectDetailModal from './components/ProjectDetailModal';
import BeforeAfterSection from './components/BeforeAfterSection';
import WhyChooseUs from './components/WhyChooseUs';
import WorkProcess from './components/WorkProcess';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import WhatsAppButton from './components/WhatsAppButton';
import QuoteModal from './components/QuoteModal';
import Footer from './components/Footer';

import { fetchServices, fetchProjects, fetchTestimonials, fetchSettings } from './api';

export default function App() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState('Modular Kitchen');

  useEffect(() => {
    async function loadData() {
      const [sData, srvData, prjData, tstData] = await Promise.all([
        fetchSettings(),
        fetchServices(),
        fetchProjects(),
        fetchTestimonials()
      ]);
      setSettings(sData);
      setServices(srvData);
      setProjects(prjData);
      setTestimonials(tstData);
    }
    loadData();
  }, []);

  const handleOpenQuote = (serviceName) => {
    if (typeof serviceName === 'string') {
      setQuoteService(serviceName);
    }
    setIsQuoteOpen(true);
  };

  const handleExploreProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Sticky Frosted Header */}
      <Navbar
        settings={settings}
        onOpenQuote={() => handleOpenQuote()}
      />

      <main style={{ flexGrow: 1 }}>
        {/* 2. Hero Section */}
        <Hero
          settings={settings}
          onExploreProjects={handleExploreProjects}
        />

        {/* 3. Services Showcase (10 items) */}
        <Services
          services={services}
          onSelectService={(sName) => handleOpenQuote(sName)}
        />

        {/* 4. AI Interior Designer Studio */}
        <AIDesigner
          settings={settings}
        />

        {/* 5. Spaces We've Transformed (Projects Portfolio) */}
        <Projects
          projects={projects}
          onSelectProject={(p) => setSelectedProject(p)}
        />

        {/* 6. Dedicated Before & After Interactive Slider */}
        <BeforeAfterSection
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. 7-Step Craftsmanship Timeline */}
        <WorkProcess />

        {/* 9. Lightbox Photo Gallery */}
        <Gallery />

        {/* 10. Client Reviews Carousel */}
        <Testimonials
          testimonials={testimonials}
        />

        {/* 11. Lead Capture & Contact */}
        <ContactSection
          settings={settings}
        />
      </main>

      {/* 12. Footer */}
      <Footer settings={settings} />

      {/* 13. Global Floating WhatsApp Button */}
      <WhatsAppButton settings={settings} />

      {/* 14. Project Details Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenQuote={(title) => handleOpenQuote(title)}
          settings={settings}
        />
      )}

      {/* 15. Free Quote Estimation Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={quoteService}
        settings={settings}
      />

    </div>
  );
}
