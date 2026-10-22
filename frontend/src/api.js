import { DEFAULT_SERVICES, DEFAULT_PROJECTS, DEFAULT_TESTIMONIALS } from './mockData';

const API_BASE = 'http://127.0.0.1:8000/api';

export async function fetchSettings() {
  try {
    const res = await fetch(`${API_BASE}/settings/`);
    if (!res.ok) throw new Error('Failed to load settings');
    return await res.json();
  } catch (err) {
    return {
      business_name: 'Thiyagu Interior',
      tagline: 'Designs Your Dream • Make Your Space Beautiful',
      whatsapp_number: '918675108994',
      phone_number: '+91 86751 08994',
      email: 'contact@thiyaguinterior.com',
      address: 'No. 45, Woodcraft Avenue, Chennai, Tamil Nadu - 600040',
      instagram_url: 'https://instagram.com',
      facebook_url: 'https://facebook.com',
      google_maps_url: 'https://maps.google.com'
    };
  }
}

export async function fetchProjects(category = 'All') {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE}/projects/?category=${encodeURIComponent(category)}`
      : `${API_BASE}/projects/`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load projects');
    const data = await res.json();
    return (data && data.length > 0) ? data : DEFAULT_PROJECTS;
  } catch (err) {
    if (category && category !== 'All') {
      return DEFAULT_PROJECTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return DEFAULT_PROJECTS;
  }
}

export async function fetchProjectDetails(id) {
  try {
    const res = await fetch(`${API_BASE}/projects/${id}/`);
    if (!res.ok) throw new Error('Failed to load project');
    return await res.json();
  } catch (err) {
    return DEFAULT_PROJECTS.find(p => p.id === Number(id)) || DEFAULT_PROJECTS[0];
  }
}

export async function fetchServices() {
  try {
    const res = await fetch(`${API_BASE}/services/`);
    if (!res.ok) throw new Error('Failed to load services');
    const data = await res.json();
    return (data && data.length > 0) ? data : DEFAULT_SERVICES;
  } catch (err) {
    return DEFAULT_SERVICES;
  }
}

export async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_BASE}/testimonials/`);
    if (!res.ok) throw new Error('Failed to load testimonials');
    const data = await res.json();
    return (data && data.length > 0) ? data : DEFAULT_TESTIMONIALS;
  } catch (err) {
    return DEFAULT_TESTIMONIALS;
  }
}

export async function submitContact(formData) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (!res.ok) throw new Error('Failed to submit enquiry');
  return await res.json();
}

export async function transformAIDesign({ room_type, interior_style, mode, original_image }) {
  const res = await fetch(`${API_BASE}/ai/transform/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room_type, interior_style, mode, original_image })
  });
  if (!res.ok) throw new Error('AI generation failed');
  return await res.json();
}

export function getWhatsAppUrl(number, message) {
  let cleanNumber = (number || '918675108994').replace(/[^0-9]/g, '');
  if (cleanNumber.length === 10) {
    cleanNumber = '91' + cleanNumber;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
