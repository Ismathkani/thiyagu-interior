import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../api';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer({ settings }) {
  const whatsappUrl = getWhatsAppUrl(
    settings?.whatsapp_number,
    "Hi Thiyagu Interior, I would like to enquire about your interior and carpentry services."
  );

  return (
    <footer style={{ backgroundColor: '#141312', color: '#FAF8F5', paddingTop: '5rem', paddingBottom: '2.5rem', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
      <div className="container">
        
        {/* Top 4-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
          }}
        >
          {/* Col 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #C5A059',
                  boxShadow: '0 0 16px rgba(197, 160, 89, 0.4)',
                }}
              >
                <img src="/logo.jpg" alt="Thiyagu Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Thiyagu <span style={{ color: '#C5A059' }}>Interior</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#B3AAA0', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Designs Your Dream
                </div>
              </div>
            </div>

            <p style={{ color: '#8F887E', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Master carpentry and luxury modern interior design. Specializing in factory-finished modular kitchens, bespoke wardrobes, acoustic living spaces, and turnkey home interiors.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href={settings?.instagram_url || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'background 0.2s ease',
                }}
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href={settings?.facebook_url || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  transition: 'background 0.2s ease',
                }}
              >
                <FacebookIcon size={18} />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#25D366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <MessageSquare size={18} fill="#FFFFFF" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#DFB76C', marginBottom: '1.25rem' }}>
              Our Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#B3AAA0' }}>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Modular Kitchen</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Custom Wardrobes</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Living Room Interiors</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Bedroom Interiors</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>TV Units & Paneling</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>False Ceiling Solutions</a></li>
              <li><a href="#services" style={{ transition: 'color 0.2s' }}>Turnkey Home Interiors</a></li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#DFB76C', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: '#B3AAA0' }}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Our Craft</a></li>
              <li><a href="#ai-designer" style={{ color: '#DFB76C', fontWeight: 600 }}>AI Interior Designer</a></li>
              <li><a href="#projects">Spaces We've Transformed</a></li>
              <li><a href="#gallery">Project Gallery</a></li>
              <li><a href="#contact">Contact & Free Quote</a></li>
              <li><a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" style={{ color: '#8F887E' }}>Admin CMS Login ↗</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Workshop */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#DFB76C', marginBottom: '1.25rem' }}>
              Contact & Workshop
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: '#B3AAA0' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{settings?.address || 'No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040'}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Phone size={18} color="#C5A059" style={{ flexShrink: 0 }} />
                <a href={`tel:${settings?.phone_number || '+918675108994'}`} style={{ color: '#FFFFFF', fontWeight: 600 }}>
                  {settings?.phone_number || '+91 86751 08994'}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Mail size={18} color="#C5A059" style={{ flexShrink: 0 }} />
                <span>{settings?.email || 'contact@thiyaguinterior.com'}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href={settings?.google_maps_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-light"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                >
                  <ExternalLink size={14} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: '#7E766D',
          }}
        >
          <div>
            © 2026 Thiyagu Interior. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#DFB76C' }}>
            <ShieldCheck size={16} /> Certified Master Carpenter & Turnkey Interior Specialist
          </div>
        </div>

      </div>
    </footer>
  );
}
