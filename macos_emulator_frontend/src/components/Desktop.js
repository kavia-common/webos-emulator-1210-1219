import React from "react";
import Window from "./Window";
import "./Desktop.css";

// PUBLIC_INTERFACE
export default function Desktop({
  windows,
  windowOrder,
  setWindowOrder,
  moveWindow,
  onClose,
  onMinimize,
  onMaximize,
  focusWindow,
  showMissionControl,
  missionControl,
  desktopIcons,
  setDesktopIcons,
}) {
  /**
   * The MacOS desktop surface. Renders background, all open windows, and desktop icons.
   * Handles window z-order and drag focus management.
   */
  // Only show top windows (not closed), by z-order
  return (
    <div className="macos-desktop">
      {/* Desktop icons, basic shell (no icons in demo but allows for extension) */}
      {desktopIcons &&
        desktopIcons.map((icon) => (
          <div
            key={icon.id}
            className="desktop-icon"
            style={{ left: icon.x, top: icon.y }}
          >
            {/* Render icon SVG or PNG here */}
            <img src={icon.src} alt={icon.label} width={44} height={44} />
            <span className="desktop-icon-label">{icon.label}</span>
          </div>
        ))}
      {/* Windows */}
      {windowOrder.map((id, idx) => {
        const w = windows.find((w) => w.id === id && !w.closed);
        if (!w) return null;
        return (
          <Window
            key={w.id}
            {...w}
            zIndex={1001 + idx}
            onClose={() => onClose(w.id)}
            onMinimize={() => onMinimize(w.id)}
            onMaximize={() => onMaximize(w.id)}
            focusWindow={() => focusWindow(w.id)}
            moveWindow={(x, y) => moveWindow(w.id, x, y)}
            isActive={windowOrder[windowOrder.length - 1] === w.id}
            disabled={missionControl}
          />
        );
      })}
    </div>
  );
}
