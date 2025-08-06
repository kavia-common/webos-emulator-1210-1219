import React, { useState } from "react";
import "./MenuBar.css";
import { format } from "date-fns";

// PUBLIC_INTERFACE
export default function MenuBar({ windows, activeWindowId, toggleTheme, onMissionControl }) {
  /**
   * MacOS style fixed top menu bar. Includes Apple logo, app menus, system indicators, and a dark/light mode toggle.
   * Props:
   *   - windows (array): List of all open windows
   *   - activeWindowId (string): ID of the frontmost window
   *   - toggleTheme (function): toggles dark/light mode
   *   - onMissionControl (function): triggers mission control view
   */
  const [menuOpen, setMenuOpen] = useState(null);

  const appName = (() => {
    const window = windows.find((w) => w.id === activeWindowId && !w.closed && !w.minimized);
    if (!window) return "Finder";
    return window.title;
  })();

  // System clock
  const now = new Date();
  const timeStr = format(now, "EEE MMM d  h:mm aa");

  // TODO: Dropdown menus per real MacOS (file, edit...)
  return (
    <div className="macos-menu-bar">
      <div className="menu-left">
        <span className="logo-apple" role="img" aria-label="Apple">
          {/* SVG Apple logo - white */}
          <svg width="19" height="19" viewBox="0 0 20 20">
            <path
              d="M16.84 10.49c0-3.55 2.9-4.62 3-4.68-1.65-2.38-4.21-2.71-5.12-2.74-2.18-.22-4.25 1.28-5.36 1.28-1.12 0-2.81-1.25-4.63-1.22-2.39.03-4.6 1.39-5.83 3.55-2.48 4.31-.64 10.68 1.78 14.16 1.19 1.7 2.6 3.63 4.44 3.56 1.77-.07 2.44-1.15 4.58-1.15s2.72 1.15 4.61 1.12c1.9-.02 3.09-1.72 4.26-3.43 1.37-2 1.92-3.94 1.95-4.04-.04-.02-3.74-1.44-3.77-5.01l.01-.01zM13.62 3.29c.95-1.16 1.6-2.8 1.42-4.45-1.37.05-3.02.91-4 2.08-.88 1.04-1.65 2.72-1.36 4.32 1.46.11 2.99-.74 3.94-1.95z"
              fill="#f8f8f8"
            />
          </svg>
        </span>
        <span className="menu-appname">{appName}</span>
        {/* Example menus */}
        <div
          className={`menu-drop ${menuOpen === "File" ? "open" : ""}`}
          onMouseEnter={() => setMenuOpen("File")}
          onMouseLeave={() => setMenuOpen(null)}
        >
          <span>File</span>
          {menuOpen === "File" && (
            <div className="menu-dropdown-content">
              <button onClick={onMissionControl}>Mission Control</button>
              <hr />
              <button onClick={toggleTheme}>Toggle Dark/Light</button>
            </div>
          )}
        </div>
        <span className="menu-drop">Edit</span>
        <span className="menu-drop">View</span>
      </div>
      <div className="menu-center">
        {/* Optionally: system info, notifications, or leave empty (real Mac often empty) */}
      </div>
      <div className="menu-right">
        <span className="control-icon" title="Mission Control" onClick={onMissionControl} tabIndex={0}>
          {/* Rectangle stack for Mission Control */}
          <svg width="18" height="18" fill="none"><rect x="2" y="4" width="14" height="10" rx="2" fill="#f8f8f8" opacity="0.8"/><rect x="4" y="6" width="10" height="6" rx="1.5" fill="#f8f8f8" opacity="0.45"/></svg>
        </span>
        <span className="clock" title={now.toLocaleDateString()}>{timeStr}</span>
        {/* Additional icons: WiFi, Battery, User */}
        <span className="control-icon" title="Switch Theme" onClick={toggleTheme} tabIndex={0}>
          { /* Theme toggle icon: sun/moon */ }
          <svg width="18" height="18" fill="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="7" stroke="#f8f8f8" strokeWidth="1.5" fill="transparent"/>
            <path d="M10 3V1M10 19v-2M17 10h2M1 10h2M15.07 15.07l1.42 1.42M3.51 3.51l1.42 1.42M15.07 4.93l1.42-1.42M3.51 16.49l1.42-1.42" stroke="#f8f8f8" strokeWidth="1"/>
          </svg>
        </span>
      </div>
    </div>
  );
}
