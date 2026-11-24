// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import { productGroups } from "@/lib/products";

export const metadata: Metadata = { title: `Collections | ${site.name}` };

// Offers has no photos on the Devi site yet, so it shows a WhatsApp prompt.
const offers = { id: "offers", title: "Offers", items: [] as { image: string; name: string }[] };
const allGroups = [...productGroups, offers];

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  const active = allGroups.find((g) => g.id === cat) ?? allGroups[0];

  const site = await getSite();
  return (
    <>
      <nav className="breadcrumb container" aria-label="Breadcrumb">
        <Link href="/">Home</Link> &gt; <span>Collections</span>
      </nav>
      <section className="about-hero">
        <div className="container">
          <h1>Our Collections</h1>
          <p>Ask about any piece on WhatsApp. Gold prices change daily, so we confirm the final price with you.</p>
        </div>
      </section>

      <section className="shop-section">
        <div className="container shop-layout">
          <aside className="shop-filter" aria-label="Categories">
            <h3>Categories</h3>
            {allGroups.map((c) => (
              <Link
                key={c.id}
                href={`/collection?cat=${c.id}`}
                className={`filter-row${c.id === active.id ? " active" : ""}`}
                aria-current={c.id === active.id ? "page" : undefined}
              >
                {c.title}
              </Link>
            ))}
          </aside>
          <div>
            <div className="shop-head">
              <h2>{active.title}</h2>
              <span>{active.items.length} Results</span>
            </div>
            {active.items.length === 0 ? (
              <div className="card offers-empty">
                <p>New offers coming soon. Message us on WhatsApp to ask about current offers.</p>
                <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK, "Hello, I would like to ask about current offers.")} target="_blank" rel="noopener noreferrer">
                  Ask about offers
                </a>
              </div>
            ) : (
              <div className="shop-grid">
                {active.items.map((p) => (
                  <div className="shop-card" key={`${active.id}-${p.name}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} className="product-img" loading="lazy" />
                    <h3>{p.name}</h3>
                    <p>Price on enquiry</p>
                    <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK, `Hello, I am interested in: ${p.name}`)} target="_blank" rel="noopener noreferrer">
                      Enquire
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
