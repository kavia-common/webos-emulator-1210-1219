import React from "react";
import "./MissionControl.css";

/**
 * Mission Control overlays all open windows in a grid so user can pick/click to focus. Activated via menu or shortcut.
 * Props:
 *   - open (bool): show/hide mission control view
 *   - windows: list of window state objects
 *   - windowOrder: z-order list
 *   - onExit: function to exit MC view
 *   - focusWindow: function to focus window by ID
 */
// PUBLIC_INTERFACE
export default function MissionControl({
  open,
  windows,
  windowOrder,
  onExit,
  focusWindow,
}) {
  if (!open) return null;

  // Only show open and not minimized windows
  const visibleWins = windowOrder
    .map((id) => windows.find((w) => w.id === id && !w.closed && !w.minimized))
    .filter(Boolean);

  // Arrange windows in a "grid" for MC view
  const winCount = visibleWins.length;
  // For simplicity, use CSS grid, but scale/position can be fine-tuned

  return (
    <div className="mc-overlay" tabIndex={0} onClick={onExit}>
      <div className="mc-windows-grid">
        {visibleWins.map((w, idx) => (
          <div
            key={w.id}
            className="mc-window-snapshot"
            style={{ animationDelay: `${idx * 0.07}s` }}
            onClick={(e) => {
              e.stopPropagation();
              focusWindow(w.id);
              onExit();
            }}
          >
            <div className="mc-window-titlebar">
              <span className="mc-title">{w.title}</span>
            </div>
            <iframe
              title={w.title}
              srcDoc={`<div style='font-family:SF Pro,Arial,sans-serif;font-size:14.5px;color:#222;padding:12px;text-align:center;'>[App Preview: ${w.title}]</div>`}
              className="mc-window-preview"
            />
          </div>
        ))}
      </div>
      <span className="mc-exit-tip">Click anywhere to exit Mission Control</span>
    </div>
  );
}
