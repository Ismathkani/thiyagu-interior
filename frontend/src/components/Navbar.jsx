import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../api';

export default function Navbar({ onOpenQuote, settings }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'AI Interior Designer', href: '#ai-designer', highlight: true },
    { name: 'Our Projects', href: '#projects' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappLink = getWhatsAppUrl(
    settings?.whatsapp_number,
    "Hi Thiyagu Interior, I found your website and I would like to discuss an interior/carpentry project."
  );

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'all 0.35s ease',
          backgroundColor: isScrolled ? 'rgba(20, 19, 18, 0.94)' : 'rgba(20, 19, 18, 0.75)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled ? '1px solid rgba(197, 160, 89, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isScrolled ? '72px' : '82px', transition: 'height 0.3s ease' }}>
          
          {/* Logo & Brand Name */}
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid #C5A059',
                boxShadow: '0 0 14px rgba(197, 160, 89, 0.4)',
                backgroundColor: '#1A1918',
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.jpg"
                alt="Thiyagu Interior Logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#FAF8F5', letterSpacing: '0.02em', lineHeight: 1.1 }}>
                Thiyagu <span style={{ color: '#C5A059' }}>Interior</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#B3AAA0', textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: '2px' }}>
                Designs Your Dream
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '1.6rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  color: link.highlight ? '#DFB76C' : '#DDD7CE',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  position: 'relative',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = link.highlight ? '#DFB76C' : '#DDD7CE')}
              >
                {link.highlight && <Sparkles size={13} color="#C5A059" />}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* WhatsApp Quick Icon */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#25D366',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <MessageSquare size={20} fill="#FFFFFF" />
            </a>

            {/* Get Free Quote CTA */}
            <button
              onClick={onOpenQuote}
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.35rem', fontSize: '0.86rem', display: 'none' }}
              id="quote-nav-btn"
            >
              Get Free Quote
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF8F5',
                cursor: 'pointer',
              }}
              className="mobile-toggle-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(16, 15, 14, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 899,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 600,
                  color: link.highlight ? '#C5A059' : '#F5F2ED',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{link.name}</span>
                {link.highlight && (
                  <span className="badge-gold" style={{ fontSize: '0.65rem' }}>
                    <Sparkles size={11} /> AI Studio
                  </span>
                )}
              </a>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="btn btn-gold"
              style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
            >
              Get Free Quote
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', fontSize: '1rem', padding: '1rem' }}
            >
              <MessageSquare size={20} fill="#FFFFFF" /> Chat on WhatsApp
            </a>

            <div style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.85rem', color: '#8F887E' }}>
              Direct Call: <a href={`tel:${settings?.phone_number || '+918675108994'}`} style={{ color: '#C5A059', fontWeight: 600 }}>{settings?.phone_number || '+91 86751 08994'}</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          #quote-nav-btn {
            display: inline-flex !important;
          }
          .mobile-toggle-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
