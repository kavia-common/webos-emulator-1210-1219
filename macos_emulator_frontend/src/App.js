import React, { useState, useCallback, useRef } from "react";
import "./App.css";
import MenuBar from "./components/MenuBar";
import Desktop from "./components/Desktop";
import Dock from "./components/Dock";
import MissionControl from "./components/MissionControl";
import windowsData from "./util/defaultWindows";
import { ThemeProvider, useTheme } from "./components/ThemeContext";

// PUBLIC_INTERFACE
function AppRoot() {
  /**
   * Main application root providing the MacOS emulator UI and managing global state:
   * - theme (light/dark)
   * - open windows (position, z-order, etc.)
   * - mission control state
   */
  const [windows, setWindows] = useState(windowsData);
  const [windowOrder, setWindowOrder] = useState(windowsData.map((w) => w.id));
  const [missionControl, setMissionControl] = useState(false);

  // Top-level desktop icon dragging support (optional extension point)
  const [desktopIcons, setDesktopIcons] = useState([
    // Demo: No icons by default
  ]);

  // PUBLIC_INTERFACE
  const openApp = useCallback(
    (appId) => {
      // Focus or open requested app window
      let win = windows.find((w) => w.appId === appId);
      if (!win) return;
      // Bring it to front
      setWindowOrder((order) => [
        ...order.filter((id) => id !== win.id),
        win.id,
      ]);
      setWindows((prevWins) =>
        prevWins.map((w) =>
          w.id === win.id ? { ...w, minimized: false, closed: false } : w
        )
      );
    },
    [windows]
  );

  // PUBLIC_INTERFACE
  const closeWindow = (id) => {
    setWindows((wins) =>
      wins.map((w) => (w.id === id ? { ...w, closed: true } : w))
    );
  };

  // PUBLIC_INTERFACE
  const minimizeWindow = (id) => {
    setWindows((wins) =>
      wins.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  // PUBLIC_INTERFACE
  const maximizeWindow = (id) => {
    setWindows((wins) =>
      wins.map((w) =>
        w.id === id
          ? {
              ...w,
              maximized: !w.maximized,
              // On maximize, also un-minimize
              minimized: false,
            }
          : w
      )
    );
    // Bring to front
    setWindowOrder((order) => [...order.filter((wid) => wid !== id), id]);
  };

  // PUBLIC_INTERFACE
  const focusWindow = (id) => {
    setWindowOrder((order) => [...order.filter((wid) => wid !== id), id]);
  };

  // PUBLIC_INTERFACE
  const moveWindow = (id, x, y) => {
    setWindows((wins) =>
      wins.map((w) =>
        w.id === id ? { ...w, x, y, maximized: false } : w
      )
    );
  };

  // Mission Control (F3) toggling, layout handled by MissionControl component
  // PUBLIC_INTERFACE
  const showMissionControl = useCallback(
    (active) => setMissionControl(active),
    []
  );

  // Desktop area click: defocus all windows (unless clicking on window content)
  // (Can be extended to handle desktop icon selection)
  // Theme switcher
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="macos-app" data-theme={theme}>
      <MenuBar
        windows={windows}
        activeWindowId={windowOrder.at(-1)}
        toggleTheme={toggleTheme}
        onMissionControl={() => showMissionControl(true)}
      />
      <Desktop
        windows={windows}
        windowOrder={windowOrder}
        setWindowOrder={setWindowOrder}
        moveWindow={moveWindow}
        onClose={closeWindow}
        onMinimize={minimizeWindow}
        onMaximize={maximizeWindow}
        focusWindow={focusWindow}
        showMissionControl={showMissionControl}
        missionControl={missionControl}
        desktopIcons={desktopIcons}
        setDesktopIcons={setDesktopIcons}
      />
      <Dock
        openApp={openApp}
        windows={windows}
        windowOrder={windowOrder}
      />
      <MissionControl
        open={missionControl}
        windows={windows}
        windowOrder={windowOrder}
        onExit={() => showMissionControl(false)}
        focusWindow={focusWindow}
      />
    </div>
  );
}

/** Wrapping root component with ThemeProvider for context. */
export default function App() {
  return (
    <ThemeProvider>
      <AppRoot />
    </ThemeProvider>
  );
}
