// Designed and Developed by Forge9x Ltd
// The page wording the shop can change from /admin. Each entry carries the built-in wording, which is
// what the site shows until something else is saved (and again if the box is emptied).
// Wording may use {name}, {town}, {owner} and {tagline}; they are filled in from the shop details.

export type TextField = { id: string; label: string; def: string; max: number; long?: boolean };
export type TextGroup = { id: string; label: string; fields: TextField[] };

const line = (id: string, label: string, def: string): TextField => ({ id, label, def, max: 90 });
const para = (id: string, label: string, def: string, max = 600): TextField => ({ id, label, def, max, long: true });

// A heading with a sentence under it, as used by tiles, "why choose us" items and services.
const pair = (id: string, label: string, title: string, text: string): TextField[] => [
  line(`${id}-title`, `${label}: heading`, title),
  para(`${id}-text`, `${label}: text`, text, 200),
];

export const TEXT_GROUPS: TextGroup[] = [
  {
    id: "home",
    label: "Home page",
    fields: [
      line("home-heading", "Main heading", "Gold, Diamond & Bridal"),
      para("home-intro", "Text under the main heading", "{tagline}. Visit us in front of the main market in {town}.", 240),
      line("collections-title", "Collections heading", "Our Collections"),
      para("collections-intro", "Collections text", "Browse our range of gold, diamond and bridal jewellery.", 200),
      ...pair("tile-gold", "Gold tile", "Gold Jewellery", "Necklaces, bangles, chains and earrings in pure gold."),
      ...pair("tile-diamond", "Diamond tile", "Diamond Jewellery", "Rings, pendants and studs set with certified diamonds."),
      ...pair("tile-featured", "Bridal tile", "Bridal Collection", "Complete bridal sets for your special day."),
      ...pair("tile-lightweight", "Lightweight tile", "Lightweight Collection", "Elegant everyday designs that are light to wear."),
      ...pair("tile-mens", "Men's tile", "Men's Collection", "Chains, bracelets and rings for men."),
      ...pair("tile-offers", "Offers tile", "Offers", "Seasonal offers and making-charge discounts."),
      line("why-title", "Why Choose Us heading", "Why Choose Us"),
      ...pair("why-1", "Reason 1", "Trusted Quality", "Genuine gold and certified stones."),
      ...pair("why-2", "Reason 2", "Skilled Craftsmanship", "Designs made by experienced artisans."),
      ...pair("why-3", "Reason 3", "Personal Service", "Friendly help to find the right piece."),
      ...pair("why-4", "Reason 4", "Easy Enquiries", "Reach us by phone or WhatsApp any time."),
    ],
  },
  {
    id: "about",
    label: "About page",
    fields: [
      line("about-heading", "Main heading", "A Heritage Worth"),
      line("about-script", "Handwritten word under the heading", "Celebrating"),
      para(
        "about-intro",
        "Text under the main heading",
        "From a trusted name in Kilinochchi, {name} celebrates life's milestones with jewellery crafted with care, beauty and lasting value.",
        300,
      ),
      line("story-title", "Story heading", "The Story Behind the Sparkle"),
      para(
        "story-1",
        "Story: first paragraph",
        "In the heart of Kilinochchi, on Kanagapuram Road opposite the main market, {name} has become a place where families come to choose jewellery for life's most important moments. Every piece we sell, from everyday gold to bridal sets, is chosen with the same care our customers expect from us.",
      ),
      para(
        "story-2",
        "Story: second paragraph",
        "{owner} built the shop on a simple idea: honest pricing, genuine gold and diamonds, and a friendly welcome for every customer. Whether you are buying for a wedding, a festival or a gift for someone special, we take the time to help you find a piece you will treasure for years.",
      ),
      line("trust-title", "Trust heading", "Trust Beyond Every Purchase"),
      para("trust-1-text", "Trust 1 (founding year): text", "Serving customers in Kilinochchi.", 200),
      ...pair("trust-2", "Trust 2", "Trusted Heritage", "Genuine jewellery and honest pricing."),
      ...pair("trust-3", "Trust 3", "Skilled Craftsmanship", "Careful work in every design."),
      ...pair("trust-4", "Trust 4", "Enduring Relationships", "Families who return for every milestone."),
      line("social-title", "Social media heading", "Stay Updated with Our Latest Collections"),
    ],
  },
  {
    id: "services",
    label: "Services page",
    fields: [
      line("services-title", "Main heading", "Our Services"),
      para(
        "services-intro",
        "Text under the main heading",
        "From custom designs to everyday repairs, we help you find jewellery that marks the moments that matter.",
        300,
      ),
      ...pair("service-1", "Service 1", "Custom Jewellery Design", "Bring your idea and we will craft a piece to your design, in gold or with diamonds."),
      ...pair("service-2", "Service 2", "Bridal Sets", "Complete bridal jewellery for your wedding day, chosen with you in the shop."),
      ...pair("service-3", "Service 3", "Gifts for Milestones", "Gold gifts for birthdays, anniversaries, weddings and other special occasions."),
      ...pair("service-4", "Service 4", "Repairs and Resizing", "Repairs, polishing and resizing for gold pieces, done with care."),
      ...pair("service-5", "Service 5", "Old Gold Exchange", "Exchange your old gold towards a new piece, priced at the day's gold rate."),
      ...pair("service-6", "Service 6", "Diamond Advice", "Guidance on diamond quality and choosing the right stone for your budget."),
      line("services-cta-title", "Closing heading", "Ready to start?"),
      para("services-cta-text", "Closing text", "Send us a message on WhatsApp or visit the shop in {town}.", 200),
    ],
  },
];

export const TEXT_FIELDS: TextField[] = TEXT_GROUPS.flatMap((g) => g.fields);
