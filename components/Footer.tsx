// Designed and Developed by Forge9x Ltd
import Link from "next/link";
import { site, spacedPhone, whatsappLink } from "@/lib/site";
import SocialIcon from "@/components/SocialIcon";

const spaced = spacedPhone;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="social-row">
          {site.social.map((s) =>
            // No link yet: show the logo but leave it unclickable
            s.href === "#" ? (
              <span key={s.label} className="social-off" role="img" aria-label={s.label} title={`${s.label} (coming soon)`}>
                <SocialIcon name={s.label} />
              </span>
            ) : (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                <SocialIcon name={s.label} />
              </a>
            ),
          )}
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {site.footerNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="footer-contact">
          <span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-7-6.200-7-11a7 7 0 0 1 14 0c0 4.800-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            {site.address.line1}, {site.address.line2}, {site.address.town}, {site.address.country}
          </span>
          <a href={`tel:${site.phones.primary}`} aria-label={`Call ${spaced(site.phones.primary)}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.900v3a2 2 0 0 1-2.200 2 19.800 19.800 0 0 1-8.600-3.100 19.500 19.500 0 0 1-6-6A19.800 19.800 0 0 1 2.100 4.200 2 2 0 0 1 4.100 2h3a2 2 0 0 1 2 1.700c.1 1 .4 1.900.7 2.800a2 2 0 0 1-.5 2.100L8.100 9.900a16 16 0 0 0 6 6l1.300-1.300a2 2 0 0 1 2.100-.4c.9.3 1.800.6 2.800.7a2 2 0 0 1 1.700 2z" />
            </svg>
            {spaced(site.phones.primary)}
          </a>
          <a
            href={whatsappLink(site.phones.whatsappLK)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${spaced(site.phones.whatsappLK)}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.030-.967-.273-.099-.471-.148-.670.150-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.150-1.255-.463-2.390-1.475-.883-.788-1.480-1.761-1.653-2.059-.173-.297-.018-.458.130-.606.134-.133.298-.347.446-.520.149-.174.198-.298.298-.497.099-.198.050-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.500-.669-.510-.173-.008-.371-.010-.570-.010-.198 0-.520.074-.792.372-.272.297-1.040 1.016-1.040 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.200 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.360.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.870 9.870 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.860 9.860 0 01-1.510-5.260c.001-5.450 4.436-9.884 9.888-9.884 2.640 0 5.122 1.030 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.450-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.050 0C5.495 0 .160 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.480-8.413z" />
            </svg>
            {spaced(site.phones.whatsappLK)}
          </a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} {site.name}. All Rights Reserved.
          <span className="sep">|</span>
          <Link href="/terms">Terms of use</Link>
          <span className="sep">|</span>
          <Link href="/privacy">Privacy &amp; cookies</Link>
          <span className="sep">|</span>
          <a href="#top">Go to top</a>
        </div>
      </div>
      {/* Light strip so the Forge9x logo keeps its own blue and yellow */}
      <p className="developed-by">
        <a href="https://forge9x.co.uk/" target="_blank" rel="noopener noreferrer" aria-label="Designed and developed by Forge9x">
          <span>Designed &amp; Developed by</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/forge9x.webp" alt="Forge9x" width={65} height={18} />
        </a>
      </p>
    </footer>
  );
}
