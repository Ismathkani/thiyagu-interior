import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials({ testimonials }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#FAF8F5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Homeowner Stories</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Authentic experiences from families who trusted Thiyagu Interior to design and craft their dream living spaces.
          </p>
        </div>

        {/* Testimonial Box */}
        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border-light)',
            position: 'relative',
          }}
        >
          {/* Quote Icon */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2.5rem',
              color: 'rgba(197, 160, 89, 0.2)',
            }}
          >
            <Quote size={56} />
          </div>

          {/* Stars */}
          <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.25rem' }}>
            {[...Array(t.rating || 5)].map((_, i) => (
              <Star key={i} size={18} fill="#DFB76C" color="#DFB76C" />
            ))}
          </div>

          {/* Review Text */}
          <blockquote
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.15rem, 3vw, 1.45rem)',
              lineHeight: 1.6,
              color: '#262220',
              fontStyle: 'italic',
              marginBottom: '2rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            "{t.review}"
          </blockquote>

          {/* Client Details */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {t.avatar && (
                <img
                  src={t.avatar}
                  alt={t.client_name}
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #C5A059',
                  }}
                />
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1A1918' }}>
                  {t.client_name}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#857E76' }}>
                  {t.project_type} • <span style={{ color: '#C5A059' }}>{t.location}</span>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={prev}
                aria-label="Previous Testimonial"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  backgroundColor: '#FFFFFF',
                  color: '#1A1918',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Next Testimonial"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-light)',
                  backgroundColor: '#FFFFFF',
                  color: '#1A1918',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F5EFE9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
