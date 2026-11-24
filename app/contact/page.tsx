// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import Link from "next/link";
import { mapQuery, site, spacedPhone, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: `Contact | ${site.name}` };

const q = encodeURIComponent(mapQuery);
const mapEmbed = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export default function ContactPage() {
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Contact</span>
      </nav>
      <section className="about-hero contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Come and see the collection in person, or call or message us and we will be glad to help.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container contact-layout">
          <div className="contact-map">
            <iframe
              src={mapEmbed}
              title={`Map showing ${site.name}, ${site.address.town}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="contact-card">
            <h2>Visit the shop</h2>
            <ul className="contact-list">
              <li>
                <svg {...stroke}>
                  <path d="M12 21s-7-6.200-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <span>
                  <strong>{site.name}</strong>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.town}, {site.address.country}
                </span>
              </li>
              <li>
                <svg {...stroke}>
                  <path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z" />
                </svg>
                <span>
                  <strong>Phone</strong>
                  <a href={`tel:${site.phones.primary}`}>{spacedPhone(site.phones.primary)}</a>
                </span>
              </li>
              <li>
                <svg {...stroke}>
                  <path d="M21 11.500a8.400 8.400 0 0 1-12.300 7.400L3 21l2.100-5.700A8.400 8.400 0 1 1 21 11.500z" />
                </svg>
                <span>
                  <strong>WhatsApp</strong>
                  <a href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
                    {spacedPhone(site.phones.whatsappLK)}
                  </a>
                </span>
              </li>
              <li>
                <svg {...stroke}>
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.600-6.500 8-6.500s8 2.500 8 6.500" />
                </svg>
                <span>
                  <strong>Owner</strong>
                  {site.owner}
                </span>
              </li>
            </ul>
            <div className="contact-actions">
              <a className="btn" href={directions} target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
              <a className="btn outline" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
