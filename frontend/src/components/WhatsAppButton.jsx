import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '../api';

export default function WhatsAppButton({ settings }) {
  const defaultMessage = "Hi, I found your interior design website. I would like to discuss an interior/carpentry project.";
  const url = getWhatsAppUrl(settings?.whatsapp_number, defaultMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct WhatsApp Enquiry"
      className="floating-whatsapp"
    >
      <MessageSquare size={24} fill="#FFFFFF" />
      <span className="floating-whatsapp-text">Chat with Us</span>
    </a>
  );
}
