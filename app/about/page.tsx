// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import FeatureIcon from "@/components/FeatureIcon";

export const metadata: Metadata = { title: `About Us | ${site.name}` };

export default function AboutPage() {
  return (
    <>
      {/* Hero: full-width band with the model photo on the right */}
      <section className="photo-hero">
        <nav className="breadcrumb container" aria-label="Breadcrumb">
          <Link href="/">Home</Link> &gt;&gt; <span>About Us</span>
        </nav>
        <div className="container">
          <h1>A Heritage Worth</h1>
          <span className="script">Celebrating</span>
          <p>From a trusted name in Kilinochchi, {site.name} celebrates life&apos;s milestones with jewellery crafted with care, beauty and lasting value.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.webp" alt="Models wearing South Indian silk sarees and gold jewellery" className="hero-figure" />
      </section>

      {/* Story */}
      <section>
        <div className="container story">
          <div>
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
          <div className="story-images">
            <div className="placeholder-img tall">Photo coming soon</div>
            <div className="placeholder-img">Photo coming soon</div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Trust Beyond Every Purchase</h2>
          <div className="feature-list four">
            <div className="feature"><FeatureIcon name="calendar" /><h4>Since {site.since}</h4><p>Serving customers in Kilinochchi.</p></div>
            <div className="feature"><FeatureIcon name="shield" /><h4>Trusted Heritage</h4><p>Genuine jewellery and honest pricing.</p></div>
            <div className="feature"><FeatureIcon name="gem" /><h4>Skilled Craftsmanship</h4><p>Careful work in every design.</p></div>
            <div className="feature"><FeatureIcon name="heart" /><h4>Enduring Relationships</h4><p>Families who return for every milestone.</p></div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section>
        <div className="container">
          <h2 className="section-title">Our Location</h2>
          <div className="location-grid">
            <div className="card location-card">
              <h3>Kilinochchi, Sri Lanka</h3>
              <p>{site.address.line1}, {site.address.line2}</p>
              <p>{site.address.town}, {site.address.country}</p>
              <a className="btn outline" href="https://www.google.com/maps/search/?api=1&query=Kayalvily+Jewellers+Kilinochchi" target="_blank" rel="noopener noreferrer">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="social-block">
        <div className="container">
          <h2 className="section-title">Stay Updated with Our Latest Collections</h2>
          <div className="social-row">
            {site.social.map((s) => (
              <a key={s.label} className="btn outline" href={s.href}>{s.label}</a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
