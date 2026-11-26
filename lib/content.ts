// Designed and Developed by Forge9x Ltd
// Content the shop can change from /admin without touching code: a few shop details, the social
// usernames and some photos. It is kept as one small JSON file plus image files in Vercel Blob
// (file storage, not a database). Anything not set there falls back to lib/site.ts and /public.
import { del, list, put } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { site as baseSite } from "@/lib/site";
import { TEXT_FIELDS } from "@/lib/texts";

export const CONTENT_TAG = "site-content";
const SETTINGS_PREFIX = "content/settings";

export const IMAGE_SLOTS = [
  {
    id: "hero",
    label: "Main photo (home and About)",
    fallback: "/hero.webp",
    size: "1536 × 1024 px",
    hint: "Use a cut-out picture with a transparent background (PNG or WebP). The jewellery shine only runs on the original photo.",
  },
  { id: "shop", label: "Shop photo (About)", fallback: "/shop.webp", size: "1400 × 1060 px", hint: "A landscape photo works best." },
  { id: "tile-gold", label: "Gold Jewellery tile (home)", fallback: "", size: "1200 × 1000 px", hint: "This is the large tile. The edges are cropped to fit." },
  { id: "tile-diamond", label: "Diamond Jewellery tile (home)", fallback: "", size: "800 × 800 px", hint: "Square. The edges are cropped to fit." },
  { id: "tile-featured", label: "Bridal Collection tile (home)", fallback: "", size: "800 × 800 px", hint: "Square. The edges are cropped to fit." },
  { id: "tile-lightweight", label: "Lightweight Collection tile (home)", fallback: "", size: "800 × 800 px", hint: "Square. The edges are cropped to fit." },
  { id: "tile-mens", label: "Men's Collection tile (home)", fallback: "", size: "800 × 800 px", hint: "Square. The edges are cropped to fit." },
] as const;

export type SlotId = (typeof IMAGE_SLOTS)[number]["id"];
export const isSlotId = (v: unknown): v is SlotId => IMAGE_SLOTS.some((s) => s.id === v);

export const DETAIL_FIELDS = [
  { id: "tagline", label: "Tagline", max: 120 },
  { id: "addressLine1", label: "Address line 1", max: 80 },
  { id: "addressLine2", label: "Address line 2", max: 80 },
  { id: "town", label: "Town", max: 60 },
  { id: "phone", label: "Phone number", max: 20 },
  { id: "whatsapp", label: "WhatsApp number", max: 20 },
  { id: "owner", label: "Owner name", max: 80 },
  { id: "since", label: "Founding year", max: 4 },
] as const;
export type DetailId = (typeof DETAIL_FIELDS)[number]["id"];

export const SOCIAL_FIELDS = [
  { id: "instagram", label: "Instagram", url: (u: string) => `https://www.instagram.com/${u}/` },
  { id: "facebook", label: "Facebook", url: (u: string) => `https://www.facebook.com/${u}` },
  { id: "tiktok", label: "TikTok", url: (u: string) => `https://www.tiktok.com/@${u}` },
] as const;
export type SocialId = (typeof SOCIAL_FIELDS)[number]["id"];

export type Content = {
  details: Partial<Record<DetailId, string>>;
  social: Partial<Record<SocialId, string>>;
  images: Partial<Record<SlotId, string>>;
  text: Record<string, string>; // page wording, keyed by the ids in lib/texts.ts
};

const empty = (): Content => ({ details: {}, social: {}, images: {}, text: {} });

export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Wording is plain text: no control characters, and runs of spaces or line breaks become one space.
export const cleanText = (v: string) => v.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim();

// Keep only known keys with string values, so a damaged or hand-edited file cannot inject anything else.
function normalise(raw: unknown): Content {
  const out = empty();
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, Record<string, unknown> | undefined>;
  for (const f of DETAIL_FIELDS) {
    const v = r.details?.[f.id];
    if (typeof v === "string" && v.trim()) out.details[f.id] = v.trim().slice(0, f.max);
  }
  for (const f of SOCIAL_FIELDS) {
    const v = r.social?.[f.id];
    if (typeof v === "string" && /^[A-Za-z0-9._-]{1,50}$/.test(v)) out.social[f.id] = v;
  }
  for (const s of IMAGE_SLOTS) {
    const v = r.images?.[s.id];
    if (typeof v === "string" && /^https:\/\/[a-z0-9.-]+\.blob\.vercel-storage\.com\//.test(v)) out.images[s.id] = v;
  }
  for (const f of TEXT_FIELDS) {
    const v = r.text?.[f.id];
    if (typeof v === "string" && v.trim()) out.text[f.id] = cleanText(v).slice(0, f.max);
  }
  return out;
}

// Every save writes a brand-new settings file and removes the older ones. Overwriting one file in place
// is not safe here: storage can keep serving the old copy for up to a minute, and the next save would
// then be built on stale data and lose the change before it.
async function settingsFiles() {
  const { blobs } = await list({ prefix: SETTINGS_PREFIX });
  return blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()); // newest first
}

// Reads the newest saved file straight from storage. Used by /admin, which must always see the latest.
export async function readContentFresh(): Promise<Content> {
  if (!storageReady()) return empty();
  try {
    const [latest] = await settingsFiles();
    if (!latest) return empty(); // nothing saved yet: the site shows its built-in content
    const res = await fetch(latest.url, { cache: "no-store" });
    return res.ok ? normalise(await res.json()) : empty();
  } catch {
    // Storage unreachable: fall back to the built-in content rather than break the page.
    return empty();
  }
}

// Cached copy for the public pages. /admin clears it (by tag) after every save.
export const getContent = unstable_cache(readContentFresh, [CONTENT_TAG], { revalidate: 300, tags: [CONTENT_TAG] });

export async function saveContent(content: Content) {
  const saved = await put(`${SETTINGS_PREFIX}.json`, JSON.stringify(normalise(content), null, 2), {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
  });
  const stale = (await settingsFiles()).filter((b) => b.url !== saved.url).map((b) => b.url);
  if (stale.length) await del(stale);
}

const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

// Uploads a replacement photo and returns its address, or an error message to show the admin.
export async function storeImage(slot: SlotId, file: File): Promise<{ url: string } | { error: string }> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) return { error: "Please choose a JPG, PNG, WebP or AVIF picture." };
  if (file.size === 0) return { error: "That file is empty." };
  if (file.size > MAX_IMAGE_BYTES) return { error: "That picture is over 4 MB. Please choose a smaller one." };
  const saved = await put(`images/${slot}.${ext}`, file, {
    access: "public",
    addRandomSuffix: true, // a new address each time, so browsers never show the old picture
    contentType: file.type,
  });
  return { url: saved.url };
}

export async function removeImage(url: string | undefined) {
  if (!url) return;
  try {
    await del(url);
  } catch {
    // Already gone: nothing to clean up.
  }
}

// "@name", "name" or a full profile link all become just "name". Returns "" if it does not look like a username.
export function cleanUsername(input: string) {
  const last = input.trim().replace(/[?#].*$/, "").replace(/\/+$/, "").split("/").pop() ?? "";
  const name = last.replace(/^@/, "");
  return /^[A-Za-z0-9._-]{1,50}$/.test(name) ? name : "";
}

// The shop details the pages should show: saved values where present, built-in ones otherwise.
export async function getSite() {
  const c = await getContent();
  const d = c.details;
  const tagline = d.tagline ?? baseSite.tagline;
  const owner = d.owner ?? baseSite.owner;
  const town = d.town ?? baseSite.address.town;
  // {name}, {town}, {owner} and {tagline} in the wording are filled in from the shop details.
  const tokens: Record<string, string> = { name: baseSite.name, town, owner, tagline };
  const t: Record<string, string> = {};
  for (const f of TEXT_FIELDS) {
    t[f.id] = (c.text?.[f.id] ?? f.def).replace(/\{(name|town|owner|tagline)\}/g, (_, k: string) => tokens[k]);
  }
  return {
    ...baseSite,
    t,
    tagline,
    owner,
    since: d.since ?? baseSite.since,
    address: {
      ...baseSite.address,
      line1: d.addressLine1 ?? baseSite.address.line1,
      line2: d.addressLine2 ?? baseSite.address.line2,
      town,
    },
    phones: {
      ...baseSite.phones,
      primary: d.phone ?? baseSite.phones.primary,
      whatsappLK: d.whatsapp ?? baseSite.phones.whatsappLK,
    },
    // A network with no username keeps the "#" placeholder, which the pages show as not clickable.
    social: SOCIAL_FIELDS.map((f) => ({ label: f.label, href: c.social[f.id] ? f.url(c.social[f.id]!) : "#" })),
    images: c.images,
  };
}
export type Site = Awaited<ReturnType<typeof getSite>>;

// What the map and the "Get directions" button search for.
export const mapQueryOf = (s: Site) => `${s.name}, ${s.address.line1}, ${s.address.town}, ${s.address.country}`;
