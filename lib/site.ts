// Designed and Developed by Forge9x Ltd
// Single source of truth for business details. Edit here, the whole site updates.
export const site = {
  name: "Kayalvily Jewellers",
  shortName: "Kayalvily",
  tagline: "Gold, diamond and bridal jewellery crafted with care",
  owner: "Samiththampy Supramaniyam",
  since: "[Year]", // Placeholder: replace with the year the business started
  address: {
    line1: "Kanagapuram Road",
    line2: "In front of Kilinochchi Main Market",
    town: "Kilinochchi",
    country: "Sri Lanka",
  },
  phones: {
    // Stored without spaces so they work in tel: and wa.me links
    primary: "+94775792414",
    whatsappLK: "+94768622389",
    whatsappUK: "+447733709157",
  },
  // Placeholder: gold rates change daily. Replace with a live feed or update manually.
  goldRate: { karat22: "TBC", karat24: "TBC", currency: "LKR", unit: "g" },
  // Main menu, mirrors the reference site's category order
  nav: [
    { href: "/collection#gold", label: "Gold Jewellery" },
    { href: "/collection#diamond", label: "Diamond Jewellery" },
    { href: "/collection#lightweight", label: "Light Weight Collection" },
    { href: "/collection#featured", label: "Featured Collection" },
    { href: "/collection#mens", label: "Mens Collection" },
    { href: "/collection#offers", label: "Offers" },
    { href: "/about", label: "About" },
  ],
  footerNav: [
    { href: "/about", label: "About Us" },
    { href: "/collection", label: "Collections" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact Us" },
  ],
  social: [
    { href: "#", label: "Instagram" },
    { href: "#", label: "Facebook" },
    { href: "#", label: "TikTok" },
  ],
};

// "+94775792414" reads better as "+94 77 579 2414". Numbers in another shape are shown as stored.
export function spacedPhone(phone: string) {
  return phone.replace(/^(\+94)(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4");
}

// What the map and the "Get directions" button search for. Replace with the shop's exact Google Maps pin when known.
export const mapQuery = `${site.name}, ${site.address.line1}, ${site.address.town}, ${site.address.country}`;

export function whatsappLink(number: string, message = "Hello, I would like to enquire about your jewellery.") {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}
