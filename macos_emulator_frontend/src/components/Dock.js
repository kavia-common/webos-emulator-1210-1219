import React from "react";
import "./Dock.css";
import DockIconFinder from "../icons/DockIconFinder";
import DockIconSettings from "../icons/DockIconSettings";
import DockIconNotes from "../icons/DockIconNotes";

// PUBLIC_INTERFACE
export default function Dock({ openApp, windows, windowOrder }) {
  /**
   * MacOS style bottom dock. Shows icons for available apps and handles app launching. Shows open-dot under open apps.
   * Props:
   *   - openApp (function): open window for specified app
   *   - windows (array): window state objects
   *   - windowOrder (array): z-order (array of ids)
   */
  const APPS = [
    { appId: "finder", icon: <DockIconFinder />, label: "Finder" },
    { appId: "settings", icon: <DockIconSettings />, label: "Settings" },
    { appId: "notes", icon: <DockIconNotes />, label: "Notes" },
  ];

  function isAppOpen(appId) {
    return windows.some((w) => w.appId === appId && !w.closed && !w.minimized);
  }
  function isAppFrontmost(appId) {
    const w = windows.find((w) => w.appId === appId && !w.closed && !w.minimized);
    if (!w) return false;
    return windowOrder[windowOrder.length - 1] === w.id;
  }
  return (
    <div className="macos-dock">
      {APPS.map((app) => (
        <div
          key={app.appId}
          className={`dock-icon-wrap${isAppFrontmost(app.appId) ? " active" : ""}`}
          title={app.label}
          tabIndex={0}
          aria-label={app.label}
          onClick={() => openApp(app.appId)}
        >
          <span className="dock-icon">{app.icon}</span>
          {isAppOpen(app.appId) && <span className="dock-dot" />}
          <span className="dock-label">{app.label}</span>
        </div>
      ))}
    </div>
  );
}
