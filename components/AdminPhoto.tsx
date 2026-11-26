// Designed and Developed by Forge9x Ltd
"use client";

import { useState } from "react";

// A photo preview in /admin that also says how many pixels the photo in use actually has.
export default function AdminPhoto({ src }: { src: string }) {
  const [size, setSize] = useState("");
  const measure = (img: HTMLImageElement) => {
    if (img.naturalWidth) setSize(`${img.naturalWidth} × ${img.naturalHeight} px`);
  };
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        // An image already loaded before the page became interactive fires no load event, so measure it here too.
        ref={(img) => {
          if (img?.complete) measure(img);
        }}
        onLoad={(e) => measure(e.currentTarget)}
      />
      <p className="admin-size">Photo in use: {size || "measuring…"}</p>
    </>
  );
}
