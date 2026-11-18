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
        <a className="wa-float" href={whatsappLink(site.phones.whatsappLK)} target="_blank" rel="noopener noreferrer">
          WhatsApp us
        </a>
      </body>
    </html>
  );
}
