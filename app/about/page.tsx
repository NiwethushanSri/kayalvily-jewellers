// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import { getSite, mapQueryOf } from "@/lib/content";
import Link from "next/link";
import { site } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";
import HeroArt from "@/components/HeroArt";
import SocialIcon from "@/components/SocialIcon";

export const metadata: Metadata = { title: `About Us | ${site.name}` };

export default async function AboutPage() {
  const site = await getSite();
  // Until a founding year is set, the first trust block avoids showing a placeholder.
  const sinceTitle = site.since.startsWith("[") ? "Rooted in Kilinochchi" : `Since ${site.since}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQueryOf(site))}`;
  return (
    <>
      {/* Hero: full-width band with the model photo on the right */}
      <section className="photo-hero home-hero about-top">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> &gt; <span>About Us</span>
          </nav>
          <h1>A Heritage Worth</h1>
          <span className="script">Celebrating</span>
          <p>From a trusted name in Kilinochchi, {site.name} celebrates life&apos;s milestones with jewellery crafted with care, beauty and lasting value.</p>
        </div>
        <HeroArt />
      </section>

      {/* Story */}
      <section className="home-section">
        <div className="container story">
          <div className="story-text">
            <h2>The Story Behind the Sparkle</h2>
            <p>
              In the heart of Kilinochchi, on Kanagapuram Road opposite the main market, {site.name} has become
              a place where families come to choose jewellery for life&apos;s most important moments. Every
              piece we sell, from everyday gold to bridal sets, is chosen with the same care our customers
              expect from us.
            </p>
            <p>
              {site.owner} built the shop on a simple idea: honest pricing, genuine gold and diamonds, and a
              friendly welcome for every customer. Whether you are buying for a wedding, a festival or a gift
              for someone special, we take the time to help you find a piece you will treasure for years.
            </p>
          </div>
          <figure className="shop-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.images.shop ?? "/shop.webp"}
              alt={`The ${site.name} shop front on ${site.address.line1}, ${site.address.town}`}
              loading="lazy"
            />
            <figcaption>Our shop on {site.address.line1}, {site.address.town}</figcaption>
          </figure>
        </div>
      </section>

      {/* Trust */}
      <section className="features home-section home-features">
        <div className="container">
          <h2 className="section-title">Trust Beyond Every Purchase</h2>
          <div className="feature-list four">
            <div className="feature"><FeatureIcon name="calendar" /><h4>{sinceTitle}</h4><p>Serving customers in Kilinochchi.</p></div>
            <div className="feature"><FeatureIcon name="shield" /><h4>Trusted Heritage</h4><p>Genuine jewellery and honest pricing.</p></div>
            <div className="feature"><FeatureIcon name="gem" /><h4>Skilled Craftsmanship</h4><p>Careful work in every design.</p></div>
            <div className="feature"><FeatureIcon name="heart" /><h4>Enduring Relationships</h4><p>Families who return for every milestone.</p></div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="home-section">
        <div className="container">
          <div className="visit-band">
            <div>
              <h2>Our Location</h2>
              <p>
                {site.address.line1}, {site.address.line2}
                <br />
                {site.address.town}, {site.address.country}
              </p>
            </div>
            <div className="visit-actions">
              <a className="btn" href={directions} target="_blank" rel="noopener noreferrer">Get Directions</a>
              <Link className="btn outline" href="/contact">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="social-block home-section">
        <div className="container">
          <h2 className="section-title">Stay Updated with Our Latest Collections</h2>
          <div className="social-row">
            {site.social.map((s) =>
              // No link yet: show the name but leave it unclickable
              s.href === "#" ? (
                <span key={s.label} className="social-chip social-off" title={`${s.label} (coming soon)`}>
                  <SocialIcon name={s.label} />
                  {s.label}
                </span>
              ) : (
                <a key={s.label} className="social-chip" href={s.href} target="_blank" rel="noopener noreferrer">
                  <SocialIcon name={s.label} />
                  {s.label}
                </a>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}
