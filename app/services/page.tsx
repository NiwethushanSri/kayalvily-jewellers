// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";

export const metadata: Metadata = { title: `Services | ${site.name}` };

// Suggested services. Please confirm or edit this list before publishing.
const services = [
  { icon: "gem" as const, title: "Custom Jewellery Design", text: "Bring your idea and we will craft a piece to your design, in gold or with diamonds." },
  { icon: "heart" as const, title: "Bridal Sets", text: "Complete bridal jewellery for your wedding day, chosen with you in the shop." },
  { icon: "calendar" as const, title: "Gifts for Milestones", text: "Gold gifts for birthdays, anniversaries, weddings and other special occasions." },
  { icon: "shield" as const, title: "Repairs and Resizing", text: "Repairs, polishing and resizing for gold pieces, done with care." },
  { icon: "chat" as const, title: "Old Gold Exchange", text: "Exchange your old gold towards a new piece, priced at the day's gold rate." },
  { icon: "gem" as const, title: "Diamond Advice", text: "Guidance on diamond quality and choosing the right stone for your budget." },
];

export default function ServicesPage() {
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Services</span>
      </nav>
      <section className="about-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>From custom designs to everyday repairs, we help you find jewellery that marks the moments that matter.</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="feature-list services-grid">
            {services.map((s) => (
              <div className="feature service-card" key={s.title}>
                <FeatureIcon name={s.icon} />
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container cta-band">
          <h2>Ready to start?</h2>
          <p>Send us a message on WhatsApp or visit the shop in {site.address.town}.</p>
          <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK, "Hello, I would like to enquire about your services.")} target="_blank" rel="noopener noreferrer">
            WhatsApp us
          </a>
        </div>
      </section>
    </>
  );
}
