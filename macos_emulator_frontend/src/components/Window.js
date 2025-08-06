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
   *
   * Enhanced for real-time, smooth drag movement via mouse/touch with desktop bounds constraint.
   */
  const ref = useRef();
  const draggingRef = useRef(false);
  const pointerTypeRef = useRef(null);

  // Track drag state (coords, etc.)
  const [drag, setDrag] = useState(null);

  // Helper: get desktop (parent) bounds
  const getDesktopBounds = () => {
    // Parent .macos-desktop is always full viewport, but Dock (bottom, height ~70px), MenuBar (top, height 30px) should be considered.
    // We "clip" top at 30px+margin, bottom at ~90px for Dock shadow overscroll.
    return {
      minX: 0,
      minY: 32,
      maxX: window.innerWidth,
      maxY: window.innerHeight - 60,
    };
  };

  // Clamp function for xy values
  const clamp = (v, min, max) => Math.max(min, Math.min(v, max));

  // --- Drag interactivity logic ---

  // Mouse and touch: unified pointer handlers
  const handlePointerDown = (e) => {
    if (disabled) return;
    // Only allow left mouse, or a single touch (ignore right-click).
    if (
      (e.type === "mousedown" && e.button !== 0) ||
      (e.type === "pointerdown" && e.pointerType === "mouse" && e.button !== 0)
    )
      return;

    const rawX = e.touches ? e.touches[0].clientX : e.clientX;
    const rawY = e.touches ? e.touches[0].clientY : e.clientY;
    const rect = ref.current.getBoundingClientRect();

    draggingRef.current = true;
    pointerTypeRef.current = e.pointerType || (e.touches ? "touch" : "mouse");

    setDrag({
      offsetX: rawX - rect.left,
      offsetY: rawY - rect.top,
      startX: rawX,
      startY: rawY,
      origX: x,
      origY: y,
    });
    // Ensure window comes to front on drag
    focusWindow?.();

    // Register event listeners for move/up/end outside React for performance
    if (e.type === "touchstart" || pointerTypeRef.current === "touch") {
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handlePointerUp, { passive: false });
      window.addEventListener("touchcancel", handlePointerUp, { passive: false });
    } else {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handlePointerUp);
    }
  };

  // Mouse move -- track window, clamp to bounds
  const handleMouseMove = (e) => {
    if (!draggingRef.current || !drag) return;
    const bounds = getDesktopBounds();
    let newX = e.clientX - drag.offsetX;
    let newY = e.clientY - drag.offsetY;
    newX = clamp(newX, bounds.minX, bounds.maxX - (w || 260));
    newY = clamp(newY, bounds.minY, bounds.maxY - (h || 160));
    moveWindow?.(newX, newY);
  };

  // Touch move -- track touch finger, clamp to bounds
  const handleTouchMove = (e) => {
    if (!draggingRef.current || !drag) return;
    if (e.touches.length !== 1) return;
    e.preventDefault(); // prevent scroll while dragging
    const bounds = getDesktopBounds();
    const touch = e.touches[0];
    let newX = touch.clientX - drag.offsetX;
    let newY = touch.clientY - drag.offsetY;
    newX = clamp(newX, bounds.minX, bounds.maxX - (w || 260));
    newY = clamp(newY, bounds.minY, bounds.maxY - (h || 160));
    moveWindow?.(newX, newY);
  };

  // On mouse/touch up: cleanup drag
  const handlePointerUp = () => {
    draggingRef.current = false;
    setDrag(null);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handlePointerUp);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handlePointerUp);
    window.removeEventListener("touchcancel", handlePointerUp);
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
        boxShadow: isActive
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
        boxShadow: isActive
          ? "0 7px 32px 0 rgba(0,0,0,0.16), 0 1.5px 12px #0079fe1a"
          : "0 2px 12px 0 rgba(0,0,0,0.11)",
        background: "var(--macos-window-bg, #fff)",
        borderRadius: 9,
        overflow: "hidden",
        outline: isActive ? "2px solid #0079FE55" : "none",
        touchAction: "none", // Prevent flicker during touch drag
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
      className={`macos-window ${isActive ? "active" : "inactive"}${maximized ? " maximized" : ""}`}
      style={style}
      tabIndex={0}
      ref={ref}
      onMouseDown={focusWindow}
    >
      <div
        className="macos-window-titlebar"
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{ cursor: disabled ? "default" : drag ? "grabbing" : "grab", userSelect: "none", WebkitUserSelect: "none" }}
        tabIndex={-1}
        role="toolbar"
        aria-label={`${title} Drag Bar`}
        // Keyboard-movable could be added here for accessibility
      >
        <span className="window-traffic-lights">
          <span
            className="traffic-btn close"
            onClick={onClose}
            title="Close"
            tabIndex={0}
            role="button"
            aria-label="Close window"
          />
          <span
            className="traffic-btn min"
            onClick={onMinimize}
            title="Minimize"
            tabIndex={0}
            role="button"
            aria-label="Minimize window"
          />
          <span
            className="traffic-btn max"
            onClick={onMaximize}
            title="Full Screen"
            tabIndex={0}
            role="button"
            aria-label="Maximize window"
          />
        </span>
        <span className="macos-window-title">{title}</span>
      </div>
      <div className="macos-window-content">{content}</div>
    </div>
  );
}
