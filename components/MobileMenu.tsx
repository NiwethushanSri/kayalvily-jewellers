"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

// Phone menu. A side panel opens on tap and closes again when a link is tapped.
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <details className="mobile-menu" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary aria-label="Open menu">
        <span className="burger" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </summary>
      <nav className="mobile-nav" aria-label="Main mobile">
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
