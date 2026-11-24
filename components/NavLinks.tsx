// Designed and Developed by Forge9x Ltd
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// Desktop menu links. A link is marked as the current page only when its path matches the address,
// so the collection category links (which share one path) are never all highlighted at once.
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {site.nav.map((item) => {
        const path = item.href.split(/[?#]/)[0];
        const current = !item.href.includes("?") && path === pathname;
        return (
          <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
