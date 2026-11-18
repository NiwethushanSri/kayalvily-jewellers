// Simple gold line icons for the feature blocks. Each is drawn on a 24x24 grid.
type IconName = "calendar" | "shield" | "gem" | "heart" | "chat";

const paths: Record<IconName, React.ReactNode> = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gem: (
    <>
      <path d="M6 4h12l3 5-9 11L3 9l3-5z" />
      <path d="M3 9h18M9 4l3 5 3-5M12 9l-3 11M12 9l3 11" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
};

export default function FeatureIcon({ name }: { name: IconName }) {
  return (
    <span className="feature-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </svg>
    </span>
  );
}
