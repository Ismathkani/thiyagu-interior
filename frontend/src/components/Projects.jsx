import React, { useState } from 'react';
import { MapPin, Tag, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Wardrobe',
  'TV Unit',
  'Office',
  'Furniture',
  'Complete Home'
];

export default function Projects({ projects, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="projects" style={{ padding: '6rem 0', backgroundColor: '#FAF8F5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Portfolio of Real Work</span>
          <h2 className="section-title">Spaces We've Transformed</h2>
          <p className="section-subtitle">
            Explore our real completed carpentry and interior design projects across residential villas, luxury apartments, and boutique offices.
          </p>
        </div>

        {/* Category Filters (Horizontally scrollable on mobile) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0.6rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '3rem',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          className="category-scroll-container"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.6rem 1.35rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  backgroundColor: isActive ? 'var(--walnut-dark)' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: isActive ? '1px solid var(--walnut-dark)' : '1px solid var(--border-light)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="card-luxury"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Image with Tag Overlay */}
              <div
                style={{
                  position: 'relative',
                  height: '280px',
                  overflow: 'hidden',
                  backgroundColor: '#262220',
                }}
              >
                <img
                  src={project.cover_image}
                  alt={project.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Category Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(20, 19, 18, 0.85)',
                    color: '#DFB76C',
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                  }}
                >
                  {project.category}
                </div>

                {/* Has Before/After Indicator */}
                {project.before_image && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(37, 211, 102, 0.9)',
                      color: '#FFFFFF',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    Before/After Available
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#7E766D', fontSize: '0.82rem', marginBottom: '0.5rem' }}>
                  <MapPin size={14} color="#C5A059" />
                  <span>{project.location}</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    color: 'var(--text-primary)',
                    marginBottom: '0.65rem',
                    lineHeight: 1.3,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {project.short_description}
                </p>

                {/* View Project Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-light)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#8C6A2E',
                  }}
                >
                  <span>View Project Details</span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(197, 160, 89, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ArrowUpRight size={17} color="#8C6A2E" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (min-width: 768px) {
          .category-scroll-container {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
