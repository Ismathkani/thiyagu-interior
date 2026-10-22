import React, { useState } from 'react';
import { X, MapPin, Tag, Check, Sliders, MessageSquare, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '../api';

export default function ProjectDetailModal({ project, onClose, onOpenQuote, settings }) {
  if (!project) return null;

  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState(project.before_image ? 'comparison' : 'gallery');

  const whatsappMessage = `Hi Thiyagu Interior, I saw your ${project.title} (${project.category}) project on your website. I would like something similar. Please share more details.`;
  const whatsappUrl = getWhatsAppUrl(settings?.whatsapp_number, whatsappMessage);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(16, 15, 14, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(20, 19, 18, 0.75)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 20,
            backdropFilter: 'blur(6px)',
          }}
        >
          <X size={20} />
        </button>

        {/* Media Header (Before/After or Cover Image) */}
        <div style={{ position: 'relative', height: 'clamp(260px, 45vw, 420px)', backgroundColor: '#1A1918' }}>
          {project.before_image && activeTab === 'comparison' ? (
            <div
              className="ba-slider-container"
              style={{ height: '100%', borderRadius: 0 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.max(0, Math.min(pos, 100)));
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.max(0, Math.min(pos, 100)));
              }}
            >
              <img src={project.after_image || project.cover_image} alt="After Handover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="ba-before-wrapper" style={{ width: `${sliderPos}%` }}>
                <img src={project.before_image} alt="Before Work" style={{ width: '850px', maxWidth: 'none', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="ba-tag ba-tag-before">Before Carpentry</div>
              <div className="ba-tag ba-tag-after">Finished Handover</div>
              <div className="ba-handle" style={{ left: `${sliderPos}%` }}>
                <div className="ba-handle-btn"><Sliders size={16} /></div>
              </div>
            </div>
          ) : (
            <img src={project.cover_image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}

          {/* Toggle between Before/After and Gallery if before image exists */}
          {project.before_image && (
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 10, display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('comparison')}
                className="btn btn-gold"
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
              >
                Before / After Slider
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className="btn btn-outline-light"
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
              >
                Hero Photo
              </button>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          
          {/* Header Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className="badge-gold">
              <Tag size={12} /> {project.category}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#7E766D', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} color="#C5A059" /> {project.location}
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', marginBottom: '1rem' }}>
            {project.title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {project.short_description}
          </p>

          {/* Specs Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem',
              backgroundColor: '#FAF8F5',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              marginBottom: '2rem',
            }}
          >
            {project.client_requirement && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C6A2E', marginBottom: '0.35rem' }}>
                  Client Requirement
                </div>
                <div style={{ fontSize: '0.9rem', color: '#332E29', lineHeight: 1.5 }}>
                  {project.client_requirement}
                </div>
              </div>
            )}

            {project.materials_used && (
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C6A2E', marginBottom: '0.35rem' }}>
                  Materials & Finishes
                </div>
                <div style={{ fontSize: '0.9rem', color: '#332E29', lineHeight: 1.5 }}>
                  {project.materials_used}
                </div>
              </div>
            )}
          </div>

          {/* Additional Gallery Photos if available */}
          {project.images && project.images.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Project Gallery
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                {project.images.map((img) => (
                  <div key={img.id} style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '140px' }}>
                    <img src={img.image} alt={img.caption || project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Conversion Area */}
          <div
            style={{
              paddingTop: '1.75rem',
              borderTop: '1px solid var(--border-light)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Want an Interior Like This?
            </div>
            <p style={{ color: '#7E766D', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              Schedule a free site inspection or get an exact transparent estimate tailored to your floor plan.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '440px', margin: '0 auto' }}>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuote(project.title);
                }}
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                Get Free Quote <ArrowRight size={16} />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageSquare size={18} fill="#FFFFFF" /> Contact on WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
