import React, { useState, useRef } from 'react';
import { Sliders, Sparkles, CheckCircle2 } from 'lucide-react';

export default function BeforeAfterSection({ onOpenQuote }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const beforeImg = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80";
  const afterImg = "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80";

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPos(percent);
  };

  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#1A1918', color: '#FAF8F5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag" style={{ color: '#DFB76C' }}>Real Site Execution</span>
          <h2 className="section-title" style={{ color: '#FFFFFF' }}>See the Transformation</h2>
          <p className="section-subtitle" style={{ color: '#B3AAA0' }}>
            Drag the slider to witness how we turn an unfurnished concrete shell into an architectural masterpiece with custom walnut woodwork, acoustic paneling, and warm ambient illumination.
          </p>
        </div>

        {/* Dual Handle Slider */}
        <div
          ref={containerRef}
          className="ba-slider-container"
          style={{
            height: 'clamp(320px, 55vw, 560px)',
            maxWidth: '1080px',
            margin: '0 auto 3rem auto',
            border: '2px solid rgba(197, 160, 89, 0.3)',
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={(e) => isDragging && handleMove(e.touches[0].clientX)}
        >
          {/* Finished Luxury Living Room (Background) */}
          <img src={afterImg} alt="Finished Turnkey Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

          {/* Raw Unfinished Room (Overlay) */}
          <div className="ba-before-wrapper" style={{ width: `${sliderPos}%` }}>
            <img
              src={beforeImg}
              alt="Raw Site Before Handover"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '1080px',
                maxWidth: 'none',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div className="ba-tag ba-tag-before" style={{ backgroundColor: 'rgba(20, 19, 18, 0.85)' }}>
            Raw Site Before
          </div>
          <div className="ba-tag ba-tag-after">
            Handover After
          </div>

          {/* Handle */}
          <div className="ba-handle" style={{ left: `${sliderPos}%`, backgroundColor: '#DFB76C' }}>
            <div className="ba-handle-btn" style={{ backgroundColor: '#DFB76C', color: '#1A1918' }}>
              <Sliders size={20} />
            </div>
          </div>
        </div>

        {/* Transformation Highlights */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            maxWidth: '980px',
            margin: '0 auto',
            textAlign: 'left',
          }}
        >
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DFB76C', fontWeight: 700, marginBottom: '0.4rem' }}>
              <CheckCircle2 size={18} /> 100% Factory Calibrated
            </div>
            <p style={{ fontSize: '0.85rem', color: '#B3AAA0', lineHeight: 1.5 }}>
              Precision CNC edge-banding and laser-cut joinery done off-site to ensure zero dust and lightning-fast on-site installation.
            </p>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DFB76C', fontWeight: 700, marginBottom: '0.4rem' }}>
              <CheckCircle2 size={18} /> Termite & Moisture Shield
            </div>
            <p style={{ fontSize: '0.85rem', color: '#B3AAA0', lineHeight: 1.5 }}>
              Boiling Water Resistant (BWR) and Marine Ply (IS:710) guaranteed against swelling, warping, and insect intrusion.
            </p>
          </div>

          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DFB76C', fontWeight: 700, marginBottom: '0.4rem' }}>
              <CheckCircle2 size={18} /> Zero Hidden Charges
            </div>
            <p style={{ fontSize: '0.85rem', color: '#B3AAA0', lineHeight: 1.5 }}>
              Itemized transparent quotes covering materials, hardware, labor, and final post-installation deep cleaning.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
