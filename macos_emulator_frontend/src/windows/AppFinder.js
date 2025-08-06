import React from "react";

// PUBLIC_INTERFACE
export default function AppFinder() {
  /**
   * Simulated Finder app: minimal file browser.
   */
  return (
    <div style={{ padding: "22px 21px" }}>
      <h2 style={{ fontSize: 18, color: "#121", marginTop: 0, fontFamily: "San Francisco, Arial" }}>Finder</h2>
      <p style={{ color: "#385", margin: "7px 0 22px 0", fontSize: 14.5 }}>
        Welcome to your Mac desktop!<br />
        (This is a <b>browser-based MacOS emulator</b>.)
      </p>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        <li><span role="img" aria-label="folder">📁</span> Desktop</li>
        <li><span role="img" aria-label="folder">📁</span> Documents</li>
        <li><span role="img" aria-label="file">📑</span> Readme.txt</li>
        <li><span role="img" aria-label="file">📑</span> React_Project.docx</li>
      </ul>
      <hr style={{ margin: "17px 0" }} />
      <span style={{ fontSize: 13, color: "#6e7c80" }}>This UI mimics MacOS—try dragging windows, opening Mission Control, or switching themes.</span>
    </div>
  );
}
