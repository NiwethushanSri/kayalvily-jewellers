import Link from "next/link";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo" aria-label={`${site.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.webp" alt={site.name} className="logo-img" />
          </Link>
          <nav className="nav" aria-label="Main">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={item.href.startsWith("/about") ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
