import React from "react";

// PUBLIC_INTERFACE
export default function DockIconFinder() {
  // Basic blue smiling face in squircle for Finder demo
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <rect
        x="1.5"
        y="1.5"
        width="41"
        height="41"
        rx="11"
        fill="#0179fe"
        stroke="#d1e7f8"
        strokeWidth="2"
      />
      <path
        d="M12 29c3 5 16 4 19 0"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="17" cy="19" rx="1.2" ry="2" fill="#fff" />
      <ellipse cx="27" cy="19" rx="1.2" ry="2" fill="#fff" />
      <path
        d="M22 8 C29.5 13.5 28 25 22 36"
        stroke="#b7e8fd"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
