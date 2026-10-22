import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services({ services, onSelectService }) {
  return (
    <section id="services" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Craftsmanship & Services</span>
          <h2 className="section-title">Bespoke Interior & Carpentry Solutions</h2>
          <p className="section-subtitle">
            From precision modular kitchens to custom solid wood carpentry, every project is engineered to perfection with premium materials and lifetime durability.
          </p>
        </div>

        {/* Services Grid (Mobile 1 col, Tablet 2 cols, Desktop 3 cols) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '2rem',
          }}
        >
          {services.map((service) => (
            <div
              key={service.id || service.title}
              className="card-luxury"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Card Image Container */}
              <div
                style={{
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                  backgroundColor: '#231E1B',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                
                {service.starting_price && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'rgba(20, 19, 18, 0.85)',
                      backdropFilter: 'blur(8px)',
                      color: '#DFB76C',
                      padding: '0.35rem 0.85rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(197, 160, 89, 0.3)',
                    }}
                  >
                    {service.starting_price}
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.4rem',
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  {service.title}
                </h3>
                
                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    marginBottom: '1.25rem',
                    flexGrow: 1,
                  }}
                >
                  {service.short_description}
                </p>

                {/* Key Features Chips */}
                {service.key_features && (
                  <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {service.key_features.split(',').slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.74rem',
                          color: '#524B43',
                          backgroundColor: '#F5EFE9',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '6px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        <CheckCircle2 size={11} color="#C5A059" />
                        {feat.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Get Quote Action */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="btn btn-outline"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <span>Get Quote</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
