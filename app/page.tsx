// Designed and Developed by Forge9x Ltd
import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";
import { productGroups } from "@/lib/products";

const categories = [
  { title: "Gold Jewellery", text: "Necklaces, bangles, chains and earrings in pure gold.", group: "gold" },
  { title: "Diamond Jewellery", text: "Rings, pendants and studs set with certified diamonds.", group: "diamond" },
  { title: "Bridal Collection", text: "Complete bridal sets for your special day.", group: "featured", pick: 2 },
  { title: "Lightweight Collection", text: "Elegant everyday designs that are light to wear.", group: "lightweight" },
  { title: "Men's Collection", text: "Chains, bracelets and rings for men.", group: "mens" },
  { title: "Offers", text: "Seasonal offers and making-charge discounts.", group: "offers" },
].map((c: { title: string; text: string; group: string; pick?: number }) => ({
  ...c,
  // A photo from the matching section (the first unless "pick" says otherwise), or undefined for a plain tile
  image: productGroups.find((g) => g.id === c.group)?.items[c.pick ?? 0]?.image,
}));

// Glints of light on the jewellery in the hero photo.
// [left %, top %, delay s, cycle s, size, tilt deg]. Mixed cycle lengths keep them from flashing in step.
const sparkles: [number, number, number, number, number, number][] = [
  [19.5, 33, 0.0, 4.3, 1.0, 12], [14.5, 50, 1.7, 5.9, 0.7, -8], [17.5, 61, 0.9, 5.1, 1.2, 20], [23, 63, 2.6, 6.7, 0.8, 5],
  [50.5, 30, 1.2, 5.3, 0.9, -15], [46, 47, 2.9, 4.7, 0.7, 10], [50.5, 58, 0.4, 6.1, 1.3, 0], [49, 78, 2.1, 5.5, 1.0, 25], [62.5, 86, 3.3, 7.1, 0.8, -10],
  [74, 13, 0.7, 6.3, 0.8, 18], [84, 21, 2.4, 4.9, 0.7, -5], [82, 31, 1.5, 5.7, 1.1, 8], [81.5, 47, 3.0, 4.1, 1.3, -20], [81, 58, 0.2, 6.9, 1.0, 15], [84, 80, 1.9, 5.2, 0.8, 0],
];

export default function HomePage() {
  return (
    <>
      <section className="photo-hero home-hero">
        <div className="container">
          <span className="script">
            Kayalvily Jewellers
          </span>
          <h1>Gold, Diamond &amp; Bridal</h1>
          <p>{site.tagline}. Visit us in front of the main market in {site.address.town}.</p>
          <div className="cta">
            <Link className="btn" href="/collection">View Collections</Link>
            <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
        <div className="hero-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.webp" alt="Models wearing South Indian silk sarees and gold jewellery" />
          {sparkles.map(([x, y, delay, cycle, size, tilt]) => (
            <span
              key={`${x}-${y}`}
              className="sparkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${(cycle * 0.6).toFixed(2)}s`,
                ["--k" as string]: size,
                rotate: `${tilt}deg`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="container">
          <h2 className="section-title">Our Collections</h2>
          <p className="section-sub">Browse our range of gold, diamond and bridal jewellery.</p>
          <div className="tiles">
            {categories.map((c) => (
              <Link className={c.image ? "tile" : "tile tile-plain"} href={`/collection#${c.group}`} key={c.title}>
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={c.image} alt="" loading="lazy" />
                )}
                <span className="tile-cap">
                  <span className="tile-title">{c.title}</span>
                  <span className="tile-text">{c.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features home-section home-features">
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
