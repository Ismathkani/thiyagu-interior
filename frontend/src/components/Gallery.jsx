import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    title: 'Luxury Smoked Walnut Living Room',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Modern Island Modular Kitchen',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Japandi Minimalist Master Bedroom',
    category: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Walk-in Wardrobe with Bronze Glass',
    category: 'Wardrobe',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Fluted Acoustic TV Console Wall',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Executive Walnut Study & Bookshelf',
    category: 'Office',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Solid Teak Dining Table & Joinery',
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Architectural False Ceiling & Track Lights',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  }
];

export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

  const openLightbox = (index) => {
    setSelectedIdx(index);
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev + 1) % filtered.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  return (
    <section id="gallery" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag">Visual Showcase</span>
          <h2 className="section-title">Design & Carpentry Gallery</h2>
          <p className="section-subtitle">
            A curated visual compilation of custom woodwork, fine millwork, and bespoke living spaces delivered by our team.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {['All', 'Living Room', 'Kitchen', 'Bedroom', 'Wardrobe', 'Office'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: filter === cat ? 'var(--walnut-dark)' : '#FAF8F5',
                color: filter === cat ? '#FFFFFF' : '#57524D',
                border: filter === cat ? '1px solid var(--walnut-dark)' : '1px solid var(--border-light)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filtered.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#1E1B19',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              {/* Gradient Overlay & Details */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,19,18,0.85) 100%)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#DFB76C', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
                  {item.category}
                </div>
                <div style={{ fontSize: '1.05rem', color: '#FFFFFF', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                  {item.title}
                </div>
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'rgba(255,255,255,0.85)' }}>
                  <Maximize2 size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 9, 8, 0.95)',
            backdropFilter: 'blur(12px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <X size={22} />
          </button>

          {/* Left Arrow */}
          <button
            onClick={prevImg}
            style={{
              position: 'absolute',
              left: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Center Image */}
          <div
            style={{
              maxWidth: '1000px',
              maxHeight: '85vh',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[selectedIdx].image}
              alt={filtered[selectedIdx].title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                margin: '0 auto',
              }}
            />
            <div style={{ padding: '1rem', color: '#FAF8F5', backgroundColor: '#1A1918' }}>
              <div style={{ fontSize: '0.8rem', color: '#DFB76C', textTransform: 'uppercase', fontWeight: 700 }}>
                {filtered[selectedIdx].category}
              </div>
              <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', marginTop: '0.2rem' }}>
                {filtered[selectedIdx].title}
              </div>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextImg}
            style={{
              position: 'absolute',
              right: '1.5rem',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}
