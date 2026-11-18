import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-row">
          {site.social.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}>{s.label}</a>
          ))}
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {site.footerNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <p className="footer-contact">
          {site.address.line1}, {site.address.line2}, {site.address.town}, {site.address.country}
          <br />
          Phone: <a href={`tel:${site.phones.primary}`}>{site.phones.primary}</a> ·{" "}
          <a href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </p>
        <div className="copyright">
          © {new Date().getFullYear()} {site.name.toUpperCase()}. ALL RIGHTS RESERVED.
          <span className="sep">|</span>
          <Link href="/terms">Terms of use</Link>
          <span className="sep">|</span>
          <a href="#top">Go to top</a>
        </div>
        <p className="developed-by">
          Developed by{" "}
          <a href="https://forge9x.co.uk/" target="_blank" rel="noopener noreferrer">Forge9x</a>
        </p>
      </div>
    </footer>
  );
}
