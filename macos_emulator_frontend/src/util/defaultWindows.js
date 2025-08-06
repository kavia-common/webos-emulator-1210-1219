/**
 * Initial list of window state for the apps. Used by App.js for emulation.
 */
const defaultWindows = [
  {
    id: "win-finder",
    appId: "finder",
    title: "Finder",
    x: 85,
    y: 90,
    w: 410,
    h: 300,
    minimized: false,
    maximized: false,
    closed: false,
  },
  {
    id: "win-settings",
    appId: "settings",
    title: "Settings",
    x: 150,
    y: 150,
    w: 364,
    h: 236,
    minimized: false,
    maximized: false,
    closed: false,
  },
  {
    id: "win-notes",
    appId: "notes",
    title: "Notes",
    x: 400,
    y: 140,
    w: 310,
    h: 295,
    minimized: false,
    maximized: false,
    closed: false,
  },
];

export default defaultWindows;
