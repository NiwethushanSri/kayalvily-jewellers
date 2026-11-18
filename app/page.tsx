import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";
import { productGroups } from "@/lib/products";

const categories = [
  { title: "Gold Jewellery", text: "Necklaces, bangles, chains and earrings in pure gold.", group: "gold" },
  { title: "Diamond Jewellery", text: "Rings, pendants and studs set with certified diamonds.", group: "diamond" },
  { title: "Bridal Collection", text: "Complete bridal sets for your special day.", group: "featured" },
  { title: "Lightweight Collection", text: "Elegant everyday designs that are light to wear.", group: "lightweight" },
  { title: "Men's Collection", text: "Chains, bracelets and rings for men.", group: "mens" },
  { title: "Offers", text: "Seasonal offers and making-charge discounts.", group: "offers" },
].map((c) => ({
  ...c,
  // First Devi photo in the matching section, or undefined to keep the placeholder
  image: productGroups.find((g) => g.id === c.group)?.items[0]?.image,
}));

export default function HomePage() {
  return (
    <>
      <section className="photo-hero home-hero">
        <div className="container">
          <span className="script">Kayalvily Jewellers</span>
          <h1>Gold, Diamond &amp; Bridal</h1>
          <p>{site.tagline}. Visit us in front of the main market in {site.address.town}.</p>
          <div className="cta">
            <Link className="btn" href="/collection">View Collections</Link>
            <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.webp" alt="Models wearing South Indian silk sarees and gold jewellery" className="hero-figure" />
      </section>

      <section>
        <div className="container">
          <h2 className="section-title">Our Collections</h2>
          <p className="section-sub">Browse our range of gold, diamond and bridal jewellery.</p>
          <div className="grid">
            {categories.map((c) => (
              <div className="card" key={c.title}>
                {c.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt={c.title} className="home-card-img" loading="lazy" />
                ) : (
                  <div className="placeholder-img">Photo coming soon</div>
                )}
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="feature-list">
            <div className="feature"><FeatureIcon name="shield" /><h4>Trusted Quality</h4><p>Genuine gold and certified stones.</p></div>
            <div className="feature"><FeatureIcon name="gem" /><h4>Skilled Craftsmanship</h4><p>Designs made by experienced artisans.</p></div>
            <div className="feature"><FeatureIcon name="heart" /><h4>Personal Service</h4><p>Friendly help to find the right piece.</p></div>
            <div className="feature"><FeatureIcon name="chat" /><h4>Easy Enquiries</h4><p>Reach us by phone or WhatsApp any time.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
