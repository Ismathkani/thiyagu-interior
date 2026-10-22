import React from 'react';
import { Palette, Shield, Hammer, Receipt, Clock, Home } from 'lucide-react';

const REASONS = [
  {
    icon: Palette,
    title: 'Custom Designs',
    desc: 'Bespoke layouts personalized to your aesthetic taste, lifestyle, and unique spatial dimensions.'
  },
  {
    icon: Shield,
    title: 'Quality Materials',
    desc: 'IS:710 Marine grade plywood, certified teak wood, and German hardware from Blum and Hafele.'
  },
  {
    icon: Hammer,
    title: 'Skilled Craftsmanship',
    desc: 'Led by seasoned carpenters with over 15+ years of hand joinery, veneer matching, and polish artistry.'
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    desc: 'Detailed item-by-item BOQ with zero surprise expenses, milestone payments, and guaranteed rates.'
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Commitment to strict 45-day turnkey delivery schedules, backed by rigorous project tracking.'
  },
  {
    icon: Home,
    title: 'Complete Interior Solutions',
    desc: 'From ceiling electrical conduits to modular kitchens and final soft furnishings—all under one roof.'
  }
];

export default function WhyChooseUs() {
  return (
    <section id="about" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Why Thiyagu Interior</span>
          <h2 className="section-title">Craftsmanship That Speaks For Itself</h2>
          <p className="section-subtitle">
            We bridge traditional woodworking mastery with modern precision engineering to deliver interiors that endure for decades.
          </p>
        </div>

        {/* 6 Luxury Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {REASONS.map((r, idx) => {
            const Icon = r.icon;
            return (
              <div
                key={idx}
                className="card-luxury"
                style={{
                  padding: '2.25rem 1.75rem',
                  backgroundColor: '#FAF8F5',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                    color: '#8C6A2E',
                  }}
                >
                  <Icon size={26} />
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    marginBottom: '0.65rem',
                    color: '#1A1918',
                  }}
                >
                  {r.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: '#57524D',
                    lineHeight: 1.6,
                  }}
                >
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
