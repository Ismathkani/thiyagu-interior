import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck, Clock, Award } from 'lucide-react';
import { getWhatsAppUrl } from '../api';

export default function Hero({ settings, onExploreProjects }) {
  const whatsappUrl = getWhatsAppUrl(
    settings?.whatsapp_number,
    "Hi Thiyagu Interior, I'm interested in your interior design & carpentry services. Can we discuss?"
  );

  const scrollToAi = (e) => {
    e.preventDefault();
    document.querySelector('#ai-designer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '110px',
        paddingBottom: '4rem',
        backgroundImage: `linear-gradient(180deg, rgba(16, 15, 14, 0.72) 0%, rgba(16, 15, 14, 0.88) 100%), url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'scroll',
        color: '#FAF8F5',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        
        {/* Top Trust Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }} className="animate-fade-in">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(197, 160, 89, 0.15)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              padding: '0.45rem 1.1rem',
              borderRadius: '9999px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Sparkles size={14} color="#DFB76C" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DFB76C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Master Carpentry & Bespoke Interiors
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 6.5vw, 4.8rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            maxWidth: '920px',
            margin: '0 auto 1.25rem auto',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          Crafting Beautiful Spaces, <br />
          <span style={{ background: 'var(--gold-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Built Around You.
          </span>
        </h1>

        {/* Supporting Text */}
        <p
          style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)',
            color: '#D8D1C7',
            maxWidth: '750px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6,
            fontWeight: 400,
            letterSpacing: '0.01em',
          }}
        >
          Custom Carpentry • Interior Design • Modular Kitchens • Wardrobes • Complete Home Interiors
        </p>

        {/* CTAs (Mobile-Friendly Stack / Desktop Row) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'stretch',
            maxWidth: '540px',
            margin: '0 auto',
          }}
          className="hero-buttons-wrapper"
        >
          {/* Button 1: Design Your Room with AI */}
          <a
            href="#ai-designer"
            onClick={scrollToAi}
            className="btn btn-gold"
            style={{
              padding: '1rem 2rem',
              fontSize: '1.05rem',
              fontWeight: 700,
            }}
          >
            <Sparkles size={18} />
            Design Your Room with AI
          </a>

          {/* Button 2: View Our Projects */}
          <button
            onClick={onExploreProjects}
            className="btn btn-outline-light"
            style={{
              padding: '0.95rem 1.8rem',
              fontSize: '1rem',
            }}
          >
            View Our Projects
            <ArrowRight size={18} />
          </button>

          {/* Button 3: WhatsApp Us */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              padding: '0.95rem 1.8rem',
              fontSize: '1rem',
            }}
          >
            <MessageSquare size={18} fill="#FFFFFF" />
            WhatsApp Us
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '3.5rem auto 0 auto',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Award size={22} color="#DFB76C" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>15+ Years</div>
              <div style={{ fontSize: '0.78rem', color: '#B3AAA0' }}>Master Carpentry</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={22} color="#DFB76C" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>100% Seasoned</div>
              <div style={{ fontSize: '0.78rem', color: '#B3AAA0' }}>Teak & Marine Ply</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
            <Clock size={22} color="#DFB76C" />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF' }}>45-Day Delivery</div>
              <div style={{ fontSize: '0.78rem', color: '#B3AAA0' }}>Turnkey Handover</div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 640px) {
          .hero-buttons-wrapper {
            flex-direction: row !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
