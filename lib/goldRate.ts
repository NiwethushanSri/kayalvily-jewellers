// Daily gold rate for the top bar.
// Source: Central Bank of Sri Lanka, Daily Gold Rates (XAU per troy ounce, in LKR).
// https://www.cbsl.gov.lk/en/rates-and-indicators/exchange-rates/daily-gold-rates
// The figure is converted to LKR per gram for 24KT, and 22KT is 22/24 of that.
// Optional: GOLD_MARKUP_PERCENT in .env.local adds a shop margin, e.g. "3" for 3%.
// Results are cached for 6 hours by Next.js.

const TROY_OUNCE_GRAMS = 31.1035;
const REVALIDATE_SECONDS = 6 * 60 * 60;
const CBSL_RESULTS_URL = "https://www.cbsl.gov.lk/cbsl_custom/exrates/exrates_results.php";

export type GoldRates = {
  karat22: string; // LKR per gram, or "TBC" if unavailable
  karat24: string;
  asOf: string | null; // date of the CBSL figure, YYYY-MM-DD
  live: boolean;
};

const fallback: GoldRates = { karat22: "TBC", karat24: "TBC", asOf: null, live: false };

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function getGoldRates(): Promise<GoldRates> {
  try {
    const end = new Date();
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const body = new URLSearchParams({
      rangeType: "dates",
      txtStart: isoDate(start),
      txtEnd: isoDate(end),
      "chk_cur[]": "XAU~Gold (per Troy oz.)",
      submit_button: "Submit",
    });

    const res = await fetch(CBSL_RESULTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (compatible; website-gold-rate)",
      },
      body,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return fallback;

    const html = await res.text();

    // Table rows look like: <td> 2026-11-18 </td><td> 1265543.9907 </td><td> 0 </td>
    // Take the most recent date that has a value.
    const rows = [
      ...html.matchAll(/<td>\s*(\d{4}-\d{2}-\d{2})\s*<\/td>\s*<td>\s*([\d.]+)\s*<\/td>/g),
    ];
    if (rows.length === 0) return fallback;
    rows.sort((a, b) => (a[1] < b[1] ? 1 : -1));
    const [, asOf, ozValue] = rows[0];

    const usdOrLkrPerOunce = Number(ozValue); // LKR per troy ounce
    if (!usdOrLkrPerOunce) return fallback;

    const markup = 1 + Number(process.env.GOLD_MARKUP_PERCENT ?? 0) / 100;
    const karat24PerGram = (usdOrLkrPerOunce / TROY_OUNCE_GRAMS) * markup;
    const karat22PerGram = karat24PerGram * (22 / 24);

    return {
      karat22: fmt(karat22PerGram),
      karat24: fmt(karat24PerGram),
      asOf,
      live: true,
    };
  } catch {
    return fallback;
  }
}
