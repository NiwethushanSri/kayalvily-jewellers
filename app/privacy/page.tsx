// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import { getSite, type Site } from "@/lib/content";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: `Privacy & Cookies | ${site.name}` };

type Section = { title: string; points: string[] };

// Describes what the website does today. Update it if forms, analytics or adverts are added.
const buildSections = (site: Site): Section[] => [
  {
    title: "1. Who We Are",
    points: [
      `${site.name}, ${site.address.line1}, ${site.address.line2}, ${site.address.town}, ${site.address.country}.`,
      `For any question about your personal information, call or message us on ${site.phones.primary}.`,
    ],
  },
  {
    title: "2. Information We Receive",
    points: [
      "This website has no accounts, order forms or contact forms, so browsing it does not ask you for personal details.",
      "When you call us or message us on WhatsApp, we receive your phone number, your name if you give it, and whatever you tell us about your enquiry or order.",
      "If you place an order, we also keep the details needed to fulfil it, such as delivery address and payment confirmation.",
    ],
  },
  {
    title: "3. How We Use It",
    points: [
      "To answer your enquiries and give prices.",
      "To process orders, arrange delivery and provide after-sales service.",
      "To keep the business records the law requires.",
      "We do not sell your personal information, and we do not send marketing messages unless you have asked for them.",
    ],
  },
  {
    title: "4. Cookies",
    points: [
      "This website itself does not set cookies, and it does not use analytics or advertising trackers.",
      "The Contact page shows a Google map. Google may set its own cookies when that map loads; they are governed by Google's privacy policy.",
      "If that changes, we will update this page first and ask for your consent where the law requires it.",
    ],
  },
  {
    title: "5. Services That Help Run the Site",
    points: [
      "Hosting: the website is served by Vercel, which receives technical details such as your IP address and browser type in order to deliver the pages.",
      "Fonts: the lettering is loaded from Google Fonts, so Google receives the same kind of technical details when a page loads.",
      "Map: the map on the Contact page and the Get Directions button are provided by Google Maps, which receives the same kind of technical details.",
      "WhatsApp: tapping a WhatsApp button opens WhatsApp, which is run by Meta under its own privacy policy.",
    ],
  },
  {
    title: "6. Sharing",
    points: [
      "We share personal information only where it is needed to complete your order, for example with a delivery or payment provider, or where the law requires us to.",
    ],
  },
  {
    title: "7. How Long We Keep It",
    points: [
      "Enquiries are kept only as long as needed to deal with them.",
      "Order and payment records are kept for as long as accounting and tax rules require.",
    ],
  },
  {
    title: "8. Your Rights",
    points: [
      "You can ask us what information we hold about you, ask us to correct it, or ask us to delete it.",
      "Contact us using the details above and we will respond as soon as we reasonably can.",
    ],
  },
  {
    title: "9. Changes to This Page",
    points: ["We may update this page from time to time. The date below shows when it was last changed."],
  },
];

export default async function PrivacyPage() {
  const site = await getSite();
  const sections = buildSections(site);
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Privacy &amp; Cookies</span>
      </nav>
      <section className="about-hero">
        <div className="container">
          <h1>Privacy &amp; Cookies</h1>
          <p>
            This page explains what personal information {site.name} receives through this website, how it is used, and
            what the site does about cookies.
          </p>
        </div>
      </section>

      <section className="terms-section">
        <div className="container terms-grid">
          {sections.map((s) => (
            <article className="terms-card" key={s.title}>
              <h2>{s.title}</h2>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="container terms-sign">
          <strong>{site.name}</strong>
          <span>Last updated: 24 November 2026</span>
        </div>
      </section>
    </>
  );
}
