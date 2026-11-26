// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";

export const metadata: Metadata = { title: `Services | ${site.name}` };

// The icon for each of the six services; their wording comes from /admin (lib/texts.ts).
const icons = ["gem", "heart", "calendar", "shield", "chat", "gem"] as const;

export default async function ServicesPage() {
  const site = await getSite();
  const services = icons.map((icon, i) => ({ icon, title: site.t[`service-${i + 1}-title`], text: site.t[`service-${i + 1}-text`] }));
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Services</span>
      </nav>
      <section className="about-hero">
        <div className="container">
          <h1>{site.t["services-title"]}</h1>
          <p>{site.t["services-intro"]}</p>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <div className="feature-list services-grid">
            {services.map((s) => (
              <div className="feature service-card" key={s.icon + s.title}>
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
          <h2>{site.t["services-cta-title"]}</h2>
          <p>{site.t["services-cta-text"]}</p>
          <a className="btn" href={whatsappLink(site.phones.whatsappLK, "Hello, I would like to enquire about your services.")} target="_blank" rel="noopener noreferrer">
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
