// Designed and Developed by Forge9x Ltd
// Logos for the social links, chosen by the label used in lib/site.ts. An unknown label draws nothing.
export default function SocialIcon({ name }: { name: string }) {
  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    );
  }
  if (name === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.100V8.800c0-.9.3-1.600 1.600-1.600h1.700V4.300c-.3 0-1.300-.1-2.500-.1-2.400 0-4.100 1.500-4.100 4.200v2.400H7.500V14h2.700v8h3.300z" />
      </svg>
    );
  }
  if (name === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.590 6.690a4.830 4.830 0 0 1-3.770-4.250V2h-3.450v13.670a2.890 2.890 0 0 1-5.200 1.740 2.890 2.890 0 0 1 2.310-4.640 2.930 2.930 0 0 1 .880.130V9.400a6.840 6.840 0 0 0-1-.050A6.330 6.330 0 0 0 5 20.100a6.340 6.340 0 0 0 10.860-4.430v-7a8.160 8.160 0 0 0 4.770 1.520v-3.400a4.850 4.850 0 0 1-1-.100z" />
      </svg>
    );
  }
  return null;
}
