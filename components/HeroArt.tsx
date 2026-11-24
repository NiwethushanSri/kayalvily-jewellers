// Designed and Developed by Forge9x Ltd
// The hero photo of the three models, with its jewellery kept shining wherever the photo is used:
// slow glints on individual pieces, plus a band of light (in globals.css) that follows the gold itself.

import { getSite } from "@/lib/content";

// [left %, top %, delay s, cycle s, size, tilt deg]. Mixed cycle lengths keep the glints from flashing in step.
const glints: [number, number, number, number, number, number][] = [
  [19.5, 33, 0.0, 4.3, 1.0, 12], [14.5, 50, 1.7, 5.9, 0.7, -8], [17.5, 61, 0.9, 5.1, 1.2, 20], [23, 63, 2.6, 6.7, 0.8, 5],
  [50.5, 30, 1.2, 5.3, 0.9, -15], [46, 47, 2.9, 4.7, 0.7, 10], [50.5, 58, 0.4, 6.1, 1.3, 0], [49, 78, 2.1, 5.5, 1.0, 25], [62.5, 86, 3.3, 7.1, 0.8, -10],
  [74, 13, 0.7, 6.3, 0.8, 18], [84, 21, 2.4, 4.9, 0.7, -5], [82, 31, 1.5, 5.7, 1.1, 8], [81.5, 47, 3.0, 4.1, 1.3, -20], [81, 58, 0.2, 6.9, 1.0, 15], [84, 80, 1.9, 5.2, 0.8, 0],
];

export default async function HeroArt() {
  const custom = (await getSite()).images.hero;
  // A replacement photo has its jewellery in different places, so the glints and the gold shine are left off.
  if (custom) {
    return (
      <div className="hero-art custom">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={custom} alt="Models wearing gold jewellery" />
      </div>
    );
  }
  return (
    <div className="hero-art">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero.webp" alt="Models wearing South Indian silk sarees and gold jewellery" />
      {glints.map(([x, y, delay, cycle, size, tilt]) => (
        <span
          key={`${x}-${y}`}
          className="sparkle"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${(cycle * 1.3).toFixed(2)}s`,
            ["--k" as string]: size,
            rotate: `${tilt}deg`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
