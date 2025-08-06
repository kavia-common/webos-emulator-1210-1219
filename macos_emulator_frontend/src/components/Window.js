import React, { useRef, useState } from "react";
import "./Window.css";
import AppFinder from "../windows/AppFinder";
import AppSettings from "../windows/AppSettings";
import AppNotes from "../windows/AppNotes";

// PUBLIC_INTERFACE
export default function Window({
  id,
  appId,
  title,
  x,
  y,
  w,
  h,
  zIndex,
  minimized,
  maximized,
  onClose,
  onMinimize,
  onMaximize,
  focusWindow,
  moveWindow,
  isActive,
  disabled,
  closed,
}) {
  /**
   * Simulated MacOS window with styling and controls. Provides drag/move, z-order, maximize, minimize, and close.
   * Renders different content per appId.
   */
  const ref = useRef();
  const [drag, setDrag] = useState(null);

  // Drag logic
  const handleMouseDown = (e) => {
    if (disabled || e.button !== 0) return;
    // Start dragging
    const startX = e.clientX;
    const startY = e.clientY;
    setDrag({
      offsetX: startX - ref.current.getBoundingClientRect().left,
      offsetY: startY - ref.current.getBoundingClientRect().top,
    });
    focusWindow?.();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e) => {
    if (!drag) return;
    const newX = e.clientX - drag.offsetX;
    const newY = e.clientY - drag.offsetY;
    moveWindow?.(Math.max(newX, 10), Math.max(newY, 36));
  };
  const handleMouseUp = (e) => {
    setDrag(null);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  // Window geometry/calculation
  if (closed) return null;
  if (minimized) return null;

  const style = maximized
    ? {
        position: "absolute",
        left: 0,
        top: 32,
        width: "100vw",
        height: "calc(100vh - 90px)",
        zIndex,
        transition: "box-shadow 0.17s, transform 0.17s",
        boxShadow:
          isActive
            ? "0 7px 32px 0 rgba(0,0,0,0.19), 0 1.5px 12px #0079fe13"
            : "0 4px 22px 0 rgba(0,0,0,0.09)",
        background: "var(--macos-window-bg, #fff)",
        borderRadius: 9,
        overflow: "hidden",
        outline: isActive ? "2px solid #80bfff99" : "none",
      }
    : {
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        zIndex,
        transition: "box-shadow 0.17s, transform 0.17s",
        boxShadow:
          isActive
            ? "0 7px 32px 0 rgba(0,0,0,0.16), 0 1.5px 12px #0079fe1a"
            : "0 2px 12px 0 rgba(0,0,0,0.11)",
        background: "var(--macos-window-bg, #fff)",
        borderRadius: 9,
        overflow: "hidden",
        outline: isActive ? "2px solid #0079FE55" : "none",
      };

  // Content renderer
  let content;
  switch (appId) {
    case "finder":
      content = <AppFinder />;
      break;
    case "settings":
      content = <AppSettings />;
      break;
    case "notes":
      content = <AppNotes />;
      break;
    default:
      content = <div style={{ padding: 24 }}>No app content available</div>;
  }

  return (
    <div
      className={`macos-window ${isActive ? "active" : "inactive"}${
        maximized ? " maximized" : ""
      }`}
      style={style}
      tabIndex={0}
      ref={ref}
      onMouseDown={focusWindow}
    >
      <div
        className="macos-window-titlebar"
        onMouseDown={handleMouseDown}
        style={{ cursor: disabled ? "default" : "grab" }}
        tabIndex={-1}
      >
        <span className="window-traffic-lights">
          <span className="traffic-btn close" onClick={onClose} title="Close" />
          <span className="traffic-btn min" onClick={onMinimize} title="Minimize" />
          <span className="traffic-btn max" onClick={onMaximize} title="Full Screen" />
        </span>
        <span className="macos-window-title">{title}</span>
      </div>
      <div className="macos-window-content">{content}</div>
    </div>
  );
}
