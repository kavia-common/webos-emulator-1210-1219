import React from "react";

// PUBLIC_INTERFACE
export default function DockIconNotes() {
  // Notes SVG: yellow notepad in squircle
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="#fbe88d" stroke="#f0d76a" strokeWidth="2" />
      <rect x="10" y="14" width="24" height="16" rx="5" fill="#fcfcf6" stroke="#f6cf44" strokeWidth="1.2" />
      <rect x="14" y="18" width="16" height="2.2" rx="1.1" fill="#f9d651"/>
      <rect x="14" y="22" width="12" height="2.2" rx="1.1" fill="#f0bd45"/>
    </svg>
  );
}
