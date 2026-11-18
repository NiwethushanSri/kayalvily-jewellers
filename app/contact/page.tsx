import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: `Contact | ${site.name}` };

export default function ContactPage() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <div className="crumbs">Home &gt; Contact</div>
          <h1>Contact Us</h1>
        </div>
      </div>
      <section>
        <div className="container grid">
          <div className="contact-box">
            <h3>Visit the shop</h3>
            <p>{site.address.line1}</p>
            <p>{site.address.line2}</p>
            <p>{site.address.town}, {site.address.country}</p>
            <p>Owner: {site.owner}</p>
          </div>
          <div className="contact-box">
            <h3>Call or message</h3>
            <p>Phone: <a href={`tel:${site.phones.primary}`}>{site.phones.primary}</a></p>
            <div className="contact-row">
              <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
