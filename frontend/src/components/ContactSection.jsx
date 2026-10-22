import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCircle2, MapPin, Mail, Clock } from 'lucide-react';
import { submitContact, getWhatsAppUrl } from '../api';

export default function ContactSection({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    location: '',
    service_required: 'Modular Kitchen',
    budget_range: '₹3 Lakhs - ₹6 Lakhs',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Modular Kitchen',
    'Custom Wardrobes',
    'Living Room Interiors',
    'Bedroom Interiors',
    'TV Units',
    'False Ceiling',
    'Office Interiors',
    'Custom Furniture',
    'Renovation',
    'Complete Home Interior'
  ];

  const budgetList = [
    '₹1.5 Lakhs - ₹3 Lakhs',
    '₹3 Lakhs - ₹6 Lakhs',
    '₹6 Lakhs - ₹10 Lakhs',
    '₹10 Lakhs - ₹20 Lakhs',
    '₹20 Lakhs+ (Luxury Villa)'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      await submitContact(formData);
      setSubmitted(true);
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send enquiry. Please contact us directly via WhatsApp.');
      setSubmitting(false);
    }
  };

  const whatsappUrl = getWhatsAppUrl(
    settings?.whatsapp_number,
    `Hi Thiyagu Interior, I would like to enquire about ${formData.service_required} for my home in ${formData.location || 'Chennai'}.`
  );

  return (
    <section id="contact" style={{ padding: '6rem 0', backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Let's Build Your Dream Space</h2>
          <p className="section-subtitle">
            Schedule a free site consultation or request an itemized preliminary quote for your home interior project.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Direct Contact Info & Workshop */}
          <div
            style={{
              backgroundColor: '#1E1C1A',
              color: '#FAF8F5',
              padding: 'clamp(2rem, 5vw, 3rem)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ display: 'inline-flex', marginBottom: '1rem' }}>
              <span className="badge-gold">
                Direct Carpenter & Design Office
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFFFFF', marginBottom: '1rem' }}>
              Thiyagu Interior Studio
            </h3>
            <p style={{ color: '#B3AAA0', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
              We invite you to discuss your project directly with our master craftsmen. No middlemen, no commissions—just honest pricing and superior woodwork.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DFB76C', flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#8F887E', textTransform: 'uppercase' }}>Phone / Mobile</div>
                  <a href={`tel:${settings?.phone_number || '+918675108994'}`} style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FAF8F5' }}>
                    {settings?.phone_number || '+91 86751 08994'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(37, 211, 102, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#25D366', flexShrink: 0 }}>
                  <MessageSquare size={18} fill="#25D366" />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#8F887E', textTransform: 'uppercase' }}>WhatsApp Direct</div>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.05rem', fontWeight: 600, color: '#25D366' }}>
                    {settings?.whatsapp_number || '+91 86751 08994'}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DFB76C', flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#8F887E', textTransform: 'uppercase' }}>Email Address</div>
                  <div style={{ fontSize: '0.95rem', color: '#FAF8F5' }}>
                    {settings?.email || 'contact@thiyaguinterior.com'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DFB76C', flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#8F887E', textTransform: 'uppercase' }}>Workshop & Studio Location</div>
                  <div style={{ fontSize: '0.95rem', color: '#FAF8F5', lineHeight: 1.5 }}>
                    {settings?.address || 'No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040'}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <MessageSquare size={18} fill="#FFFFFF" /> WhatsApp Us
              </a>

              <a
                href={`tel:${settings?.phone_number || '+918675108994'}`}
                className="btn btn-outline-light"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div
            style={{
              backgroundColor: '#FAF8F5',
              padding: 'clamp(2rem, 5vw, 3rem)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }} className="animate-fade-in">
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem auto',
                    color: '#25D366',
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '0.75rem', fontFamily: 'var(--font-serif)' }}>
                  Enquiry Received!
                </h3>
                <p style={{ color: '#57524D', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Master carpenter Thiyagu and our interior design team will contact you within 24 hours.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
                    <MessageSquare size={18} fill="#FFFFFF" /> Quick Follow-up on WhatsApp
                  </a>
                  <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                    Send Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1.5rem', color: '#1A1918' }}>
                  Send Project Enquiry
                </h3>

                {errorMsg && (
                  <div style={{ padding: '0.85rem', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    {errorMsg}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senthil Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 86751 08994"
                      value={formData.mobile_number}
                      onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: '#FFFFFF',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                    Project Location / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anna Nagar, Chennai"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                      Service Required
                    </label>
                    <select
                      value={formData.service_required}
                      onChange={(e) => setFormData({ ...formData, service_required: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      {servicesList.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget_range}
                      onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-light)',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      {budgetList.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#332E29', marginBottom: '0.4rem' }}>
                    Project Details / Requirements
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your 2BHK/3BHK dimensions, preferences, or target move-in date..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#FFFFFF',
                      resize: 'vertical',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-gold"
                  style={{ width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}
                >
                  <Send size={18} />
                  {submitting ? 'Submitting to Database...' : 'Send Project Enquiry'}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
