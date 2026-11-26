// Designed and Developed by Forge9x Ltd
import Link from "next/link";
import { getSite, type SlotId } from "@/lib/content";
import { site, whatsappLink } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";
import HeroArt from "@/components/HeroArt";
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

export default async function HomePage() {
  const site = await getSite();
  return (
    <>
      <section className="photo-hero home-hero">
        <div className="container">
          <span className="script">
            Kayalvily Jewellers
          </span>
          <h1>{site.t["home-heading"]}</h1>
          <p>{site.t["home-intro"]}</p>
          <div className="cta">
            <Link className="btn" href="/collection">View Collections</Link>
            <a className="btn whatsapp" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
              Enquire on WhatsApp
            </a>
          </div>
        </div>
        <HeroArt />
      </section>

      <section className="home-section">
        <div className="container">
          <h2 className="section-title">{site.t["collections-title"]}</h2>
          <p className="section-sub">{site.t["collections-intro"]}</p>
          <div className="tiles">
            {categories
              .map((c) => ({
                ...c,
                title: site.t[`tile-${c.group}-title`],
                text: site.t[`tile-${c.group}-text`],
                image: site.images[`tile-${c.group}` as SlotId] ?? c.image,
              }))
              .map((c) => (
              <Link className={c.image ? "tile" : "tile tile-plain"} href={`/collection?cat=${c.group}`} key={c.group}>
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
          <h2 className="section-title">{site.t["why-title"]}</h2>
          <div className="feature-list">
            <div className="feature"><FeatureIcon name="shield" /><h4>{site.t["why-1-title"]}</h4><p>{site.t["why-1-text"]}</p></div>
            <div className="feature"><FeatureIcon name="gem" /><h4>{site.t["why-2-title"]}</h4><p>{site.t["why-2-text"]}</p></div>
            <div className="feature"><FeatureIcon name="heart" /><h4>{site.t["why-3-title"]}</h4><p>{site.t["why-3-text"]}</p></div>
            <div className="feature"><FeatureIcon name="chat" /><h4>{site.t["why-4-title"]}</h4><p>{site.t["why-4-text"]}</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
