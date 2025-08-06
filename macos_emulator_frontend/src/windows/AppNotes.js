import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function AppNotes() {
  /**
   * Simulated Notes app: basic notepad with local editable state.
   */
  const [text, setText] = useState(
    "Quick Notes\n-------------------------------\n• Try switching theme (system menu)\n• Open Mission Control\n• Drag & reorder windows!\n"
  );
  return (
    <div style={{ padding: "22px 21px" }}>
      <h2 style={{ fontSize: 17, color: "#332" }}>Notes</h2>
      <textarea
        style={{
          width: "98%",
          minHeight: 160,
          maxWidth: "100%",
          fontFamily: "Menlo, SF Mono, Monaco, monospace",
          fontSize: 14,
          padding: 6,
          border: "1.4px solid #d4d6ee",
          borderRadius: 6,
          background: "#fafafbe0",
          color: "#1e2133",
          resize: "vertical",
          marginTop: 7,
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
    </div>
  );
}
