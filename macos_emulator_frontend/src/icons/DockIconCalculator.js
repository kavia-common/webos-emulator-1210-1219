import React from "react";

// PUBLIC_INTERFACE
export default function DockIconCalculator() {
  // Calculator SVG: classic calculator look in squircle
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="#fffcea" stroke="#dfd399" strokeWidth="2" />
      <rect x="12" y="11" width="20" height="22" rx="5" fill="#fffaed" stroke="#e9deaa" strokeWidth="1.4" />
      <rect x="15" y="13.5" width="14" height="5.5" rx="2.1" fill="#ffee95"/>
      <rect x="15" y="21" width="4" height="4" rx="1.2" fill="#dedede"/>
      <rect x="21" y="21" width="4" height="4" rx="1.2" fill="#dedede"/>
      <rect x="15" y="27" width="4" height="4" rx="1.2" fill="#dedede"/>
      <rect x="21" y="27" width="4" height="4" rx="1.2" fill="#ffd25e"/>
      <rect x="27" y="21" width="4" height="10" rx="1.2" fill="#d1f0d3"/>
      <rect x="18.2" y="16.9" width="7.5" height="1.7" rx="0.7" fill="#fdde77" />
      <rect x="19" y="33" width="6" height="2" rx="1" fill="#d8ce99"/>
      {/* Display border */}
      <rect x="16" y="15" width="12" height="2" rx="0.7" fill="#f2f2d7" />
    </svg>
  );
}
