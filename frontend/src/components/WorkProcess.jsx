import React from 'react';
import { MessagesSquare, Ruler, Compass, Layers, Factory, Wrench, Key } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: MessagesSquare,
    title: 'Consultation',
    desc: 'Initial discovery call to understand your floor plan, family requirements, lifestyle preferences, and budget goals.'
  },
  {
    num: '02',
    icon: Ruler,
    title: 'Site Visit',
    desc: 'Precise laser measurement of your rooms, inspecting structural walls, electrical conduits, and daylight angles.'
  },
  {
    num: '03',
    icon: Compass,
    title: 'Design & Planning',
    desc: '2D ergonomic floor layouts and 3D photorealistic visualizations showing every angle and cabinet depth.'
  },
  {
    num: '04',
    icon: Layers,
    title: 'Material Selection',
    desc: 'Hands-on tactile selection of veneers, high-gloss laminates, quartz worktops, acrylics, and hardware catalogs.'
  },
  {
    num: '05',
    icon: Factory,
    title: 'Manufacturing',
    desc: 'Off-site CNC cutting, edge banding, and modular carcass preparation under controlled factory environments.'
  },
  {
    num: '06',
    icon: Wrench,
    title: 'Installation',
    desc: 'Clean, dust-free assembly on site by our master carpentry crew with zero damage to existing premises.'
  },
  {
    num: '07',
    icon: Key,
    title: 'Final Handover',
    desc: 'Quality audit, deep cleanup, hardware demonstration, and formal handover with 10-year warranty certificate.'
  }
];

export default function WorkProcess() {
  return (
    <section style={{ padding: '6rem 0', backgroundColor: '#FAF8F5' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">Step-by-Step Excellence</span>
          <h2 className="section-title">Our Work Process</h2>
          <p className="section-subtitle">
            A seamless 7-step journey from your initial vision to the proud moment you turn the key to your dream home.
          </p>
        </div>

        {/* Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.75rem',
            position: 'relative',
          }}
        >
          {STEPS.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  padding: '2rem 1.5rem',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                }}
              >
                {/* Step Number Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'rgba(197, 160, 89, 0.25)',
                  }}
                >
                  {s.num}
                </div>

                {/* Icon */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(197, 160, 89, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8C6A2E',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    marginBottom: '0.65rem',
                    color: '#1A1918',
                  }}
                >
                  {s.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: '#57524D', lineHeight: 1.55 }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
