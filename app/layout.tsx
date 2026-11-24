// Designed and Developed by Forge9x Ltd
import type { Metadata } from "next";
import "./globals.css";
import { site, whatsappLink } from "@/lib/site";
import { getGoldRates } from "@/lib/goldRate";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://kayalvily-jewellers.example"),
  title: `${site.name} | Gold, Diamond & Bridal Jewellery, Kilinochchi`,
  description: site.tagline,
  authors: [{ name: "Forge9x Ltd", url: "https://forge9x.co.uk/" }],
  creator: "Designed and Developed by Forge9x Ltd",
  icons: { icon: "/logo.webp", apple: "/logo.webp" },
  openGraph: {
    title: `${site.name} | Gold, Diamond & Bridal Jewellery`,
    description: site.tagline,
    siteName: site.name,
    type: "website",
    images: [{ url: "/logo.webp", alt: `${site.name} logo` }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/logo.webp"],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const rates = await getGoldRates();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Ephesis&family=Poppins:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <div id="top" />
        <div className="ratebar">
          <div className="container ratebar-inner">
            <span className="rate-label">Gold Rate</span>
            <span className="rate-label">Today&apos;s Price</span>
            <span>Gold (22KT) – <strong>{rates.karat22}</strong> {site.goldRate.currency}/{site.goldRate.unit}</span>
            <span>Gold (24KT) – <strong>{rates.karat24}</strong> {site.goldRate.currency}/{site.goldRate.unit}</span>
            {rates.asOf && <span className="rate-source">Source: CBSL, {rates.asOf}</span>}
          </div>
        </div>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <a
          className="wa-float"
          href={whatsappLink(site.phones.whatsappLK)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          title="Chat with us on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {/* A plain message bubble with three dots; the button still opens WhatsApp */}
            <path d="M5 3.5h14A2.500 2.500 0 0 1 21.500 6v9A2.500 2.500 0 0 1 19 17.500h-8.200L6 21.300v-3.800H5A2.500 2.500 0 0 1 2.500 15V6A2.500 2.500 0 0 1 5 3.500z" />
            <circle cx="8" cy="10.5" r="1.25" fill="#25d366" />
            <circle cx="12" cy="10.5" r="1.25" fill="#25d366" />
            <circle cx="16" cy="10.5" r="1.25" fill="#25d366" />
          </svg>
        </a>
      </body>
    </html>
  );
}
