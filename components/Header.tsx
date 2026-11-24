// Designed and Developed by Forge9x Ltd
import Link from "next/link";
import { site } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";
import NavLinks from "@/components/NavLinks";

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

          {/* Desktop menu */}
          <nav className="nav nav-desktop" aria-label="Main">
            <NavLinks />
          </nav>

          {/* Phone menu */}
          <MobileMenu />
        </div>
      </header>
    </>
  );
}
