import React from "react";
import { useTheme } from "../components/ThemeContext";

// PUBLIC_INTERFACE
export default function AppSettings() {
  /**
   * Simulated Settings app: minimal dark/light toggle UI.
   */
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ padding: "22px 21px" }}>
      <h2 style={{ fontSize: 18, color: "#222", fontFamily: "San Francisco, Arial" }}>Settings</h2>
      <div>
        <section style={{ marginBottom: "18px" }}>
          <label>
            <b>Theme:</b>{" "}
            <select value={theme} onChange={toggleTheme} style={{ fontSize: 15 }}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </section>
        <section>
          <b>About:</b>
          <div style={{ fontSize: 13.8, marginTop: 7, color: "#454f58" }}>
            MacOS Emulator (browser-based) <br />
            <i>Demo build for browser UI simulation.</i>
          </div>
        </section>
      </div>
    </div>
  );
}
