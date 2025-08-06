import React from "react";

// PUBLIC_INTERFACE
export default function DockIconSettings() {
  // Cogwheel SVG in soft gray for settings
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="#f0f2f4" stroke="#e7e9eb" strokeWidth="2" />
      <circle cx="22" cy="22" r="10" fill="#ececec" />
      <circle cx="22" cy="22" r="4.2" stroke="#b2b2b7" strokeWidth="2.2" fill="none" />
      <path d="M22 14v3M22 27v3M14 22h3M27 22h3" stroke="#b2b2b7" strokeWidth="2" />
      <path d="M16.7 16.7l2.1 2.1M25.2 25.2l2.1 2.1M16.7 27.3l2.1-2.1M25.2 18.8l2.1-2.1" stroke="#b2b2b7" strokeWidth="1.1" />
    </svg>
  );
}
