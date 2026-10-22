import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { submitContact, getWhatsAppUrl } from '../api';

export default function QuoteModal({ isOpen, onClose, initialService, settings }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    location: '',
    service_required: initialService || 'Modular Kitchen',
    budget_range: '₹3 Lakhs - ₹6 Lakhs',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      alert('Could not submit form. Please use WhatsApp directly.');
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    settings?.whatsapp_number,
    `Hi Thiyagu Interior, I would like to get a free quote for ${formData.service_required}. My name is ${formData.name || 'Visitor'}.`
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 15, 14, 0.85)',
        backdropFilter: 'blur(10px)',
        zIndex: 1050,
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
          maxWidth: '540px',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#F5EFE9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(37, 211, 102, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                color: '#25D366',
              }}
            >
              <CheckCircle2 size={34} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Quote Request Sent!
            </h3>
            <p style={{ color: '#655E57', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
              We have received your details. Our master carpenter will review your request and contact you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                <MessageSquare size={18} fill="#FFFFFF" /> Connect via WhatsApp Now
              </a>
              <button onClick={onClose} className="btn btn-outline">
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'inline-flex', marginBottom: '0.5rem' }}>
              <span className="badge-gold">Free Site Estimation</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
              Request a Free Quote
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: '#FAF8F5' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 86751 08994"
                value={formData.mobile_number}
                onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: '#FAF8F5' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Service
                </label>
                <select
                  value={formData.service_required}
                  onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: '#FAF8F5' }}
                >
                  <option value="Modular Kitchen">Modular Kitchen</option>
                  <option value="Custom Wardrobes">Custom Wardrobes</option>
                  <option value="Living Room Interiors">Living Room</option>
                  <option value="Bedroom Interiors">Bedroom</option>
                  <option value="TV Units">TV Units</option>
                  <option value="Complete Home Interior">Complete Home</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                  Budget
                </label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: '#FAF8F5' }}
                >
                  <option value="₹1.5 Lakhs - ₹3 Lakhs">₹1.5L - ₹3L</option>
                  <option value="₹3 Lakhs - ₹6 Lakhs">₹3L - ₹6L</option>
                  <option value="₹6 Lakhs - ₹10 Lakhs">₹6L - ₹10L</option>
                  <option value="₹10 Lakhs+">₹10 Lakhs+</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                Location / Apartment Name
              </label>
              <input
                type="text"
                placeholder="e.g. OMR, Chennai"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', backgroundColor: '#FAF8F5' }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-gold"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              <Send size={16} />
              {submitting ? 'Submitting...' : 'Get Instant Free Estimate'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
